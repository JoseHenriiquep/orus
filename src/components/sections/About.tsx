import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';

export function About() {
  const { founder } = site;
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="py-16 md:py-28">
      <Container className="grid items-center gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16">
        <figure className="m-0">
          {founder.photo ? (
            <img
              src={founder.photo}
              alt={`Foto de ${founder.name}`}
              width={240}
              height={240}
              loading="lazy"
              className="size-40 rounded-card border border-line object-cover md:size-60"
            />
          ) : (
            <div className="flex size-40 items-center justify-center rounded-card border border-line bg-grafite md:size-60">
              <Logo variant="simbolo" height={88} label="Orus" />
            </div>
          )}
        </figure>

        <div className="flex max-w-2xl flex-col gap-4">
          <h2 id="sobre-titulo" className="text-headline font-semibold">
            Quem faz?
          </h2>
          <p className="text-title font-semibold">{founder.name}</p>
          <p className="text-muted">{founder.role}</p>
          <p className="text-ink">{founder.bio}</p>
        </div>
      </Container>
    </section>
  );
}
