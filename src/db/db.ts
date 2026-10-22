/**
 * Base locale IndexedDB (Dexie). Toutes les données personnelles restent sur l'appareil.
 * Toute évolution du schéma passe par une nouvelle `version()` (jamais modifier une version publiée).
 */
import Dexie, { type EntityTable } from 'dexie';
import type {
  ExerciseState,
  Profile,
  Program,
  Reminders,
  SessionLog,
} from '@/domain/user';

export interface KeyValue<T = unknown> {
  key: string;
  value: T;
}

export class SocleDB extends Dexie {
  profile!: EntityTable<Profile, 'id'>;
  programs!: EntityTable<Program, 'id'>;
  logs!: EntityTable<SessionLog, 'id'>;
  exerciseStates!: EntityTable<ExerciseState, 'exerciseId'>;
  kv!: EntityTable<KeyValue, 'key'>;

  constructor(name = 'socle') {
    super(name);
    this.version(1).stores({
      profile: 'id',
      programs: 'id, origin, active, createdAt',
      logs: 'id, programId, startedAt, finishedAt',
      exerciseStates: 'exerciseId',
      kv: 'key',
    });
  }
}

export const db = new SocleDB();

export async function getReminders(d: SocleDB = db): Promise<Reminders | null> {
  const row = await d.kv.get('reminders');
  return (row?.value as Reminders | undefined) ?? null;
}

export async function setReminders(value: Reminders, d: SocleDB = db): Promise<void> {
  await d.kv.put({ key: 'reminders', value });
}
