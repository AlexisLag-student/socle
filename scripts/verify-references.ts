/**
 * Vérification des références scientifiques contre les bases officielles.
 *
 *   npm run refs:check                         vérifie toutes les références → REFERENCES_CHECK.md
 *   npm run refs:check -- --id beyer-2015      vérifie une seule référence (pas d'écriture du rapport)
 *   npm run refs:check -- --search "heavy slow resistance achilles"   recherche PubMed (10 résultats)
 *   npm run refs:check -- --lookup-pmid 12345678 23456789             métadonnées officielles → objet prêt à coller
 *   npm run refs:check -- --lookup-doi 10.1177/0363546515584760
 *   npm run refs:check -- --abstract 12345678                         affiche le résumé PubMed
 *
 * Sources : NCBI E-utilities (PubMed) et l'API Crossref. Aucune donnée personnelle n'est envoyée.
 */
import { writeFileSync } from 'node:fs';
import { content } from '../src/content/index';
import type { Reference } from '../src/domain/schema';

const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const CROSSREF = 'https://api.crossref.org/works/';
const UA = 'Socle-reference-check/1.0 (open-source PWA; reference verification)';

// ---------------------------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Requête avec nouvelles tentatives (limite NCBI : 3 requêtes/s sans clé ; plusieurs agents peuvent tourner en parallèle). */
async function request(url: string, accept: string, attempt = 1): Promise<Response> {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: accept } });
  if (res.status === 429 || res.status >= 500) {
    if (attempt > 7) throw new Error(`HTTP ${res.status} pour ${url}`);
    await sleep(600 * 2 ** (attempt - 1) * (0.5 + Math.random()));
    return request(url, accept, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} pour ${url}`);
  return res;
}

async function getJson<T>(url: string): Promise<T> {
  return (await (await request(url, 'application/json')).json()) as T;
}

async function getText(url: string): Promise<string> {
  return (await request(url, 'text/plain')).text();
}

export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Similarité de Jaccard entre les mots de deux titres (0..1). */
export function titleSimilarity(a: string, b: string): number {
  const ta = new Set(normalize(a).split(' ').filter(Boolean));
  const tb = new Set(normalize(b).split(' ').filter(Boolean));
  const inter = [...ta].filter((t) => tb.has(t)).length;
  const union = new Set([...ta, ...tb]).size;
  return union === 0 ? 0 : inter / union;
}

const lastName = (author: string) => normalize(author.split(/\s+/)[0] ?? '');

// ---------------------------------------------------------------------------
// PubMed
// ---------------------------------------------------------------------------

interface PubmedSummary {
  uid: string;
  pubdate: string;
  epubdate: string;
  source: string;
  fulljournalname: string;
  title: string;
  authors: { name: string; authtype: string }[];
  articleids: { idtype: string; value: string }[];
  pubtype: string[];
  error?: string;
}

async function pubmedSummaries(pmids: string[]): Promise<Map<string, PubmedSummary>> {
  const out = new Map<string, PubmedSummary>();
  for (let i = 0; i < pmids.length; i += 150) {
    const batch = pmids.slice(i, i + 150);
    const data = await getJson<{ result: Record<string, PubmedSummary> & { uids: string[] } }>(
      `${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${batch.join(',')}`,
    );
    for (const uid of data.result?.uids ?? []) {
      const s = data.result[uid] as PubmedSummary;
      if (s && !s.error) out.set(uid, s);
    }
    await sleep(400);
  }
  return out;
}

async function pubmedSearch(term: string, max = 10): Promise<string[]> {
  const data = await getJson<{ esearchresult: { idlist: string[] } }>(
    `${EUTILS}/esearch.fcgi?db=pubmed&retmode=json&retmax=${max}&term=${encodeURIComponent(term)}`,
  );
  return data.esearchresult.idlist;
}

async function pubmedAbstract(pmid: string): Promise<string> {
  return getText(`${EUTILS}/efetch.fcgi?db=pubmed&id=${pmid}&rettype=abstract&retmode=text`);
}

const doiOf = (s: PubmedSummary) => s.articleids.find((a) => a.idtype === 'doi')?.value;
const yearsOf = (s: PubmedSummary) =>
  [s.pubdate, s.epubdate].map((d) => Number(d?.slice(0, 4))).filter((y) => y > 0);
const authorsOf = (s: PubmedSummary) =>
  s.authors.filter((a) => a.authtype === 'Author').map((a) => a.name);

// ---------------------------------------------------------------------------
// Crossref
// ---------------------------------------------------------------------------

interface CrossrefWork {
  DOI: string;
  title: string[];
  'container-title': string[];
  author?: { family?: string; given?: string; name?: string }[];
  issued?: { 'date-parts': number[][] };
  published?: { 'date-parts': number[][] };
  type: string;
}

async function crossref(doi: string): Promise<CrossrefWork | null> {
  try {
    const data = await getJson<{ message: CrossrefWork }>(CROSSREF + encodeURIComponent(doi));
    return data.message;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Vérification d'une référence
// ---------------------------------------------------------------------------

type Status = 'ok' | 'warn' | 'fail';
interface CheckResult {
  ref: Reference;
  status: Status;
  via: string;
  notes: string[];
}

function compare(
  ref: Reference,
  found: { title: string; years: number[]; firstAuthor: string; journals: string[]; doi?: string },
  notes: string[],
): Status {
  let status: Status = 'ok';
  const sim = titleSimilarity(ref.title, found.title);
  if (sim < 0.6) {
    notes.push(`titre différent (similarité ${sim.toFixed(2)}) : « ${found.title} »`);
    status = 'fail';
  } else if (sim < 0.9) {
    notes.push(`titre légèrement différent (similarité ${sim.toFixed(2)}) : « ${found.title} »`);
    status = 'warn';
  }
  if (!found.years.includes(ref.year)) {
    const near = found.years.some((y) => Math.abs(y - ref.year) <= 1);
    notes.push(`année ${ref.year} ≠ ${found.years.join('/')}`);
    status = near && status !== 'fail' ? 'warn' : 'fail';
  }
  const fa = lastName(ref.authors[0] ?? '');
  if (fa && fa !== 'et' && !normalize(found.firstAuthor).startsWith(fa)) {
    notes.push(`premier auteur « ${ref.authors[0]} » ≠ « ${found.firstAuthor} »`);
    status = 'fail';
  }
  const j = normalize(ref.journal);
  if (!found.journals.some((fj) => { const n = normalize(fj); return n === j || n.includes(j) || j.includes(n); })) {
    notes.push(`revue « ${ref.journal} » ≠ « ${found.journals.join(' / ')} »`);
    if (status === 'ok') status = 'warn';
  }
  if (ref.doi && found.doi && ref.doi.toLowerCase() !== found.doi.toLowerCase()) {
    notes.push(`DOI ${ref.doi} ≠ ${found.doi}`);
    status = 'fail';
  }
  return status;
}

async function checkAll(refs: Reference[]): Promise<CheckResult[]> {
  const pmids = refs.map((r) => r.pmid).filter(Boolean) as string[];
  const summaries = pmids.length ? await pubmedSummaries(pmids) : new Map();
  const results: CheckResult[] = [];
  for (const ref of refs) {
    const notes: string[] = [];
    let status: Status = 'fail';
    let via = '—';
    if (ref.pmid) {
      const s = summaries.get(ref.pmid);
      if (!s) notes.push(`PMID ${ref.pmid} introuvable dans PubMed`);
      else {
        via = 'PubMed';
        status = compare(
          ref,
          {
            title: s.title,
            years: yearsOf(s),
            firstAuthor: authorsOf(s)[0] ?? '',
            journals: [s.source, s.fulljournalname],
            doi: doiOf(s),
          },
          notes,
        );
      }
    }
    if (ref.doi && (status !== 'ok' || !ref.pmid)) {
      const w = await crossref(ref.doi);
      await sleep(150);
      if (!w) notes.push(`DOI ${ref.doi} introuvable sur Crossref`);
      else {
        const crNotes: string[] = [];
        const crStatus = compare(
          ref,
          {
            title: w.title?.[0] ?? '',
            years: [w.issued, w.published]
              .map((d) => d?.['date-parts']?.[0]?.[0])
              .filter((y): y is number => !!y),
            firstAuthor: w.author?.[0]?.family ?? w.author?.[0]?.name ?? '',
            journals: w['container-title'] ?? [],
          },
          crNotes,
        );
        if (!ref.pmid || rank(crStatus) < rank(status)) {
          status = crStatus;
          via = ref.pmid ? 'PubMed + Crossref' : 'Crossref';
          notes.push(...crNotes.map((n) => `Crossref : ${n}`));
        }
      }
    }
    if (!ref.pmid && !ref.doi && ref.url) {
      notes.push('URL seule : vérification manuelle (éditeur) requise');
      status = ref.verification.via === 'publisher' ? 'warn' : 'fail';
      via = 'URL';
    }
    results.push({ ref, status, via, notes });
  }
  return results;
}
const rank = (s: Status) => ({ ok: 0, warn: 1, fail: 2 })[s];

// ---------------------------------------------------------------------------
// Rapport
// ---------------------------------------------------------------------------

function citedBy(refId: string): string[] {
  const ex = content.exercises.filter((e) => e.evidence.citations.some((c) => c.refId === refId)).map((e) => e.id);
  const pa = content.pathologies.filter((p) => p.evidence.citations.some((c) => c.refId === refId)).map((p) => p.id);
  return [...pa.map((p) => `🩺 ${p}`), ...ex.map((e) => `🏋️ ${e}`)];
}

function linkOf(r: Reference): string {
  const parts: string[] = [];
  if (r.doi) parts.push(`[DOI](https://doi.org/${r.doi})`);
  if (r.pmid) parts.push(`[PMID ${r.pmid}](https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/)`);
  if (!parts.length && r.url) parts.push(`[lien](${r.url})`);
  return parts.join(' · ');
}

const ICON: Record<Status, string> = { ok: '✅', warn: '⚠️', fail: '❌' };

function report(results: CheckResult[]): string {
  const date = new Date().toISOString().slice(0, 10);
  const count = (s: Status) => results.filter((r) => r.status === s).length;
  const esc = (s: string) => s.replace(/\|/g, '\\|');
  const lines = [
    '# Vérification des références',
    '',
    `Rapport généré automatiquement par \`npm run refs:check\` le **${date}**.`,
    '',
    'Méthode, pour chaque référence :',
    '1. **Métadonnées** : comparaison automatique avec PubMed (E-utilities, via le PMID) et/ou Crossref (via le DOI) du titre, de l’année, du premier auteur, de la revue et du DOI.',
    '2. **Contenu** : lecture du résumé pour confirmer que la phrase « ce que l’étude a montré » affichée dans l’app est fidèle (colonne « Résumé lu »).',
    '',
    'Une référence qui ne peut pas être vérifiée est retirée du contenu ; l’exercice concerné passe alors au badge « consensus d’experts ».',
    '',
    `**${results.length} références** — ✅ ${count('ok')} conformes · ⚠️ ${count('warn')} à surveiller · ❌ ${count('fail')} en échec`,
    '',
    '| Statut | Id | Référence | Type | Liens | Vérifié via | Résumé lu | Date | Cité par | Notes |',
    '|---|---|---|---|---|---|---|---|---|---|',
  ];
  for (const r of [...results].sort((a, b) => rank(b.status) - rank(a.status) || a.ref.id.localeCompare(b.ref.id))) {
    const ref = r.ref;
    const authors = ref.authors.length > 3 ? `${ref.authors.slice(0, 3).join(', ')} et al.` : ref.authors.join(', ');
    lines.push(
      `| ${ICON[r.status]} | \`${ref.id}\` | ${esc(authors)} (${ref.year}). *${esc(ref.title)}* ${esc(ref.journal)} | ${ref.type} | ${linkOf(ref)} | ${r.via} | ${ref.verification.abstractChecked ? 'oui' : 'non'} | ${ref.verification.checkedAt} | ${citedBy(ref.id).join('<br>') || '—'} | ${esc(r.notes.join(' ; ')) || '—'} |`,
    );
  }
  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Modes « recherche » (aide à la rédaction)
// ---------------------------------------------------------------------------

function snippet(s: PubmedSummary): string {
  const authors = authorsOf(s);
  const year = Number(s.pubdate.slice(0, 4)) || yearsOf(s)[0];
  const first = lastName(authors[0] ?? 'x').replace(/ /g, '-');
  const doi = doiOf(s);
  return `defineReference({
  id: '${first}-${year}',
  authors: ${JSON.stringify(authors)},
  year: ${year},
  title: ${JSON.stringify(s.title.replace(/\.$/, ''))},
  journal: ${JSON.stringify(s.fulljournalname || s.source)},
  ${doi ? `doi: '${doi}',\n  ` : ''}pmid: '${s.uid}',
  type: '/* cpg | meta-analysis | systematic-review | rct | cohort | … (pubtype PubMed : ${s.pubtype.join(', ')}) */',
  verification: { status: 'verified', checkedAt: '${new Date().toISOString().slice(0, 10)}', via: 'pubmed', abstractChecked: false },
}),`;
}

async function main() {
  const args = process.argv.slice(2);
  const flag = (name: string) => {
    const i = args.indexOf(name);
    return i >= 0 ? args.slice(i + 1).filter((a) => !a.startsWith('--')) : null;
  };

  const search = flag('--search');
  if (search) {
    const ids = await pubmedSearch(search.join(' '), 10);
    const sums = await pubmedSummaries(ids);
    for (const id of ids) {
      const s = sums.get(id);
      if (!s) continue;
      console.log(`PMID ${id} | ${s.pubdate.slice(0, 4)} | ${authorsOf(s)[0] ?? '?'} | ${s.title} | ${s.source} | doi:${doiOf(s) ?? '—'} | ${s.pubtype.join(', ')}`);
    }
    return;
  }
  const lpmid = flag('--lookup-pmid');
  if (lpmid) {
    const sums = await pubmedSummaries(lpmid);
    for (const id of lpmid) {
      const s = sums.get(id);
      console.log(s ? snippet(s) : `// PMID ${id} introuvable`);
    }
    return;
  }
  const ldoi = flag('--lookup-doi');
  if (ldoi) {
    for (const doi of ldoi) {
      const ids = await pubmedSearch(`${doi}[doi]`, 2);
      if (ids.length) {
        const sums = await pubmedSummaries(ids);
        for (const id of ids) { const s = sums.get(id); if (s) console.log(snippet(s)); }
      } else {
        const w = await crossref(doi);
        console.log(w ? JSON.stringify({ title: w.title?.[0], journal: w['container-title']?.[0], year: w.issued?.['date-parts']?.[0]?.[0], authors: w.author?.map((a) => `${a.family} ${a.given?.[0] ?? ''}`.trim()), doi: w.DOI, type: w.type }, null, 2) : `// DOI ${doi} introuvable (PubMed et Crossref)`);
      }
    }
    return;
  }
  const abs = flag('--abstract');
  if (abs) {
    console.log(await pubmedAbstract(abs.join(',')));
    return;
  }

  const only = flag('--id');
  const refs = only ? content.references.filter((r) => only.includes(r.id)) : content.references;
  if (only && refs.length === 0) {
    console.error(`Aucune référence avec l'id ${only.join(', ')}`);
    process.exit(1);
  }
  const results = await checkAll(refs);
  for (const r of results)
    console.log(`${ICON[r.status]} ${r.ref.id}${r.notes.length ? ' — ' + r.notes.join(' ; ') : ''}`);
  if (!only) {
    writeFileSync('REFERENCES_CHECK.md', report(results));
    console.log(`\nRapport écrit dans REFERENCES_CHECK.md (${results.length} références).`);
  }
  if (results.some((r) => r.status === 'fail')) process.exitCode = 1;
}

await main();
