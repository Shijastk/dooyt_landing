"use client";

import type { KeyboardEvent } from "react";
import type { Module } from "@/types";
import { ModuleChip } from "./ModuleChip";


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
    const next = ((index % len) + len) % len;
    const id = modules[next].id;
    onChange(id);
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
