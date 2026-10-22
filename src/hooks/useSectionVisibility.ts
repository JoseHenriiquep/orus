import { useEffect, useState } from 'react';

/**
 * Diz, para cada id de seção, se ela está visível na tela agora.
 * Usado pelo botão flutuante de WhatsApp (some no topo e no contato).
 */
export function useSectionVisibility(ids: readonly string[]): Record<string, boolean> {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const key = ids.join('|');

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = { ...prev };
          for (const entry of entries) next[entry.target.id] = entry.isIntersecting;
          return next;
        });
      },
      { threshold: 0.15 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return visible;
}
