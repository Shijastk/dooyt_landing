"use client";

import type { KeyboardEvent } from "react";
import type { Module } from "@/types";
import { ModuleChip } from "./ModuleChip";

/**
 * ModuleTabs — the wrapping row of <ModuleChip>s rendered as an ARIA tablist.
 *
 * Owns keyboard interaction (arrow keys + Home/End with wraparound) and the
 * roving tabindex; selection state itself lives in the parent so the showcase
 * panel can react to it. `tabId` / `panelId` keep the tab↔panel a11y wiring in
 * sync with <ModuleShowcase>.
 */
export interface ModuleTabsProps {
  modules: Module[];
  activeId: string;
  onChange: (id: string) => void;
  tabId: (id: string) => string;
  panelId: (id: string) => string;
}

export function ModuleTabs({
  modules,
  activeId,
  onChange,
  tabId,
  panelId,
}: ModuleTabsProps) {
  function focusTab(index: number) {
    const len = modules.length;
    if (len === 0) return;
    const next = ((index % len) + len) % len; // wrap both directions
    const id = modules[next].id;
    onChange(id);
    // Every tab is rendered, so the element already exists — move focus to it
    // by id (the shared LiquidGlassButton doesn't forward a ref).
    document.getElementById(tabId(id))?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(modules.length - 1);
        break;
    }
  }

  return (
    <div
      role="tablist"
      aria-label="Dooyt modules"
      className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3"
    >
      {modules.map((m, i) => (
        <ModuleChip
          key={m.id}
          iconName={m.icon}
          label={m.name}
          active={m.id === activeId}
          onSelect={() => onChange(m.id)}
          id={tabId(m.id)}
          controls={panelId(m.id)}
          tabIndex={m.id === activeId ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}
