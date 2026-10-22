/**
 * Rappels de séance. Limites honnêtes : sans serveur, une PWA ne peut notifier que lorsqu'elle est ouverte
 * (ou récemment en arrière-plan) ; sur iPhone, uniquement une fois installée sur l'écran d'accueil.
 * L'export .ics reste la solution fiable.
 */
import { useEffect } from 'react';
import type { Reminders, SessionLog } from '@/domain/user';
import { dayKey } from '@/features/history/stats';

export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function permission(): NotificationPermission | 'unsupported' {
  return notificationsSupported() ? Notification.permission : 'unsupported';
}

export async function requestPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.requestPermission();
}

/** Un rappel est dû si : activé, jour choisi, heure passée (depuis moins de 6 h), pas déjà envoyé, pas de séance faite aujourd'hui. */
export function reminderDue(r: Reminders | null | undefined, logs: readonly SessionLog[], now: Date): boolean {
  if (!r?.enabled || !r.days.includes(now.getDay())) return false;
  const today = dayKey(now);
  if (r.lastNotifiedOn === today) return false;
  if (logs.some((l) => l.finishedAt && dayKey(new Date(l.finishedAt)) === today)) return false;
  const [h, m] = r.time.split(':').map(Number) as [number, number];
  const at = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
  const diff = now.getTime() - at.getTime();
  return diff >= 0 && diff < 6 * 3600_000;
}

export async function showReminder(title: string, body: string): Promise<boolean> {
  if (permission() !== 'granted') return false;
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) await reg.showNotification(title, { body, icon: '/pwa-192.png', badge: '/pwa-192.png', tag: 'socle-reminder' });
    else new Notification(title, { body, icon: '/pwa-192.png', tag: 'socle-reminder' });
    return true;
  } catch {
    return false;
  }
}

/** Vérifie chaque minute, tant que l'app est ouverte, si un rappel doit être envoyé. */
export function useReminderScheduler(
  reminders: Reminders | null | undefined,
  logs: readonly SessionLog[] | undefined,
  send: () => Promise<boolean>,
  markSent: (day: string) => void,
) {
  useEffect(() => {
    if (!reminders?.enabled || !logs) return;
    const check = () => {
      const now = new Date();
      if (reminderDue(reminders, logs, now)) void send().then((ok) => ok && markSent(dayKey(now)));
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [reminders, logs, send, markSent]);
}
