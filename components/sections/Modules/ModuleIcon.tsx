import Image from "next/image";
import { moduleIconFor } from "@/assets/icons";

export interface ModuleIconProps {
  /** lucide icon key from seed.json (e.g. "users", "shopping-cart"). */
  iconName: string;
  active?: boolean;
  className?: string;
}

export function ModuleIcon({ iconName, active = false, className }: ModuleIconProps) {
  const asset = moduleIconFor(iconName);
  return (
    <Image
      src={active ? asset.active : asset.default}
      alt=""
      aria-hidden
      className={className}
    />
  );
}
