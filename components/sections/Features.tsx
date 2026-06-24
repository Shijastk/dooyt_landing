import { BarChart3, Lock, Plug, Smartphone, Workflow, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Real-time dashboards",
    description:
      "Get instant visibility across departments with custom dashboards and live reporting.",
  },
  {
    icon: Workflow,
    title: "Automated workflows",
    description:
      "Replace manual busywork with automations that move tasks forward on their own.",
  },
  {
    icon: Lock,
    title: "Role-based access",
    description:
      "Keep data secure with granular permissions, encryption in transit and at rest.",
  },
  {
    icon: Plug,
    title: "Powerful integrations",
    description:
      "Connect the tools you already use with API integrations and custom workflows.",
  },
  {
    icon: Smartphone,
    title: "Work from anywhere",
    description:
      "Access Dooyt on the web and through native iOS and Android apps.",
  },
  {
    icon: Zap,
    title: "Fast onboarding",
    description:
      "Get your team up and running in minutes with an intuitive, guided setup.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          align="left"
          eyebrow="Features"
          title="How Dooyt Can Simplify Your Business Management?"
          subtitle="Dooyt is renowned as the best ERP system for small companies and has many
features that help to simplify every aspect of your business on a single, easyto-use platform."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-brand-100/50"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
