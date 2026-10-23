import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { projects } from '@/content/home';
import type { Project } from '@/types/content';

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid overflow-hidden rounded-card border border-line bg-grafite md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      {project.image && (
        <img
          src={project.image}
          alt={project.imageAlt ?? ''}
          width={1280}
          height={800}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] h-full w-full border-b border-line object-cover object-top md:border-r md:border-b-0"
        />
      )}
      <div className="flex flex-col gap-3 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-[0.9375rem] text-muted">{project.category}</p>
          {project.inDevelopment && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[0.8125rem] font-medium text-ink">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-link" />
              Em desenvolvimento
            </span>
          )}
        </div>
        <h3 className="text-[1.75rem] leading-tight font-semibold">{project.title}</h3>
        <p className="text-muted">{project.summary}</p>
        {project.inDevelopment && (
          <p className="text-[0.9375rem] text-muted">O site já está no ar e ainda recebe ajustes e conteúdos.</p>
        )}
        {project.href && (
          <div className="mt-auto pt-4">
            <Button href={project.href} target="_blank" rel="noopener noreferrer" variant="secondary" iconRight="seta">
              {project.inDevelopment ? 'Ver versão atual' : 'Ver o site no ar'}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

/** Só aparece quando houver projetos reais em `content/home.ts`. */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section id="projetos" title="Projetos" lead="Trabalhos feitos pela Orus, já no ar.">
      <ul className="flex flex-col gap-8">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
