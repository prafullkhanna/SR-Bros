import Link from "next/link";
import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import type { Brother } from "@/types";
import { TiltCard } from "@/components/motion/TiltCard";
import { PlaceholderAvatar } from "@/components/effects/PlaceholderArt";
import { Tag } from "@/components/ui/Tag";

export function ProfileCard({ brother }: { brother: Brother }) {
  const traits = brother.subjects ?? brother.interests ?? [];

  return (
    <TiltCard intensity={5} className="h-full">
      <article className="gradient-border group flex h-full flex-col rounded-[var(--radius-card)] border border-hairline bg-graphite/70 p-7 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-8">
        <div className="flex items-start gap-5">
          <PlaceholderAvatar
            name={brother.name}
            accent={brother.accent}
            className="h-20 w-20 shrink-0 rounded-2xl"
          />
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold leading-tight">{brother.name}</h3>
            <p className="mt-1 text-sm text-cyan-accent">{brother.role}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-subtle">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={13} aria-hidden />
                {brother.grade} · Age {brother.age}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} aria-hidden />
                {brother.location}
              </span>
            </p>
          </div>
        </div>

        <p className="mt-6 flex-1 text-sm leading-relaxed text-fg-muted">{brother.bio[0]}</p>

        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-fg-subtle">{brother.school}</p>

        {traits.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {traits.slice(0, 5).map((trait) => (
              <li key={trait}>
                <Tag>{trait}</Tag>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/brothers/${brother.id}`}
          className="mt-7 inline-flex items-center gap-1.5 font-display text-sm text-fg transition-colors hover:text-cyan-accent"
        >
          Full profile
          <ArrowUpRight
            size={15}
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </article>
    </TiltCard>
  );
}
