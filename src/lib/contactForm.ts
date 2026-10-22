import type { ProjectType } from '@/content/home';

export interface ContactFormValues {
  nome: string;
  email: string;
  whatsapp: string;
  tipo: ProjectType | '';
  mensagem: string;
  consentimento: boolean;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type SubmitResult =
  | { status: 'success' }
  | { status: 'error' }
  | { status: 'unavailable' };

export const emptyContactForm: ContactFormValues = {
  nome: '',
  email: '',
  whatsapp: '',
  tipo: '',
  mensagem: '',
  consentimento: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (values.nome.trim().length < 2) errors.nome = 'Diga seu nome para eu saber com quem estou falando.';
  if (!values.email.trim()) errors.email = 'Informe um e-mail para a resposta.';
  else if (!values.email.includes('@')) errors.email = 'Confira o e-mail: falta o @.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Confira o e-mail: parece incompleto.';
  const digits = values.whatsapp.replace(/\D/g, '');
  if (digits && (digits.length < 10 || digits.length > 13)) errors.whatsapp = 'Confira o número: use DDD e o número completo.';
  if (values.mensagem.trim().length < 10) errors.mensagem = 'Conte um pouco do que você precisa (pelo menos uma frase).';
  if (!values.consentimento) errors.consentimento = 'Para enviar, marque o consentimento.';
  return errors;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Envia pelo Web3Forms. Sem a chave em VITE_WEB3FORMS_KEY, o formulário ainda não está ativo.
 */
export async function submitContactForm(values: ContactFormValues, botcheck: boolean): Promise<SubmitResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!accessKey) return { status: 'unavailable' };
  if (botcheck) return { status: 'success' };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Novo contato pelo site: ${values.nome.trim()}`,
        from_name: 'Site da Orus',
        replyto: values.email.trim(),
        nome: values.nome.trim(),
        email: values.email.trim(),
        whatsapp: values.whatsapp.trim() || 'Não informado',
        tipo_de_projeto: values.tipo || 'Não informado',
        mensagem: values.mensagem.trim(),
      }),
    });
    const data: { success?: boolean } = await response.json();
    return response.ok && data.success ? { status: 'success' } : { status: 'error' };
  } catch {
    return { status: 'error' };
  }
}
