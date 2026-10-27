/**
 * Composants d'interface de base.
 */
import {
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { EvidenceLevel } from '@/domain/ids';
import { Icon, type IconName } from './Icon';
import { stampAngle } from './stamp';
import css from './ui.module.css';

export { Icon, type IconName };
export { css as ui };

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

// --- Bouton -------------------------------------------------------------------

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'small' | 'normal' | 'large';
  block?: boolean;
  icon?: IconName;
  /** Bouton icône seule : `label` sert de nom accessible. */
  iconOnly?: boolean;
  label?: string;
  /** Sans ombre portée (l'ombre est réservée à une seule action par écran). */
  flat?: boolean;
}

export function Button({ variant = 'primary', size = 'normal', block, icon, iconOnly, label, flat, className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        css.btn,
        css[variant],
        size === 'large' && css.large,
        size === 'small' && css.small,
        block && css.block,
        iconOnly && css.iconOnly,
        flat && css.flat,
        className,
      )}
      aria-label={iconOnly ? label : undefined}
      title={iconOnly ? label : undefined}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === 'small' ? 16 : 20} />}
      {!iconOnly && children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'normal',
  block,
  icon,
  flat,
  children,
  className,
}: {
  to: string;
  variant?: Variant;
  size?: 'small' | 'normal' | 'large';
  block?: boolean;
  icon?: IconName;
  flat?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cx(css.btn, css[variant], size === 'large' && css.large, size === 'small' && css.small, block && css.block, flat && css.flat, className)}
    >
      {icon && <Icon name={icon} size={size === 'small' ? 16 : 20} />}
      {children}
    </Link>
  );
}

// --- Carte ---------------------------------------------------------------------

export function Card({
  children,
  className,
  as: As = 'div',
  featured,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
  /** Carte mise en avant (ombre pleine à l'encre) : une seule par écran. */
  featured?: boolean;
}) {
  return <As className={cx(css.card, featured && css.featured, className)}>{children}</As>;
}

export function CardLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={cx(css.card, css.cardLink, className)}>
      {children}
    </Link>
  );
}

// --- Badges ---------------------------------------------------------------------

/** Tampon de niveau de preuve : texte réel (lisible par les lecteurs d'écran), légèrement tourné. */
export function EvidenceBadge({ level, compact, seed, twoLines }: { level: EvidenceLevel; compact?: boolean; seed?: string; twoLines?: boolean }) {
  const { t } = useTranslation();
  const label = compact ? t(`evidence.short.${level}`) : t(`evidence.${level}`);
  return (
    <span
      className={cx(css.stamp, css[`ev-${level}`], twoLines && css.stampTwoLines)}
      style={{ '--stamp-rot': `${stampAngle(seed ?? level).toFixed(1)}deg` } as CSSProperties}
      title={t(`evidence.help.${level}`)}
    >
      <span className="visually-hidden">{t('evidence.label')} : </span>
      {label}
    </span>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx(css.badge, className)}>{children}</span>;
}

// --- Puces à bascule ----------------------------------------------------------------

export function ToggleChip({ pressed, onToggle, children, icon }: { pressed: boolean; onToggle: () => void; children: ReactNode; icon?: IconName }) {
  return (
    <button type="button" className={css.chip} aria-pressed={pressed} onClick={onToggle}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

/** Grande option sélectionnable (parcours de profil). */
export function Option({
  pressed,
  onToggle,
  title,
  hint,
  icon,
  role,
}: {
  pressed: boolean;
  onToggle: () => void;
  title: ReactNode;
  hint?: ReactNode;
  icon?: IconName;
  role?: 'radio' | 'checkbox';
}) {
  return (
    <button
      type="button"
      className={css.option}
      onClick={onToggle}
      role={role}
      aria-pressed={role ? undefined : pressed}
      aria-checked={role ? pressed : undefined}
    >
      {icon ? (
        <span className={css.optionIcon}>
          <Icon name={icon} size={22} />
        </span>
      ) : (
        <span />
      )}
      <span>
        <span className={css.optionTitle}>{title}</span>
        {hint && <span className={css.optionHint}>{hint}</span>}
      </span>
      <CheckBox checked={pressed} />
    </button>
  );
}

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className={css.segmented} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={String(o.value)} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// --- Champs -------------------------------------------------------------------------

/** `error` : message affiché sous le champ, avec l'id `${htmlFor}-error` (à relier par `aria-describedby`). */
export function Field({ label, hint, error, children, htmlFor }: { label: ReactNode; hint?: ReactNode; error?: ReactNode; children: ReactNode; htmlFor?: string }) {
  return (
    <div className={css.field}>
      <label className={css.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <span className={css.hint}>{hint}</span>}
      {error && (
        <span className={css.fieldError} id={htmlFor && `${htmlFor}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={cx(css.input, p.className)} />;
export const Select = (p: SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={cx(css.select, p.className)} />;
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...p} className={cx(css.textarea, p.className)} />;

// --- Bandeau --------------------------------------------------------------------------

export function Notice({ tone = 'info', children, icon }: { tone?: 'info' | 'warning' | 'danger' | 'neutral'; children: ReactNode; icon?: IconName }) {
  return (
    <div className={cx(css.notice, tone !== 'neutral' && css[`notice-${tone}`])} role={tone === 'danger' ? 'alert' : undefined}>
      <Icon name={icon ?? (tone === 'info' ? 'info' : 'alert')} size={20} />
      <div>{children}</div>
    </div>
  );
}

// --- Dialogue (élément natif <dialog>) ----------------------------------------------------

export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal?.();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className={css.dialog} onClose={onClose} onCancel={onClose} aria-label={title}>
      {open && (
        <>
          <div className={css.dialogHeader}>
            <h2>{title}</h2>
            <Button variant="ghost" iconOnly icon="x" label={t('common.close')} onClick={onClose} />
          </div>
          <div className={css.dialogBody}>{children}</div>
        </>
      )}
    </dialog>
  );
}

// --- En-tête de page ------------------------------------------------------------------

export function PageHeader({
  title,
  subtitle,
  back,
  actions,
  kicker,
  aside,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  back?: { to: string; label: string };
  actions?: ReactNode;
  /** Surtitre en petites capitales rouges. */
  kicker?: ReactNode;
  /** Élément posé à droite du titre (ex. tampon de preuve). */
  aside?: ReactNode;
}) {
  return (
    <header className={css.pageHeader}>
      {back && (
        <Link to={back.to} className={css.backLink}>
          <Icon name="left" size={18} />
          {back.label}
        </Link>
      )}
      {kicker && <span className="kicker">{kicker}</span>}
      <div className={css.titleRow}>
        <h1>{title}</h1>
        {aside}
      </div>
      {subtitle && <p>{subtitle}</p>}
      {actions && <div className={css.row}>{actions}</div>}
    </header>
  );
}

export function Section({ title, children, id, actions }: { title: ReactNode; children: ReactNode; id?: string; actions?: ReactNode }) {
  return (
    <section className={css.section} id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <div className={css.spread}>
        <h2 id={id ? `${id}-h` : undefined}>{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className={css.empty}>{children}</div>;
}

export function Toast({ children }: { children: ReactNode }) {
  return (
    <div className={css.toast} role="status" aria-live="polite">
      {children}
    </div>
  );
}

// --- Éléments « cahier » ----------------------------------------------------------------

/** Case à cocher dessinée : coche rouge une fois faite, pointillés pour « à venir ». */
export function CheckBox({ checked, pending, label }: { checked?: boolean; pending?: boolean; label?: string }) {
  return (
    <svg
      viewBox="0 0 22 22"
      className={cx(css.check, checked && css.checked, pending && css.pending)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <rect x="1.5" y="1.5" width="19" height="19" rx="2" />
      <path d="M5 11.5l4 4 9-11" />
    </svg>
  );
}

/** Annotation manuscrite (Caveat) : charges notées, ressentis, conseils. Jamais pour une information indispensable. */
export function HandNote({
  children,
  red,
  pencil,
  className,
  as: As = 'p',
}: {
  children: ReactNode;
  red?: boolean;
  pencil?: boolean;
  className?: string;
  as?: 'p' | 'span';
}) {
  return (
    <As className={cx(css.hand, red && css.handRed, className)}>
      {pencil && <Icon name="pencil" size={20} />}
      <span>{children}</span>
    </As>
  );
}

/** Bloc de dosage en colonnes (séries, tempo ou descente, fréquence). */
export function DosageBlock({ items }: { items: { label: ReactNode; value: ReactNode }[] }) {
  return (
    <dl className={css.dosage} style={{ '--cols': items.length } as CSSProperties}>
      {items.map((it, i) => (
        <div key={i}>
          <dt>{it.label}</dt>
          <dd className={typeof it.value === 'string' && it.value.length > 9 ? css.ddLong : undefined}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export interface WeekDay {
  letter: string;
  name: string;
  mark?: string;
  done?: boolean;
  today?: boolean;
}

/** Bande de la semaine : séances faites en cercles pleins, séance du jour en pointillés rouges. */
export function WeekStrip({ days, label }: { days: WeekDay[]; label: string }) {
  return (
    <ul className={css.week} aria-label={label}>
      {days.map((d, i) => (
        <li key={i} className={d.today ? css.dayToday : undefined}>
          <span aria-hidden>{d.letter}</span>
          <span className={cx(css.dot, d.done && css.dotDone, d.today && !d.done && css.dotToday)} aria-hidden>
            {d.mark ?? '·'}
          </span>
          <span className="visually-hidden">{d.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Appels de note (exposants rouges) renvoyant vers les notes de bas de page. */
export function FootnoteRefs({ notes }: { notes: { n: number; target: string }[] }) {
  if (!notes.length) return null;
  return (
    <sup className={css.fnRefs}>
      {notes.map((x, i) => (
        <span key={x.n}>
          {i > 0 && ','}
          <a href={`#${x.target}`} className={css.fnRef}>
            {x.n}
          </a>
        </span>
      ))}
    </sup>
  );
}

export function Footnotes({ children, label }: { children: ReactNode; label: string }) {
  return (
    <ol className={css.footnotes} aria-label={label}>
      {children}
    </ol>
  );
}
