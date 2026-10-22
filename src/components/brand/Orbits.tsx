import { cn } from '@/lib/cn';

interface OrbitsProps {
  /** Quantidade de anéis */
  rings?: number;
  /** Raio do anel interno, em % do lado do quadro */
  inner?: number;
  /** Distância entre anéis, em % do lado do quadro */
  gap?: number;
  className?: string;
}

/**
 * Órbitas de fundo: anéis concêntricos quase da cor do fundo, com um único ponto dourado
 * em órbita lenta (uma volta a cada 160s; parado com movimento reduzido).
 * Ocupa um quadro quadrado centrado no elemento pai; o pai decide o tamanho e o recorte.
 */
export function Orbits({ rings = 7, inner = 9, gap = 7, className }: OrbitsProps) {
  const radii = Array.from({ length: rings }, (_, i) => inner + i * gap);
  const dotOrbit = inner + gap;

  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn('pointer-events-none block', className)}>
      {radii.map((r) => (
        <circle key={r} cx={50} cy={50} r={r} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={2} className="stroke-orbit-line" />
      ))}
      <circle cx={50} cy={50} r={inner} fill="none" vectorEffect="non-scaling-stroke" strokeWidth={14} className="stroke-orbit-core" />
      <g className="origin-center motion-safe:animate-orbit [transform-box:view-box]">
        <circle cx={50 - dotOrbit * 0.8} cy={50 - dotOrbit * 0.6} r={0.35} className="fill-accent" />
      </g>
    </svg>
  );
}
