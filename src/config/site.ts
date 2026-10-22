import type { SiteConfig } from '@/types/content';

/**
 * Dados da Orus usados em todo o site. Troque aqui, e o site inteiro acompanha.
 */
export const site: SiteConfig = {
  name: 'Orus',
  slogan: 'Visão que vira código.',
  url: 'https://www.orusdev.com',
  contact: {
    whatsappDisplay: '(81) 9 2002-0156',
    whatsappNumber: '5581920020156',
    whatsappMessage: 'Olá! Vim pelo site da Orus e quero conversar sobre um projeto.',
    email: 'contato@orusdev.com',
    instagram: 'orusdev_',
    responseTime: '1 dia útil',
  },
  founder: {
    name: 'José Henrique',
    role: 'Desenvolvedor Full Stack, formado em Análise e Desenvolvimento de Sistemas.',
    bio:
      'Há mais de 3 anos desenvolvo software, e hoje faço especialização em Engenharia de Software. ' +
      'Meu jeito de trabalhar começa pela conversa: entender o seu negócio e o que o sistema precisa resolver antes de escrever a primeira linha de código. ' +
      'Na Orus, você fala direto comigo, do início ao fim, sempre com clareza sobre o que está sendo feito.',
    photo: '/jose-henrique.webp',
  },
};
