"use client";

import Link from "next/link";

/* ── Logo Mark (reused from Nav) ──────────────────────────────────────────── */
function LogoMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="7" fill="url(#footer-logo-grad)" />
      <path d="M8 14 L12 9 L16 14 L12 19 Z" fill="white" fillOpacity="0.9" />
      <path d="M14 14 L18 9 L22 14 L18 19 Z" fill="white" fillOpacity="0.45" />
      <defs>
        <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f7dff" />
          <stop offset="1" stopColor="#7c5cfc" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Social Icons ─────────────────────────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",     href: "/"        },
  { label: "Services", href: "/services"},
  { label: "Works",    href: "/works"   },
  { label: "About",    href: "/about"   },
  { label: "Blog",     href: "/blog"    },
  // { label: "Careers",  href: "/careers" },
];

const SERVICE_LINKS = [
  { label: "App Development",       href: "/services#web-mobile"   },
  { label: "Cloud Infrastructure",  href: "/services#devops-cloud" },
  { label: "Pipeline Automation",   href: "/services#cicd"         },
  { label: "AI Solutions",          href: "/services#ai-automation"},
  { label: "Maintenance & Support", href: "/services#maintenance"  },
];

const SOCIAL_LINKS = [
  // { label: "GitHub",   href: "https://github.com/noopsstudios",   icon: <GitHubIcon />   },
  { label: "LinkedIn", href: "https://linkedin.com/company/noops", icon: <LinkedInIcon /> },
  { label: "Twitter",  href: "https://twitter.com/noopsstudios",   icon: <TwitterIcon />  },
];

/* ── Footer ───────────────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-base)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse at bottom, rgba(79,125,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Main footer grid ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 w-fit
                         focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                         focus-visible:outline-offset-2 rounded-lg"
              aria-label="NoOps Studios — Home"
            >
              <LogoMark />
              <span
                className="text-[17px] font-[800] text-[#f1f5f9] tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                NoOps Studios
              </span>
            </Link>

            {/* Tagline */}
            <p
              className="text-[14px] text-[#8b95a8] leading-relaxed max-w-[220px]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Building the infrastructure that ships. We automate what slows you down.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg
                             text-[#3d4a5c] hover:text-[#f1f5f9]
                             border border-white/[0.06] hover:border-white/[0.12]
                             hover:bg-white/[0.04]
                             transition-all duration-200
                             focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                             focus-visible:outline-offset-2"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation links */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-[#3d4a5c]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              Company
            </p>
            <nav aria-label="Footer company navigation">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[14px] text-[#8b95a8] hover:text-[#f1f5f9]
                                 transition-colors duration-200
                                 focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                                 focus-visible:outline-offset-2 rounded-sm"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Services */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-[#3d4a5c]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              Services
            </p>
            <nav aria-label="Footer services navigation">
              <ul className="flex flex-col gap-3">
                {SERVICE_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[14px] text-[#8b95a8] hover:text-[#f1f5f9]
                                 transition-colors duration-200
                                 focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                                 focus-visible:outline-offset-2 rounded-sm"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="flex flex-col gap-5">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-[#3d4a5c]"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@noops.studio"
                className="text-[14px] text-[#8b95a8] hover:text-[#f1f5f9]
                           transition-colors duration-200
                           focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                           focus-visible:outline-offset-2 rounded-sm w-fit"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                hello@noops.com.ng
              </a>
              <a
                href="tel:+2348033905994"
                className="text-[14px] text-[#8b95a8] hover:text-[#f1f5f9]
                           transition-colors duration-200
                           focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                           focus-visible:outline-offset-2 rounded-sm w-fit"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                +234 (803) 390-5994
              </a>

              {/* CTA link */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 mt-1
                           text-[13.5px] font-[500] text-[#4f7dff]
                           hover:text-[#7c5cfc] transition-colors duration-200
                           focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                           focus-visible:outline-offset-2 rounded-sm w-fit"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Start a Project →
              </Link>

              {/* Availability badge */}
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="relative flex h-2 w-2"
                  aria-hidden="true"
                >
                  <span
                    className="animate-ping absolute inline-flex h-full w-full
                               rounded-full bg-[#00d4aa] opacity-60"
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4aa]"
                  />
                </span>
                <span
                  className="text-[11px] text-[#00d4aa] uppercase tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  Available for projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-6
                   flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <p
          className="text-[12px] text-[#3d4a5c]"
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          © 2023 - {new Date().getFullYear()} NoOps Studios. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[12px] text-[#3d4a5c] hover:text-[#8b95a8]
                         transition-colors duration-200
                         focus-visible:outline-2 focus-visible:outline-[#4f7dff]
                         focus-visible:outline-offset-2 rounded-sm"
              style={{ fontFamily: "var(--font-dm-mono)" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
