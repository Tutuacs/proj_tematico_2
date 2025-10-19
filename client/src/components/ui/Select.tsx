'use client';

import { forwardRef, useId } from 'react';

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];

  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  /** mensagem de erro (exibe em vermelho se presente) */
  error?: string;
  /** dica/ajuda opcional abaixo do campo */
  helperText?: string;

  className?: string;
  containerClassName?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    value,
    onChange,
    options,
    id,
    name,
    placeholder,
    required,
    disabled,
    error,
    helperText,
    className,
    containerClassName,
  },
  ref
) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={[
            'block w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-none transition',
            error
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-gray-300 focus:border-indigo-500',
            disabled ? 'bg-gray-100 text-gray-500' : '',
            className ?? '',
          ].join(' ')}
          aria-invalid={!!error}
          aria-describedby={helperText ? `${selectId}-help` : undefined}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* ícone seta */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          ▼
        </span>
      </div>

      {helperText && !error && (
        <p id={`${selectId}-help`} className="mt-1 text-xs text-slate-500">
          {helperText}
        </p>
      )}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
});

export default Select;