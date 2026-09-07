"use client";

import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { personalInfo } from "@/lib/data";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";
import { ContactRequestError, type ContactValidationError, sendMail } from "@/service/service";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const validateContactForm = (values: ContactFormValues): FieldErrors => {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2 || name.length > 80) {
    errors.name = "Name must be between 2 and 80 characters.";
  } else if (!/^[\p{L}\p{M} .,'-]+$/u.test(name)) {
    errors.name = "Name contains invalid characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email is too long.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < 10 || message.length > 3000) {
    errors.message = "Message must be between 10 and 3000 characters.";
  }

  return errors;
};

const mapServerErrors = (errors: ContactValidationError[]): FieldErrors => {
  const mapped: FieldErrors = {};

  for (const error of errors) {
    if (error.field === "name" || error.field === "email" || error.field === "message") {
      mapped[error.field] ??= error.message;
    }
  }

  return mapped;
};

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values: ContactFormValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const clientErrors = validateContactForm(values);
    setFieldErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      const firstInvalidField = Object.keys(clientErrors)[0] as keyof ContactFormValues;
      document.getElementById(firstInvalidField)?.focus();
      toast.error("Please check the highlighted fields.");
      return;
    }

    setIsSending(true);
    setFieldErrors({});

    try {
      await sendMail({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });

      form.reset();
      setFieldErrors({});
      toast.success("Message sent successfully.", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      const serverErrors = error instanceof ContactRequestError ? mapServerErrors(error.errors) : {};
      setFieldErrors(serverErrors);

      toast.error("Unable to send your message.", {
        description:
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const inputClass = (field: keyof ContactFormValues) =>
    `mt-2 w-full min-h-[44px] rounded-xl border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-accent-secondary ${
      fieldErrors[field]
        ? "border-red-400/80 ring-1 ring-red-400/30 focus:border-red-400"
        : "border-border-subtle"
    }`;

  return (
    <section id="contact" className="relative px-6 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-2">
          <StaggerContainer staggerDelay={0.07} distance={20}>
            <div className="font-mono-label mb-4 text-xs text-text-tertiary">Contact</div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              Let's talk
            </h2>
            <p className="mt-4 max-w-md text-text-secondary">
              I'm currently open to Android developer roles and interesting projects. Reach out
              directly or send a message here.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-text-secondary transition-colors hover:text-text-primary"
              >
                <Mail size={18} className="text-accent" />
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-text-secondary transition-colors hover:text-text-primary"
              >
                <Phone size={18} className="text-accent" />
                {personalInfo.phone}
              </a>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin size={18} className="text-accent" />
                {personalInfo.location}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </StaggerContainer>

          <AnimatedSection delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border-subtle bg-bg-elevated p-6 md:p-8"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    className={inputClass("name")}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-300" role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    className={inputClass("email")}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-300" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    className={`${inputClass("message")} min-h-[112px]`}
                    placeholder="Tell me about the opportunity..."
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-red-300" role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full min-h-[44px] rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-primary transition-all hover:bg-accent/90 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
