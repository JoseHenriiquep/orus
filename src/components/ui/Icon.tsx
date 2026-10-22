import type { SVGProps } from 'react';

const ICONS = {
  landing: ['M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M3 8h18', 'M7 12h10', 'M9 16h6'],
  site: ['M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M3 8h18', 'M10 8v12', 'M10 14h11'],
  saas: ['M12 3l9 4.5-9 4.5-9-4.5z', 'M3 12l9 4.5 9-4.5', 'M3 16.5l9 4.5 9-4.5'],
  sistemas: [
    'M8.5 6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
    'M20.5 6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
    'M14.5 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
    'M8.5 6h7',
    'M7.2 8.2l3.6 7.6',
    'M16.8 8.2l-3.6 7.6',
  ],
  processo: ['M7 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z', 'M21 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z', 'M7 12h3', 'M14 12h3'],
  contato: ['M5 5h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z', 'M8 10h8', 'M8 13h5'],
  email: ['M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z', 'M3.5 7l8.5 6 8.5-6'],
  instagram: ['M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z', 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z', 'M17.5 6.5v.01'],
  seta: ['M5 12h14', 'M13 6l6 6-6 6'],
  'seta-cima': ['M12 19V5', 'M6 11l6-6 6 6'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  alerta: ['M12 3.5l9.5 16.5h-19z', 'M12 10v4.5', 'M12 17.5v.01'],
  info: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', 'M12 11v5.5', 'M12 7.5v.01'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  fechar: ['M6 6l12 12', 'M18 6L6 18'],
  chevron: ['M6 9l6 6 6-6'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  /** Com label o ícone é anunciado; sem label ele é decorativo. */
  label?: string;
}

export function Icon({ name, size = 24, label, className, ...rest }: IconProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      className={className ? `shrink-0 ${className}` : 'shrink-0'}
      {...a11y}
      {...rest}
    >
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
      {name === 'processo' && <circle cx={12} cy={12} r={2} className="fill-accent stroke-accent" />}
    </svg>
  );
}
