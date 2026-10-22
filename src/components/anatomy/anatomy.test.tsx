// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BODY_AREAS, MUSCLE_IDS, ZOOM_REGIONS } from '@/domain/ids';
import { content } from '@/content/index';
import { initI18n } from '@/i18n';
import { mirrorPath, pathBBox } from './drawings/geometry';
import { drawnMuscles, zooms } from './drawings/registry';
import { backAreas, frontAreas } from './drawings/areas';
import { buildFigure } from './figure';
import { MuscleMap } from './MuscleMap';
import { BodyMapPicker } from './BodyMapPicker';

initI18n('fr');

describe('géométrie', () => {
  it('reflète un chemin autour de l’axe', () => {
    expect(mirrorPath('M90 10 L80 20 C70 30 60 40 50 50 Z')).toBe('M110 10 L120 20 C130 30 140 40 150 50 Z');
  });
  it('calcule une boîte englobante', () => {
    expect(pathBBox('M10 20 L30 60 Z')).toEqual({ x: 10, y: 20, w: 20, h: 40 });
  });
  it('refuse les commandes relatives', () => {
    expect(() => mirrorPath('m10 10 l5 5')).toThrow();
  });
});

describe('dessins', () => {
  const drawn = drawnMuscles();

  it('chaque muscle du registre est dessiné sur au moins une vue', () => {
    const missing = MUSCLE_IDS.filter((m) => !drawn.front!.has(m) && !drawn.back!.has(m) && !drawn.sole!.has(m));
    expect(missing).toEqual([]);
  });

  it('chaque zoom montre au moins 3 muscles', () => {
    for (const z of ZOOM_REGIONS) expect(drawn[z]!.size, z).toBeGreaterThanOrEqual(3);
  });

  it('chaque zone de la carte du corps est dessinée sur la vue déclarée', () => {
    const byView = { front: new Set(frontAreas.map((a) => a.id)), back: new Set(backAreas.map((a) => a.id)) };
    for (const area of content.bodyAreas) expect(byView[area.view].has(area.id), area.id).toBe(true);
    expect(new Set([...byView.front, ...byView.back]).size).toBe(BODY_AREAS.length);
  });

  it('les couleurs viennent des données : principal, secondaire, neutre', () => {
    const fig = buildFigure('back', { primary: ['soleus'], secondary: ['glute-max'] });
    const roles = (id: string) => new Set(fig.shapes.filter((s) => s.muscle === id).map((s) => s.role));
    expect(roles('soleus')).toEqual(new Set(['primary']));
    expect(roles('glute-max')).toEqual(new Set(['secondary']));
    expect(roles('biceps-femoris')).toEqual(new Set(['neutral']));
  });

  it('les muscles profonds non concernés sont masqués, les profonds concernés affichés au-dessus', () => {
    const fig = buildFigure('back', { primary: ['tibialis-posterior'] });
    const ids = fig.shapes.filter((s) => s.kind === 'muscle').map((s) => s.muscle);
    expect(ids).not.toContain('piriformis');
    expect(ids.lastIndexOf('tibialis-posterior')).toBeGreaterThan(ids.lastIndexOf('soleus'));
  });

  it('le zoom recadre la vue', () => {
    expect(buildFigure('back', { box: zooms['leg-back'].box }).viewBox).toBe('58 196 84 236');
  });
});

describe('<MuscleMap>', () => {
  it('colore les muscles déclarés et affiche la légende', () => {
    const { container } = render(
      <MuscleMap name="Test" primary={['soleus']} secondary={['tibialis-posterior']} zoom="leg-back" />,
    );
    const soleus = container.querySelectorAll('[data-muscle="soleus"]');
    expect(soleus.length).toBeGreaterThan(0);
    soleus.forEach((g) => expect(g.getAttribute('data-role')).toBe('primary'));
    expect(screen.getByText('Muscles principaux')).toBeInTheDocument();
    expect(screen.getByText('Muscle profond (pointillés)')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(3);
  });
});

describe('<BodyMapPicker>', () => {
  it('sélectionne une zone à la souris et au clavier', () => {
    const toggled: string[] = [];
    render(<BodyMapPicker selected={['achilles']} onToggle={(a) => toggled.push(a)} />);
    const achilles = screen.getByRole('checkbox', { name: 'Tendon d’Achille' });
    expect(achilles).toHaveAttribute('aria-checked', 'true');
    const knee = screen.getByRole('checkbox', { name: 'Devant du genou' });
    fireEvent.click(knee);
    fireEvent.keyDown(knee, { key: 'Enter' });
    expect(toggled).toEqual(['knee-anterior', 'knee-anterior']);
  });
});
