import { Orbits } from '@/components/brand/Orbits';
import { OrusEye } from '@/components/brand/OrusEye';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';
import { whatsappLink } from '@/lib/links';

export function Hero() {
  return (
    <section id="topo" aria-labelledby="topo-titulo" className="relative overflow-hidden">
      <Container className="flex flex-col-reverse items-stretch gap-12 py-12 md:min-h-[min(44rem,calc(100svh-5rem))] md:flex-row md:items-center md:gap-16 md:py-20">
        <div className="relative z-10 flex flex-col gap-6 md:flex-[1_1_28rem]">
          <h1 id="topo-titulo" className="text-display font-semibold">
            {site.slogan}
          </h1>
          <p className="max-w-[34em] text-[1.1875rem] leading-relaxed text-muted">
            Landing pages, sites, SaaS e sistemas sob medida, feitos com clareza do primeiro esboço à entrega.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Button href={whatsappLink()} target="_blank" rel="noopener noreferrer" size="lg" icon="contato">
              Falar no WhatsApp
            </Button>
            <Button href="#processo" variant="secondary" size="lg">
              Ver como funciona
            </Button>
          </div>
          <p className="text-[0.9375rem] text-muted">Resposta em até {site.contact.responseTime}.</p>
        </div>

        <div className="relative mx-auto w-52 shrink-0 sm:w-60 md:mx-0 md:w-[min(22rem,34vw)]">
          <Orbits className="absolute top-1/2 left-1/2 size-[750%] max-w-none -translate-x-1/2 -translate-y-1/2" />
          <OrusEye className="relative w-full" />
        </div>
      </Container>
    </section>
  );
}
