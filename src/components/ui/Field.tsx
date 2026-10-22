import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

interface FieldShellProps {
  id: string;
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
}

const controlBase =
  'w-full rounded-control border bg-noite px-4 py-3 text-base leading-snug text-ink caret-accent ' +
  'placeholder:text-muted transition-colors duration-150 hover:border-muted ' +
  'focus-visible:border-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link ' +
  'disabled:cursor-not-allowed disabled:opacity-55';

export function controlClass(hasError: boolean) {
  return cn(controlBase, 'min-h-12', hasError ? 'border-danger' : 'border-line-strong');
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-2 text-[0.9375rem] leading-normal text-danger">
      <Icon name="alerta" size={18} className="mt-0.5" />
      <span>{children}</span>
    </p>
  );
}

/** Estrutura comum: rótulo sempre visível, controle, dica ou erro. */
function FieldShell({ id, label, required, hint, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.9375rem] font-medium text-ink">
        {label}
        {required && <span className="font-normal text-muted"> (obrigatório)</span>}
      </label>
      {children}
      {error ? (
        <FieldError id={`${id}-erro`}>{error}</FieldError>
      ) : (
        hint && (
          <p id={`${id}-dica`} className="text-[0.9375rem] leading-normal text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function describedBy(id: string, hint?: ReactNode, error?: ReactNode) {
  if (error) return `${id}-erro`;
  if (hint) return `${id}-dica`;
  return undefined;
}

interface CommonProps {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

export function TextField({ label, hint, error, id: idProp, required, className, ...rest }: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClass(Boolean(error)), className)}
        {...rest}
      />
    </FieldShell>
  );
}

export function TextArea({ label, hint, error, id: idProp, required, className, rows = 5, ...rest }: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClass(Boolean(error)), 'min-h-32 resize-y', className)}
        {...rest}
      />
    </FieldShell>
  );
}

interface SelectFieldProps extends CommonProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: readonly string[];
  placeholder?: string;
}

export function SelectField({ label, hint, error, id: idProp, required, options, placeholder = 'Escolha uma opção', className, ...rest }: SelectFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(controlClass(Boolean(error)), 'appearance-none pr-11', className)}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevron" size={20} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
      </div>
    </FieldShell>
  );
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: ReactNode;
}

export function Checkbox({ label, error, id: idProp, className, ...rest }: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 flex size-5.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-erro` : undefined}
            className={cn(
              'peer size-5.5 cursor-pointer appearance-none rounded-md border-[1.5px] bg-noite',
              'checked:border-accent checked:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link',
              error ? 'border-danger' : 'border-line-strong',
              className,
            )}
            {...rest}
          />
          <Icon
            name="check"
            size={16}
            strokeWidth={2.5}
            className="pointer-events-none absolute inset-0 m-auto text-on-accent opacity-0 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-normal text-muted">
          {label}
        </label>
      </div>
      {error && <FieldError id={`${id}-erro`}>{error}</FieldError>}
    </div>
  );
}
