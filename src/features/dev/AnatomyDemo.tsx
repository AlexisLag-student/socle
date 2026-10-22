import { useState } from 'react';
import { MUSCLE_IDS, ZOOM_REGIONS, type BodyAreaId, type MuscleId } from '@/domain/ids';
import { MuscleMap } from '@/components/anatomy/MuscleMap';
import { BodyMapPicker } from '@/components/anatomy/BodyMapPicker';
import { MuscleFigure } from '@/components/anatomy/MuscleFigure';
import { zooms } from '@/components/anatomy/drawings/registry';
import { exerciseById } from '@/content/index';

/** Page de démonstration des schémas (outil de développement, route /dev/anatomy). */
export default function AnatomyDemo() {
  const [muscle, setMuscle] = useState<MuscleId>('soleus');
  const [areas, setAreas] = useState<BodyAreaId[]>([]);
  const ex = exerciseById.get('calf-raise-bent-knee')!;
  return (
    <main style={{ padding: 16, maxWidth: 900, margin: '0 auto' }}>
      <h1>Schémas musculaires</h1>
      <h2>Exercice : {ex.name.fr}</h2>
      <MuscleMap name={ex.name.fr} primary={ex.muscles.primary} secondary={ex.muscles.secondary} zoom={ex.zoom} />
      <h2>Carte du corps</h2>
      <BodyMapPicker
        selected={areas}
        onToggle={(a) => setAreas((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]))}
      />
      <p>Sélection : {areas.join(', ') || '—'}</p>
      <h2>Inspecteur</h2>
      <select value={muscle} onChange={(e) => setMuscle(e.target.value as MuscleId)}>
        {MUSCLE_IDS.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {(['front', 'back', 'sole'] as const).map((d) => (
          <div key={d} style={{ width: 160 }}>
            <MuscleFigure drawing={d} primary={[muscle]} title={d} />
          </div>
        ))}
        {ZOOM_REGIONS.map((z) => (
          <div key={z} style={{ width: 120 }}>
            <MuscleFigure drawing={zooms[z].drawing} box={zooms[z].box} primary={[muscle]} title={z} />
            <small>{z}</small>
          </div>
        ))}
      </div>
    </main>
  );
}
