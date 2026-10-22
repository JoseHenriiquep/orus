import { useEffect, useId, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { navLinks } from '@/content/home';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const menuId = useId();
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  // Fora da página inicial, as âncoras voltam para ela.
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-noite/95 transition-colors duration-200',
        scrolled || open ? 'border-line' : 'border-transparent',
      )}
    >
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <Link to="/" className="inline-flex py-2" aria-label="Orus — início" onClick={() => setOpen(false)}>
          <Logo height={26} label="Orus" />
        </Link>

        <nav
          id={menuId}
          aria-label="Principal"
          className={cn(
            'md:static md:flex md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0',
            open ? 'absolute inset-x-0 top-full flex flex-col gap-4 border-b border-line bg-grafite-alto px-6 pt-2 pb-6' : 'hidden',
          )}
        >
          <ul className="flex flex-col md:flex-row md:gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={anchor(link.href)}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3.5 text-lg text-ink no-underline transition-colors hover:text-ink md:border-0 md:py-2.5 md:text-base md:font-medium md:text-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={anchor('#contato')} variant="secondary" onClick={() => setOpen(false)} className="w-full md:w-auto">
            Falar com a Orus
          </Button>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-12 items-center justify-center rounded-control border border-line text-ink md:hidden"
        >
          <Icon name={open ? 'fechar' : 'menu'} />
        </button>
      </Container>
    </header>
  );
}
