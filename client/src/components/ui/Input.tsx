"use client";

import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  wrapperClassName?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, error, wrapperClassName, ...rest },
  ref
) {
  const base =
    "w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 " +
    "focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 " +
    "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

  const errored =
    "border-red-500 focus:border-red-500 focus:ring-red-500/40";

  return (
    <div className={wrapperClassName}>
      <input
        ref={ref}
        className={[base, error ? errored : "border-slate-300", className ?? ""].join(" ")}
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
});

export default Input;