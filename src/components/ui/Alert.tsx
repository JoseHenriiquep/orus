import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

type Tone = 'success' | 'danger' | 'info';

const tones: Record<Tone, { icon: IconName; iconClass: string; border: string }> = {
  success: { icon: 'check', iconClass: 'text-success', border: 'border-success' },
  danger: { icon: 'alerta', iconClass: 'text-danger', border: 'border-danger' },
  info: { icon: 'info', iconClass: 'text-link', border: 'border-line' },
};

interface AlertProps {
  tone?: Tone;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Resultado de uma ação. Sempre ícone + texto, nunca só a cor. */
export function Alert({ tone = 'info', title, children, className }: AlertProps) {
  const t = tones[tone];
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex items-start gap-3 rounded-control border bg-grafite px-4.5 py-4 text-[0.9375rem] leading-normal', t.border, className)}
    >
      <Icon name={t.icon} size={22} className={t.iconClass} />
      <div className="flex flex-col gap-0.5">
        {title && <strong className="text-base font-semibold text-ink">{title}</strong>}
        {children && <div className="text-muted [&_a]:text-link [&_a]:underline">{children}</div>}
      </div>
    </div>
  );
}
