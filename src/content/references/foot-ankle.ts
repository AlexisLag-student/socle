/**
 * Références — pied, cheville et jambe.
 * Chaque entrée a été vérifiée sur PubMed/Crossref (voir REFERENCES_CHECK.md et le skill verify-reference).
 */
import { defineReference } from '@/domain/schema';

export default [
  defineReference({
    id: 'chimenti-2024',
    authors: ['Chimenti RL', 'Neville C', 'Houck J', 'Cuddeford T', 'Carreira D', 'Martin RL'],
    year: 2024,
    title:
      'Achilles Pain, Stiffness, and Muscle Power Deficits: Midportion Achilles Tendinopathy Revision - 2024',
    journal: 'J Orthop Sports Phys Ther',
    doi: '10.2519/jospt.2024.0302',
    pmid: '39611662',
    type: 'cpg',
    verification: { status: 'verified', checkedAt: '2026-10-22', via: 'pubmed', abstractChecked: true },
  }),
  defineReference({
    id: 'beyer-2015',
    authors: ['Beyer R', 'Kongsgaard M', 'Hougs Kjær B', 'Øhlenschlæger T', 'Kjær M', 'Magnusson SP'],
    year: 2015,
    title:
      'Heavy Slow Resistance Versus Eccentric Training as Treatment for Achilles Tendinopathy: A Randomized Controlled Trial',
    journal: 'Am J Sports Med',
    doi: '10.1177/0363546515584760',
    pmid: '26018970',
    type: 'rct',
    verification: { status: 'verified', checkedAt: '2026-10-22', via: 'pubmed', abstractChecked: true },
  }),
  defineReference({
    id: 'alfredson-1998',
    authors: ['Alfredson H', 'Pietilä T', 'Jonsson P', 'Lorentzon R'],
    year: 1998,
    title: 'Heavy-load eccentric calf muscle training for the treatment of chronic Achilles tendinosis',
    journal: 'Am J Sports Med',
    doi: '10.1177/03635465980260030301',
    pmid: '9617396',
    type: 'cohort',
    verification: { status: 'verified', checkedAt: '2026-10-22', via: 'pubmed', abstractChecked: true },
  }),
  defineReference({
    id: 'silbernagel-2007',
    authors: ['Silbernagel KG', 'Thomeé R', 'Eriksson BI', 'Karlsson J'],
    year: 2007,
    title:
      'Continued sports activity, using a pain-monitoring model, during rehabilitation in patients with Achilles tendinopathy: a randomized controlled study',
    journal: 'Am J Sports Med',
    doi: '10.1177/0363546506298279',
    pmid: '17307888',
    type: 'rct',
    verification: { status: 'verified', checkedAt: '2026-10-22', via: 'pubmed', abstractChecked: true },
  }),
];
