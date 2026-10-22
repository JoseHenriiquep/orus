import { useRef } from 'react';
import { useEyeTracking } from '@/hooks/useEyeTracking';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface OrusEyeProps {
  /** A pupila acompanha o visitante. Desligada automaticamente com movimento reduzido. */
  track?: boolean;
  className?: string;
}

/** O símbolo da Orus em tamanho grande, com a pupila que acompanha o visitante. Um por página. */
export function OrusEye({ track = true, className }: OrusEyeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);
  const reducedMotion = useReducedMotion();
  useEyeTracking(svgRef, pupilRef, track && !reducedMotion);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Símbolo da Orus: um olho com a pupila dourada"
      className={cn('block', className)}
    >
      <circle cx={50} cy={50} r={42} fill="none" strokeWidth={16} className="stroke-ink" />
      <circle ref={pupilRef} cx={60} cy={40} r={13} className="fill-accent" />
    </svg>
  );
}
