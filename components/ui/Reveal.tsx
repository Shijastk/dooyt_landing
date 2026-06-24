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
  direction?: Direction;
  delay?: number;
  as?: ElementType;
  repeat?: boolean;
  className?: string;
  amount?: number;
};

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
