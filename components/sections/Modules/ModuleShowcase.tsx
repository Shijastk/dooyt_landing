import Image, { type StaticImageData } from "next/image";
import type { Module } from "@/types";
import { crmDashboard, taskManagementDashboard, hrms } from "@/assets/images";

const MODULE_IMAGES: Record<string, StaticImageData> = {
  crm: crmDashboard,
  "task-management": taskManagementDashboard,
  hrms,
};
const FALLBACK_IMAGE = crmDashboard;

export interface ModuleShowcaseProps {
  module: Module;
  id: string;
  labelledBy: string;
}

export function ModuleShowcase({ module, id, labelledBy }: ModuleShowcaseProps) {
  const src = MODULE_IMAGES[module.id] ?? FALLBACK_IMAGE;

  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={0}
      className="bg-module-panel mt-12 overflow-hidden rounded-3xl border border-line pt-4 pb-6 lg:pb-0 px-4 outline-none focus-visible:ring-2 focus-visible:ring-brand-300 sm:pt-6 sm:px-6 lg:pt-10 lg:px-10"
    >
      <div
        key={module.id}
        className="animate-slide-fade grid items-center gap-8 lg:grid-cols-2"
      >
        <div className="overflow-hidden rounded-l-2xl shadow-sm">
          <Image
            src={src}
            alt={`${module.name} dashboard preview`}
            width={1000}
            height={750}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full object-cover object-top lg:h-80"
          />
        </div>

        <div className="lg:px-6">
          <h3 className="text-2xl font-medium text-ink sm:text-3xl">{module.name}</h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {module.description}
          </p>
        </div>
      </div>
    </div>
  );
}
