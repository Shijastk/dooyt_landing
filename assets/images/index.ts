import type { StaticImageData } from "next/image";

import solar from "./solar.png";
import itAndSaas from "./itandsass.png";
import construction from "./constuction.png";
import education from "./education.png";
import manufacturing from "./manifacturing.png";
import ecommerce from "./ecommerse.png";
import logistics from "./logistics.png";
import digitalMarketing from "./digitalmarketing.png";
import realtime from "./realtime.png";
import taskManagement from "./taskmagement.png";
import hrms from "./hrms.png";

// Brand artwork, the hero shot, and the module-showcase dashboard screenshots.
import logo from "./logo.png";
import hero from "./hero.png";
import crmDashboard from "./crm.png";
import taskManagementDashboard from "./task-management.png";

export {
  solar,
  itAndSaas,
  construction,
  education,
  manufacturing,
  ecommerce,
  logistics,
  digitalMarketing,
  realtime,
  taskManagement,
  hrms,
  logo,
  hero,
  crmDashboard,
  taskManagementDashboard,
};

/** Industry photos keyed by the `id` used in seed.json / the API. */
export const industryImages = {
  solar,
  "it-saas": itAndSaas,
  construction,
  education,
  manufacturing,
  ecommerce,
  logistics,
  "digital-marketing": digitalMarketing,
} satisfies Record<string, StaticImageData>;

export type IndustryImageKey = keyof typeof industryImages;

/** Resolve an industry `id` to its photo (Solar panel shot as a fallback). */
export function industryImageFor(id: string): StaticImageData {
  return industryImages[id as IndustryImageKey] ?? solar;
}
