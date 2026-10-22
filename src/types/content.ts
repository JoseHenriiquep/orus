import type { IconName } from '@/components/ui/Icon';

export interface NavLink {
  label: string;
  /** Âncora da página inicial, ex.: "#servicos" */
  href: `#${string}`;
}

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  /** Para quem o serviço é indicado */
  audience: string;
  /** Serviço de entrada, destacado na grade */
  featured?: boolean;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Differential {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  /** Tipo de projeto, ex.: "Landing page" */
  category: string;
  summary: string;
  /** Caminho em /public */
  image?: string;
  /** Descrição da imagem para leitores de tela */
  imageAlt?: string;
  href?: string;
}

export interface Founder {
  name: string;
  role: string;
  /** Parágrafo de apresentação da seção "Quem faz?" */
  bio: string;
  /** Caminho em /public; sem foto, aparece o símbolo da Orus */
  photo?: string;
}

export interface ContactInfo {
  /** Como o número aparece na tela */
  whatsappDisplay: string;
  /** Só dígitos, com DDI e DDD, para o link wa.me */
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  instagram: string;
  responseTime: string;
}

export interface SiteConfig {
  name: string;
  slogan: string;
  url: string;
  contact: ContactInfo;
  founder: Founder;
}
