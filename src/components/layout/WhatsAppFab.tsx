import { Icon } from '@/components/ui/Icon';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';
import { whatsappLink } from '@/lib/links';
import { cn } from '@/lib/cn';

const WATCHED = ['topo', 'contato'] as const;

/**
 * Botão redondo de WhatsApp, só no celular. Aparece depois do topo
 * e some sobre a seção de contato, para não cobrir o formulário.
 */
export function WhatsAppFab() {
  const visible = useSectionVisibility(WATCHED);
  const show = visible.topo === false && !visible.contato;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={cn(
        'fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-accent text-on-accent md:hidden',
        'transition-[opacity,translate] duration-200 ease-out-expo hover:bg-accent-hover',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <Icon name="contato" size={26} />
    </a>
  );
}
