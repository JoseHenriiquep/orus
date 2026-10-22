import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { site } from '@/config/site';
import { emailLink } from '@/lib/links';

const UPDATED_AT = '21 de outubro de 2026';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-title font-semibold">{title}</h2>
      <div className="flex flex-col gap-3 text-muted [&_a]:text-link [&_a]:underline [&_li]:ml-5 [&_li]:list-disc">{children}</div>
    </section>
  );
}

export default function Privacidade() {
  useEffect(() => {
    document.title = `Política de privacidade — ${site.name}`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="py-16 md:py-24">
      <article className="mx-auto flex max-w-[65ch] flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="text-headline font-semibold">Política de privacidade</h1>
          <p className="text-muted">Atualizada em {UPDATED_AT}.</p>
        </header>

        <Block title="Quem cuida dos seus dados">
          <p>
            A {site.name} é a empresa de desenvolvimento web de {site.founder.name}. Ele é o responsável pelos dados enviados por este
            site. Para qualquer assunto sobre seus dados, escreva para <a href={emailLink}>{site.contact.email}</a>.
          </p>
        </Block>

        <Block title="O que é coletado">
          <p>Só o que você escreve no formulário de contato:</p>
          <ul>
            <li>nome e e-mail;</li>
            <li>WhatsApp, se você informar;</li>
            <li>tipo de projeto e a mensagem.</li>
          </ul>
          <p>Este site não usa cookies de rastreamento nem ferramentas de análise de visitas.</p>
        </Block>

        <Block title="Para que os dados são usados">
          <p>
            Apenas para responder ao seu contato e conversar sobre o projeto que você descreveu. Os dados não são vendidos nem usados para
            propaganda.
          </p>
        </Block>

        <Block title="Com quem os dados são compartilhados">
          <p>
            As mensagens do formulário chegam por e-mail por meio do serviço Web3Forms, que apenas transmite o conteúdo. Se você clicar no
            botão de WhatsApp, a conversa segue as regras do próprio WhatsApp.
          </p>
        </Block>

        <Block title="Por quanto tempo">
          <p>As mensagens ficam guardadas enquanto durar a conversa sobre o projeto e, depois disso, pelo tempo exigido por lei.</p>
        </Block>

        <Block title="Seus direitos">
          <p>
            Pela LGPD (Lei 13.709/2018), você pode pedir a qualquer momento para ver, corrigir ou apagar seus dados, ou retirar o
            consentimento. Basta escrever para <a href={emailLink}>{site.contact.email}</a>.
          </p>
        </Block>

        <p>
          <Link to="/" className="text-link underline">
            Voltar para o início
          </Link>
        </p>
      </article>
    </Container>
  );
}
