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

export function DooytAdvantage() {
  return (
    <div>
      
      {/* Divider: bold in the centre, fading to thin at both edges. */}
      <div className="my-20 h-0.5 w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <p className="text-center text-base font-medium text-muted">
        Experience the Dooyt Advantage
      </p>

      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-4">
        {ADVANTAGES.map(({ icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-brand-50 via-brand-50 to-white px-4 py-2 text-base font-medium text-ink shadow-sm ring-1 ring-inset ring-gray-300/20"
          >
            <Image
              src={advantageIcons[icon]}
              alt=""
              aria-hidden
              className="h-4 w-4 shrink-0 object-contain"
            />
            {label}
          </span>
        ))}
      </div>

    </div>
  );
}
