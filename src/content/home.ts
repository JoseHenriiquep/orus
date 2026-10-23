import type { Differential, NavLink, ProcessStep, Project, Service } from '@/types/content';

export const services: Service[] = [
  {
    id: 'landing-pages',
    icon: 'landing',
    title: 'Landing pages',
    description: 'Uma página feita para transformar visita em conversa: rápida, clara e com o botão certo no lugar certo.',
    audience: 'Para autônomos, lançamentos e campanhas. O jeito mais rápido de começar.',
    featured: true,
  },
  {
    id: 'sites',
    icon: 'site',
    title: 'Sites institucionais',
    description: 'A presença da sua empresa na internet, fácil de encontrar no Google e fácil de atualizar.',
    audience: 'Para pequenas e médias empresas.',
  },
  {
    id: 'saas',
    icon: 'saas',
    title: 'SaaS',
    description: 'Sua ideia de software virando produto no ar, com uma base sólida para crescer.',
    audience: 'Para startups.',
  },
  {
    id: 'sistemas',
    icon: 'sistemas',
    title: 'Sistemas sob medida',
    description: 'Pedidos, clientes e equipe num só lugar, do jeito que o seu negócio funciona.',
    audience: 'Para empresas e agências.',
  },
];

export const processSteps: ProcessStep[] = [
  { title: 'Entender', description: 'Uma conversa para entender o seu negócio, o problema e o que é sucesso para você.' },
  { title: 'Desenhar', description: 'Você vê como vai ficar antes de qualquer código: telas, textos e escopo combinados.' },
  { title: 'Construir', description: 'Desenvolvimento com entregas que você acompanha, dentro do prazo combinado.' },
  { title: 'Evoluir', description: 'Com o projeto no ar, ajustes e melhorias para ele continuar funcionando para você.' },
];

export const differentials: Differential[] = [
  { title: 'Comunicação clara', description: 'Sem jargão. Você entende o que está sendo feito, por que e quanto custa.' },
  { title: 'O código é seu', description: 'Você recebe tudo o que foi feito e não fica preso a ninguém.' },
  { title: 'Prazo combinado', description: 'O prazo é definido antes de começar e acompanhado em cada etapa.' },
];

/** Com a lista vazia, a seção e o link do menu não aparecem. */
export const projects: Project[] = [
  {
    id: 'cfc-palmares',
    title: 'CFC Palmares',
    category: 'Landing page',
    summary:
      'Site da Auto Escola CFC Palmares. Explica a primeira habilitação em quatro passos, apresenta os outros serviços e leva o aluno direto para o WhatsApp.',
    image: '/projetos/cfc-palmares.jpg',
    imageAlt: 'Página inicial do site do CFC Palmares, com o título "Sua CNH começa aqui"',
    href: 'https://cfc-palmares-uoep.vercel.app',
    inDevelopment: true,
  },
  {
    id: 'cs-transportes',
    title: 'CS Transportes',
    category: 'Landing page',
    summary:
      'Site da CS Transportes e Distribuição, que leva água potável em caminhão-pipa em Palmares e região. O cliente monta o pedido no próprio site e envia pronto pelo WhatsApp.',
    image: '/projetos/cs-transportes.jpg',
    imageAlt: 'Página inicial do site da CS Transportes, com o título "Ficou sem água?"',
    href: 'https://cs-transportes.vercel.app',
    inDevelopment: true,
  },
];

export const navLinks: NavLink[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  ...(projects.length > 0 ? [{ label: 'Projetos', href: '#projetos' } as const] : []),
  { label: 'Sobre', href: '#sobre' },
];

export const projectTypes = ['Landing page', 'Site institucional', 'SaaS', 'Sistema sob medida', 'Ainda não sei'] as const;
export type ProjectType = (typeof projectTypes)[number];
