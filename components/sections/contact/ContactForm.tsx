"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────────── */
type Status = "idle" | "loading" | "success" | "error";

interface FormData {
  name:        string;
  email:       string;
  company:     string;
  service:     string;
  budget:      string;
  message:     string;
}

interface FieldError {
  name?:    string;
  email?:   string;
  service?: string;
  message?: string;
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SERVICES = [
  "Web & Mobile App Development",
  "DevOps & Cloud Infrastructure",
  "CI/CD Pipeline Automation",
  "AI Automation Solutions",
  "Maintenance & Support",
  "Multiple / Not sure yet",
];

const BUDGETS = [
  "< $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Ongoing retainer",
];

/* ── Intersection observer hook ───────────────────────────────────────────── */
function useInView(threshold = 0.08) {
  const ref             = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* ── Shared input styles ──────────────────────────────────────────────────── */
const INPUT_BASE = [
  "w-full rounded-xl px-4 py-3 text-[14px] text-[#f1f5f9]",
  "bg-[rgba(13,17,23,0.70)] border border-white/[0.07]",
  "placeholder:text-[#3d4a5c]",
  "hover:border-white/[0.12]",
  "focus:outline-none focus:border-[#4f7dff]/50 focus:ring-1 focus:ring-[#4f7dff]/20",
  "transition-all duration-200",
  "min-h-[48px]",
].join(" ");

const INPUT_ERROR = "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20";

/* ── Label component ──────────────────────────────────────────────────────── */
function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor:   string;
  children:  React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1 text-[12px] text-[#8b95a8] mb-2 uppercase tracking-[0.12em]"
      style={{ fontFamily: "var(--font-dm-mono)" }}
    >
      {children}
      {required && (
        <span className="text-[#4f7dff]" aria-hidden="true">*</span>
      )}
    </label>
  );
}

/* ── Field error message ──────────────────────────────────────────────────── */
function FieldErrorMsg({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="flex items-center gap-1.5 mt-1.5 text-[12px] text-red-400"
      role="alert"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      <AlertCircle size={11} aria-hidden="true" />
      {message}
    </p>
  );
}

/* ── Validation ───────────────────────────────────────────────────────────── */
function validate(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim())
    errors.name = "Name is required.";
  if (!data.email.trim())
    errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (!data.service)
    errors.service = "Please select a service.";
  if (!data.message.trim())
    errors.message = "Tell us a bit about your project.";
  else if (data.message.trim().length < 20)
    errors.message = "Please provide a little more detail (at least 20 characters).";
  return errors;
}

/* ── ContactForm ──────────────────────────────────────────────────────────── */
export function ContactForm() {
  const { ref: formRef, seen: formSeen } = useInView(0.05);
  const { ref: sideRef, seen: sideSeen } = useInView(0.05);

  const [form, setForm]       = useState<FormData>({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors]   = useState<FieldError>({});
  const [status, setStatus]   = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  /* Update a field */
  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (touched[field]) {
        /* Re-validate on change once the field has been touched */
        const errs = validate({ ...form, [field]: e.target.value });
        setErrors((prev) => ({ ...prev, [field]: errs[field as keyof FieldError] }));
      }
    };

  /* Mark field as touched on blur */
  const onBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field as keyof FieldError] }));
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched({ name: true, email: true, service: true, message: true });
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    /* Simulate API call — replace with your actual endpoint */
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setStatus("success");
  };

  /* ── Success state ───────────────────────────────────────────── */
  if (status === "success") {
    return (
      <section
        aria-label="Contact form"
        className="py-16 lg:py-20"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            className="max-w-lg mx-auto text-center flex flex-col items-center gap-6 py-16"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center
                         bg-[#00d4aa]/10 border border-[#00d4aa]/30"
            >
              <CheckCircle2 size={28} strokeWidth={1.5} className="text-[#00d4aa]" />
            </div>
            <h2
              className="text-[28px] font-[800] text-[#f1f5f9] leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Message received!
            </h2>
            <p
              className="text-[16px] text-[#8b95a8] leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              We&apos;ll review your project and get back to you within
              24 hours with a clear plan. Check your inbox.
            </p>
            <p
              className="text-[12px] text-[#3d4a5c]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              hello@noops.studio
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="py-12 lg:py-16"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

          {/* ── Form ──────────────────────────────────────────────── */}
          <div
            ref={formRef}
            className={[
              "transition-[opacity,transform] duration-600 ease-out",
              formSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
          >
            <h2
              id="contact-form-heading"
              className="text-[22px] font-[800] text-[#f1f5f9] mb-8"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Tell us about your project
            </h2>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" required>Name</Label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jordan Ellis"
                    value={form.name}
                    onChange={set("name")}
                    onBlur={onBlur("name")}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    className={[INPUT_BASE, errors.name ? INPUT_ERROR : ""].join(" ")}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                  <FieldErrorMsg message={errors.name} />
                </div>
                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jordan@company.com"
                    value={form.email}
                    onChange={set("email")}
                    onBlur={onBlur("email")}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    className={[INPUT_BASE, errors.email ? INPUT_ERROR : ""].join(" ")}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                  <FieldErrorMsg message={errors.email} />
                </div>
              </div>

              {/* Row 2 — Company (optional) */}
              <div>
                <Label htmlFor="company">Company</Label>
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Acme Inc. (optional)"
                  value={form.company}
                  onChange={set("company")}
                  className={INPUT_BASE}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                />
              </div>

              {/* Row 3 — Service + Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="service" required>Service needed</Label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={set("service")}
                    onBlur={onBlur("service")}
                    aria-invalid={!!errors.service}
                    className={[
                      INPUT_BASE,
                      "cursor-pointer appearance-none",
                      errors.service ? INPUT_ERROR : "",
                      form.service ? "text-[#f1f5f9]" : "text-[#3d4a5c]",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map((s) => (
                      <option
                        key={s}
                        value={s}
                        style={{ background: "#0d1117", color: "#f1f5f9" }}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  <FieldErrorMsg message={errors.service} />
                </div>
                <div>
                  <Label htmlFor="budget">Budget range</Label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={set("budget")}
                    className={[
                      INPUT_BASE,
                      "cursor-pointer appearance-none",
                      form.budget ? "text-[#f1f5f9]" : "text-[#3d4a5c]",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <option value="" disabled>Select a range…</option>
                    {BUDGETS.map((b) => (
                      <option
                        key={b}
                        value={b}
                        style={{ background: "#0d1117", color: "#f1f5f9" }}
                      >
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4 — Message */}
              <div>
                <Label htmlFor="message" required>Project details</Label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us what you're building, what's blocking you, and what success looks like…"
                  value={form.message}
                  onChange={set("message")}
                  onBlur={onBlur("message")}
                  aria-invalid={!!errors.message}
                  className={[
                    INPUT_BASE,
                    "resize-none min-h-[140px]",
                    errors.message ? INPUT_ERROR : "",
                  ].join(" ")}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                />
                <div className="flex items-start justify-between mt-1">
                  <FieldErrorMsg message={errors.message} />
                  <span
                    className="text-[11px] text-[#3d4a5c] ml-auto"
                    aria-live="polite"
                    style={{ fontFamily: "var(--font-dm-mono)" }}
                  >
                    {form.message.length} chars
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2.5
                           w-full sm:w-auto sm:self-start
                           px-8 py-4 rounded-full min-h-[52px]
                           text-[14px] font-[500] text-white
                           bg-gradient-to-r from-[#4f7dff] to-[#7c5cfc]
                           hover:shadow-[0_0_30px_rgba(79,125,255,0.45)] hover:scale-[1.02]
                           active:scale-[0.98]
                           disabled:opacity-60 disabled:pointer-events-none
                           transition-all duration-200
                           focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                           focus-visible:outline-offset-2"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                  </>
                )}
              </button>

              <p
                className="text-[11px] text-[#3d4a5c]"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                * Required fields. We respond within 24 hours.
              </p>
            </form>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────── */}
          <div
            ref={sideRef}
            className={[
              "flex flex-col gap-5",
              "transition-[opacity,transform] duration-600 ease-out",
              sideSeen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: "120ms" }}
          >
            {/* Direct contact card */}
            <div
              className="flex flex-col gap-5 p-6 rounded-2xl
                         bg-[rgba(13,17,23,0.70)] border border-white/[0.06]"
            >
              <p
                className="text-[11px] uppercase tracking-[0.2em] text-[#00d4aa]"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                Direct Contact
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hello@noops.studio"
                  className="flex items-center gap-3 text-[14px] text-[#8b95a8]
                             hover:text-[#f1f5f9] transition-colors duration-200
                             focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                             focus-visible:outline-offset-2 rounded-sm"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <span className="text-[#4f7dff] text-[16px]">✉</span>
                  hello@noops.studio
                </a>
                <a
                  href="tel:+15550000000"
                  className="flex items-center gap-3 text-[14px] text-[#8b95a8]
                             hover:text-[#f1f5f9] transition-colors duration-200
                             focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                             focus-visible:outline-offset-2 rounded-sm"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <span className="text-[#4f7dff] text-[16px]">☎</span>
                  +1 (555) 000-0000
                </a>
              </div>
            </div>

            {/* Availability card */}
            <div
              className="flex flex-col gap-4 p-6 rounded-2xl
                         bg-[rgba(13,17,23,0.70)] border border-white/[0.06]"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full
                                   rounded-full bg-[#00d4aa] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d4aa]" />
                </span>
                <p
                  className="text-[11px] uppercase tracking-[0.2em] text-[#00d4aa]"
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  Currently Available
                </p>
              </div>
              <p
                className="text-[13px] text-[#8b95a8] leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                We&apos;re taking on new projects starting{" "}
                <span className="text-[#f1f5f9]">Q3 2025</span>. Reach out
                now to secure your spot — we work with a limited number of
                clients at a time.
              </p>
            </div>

            {/* What to expect */}
            <div
              className="flex flex-col gap-4 p-6 rounded-2xl
                         bg-[rgba(13,17,23,0.70)] border border-white/[0.06]"
            >
              <p
                className="text-[11px] uppercase tracking-[0.2em] text-[#00d4aa]"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                What Happens Next
              </p>
              <ol className="flex flex-col gap-3" aria-label="Steps after submitting">
                {[
                  { step: "01", text: "We review your project within 24 hours." },
                  { step: "02", text: "A senior engineer schedules a 30-min call." },
                  { step: "03", text: "We send a clear scope and timeline." },
                  { step: "04", text: "We start building — usually within a week." },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className="text-[10px] text-[#4f7dff] mt-0.5 shrink-0 w-5"
                      style={{ fontFamily: "var(--font-dm-mono)" }}
                      aria-hidden="true"
                    >
                      {step}
                    </span>
                    <span
                      className="text-[13px] text-[#8b95a8] leading-snug"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
