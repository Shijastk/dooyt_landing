"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LiquidGlassButtonLink } from "@/components/ui/LiquidGlassButton";
import { logo } from "@/assets/images";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact Us" },
];

/**
 * NavLink — routes (`/contact`) go through next/link for SPA navigation, while
 * in-page hash links (`/#features`) render a plain anchor so the browser's
 * native fragment navigation runs. The App Router's <Link> concatenates
 * hashes (e.g. `/#a#b`) when hopping between sections, so we avoid it there.
 */
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center transition-all duration-200 hover:opacity-90"
    >
      <Image
        src={logo}
        alt="Dooyt"
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full px-8 py-4 md:px-6">
      <nav
        className={[
          "relative mx-auto flex max-w-7xl items-center justify-between rounded-xl bg-brand-50 px-6 py-4 transition-all duration-300 lg:px-6 lg:py-3",
          scrolled ? "":""
        ].join(" ")}
      >
        <Logo />

        {/* Desktop links — absolutely centered */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-all duration-200 hover:text-brand-500 hover:scale-105 inline-block"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — liquid-glass button (black variant) */}
        <LiquidGlassButtonLink
          href="/contact?type=demo"
          variant="black"
          size="sm"
          showIcon={false}
          className="max-md:hidden"
        >
          Request A Demo
        </LiquidGlassButtonLink>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden !px-2 hover:bg-black/5 rounded-full"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-brand-100 bg-brand-50 shadow-lg md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition-all duration-200 hover:bg-white/60 hover:text-brand-500"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <LiquidGlassButtonLink
                href="/contact?type=demo"
                variant="black"
                size="sm"
                showIcon={false}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Request A Demo
              </LiquidGlassButtonLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}