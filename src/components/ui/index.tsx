/**
 * Composants d'interface de base.
 */
import {
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { EvidenceLevel } from '@/domain/ids';
import { Icon, type IconName } from './Icon';
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
}

export function Button({ variant = 'primary', size = 'normal', block, icon, iconOnly, label, className, children, ...rest }: ButtonProps) {
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
  children,
  className,
}: {
  to: string;
  variant?: Variant;
  size?: 'small' | 'normal' | 'large';
  block?: boolean;
  icon?: IconName;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cx(css.btn, css[variant], size === 'large' && css.large, size === 'small' && css.small, block && css.block, className)}
    >
      {icon && <Icon name={icon} size={size === 'small' ? 16 : 20} />}
      {children}
    </Link>
  );
}

// --- Carte ---------------------------------------------------------------------

export function Card({ children, className, as: As = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'article' | 'li' }) {
  return <As className={cx(css.card, className)}>{children}</As>;
}

export function CardLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={cx(css.card, css.cardLink, className)}>
      {children}
    </Link>
  );
}

// --- Badges ---------------------------------------------------------------------

const EV_DOTS: Record<EvidenceLevel, number> = { strong: 3, moderate: 2, low: 1, expert: 0 };

export function EvidenceBadge({ level, compact }: { level: EvidenceLevel; compact?: boolean }) {
  const { t } = useTranslation();
  return (
    <span className={cx(css.badge, css[`ev-${level}`])} title={t(`evidence.help.${level}`)}>
      <span className={css.evDots} aria-hidden>
        {[0, 1, 2].map((i) => (
          <i key={i} className={i < EV_DOTS[level] ? css.on : undefined} />
        ))}
      </span>
      {compact ? t(`evidence.${level}`).split(' ').pop() : t(`evidence.${level}`)}
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
      <span className={css.check} aria-hidden>
        <Icon name="check" size={14} />
      </span>
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

export function Field({ label, hint, children, htmlFor }: { label: ReactNode; hint?: ReactNode; children: ReactNode; htmlFor?: string }) {
  return (
    <div className={css.field}>
      <label className={css.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <span className={css.hint}>{hint}</span>}
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

export function PageHeader({ title, subtitle, back, actions }: { title: ReactNode; subtitle?: ReactNode; back?: { to: string; label: string }; actions?: ReactNode }) {
  return (
    <header className={css.pageHeader}>
      {back && (
        <Link to={back.to} className={css.backLink}>
          <Icon name="left" size={18} />
          {back.label}
        </Link>
      )}
      <div className={css.spread}>
        <h1>{title}</h1>
        {actions}
      </div>
      {subtitle && <p>{subtitle}</p>}
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
