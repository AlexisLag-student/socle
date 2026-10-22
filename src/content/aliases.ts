/**
 * Anciens identifiants → identifiants actuels.
 * Un id d'exercice ou de pathologie publié ne doit jamais disparaître : s'il faut le renommer,
 * ajoutez ici l'ancien id pour que les liens de partage et l'historique restent valides.
 */
export const exerciseAliases: Record<string, string> = {};
export const pathologyAliases: Record<string, string> = {};

export function resolveExerciseId(id: string): string {
  let current = id;
  for (let i = 0; i < 10 && exerciseAliases[current]; i++) current = exerciseAliases[current]!;
  return current;
}

export function resolvePathologyId(id: string): string {
  return pathologyAliases[id] ?? id;
}
