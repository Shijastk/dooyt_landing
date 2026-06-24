import type { StaticImageData } from "next/image";

import crm from "./crm.png";
import crmActive from "./crmactive.png";
import management from "./management.png";
import managementActive from "./managementactive.png";
import shop from "./shop.png";
import shopActive from "./shopactive.png";
import inventory from "./inventory.png";
import inventoryActive from "./inventoryactive.png";

import rocketGradient from "./rocketgradient.png";
import clockGradient from "./clockgradient.png";
import laptopGradient from "./laptopgradient.png";
import walkGradient from "./walk.png";
import groupGradient from "./groupgraeient.png";
import homeGradient from "./homegradient.png";
import growthGradient from "./growthgradient.png";

/*
  Barrel for the PNG module icons in this folder.

  Each icon ships in two variants: the default (dark/orange) glyph and an
  `active` (white) glyph used on the solid orange chip. Static imports keep the
  files in Next.js' image pipeline (optimization + intrinsic sizing) and make
  them importable from anywhere via `@/assets/icons`.
*/

/** A module icon and its white "active" variant (shown on the orange chip). */
export interface ModuleIconAsset {
  default: StaticImageData;
  active: StaticImageData;
}

/** Every available PNG icon, keyed by a short name. */
export const moduleIcons = {
  crm: { default: crm, active: crmActive },
  management: { default: management, active: managementActive },
  shop: { default: shop, active: shopActive },
  inventory: { default: inventory, active: inventoryActive },
} satisfies Record<string, ModuleIconAsset>;

export type ModuleIconKey = keyof typeof moduleIcons;

/**
 * Gradient PNG glyphs used by the "Experience the Dooyt Advantage" chip cloud.
 * Each ships pre-rendered with its orange gradient, so they render as-is (no
 * tint or CSS badge needed).
 */
export const advantageIcons = {
  rocket: rocketGradient,
  clock: clockGradient,
  laptop: laptopGradient,
  walk: walkGradient,
  group: groupGradient,
  home: homeGradient,
  growth: growthGradient,
} satisfies Record<string, StaticImageData>;

export type AdvantageIconKey = keyof typeof advantageIcons;

/**
 * Maps the lucide `icon` strings used in seed.json to one of the four PNG
 * icons we ship. Anything unmapped falls back to the CRM document glyph — the
 * generic icon the design uses for modules without a bespoke one (Accounting,
 * HRMS, Project Management, Marketing Automation).
 */
const SEED_ICON_TO_KEY: Record<string, ModuleIconKey> = {
  "check-square": "management", // Task Management
  "shopping-cart": "shop", // E-commerce
  boxes: "inventory", // Inventory
};

/** Resolve a seed `icon` string to its icon asset (CRM document by default). */
export function moduleIconFor(seedIcon: string): ModuleIconAsset {
  return moduleIcons[SEED_ICON_TO_KEY[seedIcon] ?? "crm"];
}
