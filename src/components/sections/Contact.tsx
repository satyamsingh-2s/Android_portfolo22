"use client";

import { Github, Linkedin, Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { personalInfo } from "@/lib/data";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";
import { OrangeCatWaiting } from "@/components/animation/GreenBirdWaiting";
import {
  checkBackendAvailability,
  ContactRequestError,
  type ContactValidationError,
  sendMail,
} from "@/service/service";

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

const startupWaitSeconds = 30;

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [countdown, setCountdown] = useState<number | null>(null);
  const startupTimerRef = useRef<number | null>(null);
  const startupAttemptRef = useRef(0);
  const startupCheckInFlightRef = useRef(false);
  const pendingMessageRef = useRef<ContactFormValues | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const elapsedStartupSeconds = countdown === null ? 0 : startupWaitSeconds - countdown;
  const serverMoodMessage =
    countdown !== null &&
    countdown > 0 &&
    elapsedStartupSeconds > 0 &&
    elapsedStartupSeconds % 15 === 0
      ? "I hate server"
      : null;

  useEffect(() => {
    return () => {
      if (startupTimerRef.current) {
        window.clearInterval(startupTimerRef.current);
      }
      startupAttemptRef.current += 1;
      pendingMessageRef.current = null;
    };
  }, []);

  const clearStartupTimer = () => {
    if (startupTimerRef.current) {
      window.clearInterval(startupTimerRef.current);
      startupTimerRef.current = null;
    }
    startupAttemptRef.current += 1;
  };

  const sendPendingMessage = async (values: ContactFormValues) => {
    setIsSending(true);
    setFieldErrors({});

    try {
      await sendMail({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });

      clearStartupTimer();
      pendingMessageRef.current = null;
      setCountdown(null);
      formRef.current?.reset();
      setFieldErrors({});
      toast.success("Message sent successfully.", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      pendingMessageRef.current = null;
      const serverErrors =
        error instanceof ContactRequestError ? mapServerErrors(error.errors) : {};
      setFieldErrors(serverErrors);

      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";

      toast.error("Unable to send your message.", {
        description: message,
      });
    } finally {
      setIsSending(false);
    }
  };

  const beginStartupCountdown = (values: ContactFormValues) => {
    clearStartupTimer();
    pendingMessageRef.current = values;
    setCountdown(startupWaitSeconds);

    let remainingSeconds = startupWaitSeconds;
    const startupAttempt = startupAttemptRef.current;
    startupTimerRef.current = window.setInterval(() => {
      remainingSeconds = Math.max(remainingSeconds - 1, 0);
      setCountdown(remainingSeconds);

      if (remainingSeconds === 0) {
        clearStartupTimer();
        pendingMessageRef.current = null;
        setCountdown(null);
        toast.warning("The contact service is still starting up. Please try again in a moment.", {
          duration: 4000,
        });
        return;
      }

      if (startupCheckInFlightRef.current) {
        return;
      }

      startupCheckInFlightRef.current = true;
      void checkBackendAvailability()
        .then(() => {
          if (startupAttempt !== startupAttemptRef.current) {
            return;
          }

          clearStartupTimer();
          setCountdown(null);
          const pendingMessage = pendingMessageRef.current;
          if (pendingMessage) {
            void sendPendingMessage(pendingMessage);
          }
        })
        .catch(() => {
          // Keep polling until the countdown expires or the service becomes available.
        })
        .finally(() => {
          startupCheckInFlightRef.current = false;
        });
    }, 1000);
  };

  const isStartupBlocked = countdown !== null && countdown > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isStartupBlocked) {
      return;
    }

    const form = event.currentTarget;
    formRef.current = form;
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
    try {
      await checkBackendAvailability();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";

      if (
        /starting up|could not be reached|took too long to respond|is unavailable/i.test(message)
      ) {
        beginStartupCountdown({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        });
      }

      toast.error("Unable to send your message.", {
        description: message,
      });
      setIsSending(false);
      return;
    }

    await sendPendingMessage(values);
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
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:bg-bg-elevated-hover hover:text-text-primary"
                aria-label="Instagram"
              >
                <Instagram size={18} />
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
              ref={formRef}
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
                    disabled={isStartupBlocked}
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
                    disabled={isStartupBlocked}
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
                    disabled={isStartupBlocked}
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
                  disabled={isSending || isStartupBlocked}
                  className="w-full min-h-[44px] rounded-full bg-accent px-6 py-3 text-sm font-medium text-[var(--text-on-accent)] transition-all hover:bg-accent/90 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? (
                    "Sending..."
                  ) : isStartupBlocked ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <OrangeCatWaiting />
                      <span className="tracking-[0.14em] uppercase text-[10px]">Waiting</span>
                    </span>
                  ) : (
                    "Send message"
                  )}
                </button>

                {countdown !== null && (
                  <div className="mt-3 text-center">
                    <p className="text-xs text-text-secondary">
                      The contact service is waking up. Your message will be sent automatically when
                      it is ready. Please wait {countdown}s.
                    </p>
                    {serverMoodMessage && (
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300/90">
                        {serverMoodMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
