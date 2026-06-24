import type { KeyboardEventHandler } from "react";
import { ModuleIcon } from "./ModuleIcon";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";

/**
 * ModuleChip — a single selectable module pill (icon + label), built on the
 * shared <LiquidGlassButton>: the active chip uses the solid `orange` glass
 * surface, inactive chips use the transparent `ghost` variant with a hover
 * tint. Reuse this for every chip in the module switcher; don't restyle chips
 * inline. The tab a11y props (`id`, `controls`, `tabIndex`, `onKeyDown`) are
 * supplied by ModuleTabs when used as a tablist; focus is moved by `id`, so no
 * ref is needed.
 */
export interface ModuleChipProps {
  /** lucide icon key from seed.json (e.g. "users", "shopping-cart"). */
  iconName: string;
  label: string;
  active?: boolean;
  onSelect?: () => void;
  /** ARIA wiring set by ModuleTabs. */
  id?: string;
  controls?: string;
  tabIndex?: number;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
}

export function ModuleChip({
  iconName,
  label,
  active = false,
  onSelect,
  id,
  controls,
  tabIndex,
  onKeyDown,
}: ModuleChipProps) {
  return (
    <LiquidGlassButton
      type="button"
      role="tab"
      id={id}
      size="sm"
      variant={active ? "orange" : "ghost"}
      showIcon
      icon={<ModuleIcon iconName={iconName} active={active} className="h-5 w-5 shrink-0 object-contain" />}
      aria-controls={controls}
      aria-selected={active}
      tabIndex={tabIndex}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={[
        "text-md font-semibold",
        active ? "" : "hover:bg-brand-50 hover:text-brand-700",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </LiquidGlassButton>
  );
}
