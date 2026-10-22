import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  className?: string;
  children: ReactNode;
}

type AsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };
type AsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };
export type ButtonProps = AsButton | AsLink;

const base =
  'inline-flex items-center justify-center gap-2 rounded-control border font-semibold leading-tight whitespace-nowrap ' +
  'transition-colors duration-150 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link ' +
  'disabled:cursor-not-allowed disabled:opacity-55';

const variants: Record<Variant, string> = {
  primary: 'border-transparent bg-accent text-on-accent hover:bg-accent-hover',
  secondary: 'border-line bg-grafite text-ink hover:border-line-strong hover:bg-grafite-alto',
  ghost: 'border-transparent bg-transparent px-3 text-ink hover:bg-grafite',
};

const sizes: Record<Size, string> = {
  md: 'min-h-12 px-5 text-base',
  lg: 'min-h-14 px-7 text-[1.0625rem]',
};

/** Botão da marca. Com `href` vira link. Um `primary` por tela: o ouro é a única luz. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconRight, loading = false, className, children } = props;
  const classes = cn(base, variants[variant], variant !== 'ghost' && sizes[size], variant === 'ghost' && 'min-h-12', className);

  const content = (
    <>
      {loading ? (
        <span aria-hidden="true" className="size-4.5 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-[spin_2.4s_linear_infinite]" />
      ) : (
        icon && <Icon name={icon} size={20} />
      )}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={20} />}
    </>
  );

  if (props.href !== undefined) {
    const { variant: _v, size: _s, icon: _i, iconRight: _r, loading: _l, className: _c, children: _ch, ...anchorProps } = props;
    return (
      <a {...anchorProps} className={classes}>
        {content}
      </a>
    );
  }

  const { variant: _v, size: _s, icon: _i, iconRight: _r, loading: _l, className: _c, children: _ch, href: _h, ...buttonProps } = props;
  return (
    <button type="button" {...buttonProps} disabled={buttonProps.disabled || loading} aria-busy={loading || undefined} className={classes}>
      {content}
    </button>
  );
}
