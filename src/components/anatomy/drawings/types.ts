import type { BodyAreaId, MuscleId } from '@/domain/ids';

/** Une forme (chemin SVG). Par défaut, elle est dessinée côté gauche de l'image puis reflétée. */
export interface Shape {
  d: string;
  /** false : forme centrale, non reflétée. */
  mirror?: boolean;
}

export interface MuscleShape {
  id: MuscleId;
  shapes: Shape[];
}

export interface AreaShape {
  id: BodyAreaId;
  shapes: Shape[];
}

export interface Drawing {
  id: 'front' | 'back' | 'sole';
  /** [x, y, largeur, hauteur] */
  viewBox: [number, number, number, number];
  /** Axe de symétrie vertical. */
  axis: number;
  /** Silhouette (peau), sous les muscles. */
  base: Shape[];
  /** Repères non musculaires (rotule, malléoles…), dessinés en trait fin. */
  details: Shape[];
  /** Muscles superficiels puis profonds (l'ordre d'affichage est géré par le composant). */
  muscles: MuscleShape[];
}
