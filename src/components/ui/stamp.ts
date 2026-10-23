/** Angle stable entre -8° et +5° tiré d'une graine (id d'exercice) : chaque tampon a son inclinaison, toujours la même. */
export function stampAngle(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  // Jamais tout droit : entre -8° et -2°, ou entre +2° et +5°.
  const x = ((h >>> 0) % 91) / 10; // 0 … 9
  return x < 6 ? -8 + x : 2 + (x - 6);
}
