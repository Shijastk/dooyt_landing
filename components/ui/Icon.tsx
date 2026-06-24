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
