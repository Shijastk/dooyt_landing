import Image, { type StaticImageData } from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { realtime, taskManagement } from "@/assets/images";

/*
  FeaturedCards — a horizontal-scroll rail that alternates image cards and
  content cards. Two image cards (the real-time dashboard + task history shots)
  and two content cards describe the matching capability. The rail scrolls
  horizontally with scroll-snap so each card lands cleanly into view on touch
  and trackpad.
*/

type FeaturedCard =
  | { kind: "image"; image: StaticImageData; alt: string }
  | { kind: "content"; title: any; description: string };

const CARDS: FeaturedCard[] = [
  {
    kind: "image",
    image: realtime,
    alt: "Lead source summary dashboard showing a live donut chart of lead channels",
  },
  {
    kind: "content",
    title: (
    <>
      Real-Time Dashboards 
      <br />
     for Every Department
    </>
  ),

    description:
      "Dooyt ERP has a dedicated dashboard for each module. This visually interactive dashboard provides instant access to data and business performance, tracks progress, and makes quick, informed decisions anytime.",
  },
  {
    kind: "image",
    image: taskManagement,
    alt: "Task history panel showing tasks moving through started, hold and finished states",
  },
  {
    kind: "content",
    title: (
      <>
        A Clear Timeline
        <br />
        for Every Task
      </>
    ),
    description:
      "Follow each task as it moves from started to hold to finished. Dooyt's time-stamped task history gives your team a transparent view of progress, so work stays accountable and nothing slips through the cracks.",
  },
];

export function FeaturedCards() {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Features"
            title="How Dooyt Can Simplify Your Business Management?"
            subtitle="Dooyt is renowned as the best ERP system for small companies and has many
features that help to simplify every aspect of your business on a single, easyto-use platform."
          />
        </Reveal>
      </div>

      {/* Full-bleed rail so cards can scroll past the page gutter on the right. */}
      <div className="no-scrollbar mt-14 overflow-x-auto scroll-smooth">
        <ul className="container-page flex snap-x snap-mandatory gap-6 pb-2">
          {CARDS.map((card, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 90}
              className="w-[350px] shrink-0 snap-start sm:h-[320px] sm:w-[460px]"
            >
              {card.kind === "image" ? (
                <div className="h-full w-full overflow-hidden rounded-lg border-line shadow-sm">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    placeholder="blur"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full flex-col justify-center rounded-lg bg-brand-50 p-8 sm:p-10">
                  <h3 className="text-2xl mt-6 font-medium leading-wider tracking-tighter   text-ink sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-6 text-md leading-relaxed text-muted sm:text-lg">
                    {card.description}
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
