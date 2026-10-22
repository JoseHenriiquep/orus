import { Section } from '@/components/ui/Section';
import { differentials } from '@/content/home';

export function Differentials() {
  return (
    <div className="border-y border-line bg-grafite">
      <Section id="por-que" title="Por que escolher a Orus?">
        <ul className="grid gap-10 md:grid-cols-3 md:gap-12">
          {differentials.map((item) => (
            <li key={item.title} className="flex flex-col gap-3">
              <h3 className="text-[1.5rem] leading-tight font-semibold">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
