"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // Light, natural easing — fast to settle so it never feels heavy.
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      // Keep native scrolling on touch for the best mobile feel + performance.
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    // Expose for other client components (e.g. nav scroll-to) if needed.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Don't burn cycles while the tab is in the background.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Smooth-scroll in-page anchor links, clearing the sticky header.
    // Handles both `#id` and root-relative `/#id` hrefs. When the target
    // section isn't on the current page (e.g. clicking a `/#pricing` link from
    // /contact) we DON'T intercept — the browser navigates to the home page
    // natively, which also avoids the App Router's hash-concatenation quirk.
    const HEADER_OFFSET = 88;
    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const match = href?.match(/^\/?#(.+)$/);
      if (!match) return;

      const el = document.getElementById(match[1]);
      if (!el) return; // Section lives on another page — let navigation happen.

      event.preventDefault();
      lenis.scrollTo(el, { offset: -HEADER_OFFSET });
      // Keep the URL in sync with a clean, single hash (never concatenated).
      history.pushState(null, "", `#${match[1]}`);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
