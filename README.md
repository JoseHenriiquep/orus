# Site da Orus — orusdev.com

Landing page da Orus em React + Vite + TypeScript + Tailwind CSS v4. Visual e regras: `../DESIGN.md` e o Orus Design System.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (com checagem de tipos)
npm run preview    # serve o dist/ localmente
```

## Onde mexer

| O que | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, prazo de resposta, seus dados | `src/config/site.ts` |
| Textos de serviços, processo, diferenciais, projetos | `src/content/home.ts` |
| Cores, fontes e tamanhos (tokens da marca) | `src/styles/index.css` (`@theme`) |
| Política de privacidade | `src/pages/Privacidade.tsx` |

- **Projetos:** a seção e o link do menu aparecem sozinhos quando `projects` em `src/content/home.ts` tiver itens.
- **Sua foto:** coloque o arquivo em `public/` e informe `photo: '/nome-do-arquivo.jpg'` em `founder` (`src/config/site.ts`).

## Formulário (Web3Forms)

Sem chave, o formulário funciona por completo na tela, mas avisa que ainda não está ativo e oferece o WhatsApp. Para ativar:

1. Copie `.env.example` para `.env`.
2. Preencha `VITE_WEB3FORMS_KEY` com a chave do Web3Forms.
3. Na hospedagem, cadastre a mesma variável de ambiente.

## Estrutura

```
src/
  components/
    brand/      Logo, OrusEye (pupila que segue o cursor), Orbits
    layout/     Header, Footer, WhatsAppFab
    sections/   Hero, Services, Process, Projects, Differentials, About, Contact, ContactForm
    ui/         Button, Icon, Field (TextField, TextArea, SelectField, Checkbox), Alert, Container, Section
  config/       dados do site
  content/      textos da página
  hooks/        movimento reduzido, rolagem, olho, visibilidade das seções
  lib/          links, envio do formulário, utilitários
  pages/        Home, Privacidade
  types/        tipagens do conteúdo
```

## Publicar

O site usa rotas (`/privacidade`). Na hospedagem, todas as rotas devem servir o `index.html` (na Vercel e na Netlify isso é uma regra de reescrita para SPA).
