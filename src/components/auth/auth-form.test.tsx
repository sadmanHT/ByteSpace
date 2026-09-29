import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { AuthForm, validateAuthValues } from "./auth-form";

describe("validateAuthValues", () => {
  it("requires register fields without inventing a password policy", () => {
    expect(
      validateAuthValues("register", {
        email: "",
        fullName: "",
        password: "",
      }),
    ).toEqual({
      fullName: "Enter your full name.",
      email: "Enter your email address.",
      password: "Enter your password.",
    });
  });

  it("rejects an invalid email and accepts a valid-looking form", () => {
    expect(
      validateAuthValues("login", {
        email: "not-an-email",
        fullName: "",
        password: "anything",
      }),
    ).toEqual({ email: "Enter a valid email address." });

    expect(
      validateAuthValues("login", {
        email: "learner@example.com",
        fullName: "",
        password: "anything",
      }),
    ).toEqual({});
  });
});

describe("AuthForm", () => {
  it("associates validation errors and keeps the password private input type", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="register" />);

    const password = screen.getByLabelText("Password");
    expect(password).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByLabelText("Full Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(password).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Enter your password.")).toBeInTheDocument();
  });

  it("shows invalid-email feedback and keeps auth navigation real", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="login" />);

    await user.type(screen.getByLabelText("Email"), "invalid");
    await user.type(screen.getByLabelText("Password"), "secret-value");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute(
      "href",
      "/register",
    );
  });

  it("reports a valid frontend boundary without pretending authentication succeeded", async () => {
    const user = userEvent.setup();
    render(<AuthForm mode="login" />);

    await user.type(screen.getByLabelText("Email"), "learner@example.com");
    await user.type(screen.getByLabelText("Password"), "secret-value");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Form is valid. Authentication is not connected to a backend yet.",
    );
  });
});
