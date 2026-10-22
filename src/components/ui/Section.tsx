import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

interface SectionProps {
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Seção padrão da página: título e uma linha de apoio, depois o conteúdo.
 * O espaçamento entre seções é 64px no celular e 112px no desktop.
 */
export function Section({ id, title, lead, children, className }: SectionProps) {
  const headingId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-16 md:py-28', className)}>
      <Container>
        <header className="mb-10 flex max-w-2xl flex-col gap-4 md:mb-14">
          <h2 id={headingId} className="text-headline font-semibold">
            {title}
          </h2>
          {lead && <p className="text-[1.125rem] leading-relaxed text-muted">{lead}</p>}
        </header>
        {children}
      </Container>
    </section>
  );
}
