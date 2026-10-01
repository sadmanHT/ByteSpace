"use client";

import { type FormEvent, useId, useState } from "react";

export function NewsletterForm() {
  const inputId = useId();
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Newsletter submission is not connected to a backend yet.");
  }

  return (
    <form aria-label="Newsletter" className="bs-newsletter" onSubmit={handleSubmit}>
      <div className="bs-newsletter__row">
        <label className="sr-only" htmlFor={inputId}>
          Email address
        </label>
        <input
          autoComplete="email"
          className="bs-newsletter__input"
          id={inputId}
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <button className="bs-newsletter__button" type="submit">
          Search
        </button>
      </div>
      <p className="bs-newsletter__legal">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our
        company.
      </p>
      <p aria-live="polite" className="sr-only" role="status">
        {status}
      </p>
    </form>
  );
}
