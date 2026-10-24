/**
 * Données propres à l'utilisateur, stockées sur l'appareil (IndexedDB).
 * Les schémas Zod servent à valider les imports (sauvegarde JSON, liens de partage).
 */
import { z } from 'zod';
import { FEEDBACK } from './ids';
import {
  DosageSchema,
  EquipmentIdSchema,
  ObjectiveSchema,
  PerfGoalSchema,
  PhaseSchema,
  SportSchema,
} from './schema';

export const FeedbackSchema = z.enum(FEEDBACK);

/** Séances par semaine proposées (1 à 5). */
export const MAX_SESSIONS_PER_WEEK = 5;
/** Durées de séance proposées, en minutes. */
export const DURATIONS = [15, 30, 45, 60] as const;
export type SessionMinutes = (typeof DURATIONS)[number];
export const SessionMinutesSchema = z.union([z.literal(15), z.literal(30), z.literal(45), z.literal(60)]);

export const ProfileSchema = z.object({
  id: z.literal('me'),
  sports: z.array(SportSchema).min(1),
  objectives: z.array(ObjectiveSchema).min(1),
  perfGoals: z.array(PerfGoalSchema),
  pathologies: z.array(z.object({ id: z.string(), phase: PhaseSchema })),
  equipment: z.array(EquipmentIdSchema),
  sessionsPerWeek: z.number().int().min(1).max(MAX_SESSIONS_PER_WEEK),
  minutes: SessionMinutesSchema,
  updatedAt: z.number(),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const ItemReasonSchema = z.object({
  kind: z.enum(['pathology', 'objective', 'prevention', 'manual']),
  /** id de pathologie, objectif, sport… selon `kind`. */
  ref: z.string(),
});
export type ItemReason = z.infer<typeof ItemReasonSchema>;

export const ProgramItemSchema = z.object({
  exerciseId: z.string(),
  variantId: z.string(),
  level: z.number().int().min(1).max(5),
  dosage: DosageSchema,
  note: z.string().max(1000).optional(),
  /** Plafond de niveau imposé par la phase de la pathologie (la progression ne le dépasse pas). */
  maxLevel: z.number().int().min(1).max(5).optional(),
  reason: ItemReasonSchema,
});
export type ProgramItem = z.infer<typeof ProgramItemSchema>;

export const SESSION_KEYS = ['A', 'B', 'C', 'D', 'E'] as const;
export const ProgramSessionSchema = z.object({
  key: z.enum(SESSION_KEYS),
  title: z.string().max(80).optional(),
  items: z.array(ProgramItemSchema),
});
export type ProgramSession = z.infer<typeof ProgramSessionSchema>;

export const ProgramSchema = z.object({
  id: z.string(),
  origin: z.enum(['auto', 'pro-draft', 'imported', 'custom']),
  /** Programme suivi actuellement par l'utilisateur (un seul à la fois). */
  active: z.boolean(),
  title: z.string().max(120),
  author: z.string().max(120).optional(),
  notes: z.string().max(4000).optional(),
  sessions: z.array(ProgramSessionSchema).min(1),
  sessionsPerWeek: z.number().int().min(1).max(MAX_SESSIONS_PER_WEEK).optional(),
  /** Durée visée d'une séance (mode praticien), en minutes. */
  minutes: SessionMinutesSchema.optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  archivedAt: z.number().optional(),
  engineVersion: z.number().int().optional(),
  contentVersion: z.string().optional(),
});
export type Program = z.infer<typeof ProgramSchema>;

export const SetLogSchema = z.object({
  done: z.boolean(),
  reps: z.number().int().min(0).optional(),
  sec: z.number().int().min(0).optional(),
  loadKg: z.number().min(0).max(1000).optional(),
});
export type SetLog = z.infer<typeof SetLogSchema>;

export const SessionEntrySchema = z.object({
  exerciseId: z.string(),
  variantId: z.string(),
  level: z.number().int().min(1).max(5),
  sets: z.array(SetLogSchema),
  feedback: FeedbackSchema.optional(),
  skipped: z.boolean().optional(),
});
export type SessionEntry = z.infer<typeof SessionEntrySchema>;

export const SessionLogSchema = z.object({
  id: z.string(),
  programId: z.string(),
  sessionKey: z.enum(SESSION_KEYS),
  startedAt: z.number(),
  finishedAt: z.number().optional(),
  entries: z.array(SessionEntrySchema),
});
export type SessionLog = z.infer<typeof SessionLogSchema>;

export const SuggestionSchema = z.object({
  kind: z.enum(['level-up', 'load-up', 'reps-up', 'level-down', 'load-down', 'volume-down']),
  fromLevel: z.number().int(),
  toLevel: z.number().int(),
  /** Variation de charge proposée en pourcentage (ex. +5 ou -10). */
  loadChangePct: z.number().optional(),
  createdAt: z.number(),
});
export type Suggestion = z.infer<typeof SuggestionSchema>;

/** État de progression d'un exercice, indépendant du programme (survit aux régénérations). */
export const ExerciseStateSchema = z.object({
  exerciseId: z.string(),
  level: z.number().int().min(1).max(5),
  variantId: z.string().optional(),
  loadKg: z.number().min(0).optional(),
  /** Retours successifs, du plus ancien au plus récent (on garde les derniers). */
  feedback: z.array(FeedbackSchema),
  pending: SuggestionSchema.optional(),
  updatedAt: z.number(),
});
export type ExerciseState = z.infer<typeof ExerciseStateSchema>;

export const RemindersSchema = z.object({
  enabled: z.boolean(),
  /** 0 = dimanche … 6 = samedi (convention Date#getDay). */
  days: z.array(z.number().int().min(0).max(6)),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  lastNotifiedOn: z.string().optional(),
});
export type Reminders = z.infer<typeof RemindersSchema>;

/** Sauvegarde complète (export / import JSON depuis les Réglages). */
export const BackupSchema = z.object({
  app: z.literal('socle'),
  version: z.literal(1),
  exportedAt: z.number(),
  profile: ProfileSchema.nullable(),
  programs: z.array(ProgramSchema),
  logs: z.array(SessionLogSchema),
  exerciseStates: z.array(ExerciseStateSchema),
  reminders: RemindersSchema.nullable(),
});
export type Backup = z.infer<typeof BackupSchema>;
