import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/config/site';
import { emailLink, instagramLink, whatsappLink } from '@/lib/links';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="py-16 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <h2 id="contato-titulo" className="text-headline font-semibold">
            Conta pra gente o que você precisa.
          </h2>
          <p className="text-[1.125rem] leading-relaxed text-muted">
            A primeira conversa é sem compromisso. A resposta chega em até {site.contact.responseTime}.
          </p>
          <div>
            <Button href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="secondary" icon="contato">
              Falar no WhatsApp
            </Button>
          </div>
          <ul className="flex flex-col gap-2 pt-2">
            <li>
              <a href={emailLink} className="inline-flex min-h-11 items-center gap-3 text-ink no-underline hover:text-accent">
                <Icon name="email" size={20} className="text-muted" />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-3 text-ink no-underline hover:text-accent"
              >
                <Icon name="instagram" size={20} className="text-muted" />@{site.contact.instagram}
              </a>
            </li>
          </ul>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
