import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { services } from '@/content/home';
import { whatsappLink } from '@/lib/links';
import type { Service } from '@/types/content';

function FeaturedService({ service }: { service: Service }) {
  return (
    <article className="flex flex-col gap-5 self-start rounded-card border border-line bg-grafite p-6 md:p-10">
      <Icon name={service.icon} size={32} />
      <h3 className="text-[1.75rem] leading-tight font-semibold">{service.title}</h3>
      <p className="text-muted">{service.description}</p>
      <p className="text-ink">{service.audience}</p>
      <div className="pt-2">
        <Button
          href={whatsappLink(`Olá! Quero conversar sobre uma ${service.title.toLowerCase().replace(/s$/, '')} para o meu negócio.`)}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          iconRight="seta"
        >
          Começar por aqui
        </Button>
      </div>
    </article>
  );
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="flex gap-5 border-t border-line py-7 first:border-t-0 first:pt-0 md:first:pt-2">
      <Icon name={service.icon} size={28} className="mt-1 text-muted" />
      <div className="flex flex-col gap-2">
        <h3 className="text-title font-semibold">{service.title}</h3>
        <p className="text-muted">{service.description}</p>
        <p className="text-[0.9375rem] text-ink">{service.audience}</p>
      </div>
    </li>
  );
}

export function Services() {
  const featured = services.find((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <Section
      id="servicos"
      title="Do primeiro site ao sistema da empresa"
      lead="Quatro formas de tirar o seu negócio do papel ou organizar o que já existe. Se não souber qual é a sua, a conversa resolve."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        {featured && <FeaturedService service={featured} />}
        <ul className="flex flex-col">
          {others.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </ul>
      </div>
    </Section>
  );
}
