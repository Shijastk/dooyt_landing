import {
  Boxes,
  Box,
  Calculator,
  CheckSquare,
  Kanban,
  Megaphone,
  ShoppingCart,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

/*
  Optimized icon handling.

  We import each lucide-react icon by name (named imports are tree-shakeable,
  so only these components ship to the client) and map the `icon` strings used
  in seed.json to their components. This avoids a dynamic barrel import like
  `import * as Icons` which would defeat tree-shaking and bloat the bundle.
*/
const ICONS: Record<string, LucideIcon> = {
  users: Users,
  "check-square": CheckSquare,
  "user-cog": UserCog,
  kanban: Kanban,
  calculator: Calculator,
  "shopping-cart": ShoppingCart,
  megaphone: Megaphone,
  boxes: Boxes,
};

export interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 2 }: IconProps) {
  const Cmp = ICONS[name] ?? Box;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
