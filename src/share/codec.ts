/**
 * Liens de partage d'un programme (mode praticien → patient).
 *
 * Format : `<origine>/#share=<version>.<charge utile>` où la charge utile est un JSON compact
 * compressé avec lz-string (compressToEncodedURIComponent). Le fragment `#` n'est jamais envoyé au serveur.
 *
 * Compatibilité : chaque version du format a son décodeur ; les anciens liens restent lisibles
 * après une mise à jour (voir les liens figés dans les tests). Ne jamais modifier un décodeur publié :
 * créer une nouvelle version et une migration.
 */
import LZString from 'lz-string';
import { z } from 'zod';
import { INTENSITY_KINDS } from '@/domain/ids';
import type { Dosage, Exercise } from '@/domain/schema';
import { SESSION_KEYS, type Program, type ProgramItem } from '@/domain/user';
import { resolveExerciseId } from '@/content/aliases';

export const SHARE_PARAM = 'share';
export const CURRENT_SHARE_VERSION = 1;
/** Au-delà, certains navigateurs ou messageries tronquent les liens. */
export const SHARE_URL_WARN_LENGTH = 8000;

// ---------------------------------------------------------------------------
// Version 1
// ---------------------------------------------------------------------------

/** [id, variante, niveau, séries, reps [min,max] | 0, maintien | 0, repos, tempo | '', parCôté 0|1, note | '', intensité 0 | [type, texte]] */
const ItemV1 = z.tuple([
  z.string().min(1).max(80),
  z.string().max(80),
  z.number().int().min(1).max(5),
  z.number().int().min(1).max(10),
  z.union([z.literal(0), z.tuple([z.number().int().min(1).max(200), z.number().int().min(1).max(200)])]),
  z.number().int().min(0).max(600),
  z.number().int().min(0).max(600),
  z.string().max(12),
  z.union([z.literal(0), z.literal(1)]),
  z.string().max(1000),
  z.union([z.literal(0), z.tuple([z.enum(INTENSITY_KINDS), z.string().max(200)])]),
]);

const PayloadV1 = z.object({
  t: z.string().max(120),
  a: z.string().max(120).optional(),
  n: z.string().max(4000).optional(),
  w: z.number().int().min(1).max(4).optional(),
  /** Date de création (ms) — sert d'identifiant stable du programme partagé. */
  d: z.number().int().optional(),
  s: z
    .array(
      z.object({
        k: z.enum(SESSION_KEYS),
        l: z.string().max(80).optional(),
        i: z.array(ItemV1).max(20),
      }),
    )
    .min(1)
    .max(4),
});
type PayloadV1 = z.infer<typeof PayloadV1>;

export type ShareErrorCode = 'empty' | 'bad-version' | 'corrupt' | 'invalid';
export class ShareError extends Error {
  constructor(public code: ShareErrorCode) {
    super(code);
  }
}

/** Programme décodé, prêt à être enregistré. Les exercices inconnus de cette version de l'app sont signalés. */
export interface DecodedProgram {
  program: Omit<Program, 'id' | 'active' | 'createdAt' | 'updatedAt'> & { sharedAt?: number };
  unknownExercises: string[];
  version: number;
}

type ExerciseLookup = (id: string) => Exercise | undefined;

function sameIntensity(a: Dosage['intensity'], b: Dosage['intensity']) {
  return a.kind === b.kind && a.value.fr === b.value.fr && a.value.en === b.value.en;
}

function encodeItem(item: ProgramItem, lookup: ExerciseLookup): z.infer<typeof ItemV1> {
  const d = item.dosage;
  const ex = lookup(item.exerciseId);
  const levelDosage = ex?.levels.find((l) => l.level === item.level)?.dosage;
  const intensity: z.infer<typeof ItemV1>[10] =
    levelDosage && sameIntensity(levelDosage.intensity, d.intensity)
      ? 0
      : [d.intensity.kind, d.intensity.value.fr];
  return [
    item.exerciseId,
    item.variantId,
    item.level,
    d.sets,
    d.reps ? [d.reps[0], d.reps[1]] : 0,
    d.holdSec ?? 0,
    d.restSec,
    d.tempo ?? '',
    d.perSide ? 1 : 0,
    item.note ?? '',
    intensity,
  ];
}

function decodeItemV1(t: z.infer<typeof ItemV1>, lookup: ExerciseLookup): { item: ProgramItem; known: boolean } {
  const [rawId, variantId, level, sets, reps, hold, rest, tempo, perSide, note, intensity] = t;
  const exerciseId = resolveExerciseId(rawId);
  const ex = lookup(exerciseId);
  const levelDosage = ex?.levels.find((l) => l.level === level)?.dosage ?? ex?.levels[0]?.dosage;
  const dosage: Dosage = {
    sets,
    restSec: rest,
    perSide: perSide === 1,
    intensity:
      intensity === 0
        ? (levelDosage?.intensity ?? { kind: 'rpe', value: { fr: '—', en: '—' } })
        : { kind: intensity[0], value: { fr: intensity[1], en: intensity[1] } },
    ...(reps !== 0 ? { reps: [Math.min(reps[0], reps[1]), Math.max(reps[0], reps[1])] as [number, number] } : {}),
    ...(hold > 0 ? { holdSec: Math.max(5, hold) } : {}),
    ...(tempo ? { tempo } : {}),
    ...(levelDosage?.frequency ? { frequency: levelDosage.frequency } : {}),
  };
  if (!dosage.reps && !dosage.holdSec) dosage.reps = [10, 10];
  const variant = ex?.variants.some((v) => v.id === variantId) ? variantId : (ex?.variants[0]?.id ?? variantId);
  return {
    item: {
      exerciseId,
      variantId: variant,
      level: ex ? Math.min(level, ex.levels.length) : level,
      dosage,
      reason: { kind: 'manual', ref: 'practitioner' },
      ...(note ? { note } : {}),
    },
    known: !!ex,
  };
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

export function encodeProgram(
  program: Pick<Program, 'title' | 'author' | 'notes' | 'sessions' | 'sessionsPerWeek' | 'createdAt'>,
  lookup: ExerciseLookup,
): string {
  const payload: PayloadV1 = {
    t: program.title,
    ...(program.author ? { a: program.author } : {}),
    ...(program.notes ? { n: program.notes } : {}),
    ...(program.sessionsPerWeek ? { w: program.sessionsPerWeek } : {}),
    d: program.createdAt,
    s: program.sessions.map((s) => ({
      k: s.key,
      ...(s.title ? { l: s.title } : {}),
      i: s.items.map((it) => encodeItem(it, lookup)),
    })),
  };
  PayloadV1.parse(payload);
  return `${CURRENT_SHARE_VERSION}.${LZString.compressToEncodedURIComponent(JSON.stringify(payload))}`;
}

export function shareUrl(origin: string, token: string): string {
  return `${origin.replace(/\/$/, '')}/#${SHARE_PARAM}=${token}`;
}

/** Extrait le jeton d'un fragment d'URL (`#share=...`). */
export function tokenFromHash(hash: string): string | undefined {
  // Pas de URLSearchParams : il transformerait les « + » de l'alphabet lz-string en espaces.
  const h = hash.startsWith('#') ? hash.slice(1) : hash;
  const prefix = `${SHARE_PARAM}=`;
  const part = h.split('&').find((p) => p.startsWith(prefix));
  return part ? part.slice(prefix.length) : undefined;
}

export function decodeProgram(rawToken: string, lookup: ExerciseLookup): DecodedProgram {
  // Certaines messageries remplacent « + » par une espace ou encodent les caractères spéciaux.
  const token = rawToken.trim().replace(/ /g, '+').replace(/%2B/gi, '+').replace(/%24/gi, '$');
  if (!token) throw new ShareError('empty');
  const dot = token.indexOf('.');
  const version = Number(token.slice(0, dot));
  const body = token.slice(dot + 1);
  if (dot < 1 || !Number.isInteger(version)) throw new ShareError('corrupt');
  const decoder = DECODERS[version];
  if (!decoder) throw new ShareError('bad-version');
  let json: unknown;
  try {
    const text = LZString.decompressFromEncodedURIComponent(body);
    if (!text) throw new Error('empty');
    json = JSON.parse(text);
  } catch {
    throw new ShareError('corrupt');
  }
  return decoder(json, lookup);
}

const DECODERS: Record<number, (json: unknown, lookup: ExerciseLookup) => DecodedProgram> = {
  1: (json, lookup) => {
    const r = PayloadV1.safeParse(json);
    if (!r.success) throw new ShareError('invalid');
    const p = r.data;
    const unknown = new Set<string>();
    const sessions = p.s.map((s) => ({
      key: s.k,
      ...(s.l ? { title: s.l } : {}),
      items: s.i.map((t) => {
        const { item, known } = decodeItemV1(t, lookup);
        if (!known) unknown.add(item.exerciseId);
        return item;
      }),
    }));
    return {
      version: 1,
      unknownExercises: [...unknown],
      program: {
        origin: 'imported',
        title: p.t,
        ...(p.a ? { author: p.a } : {}),
        ...(p.n ? { notes: p.n } : {}),
        ...(p.w ? { sessionsPerWeek: p.w } : {}),
        ...(p.d ? { sharedAt: p.d } : {}),
        sessions,
      },
    };
  },
};

