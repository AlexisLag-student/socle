/**
 * Exercices « partagés » : identifiants réservés, que plusieurs zones peuvent citer dans leurs pathologies.
 * Chaque identifiant a une zone propriétaire, seule à l'écrire (fichier indiqué).
 * Pendant la rédaction du contenu (CONTENT_WIP=1), un exercice réservé mais pas encore écrit
 * produit un avertissement au lieu d'une erreur. Hors de ce mode, il doit exister.
 */
export const SHARED_EXERCISES: Record<string, { owner: string; file: string; hint: string }> = {
  // --- Pied / cheville (exercises/calf.ts, exercises/foot-ankle.ts) ---
  'calf-raise-straight-knee': { owner: 'foot-ankle', file: 'calf.ts', hint: 'Montée sur pointes jambe tendue' },
  'calf-raise-bent-knee': { owner: 'foot-ankle', file: 'calf.ts', hint: 'Montée sur pointes genou fléchi (soléaire)' },
  'calf-isometric-hold': { owner: 'foot-ankle', file: 'calf.ts', hint: 'Isométrie sur pointes' },
  'eccentric-heel-drop': { owner: 'foot-ankle', file: 'calf.ts', hint: 'Excentrique Alfredson' },
  'short-foot': { owner: 'foot-ankle', file: 'foot-ankle.ts', hint: 'Pied court / intrinsèques du pied' },
  'single-leg-balance': { owner: 'foot-ankle', file: 'foot-ankle.ts', hint: 'Équilibre unipodal (proprioception)' },
  'hop-stabilization': { owner: 'foot-ankle', file: 'foot-ankle.ts', hint: 'Saut unipodal et réception stabilisée' },
  'pogo-hops': { owner: 'foot-ankle', file: 'calf.ts', hint: 'Sauts de cheville (pogo), pliométrie basse' },
  // --- Genou (exercises/knee.ts) ---
  squat: { owner: 'knee', file: 'knee.ts', hint: 'Squat (PDC, gobelet, barre, Smith) — tagué performance force' },
  'split-squat': { owner: 'knee', file: 'knee.ts', hint: 'Fente statique / bulgare' },
  lunge: { owner: 'knee', file: 'knee.ts', hint: 'Fente avant/arrière/marchée' },
  'step-up': { owner: 'knee', file: 'knee.ts', hint: 'Montée sur marche/banc' },
  'step-down': { owner: 'knee', file: 'knee.ts', hint: 'Descente de marche contrôlée (latérale/avant)' },
  'single-leg-squat': { owner: 'knee', file: 'knee.ts', hint: 'Squat unipodal sur banc / pistol assisté' },
  'leg-press': { owner: 'knee', file: 'knee.ts', hint: 'Presse à cuisses (bilatérale / unilatérale)' },
  'leg-extension': { owner: 'knee', file: 'knee.ts', hint: 'Extension de genou (machine / élastique / lest)' },
  'wall-sit': { owner: 'knee', file: 'knee.ts', hint: 'Chaise contre le mur (isométrie)' },
  // --- Hanche (exercises/hip.ts) ---
  'glute-bridge': { owner: 'hip', file: 'hip.ts', hint: 'Pont fessier → unipodal → hip thrust chargé' },
  'side-lying-hip-abduction': { owner: 'hip', file: 'hip.ts', hint: 'Abduction de hanche couché sur le côté (variantes poulie/élastique)' },
  clamshell: { owner: 'hip', file: 'hip.ts', hint: 'Coquillage (rotateurs latéraux)' },
  'lateral-band-walk': { owner: 'hip', file: 'hip.ts', hint: 'Marche latérale avec élastique' },
  'hip-hike': { owner: 'hip', file: 'hip.ts', hint: 'Élévation du bassin sur une marche (moyen fessier)' },
  'hip-flexor-march': { owner: 'hip', file: 'hip.ts', hint: 'Montée de genou / fléchisseurs de hanche (élastique)' },
  // --- Cuisse : ischio-jambiers, adducteurs (exercises/hamstrings-adductors.ts) ---
  'romanian-deadlift': { owner: 'thigh', file: 'hamstrings-adductors.ts', hint: 'Soulevé de terre jambes tendues (bilatéral)' },
  'single-leg-deadlift': { owner: 'thigh', file: 'hamstrings-adductors.ts', hint: 'Soulevé de terre unipodal' },
  'nordic-hamstring': { owner: 'thigh', file: 'hamstrings-adductors.ts', hint: 'Nordic hamstring' },
  'copenhagen-adductor': { owner: 'thigh', file: 'hamstrings-adductors.ts', hint: 'Copenhagen adductor' },
  'adductor-squeeze': { owner: 'thigh', file: 'hamstrings-adductors.ts', hint: 'Serrage isométrique des adducteurs' },
  // --- Tronc (exercises/trunk.ts) ---
  'front-plank': { owner: 'trunk', file: 'trunk.ts', hint: 'Gainage ventral' },
  'side-plank': { owner: 'trunk', file: 'trunk.ts', hint: 'Gainage latéral' },
  'dead-bug': { owner: 'trunk', file: 'trunk.ts', hint: 'Dead bug' },
  'bird-dog': { owner: 'trunk', file: 'trunk.ts', hint: 'Bird dog' },
  'pallof-press': { owner: 'trunk', file: 'trunk.ts', hint: 'Pallof press (anti-rotation)' },
  'back-extension': { owner: 'trunk', file: 'trunk.ts', hint: 'Extension du dos (au sol, banc à lombaires, swiss ball)' },
  'suitcase-carry': { owner: 'trunk', file: 'trunk.ts', hint: 'Marche avec charge unilatérale' },
  // --- Vélo / haut du corps (exercises/upper-body.ts) ---
  'chin-tuck': { owner: 'cycling', file: 'upper-body.ts', hint: 'Rentré de menton (fléchisseurs profonds du cou)' },
  'prone-ytw': { owner: 'cycling', file: 'upper-body.ts', hint: 'Y-T-W allongé (trapèzes moyen et inférieur)' },
  'band-pull-apart': { owner: 'cycling', file: 'upper-body.ts', hint: 'Écarté d’élastique' },
  row: { owner: 'cycling', file: 'upper-body.ts', hint: 'Tirage horizontal (haltère, TRX, poulie)' },
  'scapular-push-up': { owner: 'cycling', file: 'upper-body.ts', hint: 'Pompe scapulaire (dentelé antérieur)' },
  'push-up': { owner: 'cycling', file: 'upper-body.ts', hint: 'Pompes' },
  // --- Performance (exercises/performance.ts) ---
  deadlift: { owner: 'performance', file: 'performance.ts', hint: 'Soulevé de terre (barre, trap bar, kettlebell)' },
  'box-jump': { owner: 'performance', file: 'performance.ts', hint: 'Saut sur box' },
  'countermovement-jump': { owner: 'performance', file: 'performance.ts', hint: 'Saut vertical avec contre-mouvement (chargé ou non)' },
  'drop-jump': { owner: 'performance', file: 'performance.ts', hint: 'Drop jump (réactivité)' },
  bounding: { owner: 'performance', file: 'performance.ts', hint: 'Bondissements' },
  'kettlebell-swing': { owner: 'performance', file: 'performance.ts', hint: 'Swing kettlebell' },
};
