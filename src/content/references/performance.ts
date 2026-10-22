/**
 * Références — performance (force maximale, puissance, pliométrie, économie de course, vélo)
 * et références transversales (prévention des blessures par le renforcement).
 * Chaque entrée a été vérifiée sur PubMed (skill verify-reference), résumé lu.
 */
import { defineReference } from '@/domain/schema';

const verified = { status: 'verified', checkedAt: '2026-10-22', via: 'pubmed', abstractChecked: true } as const;

export default [
  // ---------------------------------------------------------------------------
  // Transversales : prévention et force chez l'athlète d'endurance
  // ---------------------------------------------------------------------------
  defineReference({
    id: 'lauersen-2014',
    authors: ['Lauersen JB', 'Bertelsen DM', 'Andersen LB'],
    year: 2014,
    title:
      'The effectiveness of exercise interventions to prevent sports injuries: a systematic review and meta-analysis of randomised controlled trials',
    journal: 'Br J Sports Med',
    doi: '10.1136/bjsports-2013-092538',
    pmid: '24100287',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'blagrove-2018',
    authors: ['Blagrove RC', 'Howatson G', 'Hayes PR'],
    year: 2018,
    title:
      'Effects of Strength Training on the Physiological Determinants of Middle- and Long-Distance Running Performance: A Systematic Review',
    journal: 'Sports Med',
    doi: '10.1007/s40279-017-0835-7',
    pmid: '29249083',
    type: 'systematic-review',
    verification: verified,
  }),
  defineReference({
    id: 'ronnestad-2014',
    authors: ['Rønnestad BR', 'Mujika I'],
    year: 2014,
    title: 'Optimizing strength training for running and cycling endurance performance: A review',
    journal: 'Scand J Med Sci Sports',
    doi: '10.1111/sms.12104',
    pmid: '23914932',
    type: 'narrative-review',
    verification: verified,
  }),
  defineReference({
    id: 'beattie-2014',
    authors: ['Beattie K', 'Kenny IC', 'Lyons M', 'Carson BP'],
    year: 2014,
    title: 'The effect of strength training on performance in endurance athletes',
    journal: 'Sports Med',
    doi: '10.1007/s40279-014-0157-y',
    pmid: '24532151',
    type: 'systematic-review',
    verification: verified,
  }),
  defineReference({
    id: 'suchomel-2016',
    authors: ['Suchomel TJ', 'Nimphius S', 'Stone MH'],
    year: 2016,
    title: 'The Importance of Muscular Strength in Athletic Performance',
    journal: 'Sports Med',
    doi: '10.1007/s40279-016-0486-0',
    pmid: '26838985',
    type: 'narrative-review',
    verification: verified,
  }),

  // ---------------------------------------------------------------------------
  // Course : économie de course, force lourde, pliométrie
  // ---------------------------------------------------------------------------
  defineReference({
    id: 'denadai-2017',
    authors: ['Denadai BS', 'de Aguiar RA', 'de Lima LC', 'Greco CC', 'Caputo F'],
    year: 2017,
    title:
      'Explosive Training and Heavy Weight Training are Effective for Improving Running Economy in Endurance Athletes: A Systematic Review and Meta-Analysis',
    journal: 'Sports Med',
    doi: '10.1007/s40279-016-0604-z',
    pmid: '27497600',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'balsalobre-fernandez-2016',
    authors: ['Balsalobre-Fernández C', 'Santos-Concejero J', 'Grivas GV'],
    year: 2016,
    title:
      'Effects of Strength Training on Running Economy in Highly Trained Runners: A Systematic Review With Meta-Analysis of Controlled Trials',
    journal: 'J Strength Cond Res',
    doi: '10.1519/JSC.0000000000001316',
    pmid: '26694507',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'eihara-2022',
    authors: ['Eihara Y', 'Takao K', 'Sugiyama T', 'Maeo S', 'Terada M', 'Kanehisa H', 'Isaka T'],
    year: 2022,
    title:
      'Heavy Resistance Training Versus Plyometric Training for Improving Running Economy and Running Time Trial Performance: A Systematic Review and Meta-analysis',
    journal: 'Sports Med Open',
    doi: '10.1186/s40798-022-00511-1',
    pmid: '36370207',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'llanos-lagos-2024',
    authors: ['Llanos-Lagos C', 'Ramirez-Campillo R', 'Moran J', 'Sáez de Villarreal E'],
    year: 2024,
    title:
      "Effect of Strength Training Programs in Middle- and Long-Distance Runners' Economy at Different Running Speeds: A Systematic Review with Meta-analysis",
    journal: 'Sports Med',
    doi: '10.1007/s40279-023-01978-y',
    pmid: '38165636',
    type: 'meta-analysis',
    verification: verified,
  }),
  // ramirez-campillo-2021 (PMID 33956587) : défini dans references/foot-ankle.ts, cité ici par son id.
  defineReference({
    id: 'storen-2008',
    authors: ['Støren O', 'Helgerud J', 'Støa EM', 'Hoff J'],
    year: 2008,
    title: 'Maximal strength training improves running economy in distance runners',
    journal: 'Med Sci Sports Exerc',
    doi: '10.1249/MSS.0b013e318168da2f',
    pmid: '18460997',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'saunders-2006',
    authors: ['Saunders PU', 'Telford RD', 'Pyne DB', 'Peltola EM', 'Cunningham RB', 'Gore CJ', 'Hawley JA'],
    year: 2006,
    title:
      'Short-term plyometric training improves running economy in highly trained middle and long distance runners',
    journal: 'J Strength Cond Res',
    doi: '10.1519/R-18235.1',
    pmid: '17149987',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'spurrs-2003',
    authors: ['Spurrs RW', 'Murphy AJ', 'Watsford ML'],
    year: 2003,
    title: 'The effect of plyometric training on distance running performance',
    journal: 'Eur J Appl Physiol',
    doi: '10.1007/s00421-002-0741-y',
    pmid: '12627298',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'paavolainen-1999',
    authors: ['Paavolainen L', 'Häkkinen K', 'Hämäläinen I', 'Nummela A', 'Rusko H'],
    year: 1999,
    title: 'Explosive-strength training improves 5-km running time by improving running economy and muscle power',
    journal: 'J Appl Physiol (1985)',
    doi: '10.1152/jappl.1999.86.5.1527',
    pmid: '10233114',
    type: 'cohort',
    verification: verified,
  }),

  // ---------------------------------------------------------------------------
  // Puissance et sauts
  // ---------------------------------------------------------------------------
  defineReference({
    id: 'markovic-2007',
    authors: ['Markovic G'],
    year: 2007,
    title: 'Does plyometric training improve vertical jump height? A meta-analytical review',
    journal: 'Br J Sports Med',
    doi: '10.1136/bjsm.2007.035113',
    pmid: '17347316',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'lake-2012',
    authors: ['Lake JP', 'Lauder MA'],
    year: 2012,
    title: 'Kettlebell swing training improves maximal and explosive strength',
    journal: 'J Strength Cond Res',
    doi: '10.1519/JSC.0b013e31825c2c9b',
    pmid: '22580981',
    type: 'rct',
    verification: verified,
  }),

  // ---------------------------------------------------------------------------
  // Vélo : force lourde et explosive
  // ---------------------------------------------------------------------------
  defineReference({
    id: 'yamamoto-2010',
    authors: ['Yamamoto LM', 'Klau JF', 'Casa DJ', 'Kraemer WJ', 'Armstrong LE', 'Maresh CM'],
    year: 2010,
    title:
      'The effects of resistance training on road cycling performance among highly trained cyclists: a systematic review',
    journal: 'J Strength Cond Res',
    doi: '10.1519/JSC.0b013e3181c86583',
    pmid: '20072042',
    type: 'systematic-review',
    verification: verified,
  }),
  defineReference({
    id: 'ronnestad-2010',
    authors: ['Rønnestad BR', 'Hansen EA', 'Raastad T'],
    year: 2010,
    title:
      'Effect of heavy strength training on thigh muscle cross-sectional area, performance determinants, and performance in well-trained cyclists',
    journal: 'Eur J Appl Physiol',
    doi: '10.1007/s00421-009-1307-z',
    pmid: '19960350',
    type: 'cohort',
    verification: verified,
  }),
  defineReference({
    id: 'vikmoen-2016',
    authors: ['Vikmoen O', 'Ellefsen S', 'Trøen Ø', 'Hollan I', 'Hanestadhaugen M', 'Raastad T', 'Rønnestad BR'],
    year: 2016,
    title:
      'Strength training improves cycling performance, fractional utilization of VO2max and cycling economy in female cyclists',
    journal: 'Scand J Med Sci Sports',
    doi: '10.1111/sms.12468',
    pmid: '25892654',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'sunde-2010',
    authors: ['Sunde A', 'Støren O', 'Bjerkaas M', 'Larsen MH', 'Hoff J', 'Helgerud J'],
    year: 2010,
    title: 'Maximal strength training improves cycling economy in competitive cyclists',
    journal: 'J Strength Cond Res',
    doi: '10.1519/JSC.0b013e3181aeb16a',
    pmid: '19855311',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'beattie-2017',
    authors: ['Beattie K', 'Carson BP', 'Lyons M', 'Kenny IC'],
    year: 2017,
    title: 'The Effect of Maximal- and Explosive-Strength Training on Performance Indicators in Cyclists',
    journal: 'Int J Sports Physiol Perform',
    doi: '10.1123/ijspp.2016-0015',
    pmid: '27618339',
    type: 'cohort',
    verification: verified,
  }),
  // ---------------------------------------------------------------------------
  // Haltérophilie, isométrie, sprint résisté, pliométrie (compléments)
  // ---------------------------------------------------------------------------
  defineReference({
    id: 'hackett-2016',
    authors: ['Hackett D', 'Davies T', 'Soomro N', 'Halaki M'],
    year: 2016,
    title:
      'Olympic weightlifting training improves vertical jump height in sportspeople: a systematic review with meta-analysis',
    journal: 'Br J Sports Med',
    doi: '10.1136/bjsports-2015-094951',
    pmid: '26626268',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'morris-2022',
    authors: ['Morris SJ', 'Oliver JL', 'Pedley JS', 'Haff GG', 'Lloyd RS'],
    year: 2022,
    title:
      'Comparison of Weightlifting, Traditional Resistance Training and Plyometrics on Strength, Power and Speed: A Systematic Review with Meta-Analysis',
    journal: 'Sports Med',
    doi: '10.1007/s40279-021-01627-2',
    pmid: '35025093',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'lum-2023',
    authors: ['Lum D', 'Barbosa TM', 'Aziz AR', 'Balasekaran G'],
    year: 2023,
    title: 'Effects of Isometric Strength and Plyometric Training on Running Performance: A Randomized Controlled Study',
    journal: 'Res Q Exerc Sport',
    doi: '10.1080/02701367.2021.1969330',
    pmid: '35323106',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'dougan-2025',
    authors: ['Dougan A', 'Latella C', 'Nagatani T', 'Lockie RG', "O'Brien EK", 'Haff GG'],
    year: 2025,
    title: 'The Effect of Resisted Sprint Training on Force-Velocity Profile Change: A Systematic Review and Meta-Analysis',
    journal: 'J Strength Cond Res',
    doi: '10.1519/JSC.0000000000005205',
    pmid: '40961280',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'vlachopoulos-2018',
    authors: ['Vlachopoulos D', 'Barker AR', 'Ubago-Guisado E', 'Williams CA', 'Gracia-Marco L'],
    year: 2018,
    title:
      'The effect of a high-impact jumping intervention on bone mass, bone stiffness and fitness parameters in adolescent athletes',
    journal: 'Arch Osteoporos',
    doi: '10.1007/s11657-018-0543-4',
    pmid: '30446875',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'paton-2005',
    authors: ['Paton CD', 'Hopkins WG'],
    year: 2005,
    title: 'Combining explosive and high-resistance training improves performance in competitive cyclists',
    journal: 'J Strength Cond Res',
    doi: '10.1519/R-16334.1',
    pmid: '16287351',
    type: 'rct',
    verification: verified,
  }),
  defineReference({
    id: 'zhang-2025',
    authors: ['Zhang Z', 'Qu W', 'Peng W', 'Sun J', 'Yue J', 'Guan L', 'Lu M', 'Li D'],
    year: 2025,
    title:
      'Effect of unilateral and bilateral plyometric training on jumping, sprinting, and change of direction abilities: a meta-analysis',
    journal: 'BMC Sports Sci Med Rehabil',
    doi: '10.1186/s13102-025-01113-6',
    pmid: '40281589',
    type: 'meta-analysis',
    verification: verified,
  }),
  defineReference({
    id: 'mccormick-2016',
    authors: ['McCormick BT', 'Hannon JC', 'Newton M', 'Shultz B', 'Detling N', 'Young WB'],
    year: 2016,
    title:
      'The Effects of Frontal- and Sagittal-Plane Plyometrics on Change-of-Direction Speed and Power in Adolescent Female Basketball Players',
    journal: 'Int J Sports Physiol Perform',
    doi: '10.1123/ijspp.2015-0058',
    pmid: '26023808',
    type: 'cohort',
    verification: verified,
  }),
  defineReference({
    id: 'drinkwater-2009',
    authors: ['Drinkwater EJ', 'Lane T', 'Cannon J'],
    year: 2009,
    title: 'Effect of an acute bout of plyometric exercise on neuromuscular fatigue and recovery in recreational athletes',
    journal: 'J Strength Cond Res',
    doi: '10.1519/JSC.0b013e31819b79aa',
    pmid: '19528848',
    type: 'case-series',
    verification: verified,
  }),
] satisfies ReturnType<typeof defineReference>[];
