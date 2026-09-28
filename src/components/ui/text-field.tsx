"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";

import { classNames } from "@/lib/class-names";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextField({
  className,
  error,
  hint,
  id,
  label,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], hintId, errorId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="bs-field">
      <label className="bs-field__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        {...inputProps}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
        className={classNames("bs-field__control", className)}
        id={inputId}
      />
      {hint ? (
        <p className="bs-field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="bs-field__error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
