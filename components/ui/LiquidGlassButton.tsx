import { Phone } from "lucide-react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

type Variant = "orange" | "black" | "light" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

interface VariantStyle {

  text: string;
  style: CSSProperties;
  sheen: string;
}

const VARIANTS: Record<Variant, VariantStyle> = {
  // Liquid-glass feel — solid orange fill, multi-directional inset rim + frosted blur.
  orange: {
    text: "text-white",
    style: {
      background: "#f15a22",
      backdropFilter: "blur(36px)",
      WebkitBackdropFilter: "blur(36px)",
      boxShadow: `
        inset 0 1px 2px rgba(255, 255, 255, 0.5),
        inset 0 -1px 2px rgba(207, 85, 3, 0.25),
        inset 1px 0 2px rgba(255, 255, 255, 0.25),
        inset -1px 0 2px rgba(0, 0, 0, 0.1)
      `,
    },
    sheen: "bg-white/15",
  },
  // Liquid-glass feel — solid black fill, multi-directional inset rim & frosted blur.
  black: {
    text: "text-white",
    style: {
      background: "#000000",
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box",
      backdropFilter: "blur(36px)",
      WebkitBackdropFilter: "blur(36px)",
      boxShadow: `
        inset 0 1px 2px rgba(255, 255, 255, 0.5),
        inset 0 -1px 2px rgba(255, 255, 255, 0.15),
        inset 1px 0 2px rgba(255, 255, 255, 0.25),
        inset -1px 0 2px rgba(0, 0, 0, 0.4)
      `,
    },
    sheen: "bg-white/15",
  },
  light: {
    text: "text-neutral-900",
    style: {
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 0px rgba(0,0,0,0.04), 0 6px -2px rgba(0,0,0,0.06)",
    },
    sheen: "bg-black/[0.04]",
  },
  // Ghost — transparent surface, dark text, no rim. The unselected module-chip
  // look; pair with hover utilities from the caller for a tint on hover.
  ghost: {
    text: "text-ink",
    style: {
      backgroundColor: "transparent",
    },
    sheen: "bg-brand-100/40",
  },
  // The "Select plan" look.
  dark: {
    text: "text-white",
    style: {
      backgroundColor: "#0a0a0a",
      boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.18)",
    },
    sheen: "bg-white/10",
  },
};

const sizes: Record<Size, string> = {
  sm: "gap-2 px-3 py-2 text-md [--radius:8px]",
  md: "gap-3 px-9 py-4 text-3xl [--radius:12px]",
  lg: "gap-4 px-12 py-5 text-4xl [--radius:16px]",
};

const iconSizes: Record<Size, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const base =
  "group relative isolate inline-flex cursor-pointer select-none items-center justify-center overflow-hidden " +
  "rounded-[var(--radius)] font-normal " +
  "transition-all duration-200 ease-in-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-95 " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 " +
  "disabled:pointer-events-none disabled:opacity-60";

interface InnerProps {
  icon: ReactNode;
  showIcon: boolean;
  sheen: string;
  children: ReactNode;
}

function GlassContent({ icon, showIcon, sheen, children }: InnerProps) {
  return (
    <>
      {/* Liquid sheen — a soft diagonal band that sweeps across on hover. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -inset-y-2 -left-1/3 w-1/3 -skew-x-12 ${sheen} blur-md transition-transform duration-700 ease-out group-hover:translate-x-[420%]`}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">
        {showIcon && icon}
        {children}
      </span>
    </>
  );
}

interface CommonProps {
  variant?: Variant;
  /** Any CSS colour — overrides the variant's background. Supplied by the caller. */
  color?: string;
  size?: Size;
  /** Custom leading icon. Defaults to a phone glyph; set `showIcon={false}` to hide. */
  icon?: ReactNode;
  showIcon?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

function resolve(variant: Variant, color: string | undefined, size: Size) {
  const v = VARIANTS[variant];
  return {
    sheen: v.sheen,
    className: (cn?: string) => [base, v.text, sizes[size], cn].filter(Boolean).join(" "),
    // Background colour override merges on top of the variant's style.
    style: (s?: CSSProperties): CSSProperties => ({
      ...v.style,
      ...(color ? { backgroundColor: color } : null),
      ...s,
    }),
  };
}

export function LiquidGlassButton({
  variant = "black",
  color,
  size = "md",
  icon,
  showIcon = false,
  className,
  style,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "color">) {
  const r = resolve(variant, color, size);
  return (
    <button className={r.className(className)} style={r.style(style)} {...props}>
      <GlassContent
        icon={icon ?? <Phone className={`${iconSizes[size]} fill-current`} aria-hidden />}
        showIcon={showIcon}
        sheen={r.sheen}
      >
        {children}
      </GlassContent>
    </button>
  );
}

// Renders a native anchor (not next/link) so hash links like `/#demo` use the
// browser's own fragment navigation — the App Router's <Link> concatenates
// hashes (e.g. `/#a#b`) when hopping between in-page sections.
export function LiquidGlassButtonLink({
  variant = "black",
  color,
  size = "md",
  icon,
  showIcon = false,
  className,
  style,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<"a">, "color">) {
  const r = resolve(variant, color, size);
  return (
    <a className={r.className(className)} style={r.style(style)} {...props}>
      <GlassContent
        icon={icon ?? <Phone className={`${iconSizes[size]} fill-current`} aria-hidden />}
        showIcon={showIcon}
        sheen={r.sheen}
      >
        {children}
      </GlassContent>
    </a>
  );
}
