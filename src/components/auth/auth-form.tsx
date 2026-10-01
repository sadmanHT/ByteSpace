"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import type { AuthMode } from "@/components/auth/auth-layout";
import { TextField } from "@/components/ui/text-field";

export type AuthValues = {
  email: string;
  fullName: string;
  password: string;
};

export type AuthErrors = Partial<Record<keyof AuthValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthValues(mode: AuthMode, values: AuthValues): AuthErrors {
  const errors: AuthErrors = {};

  if (mode === "register" && !values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

const initialValues: AuthValues = {
  email: "",
  fullName: "",
  password: "",
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [status, setStatus] = useState("");

  const isRegister = mode === "register";

  function updateField(field: keyof AuthValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setStatus("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateAuthValues(mode, values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please correct the highlighted fields.");
      return;
    }

    setStatus("Form is valid. Authentication is not connected to a backend yet.");
  }

  return (
    <form className="bs-auth-form" noValidate onSubmit={handleSubmit}>
      <header className="bs-auth-form__header">
        <h2>{isRegister ? "Create an Account" : "Sign In"}</h2>
        <p>{isRegister ? "Welcome to ByteSpace" : "Welcome Back"}</p>
      </header>

      <div className="bs-auth-form__fields">
        {isRegister ? (
          <div className="bs-auth-form__field-slot">
            <TextField
              autoComplete="name"
              error={errors.fullName}
              label="Full Name"
              name="fullName"
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="Jamie Davis"
              value={values.fullName}
            />
          </div>
        ) : null}

        <div className="bs-auth-form__field-slot">
          <TextField
            autoComplete="email"
            error={errors.email}
            label="Email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="designer@example.com"
            type="email"
            value={values.email}
          />
        </div>

        <div className="bs-auth-form__field-slot">
          <TextField
            autoComplete={isRegister ? "new-password" : "current-password"}
            error={errors.password}
            label="Password"
            name="password"
            onChange={(event) => updateField("password", event.target.value)}
            placeholder="••••••••"
            type="password"
            value={values.password}
          />
        </div>
      </div>

      <button className="bs-auth-form__submit" type="submit">
        {isRegister ? "Continue" : "Sign In"}
      </button>

      {isRegister ? (
        <p className="bs-auth-form__secondary">
          Already have an account?{" "}
          <Link href="/login" prefetch={false}>
            Login
          </Link>
        </p>
      ) : (
        <>
          <div className="bs-auth-form__separator" aria-hidden="true">
            <span />
            <b>or</b>
            <span />
          </div>
          <p className="bs-auth-form__secondary">
            New user?{" "}
            <Link href="/register" prefetch={false}>
              Create an account
            </Link>
          </p>
        </>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
