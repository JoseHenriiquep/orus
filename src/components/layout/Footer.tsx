import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Orbits } from '@/components/brand/Orbits';
import { Container } from '@/components/ui/Container';
import { Icon, type IconName } from '@/components/ui/Icon';
import { site } from '@/config/site';
import { projects } from '@/content/home';
import { emailLink, instagramLink, whatsappLink } from '@/lib/links';
import type { NavLink } from '@/types/content';

interface ContactLink {
  icon: IconName;
  label: string;
  href: string;
  external?: boolean;
}

const footerNav: NavLink[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como funciona', href: '#processo' },
  ...(projects.length > 0 ? [{ label: 'Projetos', href: '#projetos' } as const] : []),
  { label: 'Quem faz', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

const contactLinks: ContactLink[] = [
  { icon: 'contato', label: `WhatsApp ${site.contact.whatsappDisplay}`, href: whatsappLink(), external: true },
  { icon: 'email', label: site.contact.email, href: emailLink },
  { icon: 'instagram', label: `@${site.contact.instagram}`, href: instagramLink, external: true },
];

const linkClass = 'inline-flex min-h-11 items-center gap-3 text-ink no-underline transition-colors hover:text-accent';

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="mb-3 text-[0.9375rem] font-semibold text-muted">{children}</h2>;
}

export function Footer() {
  const { pathname } = useLocation();
  const anchor = (hash: string) => (pathname === '/' ? hash : `/${hash}`);
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* As órbitas do topo fecham a página, saindo do canto inferior direito */}
      <Orbits rings={6} inner={10} gap={8} className="absolute -right-[14rem] -bottom-[14rem] size-[28rem] md:-right-[22rem] md:-bottom-[22rem] md:size-[44rem]" />

      <Container className="relative grid gap-12 pt-14 pb-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10 md:pt-20 md:pb-16">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo height={30} />
          <p className="text-title font-semibold">{site.slogan}</p>
          <p className="text-muted">Landing pages, sites institucionais, SaaS e sistemas sob medida.</p>
        </div>

        <nav aria-label="Rodapé">
          <ColumnTitle>Navegação</ColumnTitle>
          <ul className="flex flex-col">
            {footerNav.map((link) => (
              <li key={link.href}>
                <a href={anchor(link.href)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnTitle>Contato</ColumnTitle>
          <ul className="flex flex-col">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={linkClass}>
                  <Icon name={link.icon} size={20} className="text-muted" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="relative flex flex-col gap-4 border-t border-line py-6 text-[0.9375rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
          <span>
            © {year} {site.name}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <Link to="/privacidade" className="text-muted underline hover:text-ink">
            Política de privacidade
          </Link>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>Site feito pela própria Orus</span>
        </p>
        <button
          type="button"
          onClick={backToTop}
          className="inline-flex min-h-11 items-center gap-2 self-start text-ink transition-colors hover:text-accent sm:self-auto"
        >
          <Icon name="seta-cima" size={18} />
          Voltar ao topo
        </button>
      </Container>
    </footer>
  );
}
