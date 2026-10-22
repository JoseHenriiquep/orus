import { cn } from '@/lib/cn';

const WORDMARK =
  'M130 100V50A42 42 0 0 1 172 8H182M212 0V50A42 42 0 0 0 296 50M296 0V100M372.2 17A21 21 0 1 0 355 50H365A21 21 0 1 1 347.8 83';

interface LogoProps {
  /** 'completo' = símbolo + nome; 'simbolo' = só o olho */
  variant?: 'completo' | 'simbolo';
  /** Altura em px */
  height?: number;
  label?: string;
  className?: string;
}

/** Logotipo vetorial da Orus. Nunca redigite o nome com uma fonte. */
export function Logo({ variant = 'completo', height = 32, label = 'Orus', className }: LogoProps) {
  const isSymbol = variant === 'simbolo';
  return (
    <svg
      viewBox={isSymbol ? '0 0 100 100' : '0 0 394 100'}
      height={height}
      width={isSymbol ? height : Math.round(height * 3.94)}
      role="img"
      aria-label={label}
      className={cn('block shrink-0', className)}
    >
      <circle cx={50} cy={50} r={42} fill="none" strokeWidth={16} className="stroke-ink" />
      <circle cx={60} cy={40} r={13} className="fill-accent" />
      {!isSymbol && <path d={WORDMARK} fill="none" strokeWidth={16} className="stroke-ink" />}
    </svg>
  );
}
