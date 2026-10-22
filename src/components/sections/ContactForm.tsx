import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Checkbox, SelectField, TextArea, TextField } from '@/components/ui/Field';
import { site } from '@/config/site';
import { projectTypes } from '@/content/home';
import {
  emptyContactForm,
  submitContactForm,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
  type SubmitResult,
} from '@/lib/contactForm';
import { whatsappLink } from '@/lib/links';

type Status = 'idle' | 'sending' | SubmitResult['status'];

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [botcheck, setBotcheck] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update =
    <K extends keyof ContactFormValues>(field: K) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = (event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value) as ContactFormValues[K];
      setValues((prev) => ({ ...prev, [field]: value }));
      // Some com o erro do campo assim que ele for corrigido.
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validateContactForm({ ...values, [field]: value })[field] }));
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContactForm(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('sending');
    const result = await submitContactForm(values, botcheck);
    setStatus(result.status);
    if (result.status === 'success') setValues(emptyContactForm);
  };

  const whatsapp = (
    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
      fale pelo WhatsApp
    </a>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-card border border-line bg-grafite p-6 md:p-8">
      <TextField label="Nome" name="nome" required autoComplete="name" value={values.nome} onChange={update('nome')} error={errors.nome} />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        required
        autoComplete="email"
        value={values.email}
        onChange={update('email')}
        error={errors.email}
      />
      <TextField
        label="WhatsApp"
        name="whatsapp"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="(11) 90000-0000"
        hint="Com DDD. Opcional, se preferir a resposta por lá."
        value={values.whatsapp}
        onChange={update('whatsapp')}
        error={errors.whatsapp}
      />
      <SelectField label="Tipo de projeto" name="tipo" options={projectTypes} value={values.tipo} onChange={update('tipo')} />
      <TextArea
        label="Mensagem"
        name="mensagem"
        required
        placeholder="Conte o que você precisa, mesmo que ainda seja só uma ideia."
        value={values.mensagem}
        onChange={update('mensagem')}
        error={errors.mensagem}
      />

      {/* Armadilha para robôs: invisível para pessoas */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        checked={botcheck}
        onChange={(event) => setBotcheck(event.target.checked)}
      />

      <Checkbox
        name="consentimento"
        checked={values.consentimento}
        onChange={update('consentimento')}
        error={errors.consentimento}
        label={
          <>
            Concordo com a{' '}
            <Link to="/privacidade" className="text-link underline">
              política de privacidade
            </Link>{' '}
            e autorizo o contato da Orus sobre este pedido.
          </>
        }
      />

      <Button type="submit" size="lg" loading={status === 'sending'} className="w-full sm:w-auto sm:self-start">
        {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
      </Button>

      <div aria-live="polite">
        {status === 'success' && (
          <Alert tone="success" title="Recebi sua mensagem.">
            Respondo em até {site.contact.responseTime}, por e-mail ou WhatsApp.
          </Alert>
        )}
        {status === 'error' && (
          <Alert tone="danger" title="Não consegui enviar agora.">
            Tente de novo em instantes ou {whatsapp}.
          </Alert>
        )}
        {status === 'unavailable' && (
          <Alert tone="info" title="O formulário ainda não está ativo.">
            Enquanto isso, {whatsapp}: é o caminho mais rápido.
          </Alert>
        )}
      </div>
    </form>
  );
}
