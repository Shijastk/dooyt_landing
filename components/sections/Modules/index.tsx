"use client";

import { useState } from "react";
import { fetchModules } from "@/lib/api-client";
import { useFetch } from "@/lib/use-fetch";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { ModulesSkeleton } from "@/components/ui/Skeletons";
import { ModuleTabs } from "./ModuleTabs";
import { ModuleShowcase } from "./ModuleShowcase";

const tabId = (id: string) => `module-tab-${id}`;
const panelId = (id: string) => `module-panel-${id}`;

export function Modules() {
  const { data, loading, error, refetch } = useFetch(() => fetchModules());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const modules = data ?? [];
  const active = modules.find((m) => m.id === selectedId) ?? modules[0] ?? null;

  return (
    <section id="modules" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Modules" title="Modules That Do More" />

        {loading ? (
          <ModulesSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : !active ? (
          <EmptyState message="No modules available." />
        ) : (
          <>
            <ModuleTabs
              modules={modules}
              activeId={active.id}
              onChange={setSelectedId}
              tabId={tabId}
              panelId={panelId}
            />
            <ModuleShowcase
              module={active}
              id={panelId(active.id)}
              labelledBy={tabId(active.id)}
            />
          </>
        )}
      </div>
    </section>
  );
}
