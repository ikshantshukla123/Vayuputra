"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 transition-all duration-300 sm:px-10 ${
          scrolled
            ? "bg-black/80 shadow-2xl backdrop-blur-lg"
            : "bg-transparent"
        }`}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-200 transition-colors hover:text-amber-200"
        >
          <span className="text-2xl">🌬️</span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-semibold tracking-[0.35em] font-[var(--font-serif)]">
              VAYUPUTRA
            </span>
            <span className="text-xs tracking-[0.4em] text-slate-400">
              वायुपुत्र
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs uppercase tracking-wider text-slate-400 transition hover:text-slate-200"
              >
                <span>{link.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-px w-full bg-amber-400"
                    transition={{ duration: 0.3 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <Link
          href="/dashboard"
          className="rounded-full border border-amber-400/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 transition hover:border-amber-400 hover:text-amber-100"
        >
          Start Journey
        </Link>
      </nav>
    </header>
  );
}
