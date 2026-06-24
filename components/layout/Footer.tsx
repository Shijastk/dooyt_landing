import Link from "next/link";
import Image from "next/image";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import type { ReactNode } from "react";
import { logo } from "@/assets/images";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H17V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H8v3h2.5V21h3z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.5 3h6.1l4.2 5.6L17.5 3zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.3 8.4h3.3V21H3.3V8.4zm5.4 0h3.16v1.72h.05c.44-.83 1.52-1.72 3.12-1.72 3.34 0 3.96 2.2 3.96 5.05V21h-3.3v-5.56c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94V21H8.7V8.4z" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/#benefits" },
      { label: "Modules", href: "/#features" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Feature", href: "/#features" },
      { label: "Benefits", href: "/#benefits" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Privacy policy", href: "#" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

function StoreBadge({
  Icon,
  top,
  bottom,
}: {
  Icon: typeof FaApple;
  top: string;
  bottom: string;
}) {
  return (
    <Link
      href="#"
      className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-black px-4 py-2.5 transition-colors hover:border-white/40"
    >
      <Icon className="h-7 w-7 text-white" />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] text-white/70">{top}</span>
        <span className="text-base font-semibold text-white">{bottom}</span>
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="container-page relative z-10 pt-16 pb-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand + description + store badges */}
          <div className="max-w-sm">
            <Image
              src={logo}
              alt="Dooyt"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StoreBadge Icon={FaApple} top="Download on the" bottom="App Store" />
              <StoreBadge Icon={BiLogoPlayStore} top="GET IT ON" bottom="Google Play" />
            </div>
          </div>

          {/* Link columns — grouped on the right */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 sm:gap-x-16 lg:gap-x-24">
            {COLUMNS.map((col, i) => (
              <div key={`${col.title}-${i}`}>
                <h3 className="text-base font-semibold text-white">{col.title}</h3>
                <ul className="mt-5 space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-brand-500"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + copyright + socials */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t !border-dark pt-6 sm:flex-row">
          <p className="text-sm text-white/60">
            Copyright © {new Date().getFullYear()} DOOYT. All Rights Reserved
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <FooterLink
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Icon className="h-4.5 w-4.5" />
              </FooterLink>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page pointer-events-none relative h-[18vw] max-h-[12.5rem] min-h-[5rem] overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-x-0 -top-[0.14em] block select-none whitespace-nowrap text-center font-medium leading-none tracking-tight"
          style={{
            fontSize: "clamp(8rem, 28vw, 27rem)",
            backgroundImage:
              "linear-gradient(180deg, #7a2b0f 0%, #c9491b 28%, #f15a22 60%, #ff6f1c 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Dooyt
        </span>
      </div>
    </footer>
  );
}
