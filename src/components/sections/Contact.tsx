"use client";

import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { personalInfo } from "@/lib/data";
import { AnimatedSection, StaggerContainer } from "@/components/AnimatedSection";
import { ContactRequestError, type ContactValidationError, sendMail } from "@/service/service";

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<ContactValidationError[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus("idle");
    setErrorMessage("");
    setValidationErrors([]);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await sendMail({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
      });
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setValidationErrors(error instanceof ContactRequestError ? error.errors : []);
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your message. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

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
                    className="mt-2 w-full rounded-xl border border-border-subtle bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent-secondary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 w-full rounded-xl border border-border-subtle bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent-secondary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-border-subtle bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent-secondary"
                    placeholder="Tell me about the opportunity..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-text-primary transition-transform hover:bg-accent/90 active:scale-[0.97]"
                >
                  {isSending ? "Sending..." : "Send message"}
                </button>
                {status === "success" && (
                  <p className="text-sm text-green-600" role="status">
                    Message sent successfully.
                  </p>
                )}
                {status === "error" && (
                  <div className="text-sm text-red-600" role="alert">
                    <p>{errorMessage}</p>
                    {validationErrors.length > 0 && (
                      <ul className="mt-1 list-disc pl-5">
                        {validationErrors.map((validationError) => (
                          <li key={`${validationError.field}-${validationError.message}`}>
                            {validationError.message}
                          </li>
                        ))}
                      </ul>
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
