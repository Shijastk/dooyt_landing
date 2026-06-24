import Image from "next/image";
import { advantageIcons, type AdvantageIconKey } from "@/assets/icons";

interface Advantage {
  icon: AdvantageIconKey;
  label: string;
}

const ADVANTAGES: Advantage[] = [
  { icon: "rocket", label: "Grows with you" },
  { icon: "clock", label: "Save time" },
  { icon: "laptop", label: "1-month free trial" },
  { icon: "walk", label: "Work on the go" },
  { icon: "group", label: "Better Teamwork & Collaboration" },
  { icon: "home", label: "Stay compliant" },
  { icon: "growth", label: "Keep Finances on Track" },
];

const ROW_ONE = ADVANTAGES.filter((_, i) => i % 2 === 0);
const ROW_TWO = ADVANTAGES.filter((_, i) => i % 2 === 1);

function AdvantageChip({ icon, label }: Advantage) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-br from-brand-50 via-brand-50 to-white px-4 py-2 text-base font-medium text-ink shadow-sm ring-1 ring-inset ring-gray-300/20">
      <Image
        src={advantageIcons[icon]}
        alt=""
        aria-hidden
        className="h-4 w-4 shrink-0 object-contain"
      />
      {label}
    </span>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Advantage[];
  direction: "left" | "right";
}) {
  const filled = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden">
      {[0, 1].map((track) => (
        <ul
          key={track}
          aria-hidden={track === 1}
          className={`flex shrink-0 items-center gap-3 pr-3 ${
            direction === "right" ? "animate-marquee-right" : "animate-marquee-left"
          }`}
        >
          {filled.map((advantage, i) => (
            <li key={`${advantage.label}-${i}`}>
              <AdvantageChip {...advantage} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function DooytAdvantage() {
  return (
    <div>
      {/* Divider: bold in the centre, fading to thin at both edges. */}
      <div className="my-20 h-0.5 w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <p className="text-center text-base font-medium text-muted">
        Experience the Dooyt Advantage
      </p>

      {/* Tablet / desktop — balanced centred pill cloud. */}
      <div className="mx-auto mt-8 hidden max-w-6xl flex-wrap items-center justify-center gap-4 sm:flex">
        {ADVANTAGES.map((advantage) => (
          <AdvantageChip key={advantage.label} {...advantage} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:hidden [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <MarqueeRow items={ROW_ONE} direction="left" />
        <MarqueeRow items={ROW_TWO} direction="right" />
      </div>
    </div>
  );
}
