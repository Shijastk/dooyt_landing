"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "zoom";

type RevealProps = {
  children: ReactNode;
  /** Animation origin. `up` (default) slides in from below. */
  direction?: Direction;
  /** Delay in ms — use to stagger items in a group. */
  delay?: number;
  /** Tag to render. Defaults to a `div`. */
  as?: ElementType;
  /** Re-animate every time it enters the viewport (default: once). */
  repeat?: boolean;
  className?: string;
  /** How much of the element must be visible before it reveals (0–1). */
  amount?: number;
};

/**
 * Reveal — scroll-triggered entrance animation.
 *
 * Cheap by construction: uses a single IntersectionObserver per element (work
 * happens off the main thread) and animates ONLY `opacity` + `transform`, the
 * two properties the GPU compositor can animate without layout/paint. That
 * keeps it smooth on low-end CPUs/GPUs and mobile.
 *
 * Respects `prefers-reduced-motion` — reduced-motion users see content
 * immediately with no transform.
 *
 * @example
 * <Reveal direction="up" delay={120}>
 *   <Card />
 * </Reveal>
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  as,
  repeat = false,
  className,
  amount = 0.15,
}: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: skip the animation entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat) {
            setVisible(false);
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [repeat, amount]);

  return (
    <Tag
      ref={ref}
      data-reveal={direction}
      data-visible={visible ? "true" : "false"}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
