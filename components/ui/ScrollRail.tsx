"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type ScrollRailProps = {
  /** The scrollable content — typically a flex <ul> of cards. */
  children: ReactNode;
  /** Classes for the outer wrapper (e.g. spacing above the rail). */
  className?: string;
};

type Metrics = {
  /** The custom scrollbar only shows once the content actually overflows. */
  overflowing: boolean;
  /** Thumb width as a % of the track. */
  widthPct: number;
  /** Thumb offset from the track's left edge, as a % of the track. */
  leftPct: number;
};

const HIDDEN: Metrics = { overflowing: false, widthPct: 0, leftPct: 0 };

/* Smallest thumb (as % of track) so it stays easy to grab on long rails. */
const MIN_THUMB_PCT = 18;

/**
 * Horizontal card rail with native swipe scrolling plus a thin, custom
 * scrollbar that mirrors and drives the scroll position.
 *
 * Why not a CSS `::-webkit-scrollbar`? Mobile Safari and most Android browsers
 * auto-hide overlay scrollbars during touch scrolling and ignore custom widths,
 * so on phones — exactly where this matters — there'd be nothing to see. This
 * JS thumb renders identically everywhere and doubles as a swipe affordance.
 *
 * Native touch swipe keeps working; the thumb is also draggable (pointer events
 * cover mouse, touch and pen) and the track is tap-to-jump.
 */
export function ScrollRail({ children, className = "" }: ScrollRailProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ startX: number; startLeft: number } | null>(null);
  const [metrics, setMetrics] = useState<Metrics>(HIDDEN);

  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    if (max <= 1) {
      setMetrics((prev) => (prev.overflowing ? HIDDEN : prev));
      return;
    }
    const widthPct = Math.max(MIN_THUMB_PCT, (clientWidth / scrollWidth) * 100);
    const leftPct = (scrollLeft / max) * (100 - widthPct);
    setMetrics({ overflowing: true, widthPct, leftPct });
  }, []);

  // Re-measure on mount, on viewport resize, and whenever the rail itself
  // changes size (font load, breakpoint swap, content change).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const onThumbPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    e.stopPropagation(); // don't let the track's tap-to-jump also fire
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startLeft: el.scrollLeft };
    // Drag must track the finger 1:1, so bypass the rail's smooth scrolling.
    el.style.scrollBehavior = "auto";
  };

  const onThumbPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!drag || !el || !track) return;
    const max = el.scrollWidth - el.clientWidth;
    // Match the rendered (clamped) thumb width so it tracks the finger exactly.
    const thumbFraction = Math.max(
      MIN_THUMB_PCT / 100,
      el.clientWidth / el.scrollWidth
    );
    const travel = track.clientWidth * (1 - thumbFraction);
    if (travel <= 0) return;
    // Map the pointer's pixel travel along the track back onto scroll distance.
    el.scrollLeft = drag.startLeft + ((e.clientX - drag.startX) / travel) * max;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const el = scrollRef.current;
    if (el) el.style.scrollBehavior = ""; // restore smooth scrolling
  };

  // Tapping the bare track jumps the rail toward that spot.
  const onTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const rect = track.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: fraction * max, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        onScroll={measure}
        className="no-scrollbar overflow-x-auto scroll-smooth"
      >
        {children}
      </div>

      {metrics.overflowing && (
        <div
          ref={trackRef}
          onPointerDown={onTrackPointerDown}
          aria-hidden
          className="relative mx-auto mt-5 h-1.5 w-40 max-w-[55%] cursor-pointer touch-none select-none rounded-full bg-brand-100/70"
        >
          <div
            onPointerDown={onThumbPointerDown}
            onPointerMove={onThumbPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ width: `${metrics.widthPct}%`, left: `${metrics.leftPct}%` }}
            className="absolute inset-y-0 cursor-grab touch-none rounded-full bg-brand-gradient transition-colors active:cursor-grabbing"
          />
        </div>
      )}
    </div>
  );
}
