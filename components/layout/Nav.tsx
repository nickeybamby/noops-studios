"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";

/* ── Types ────────────────────────────────────────────────────────────────── */
interface NavLink {
  label: string;
  href:  string;
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { label: "Home",     href: "/"        },
  { label: "Services", href: "/services"},
  { label: "Works",    href: "/works"   },
  { label: "About",    href: "/about"   },
  { label: "Contact",  href: "/contact" },
];

/* ── Logo Mark SVG ────────────────────────────────────────────────────────── */
function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="7" fill="url(#logo-grad)" />
      <path
        d="M8 14 L12 9 L16 14 L12 19 Z"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M14 14 L18 9 L22 14 L18 19 Z"
        fill="white"
        fillOpacity="0.45"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f7dff" />
          <stop offset="1" stopColor="#7c5cfc" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Nav Component ────────────────────────────────────────────────────────── */
export function Nav() {
  const pathname              = usePathname();
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef             = useRef<HTMLDivElement>(null);

  /* Mount animation trigger */
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Main Nav Bar ──────────────────────────────────────────────── */}
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-[100] h-16",
          "transition-all duration-300",
          scrolled
            ? "bg-[rgba(7,9,16,0.92)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_40px_rgba(0,0,0,0.5)]"
            : "bg-[rgba(7,9,16,0.75)] backdrop-blur-xl border-b border-white/[0.04]",
          /* Mount animation */
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          "transition-[opacity,transform,background-color,box-shadow] duration-300 ease-out",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-[#4f7dff] rounded-lg"
            aria-label="NoOps Studios — Home"
          >
            <LogoMark />
            <span
              style={{ fontFamily: "var(--font-syne)" }}
              className="text-[17px] font-[800] text-[#f1f5f9] tracking-tight
                         group-hover:text-white transition-colors duration-200"
            >
              NoOps
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "relative px-4 py-2 text-[14px] rounded-lg transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-[#4f7dff] focus-visible:outline-offset-2",
                  isActive(link.href)
                    ? "text-[#f1f5f9]"
                    : "text-[#8b95a8] hover:text-[#f1f5f9]",
                ].join(" ")}
                style={{ fontFamily: "var(--font-dm-sans)" }}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}

                {/* Active indicator dot */}
                {isActive(link.href) && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2
                               w-1 h-1 rounded-full bg-[#4f7dff]
                               shadow-[0_0_6px_rgba(79,125,255,0.8)]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-[500] text-white
                         bg-gradient-to-r from-[#4f7dff] to-[#7c5cfc]
                         hover:shadow-[0_0_28px_rgba(79,125,255,0.45)] hover:scale-[1.02]
                         active:scale-[0.98] transition-all duration-200
                         focus-visible:outline-2 focus-visible:outline-[#4f7dff] focus-visible:outline-offset-2
                         min-h-[44px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <Zap size={13} strokeWidth={2.5} aria-hidden="true" />
              Start a Project
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl
                       text-[#8b95a8] hover:text-[#f1f5f9] hover:bg-white/[0.06]
                       transition-colors duration-200
                       focus-visible:outline-2 focus-visible:outline-[#4f7dff]"
          >
            {open
              ? <X    size={20} strokeWidth={1.75} aria-hidden="true" />
              : <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
            }
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer Backdrop ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-[98] md:hidden bg-[#070910]/80 backdrop-blur-sm",
          "transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "fixed top-0 right-0 bottom-0 z-[99] md:hidden",
          "w-[min(320px,85vw)]",
          "bg-[#0d1117] border-l border-white/[0.06]",
          "flex flex-col",
          "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06] shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
            aria-label="Home"
          >
            <LogoMark />
            <span
              style={{ fontFamily: "var(--font-syne)" }}
              className="text-[17px] font-[800] text-[#f1f5f9]"
            >
              NoOps
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-9 h-9 rounded-lg
                       text-[#8b95a8] hover:text-[#f1f5f9] hover:bg-white/[0.06]
                       transition-colors duration-200"
          >
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={[
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px]",
                "transition-all duration-200",
                "focus-visible:outline-2 focus-visible:outline-[#4f7dff]",
                isActive(link.href)
                  ? "text-[#f1f5f9] bg-[#4f7dff]/10 border border-[#4f7dff]/20"
                  : "text-[#8b95a8] hover:text-[#f1f5f9] hover:bg-white/[0.04]",
              ].join(" ")}
              style={{
                fontFamily: "var(--font-dm-sans)",
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {/* Active dot */}
              <span
                className={[
                  "w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200",
                  isActive(link.href) ? "bg-[#4f7dff]" : "bg-[#3d4a5c]",
                ].join(" ")}
                aria-hidden="true"
              />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="p-4 shrink-0 border-t border-white/[0.06]">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full
                       text-[14px] font-[500] text-white min-h-[48px]
                       bg-gradient-to-r from-[#4f7dff] to-[#7c5cfc]
                       hover:shadow-[0_0_28px_rgba(79,125,255,0.4)]
                       active:scale-[0.98] transition-all duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <Zap size={14} strokeWidth={2.5} aria-hidden="true" />
            Start a Project →
          </Link>
          <p
            className="text-center text-[11px] text-[#3d4a5c] mt-3"
            style={{ fontFamily: "var(--font-dm-mono)" }}
          >
            hello@noops.studio
          </p>
        </div>
      </div>
    </>
  );
}
