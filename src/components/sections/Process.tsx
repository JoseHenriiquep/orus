import { Section } from '@/components/ui/Section';
import { processSteps } from '@/content/home';

export function Process() {
  const total = String(processSteps.length).padStart(2, '0');
  return (
    <Section
      id="processo"
      title="Como funciona?"
      lead="Quatro etapas, sempre na mesma ordem. Você sabe em que ponto o projeto está do começo ao fim."
    >
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3 border-t border-line pt-6">
            <span className="font-mono text-label font-medium tracking-[0.04em] text-muted">
              {String(index + 1).padStart(2, '0')} / {total}
            </span>
            <h3 className="text-title font-semibold">{step.title}</h3>
            <p className="text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
