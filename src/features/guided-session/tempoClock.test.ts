import { describe, expect, it } from 'vitest';
import { TempoClock, tempoPosition } from './tempoClock';

describe('horloge du tempo', () => {
  it('démarre, se met en pause, reprend sans compter la pause', () => {
    let now = 1000;
    const c = new TempoClock(() => now);
    expect(c.elapsed()).toBe(0);
    c.restart();
    now += 2500;
    expect(c.elapsed()).toBeCloseTo(2.5);
    c.pause();
    now += 10_000;
    expect(c.elapsed()).toBeCloseTo(2.5);
    expect(c.running).toBe(false);
    c.resume();
    now += 500;
    expect(c.elapsed()).toBeCloseTo(3);
    c.stop();
    expect(c.elapsed()).toBe(0);
  });

  it('prévient les abonnés quand l’état change', () => {
    const c = new TempoClock(() => 0);
    let calls = 0;
    const off = c.subscribe(() => calls++);
    c.restart();
    c.pause();
    c.toggle();
    off();
    c.stop();
    expect(calls).toBe(3);
  });

  it('position dans le cycle : répétition, phase et secondes restantes', () => {
    const phases = [{ sec: 3 }, { sec: 1 }];
    expect(tempoPosition(phases, 0)).toEqual({ rep: 1, index: 0, left: 3 });
    expect(tempoPosition(phases, 3.5)).toEqual({ rep: 1, index: 1, left: 0.5 });
    expect(tempoPosition(phases, 4.25)).toEqual({ rep: 2, index: 0, left: 2.75 });
  });
});
