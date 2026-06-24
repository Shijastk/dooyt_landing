import type { KeyboardEventHandler } from "react";
import { ModuleIcon } from "./ModuleIcon";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";


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
