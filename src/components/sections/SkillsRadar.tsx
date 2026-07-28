"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skillAxes } from "@/content/skills";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const SIZE = 340;
const CENTER = SIZE / 2;
const RADIUS = 124;
const LEVELS = 4;

type Series = "sommay" | "ramansh";

const seriesMeta: Record<Series, { label: string; color: string }> = {
  sommay: { label: "Sommay", color: "#4d7cff" },
  ramansh: { label: "Ramansh", color: "#34d99b" },
};

function pointFor(index: number, total: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * RADIUS;
  return { x: CENTER + Math.cos(angle) * r, y: CENTER + Math.sin(angle) * r };
}

/**
 * Hand-built SVG radar chart — no charting dependency, no client-side layout
 * work, and fully readable by screen readers via the table fallback below.
 */
export function SkillsRadar() {
  const prefersReduced = usePrefersReducedMotion();
  const gradientId = useId();
  const [active, setActive] = useState<Record<Series, boolean>>({
    sommay: true,
    ramansh: true,
  });

  const axes = skillAxes;

  const polygons = useMemo(() => {
    return (Object.keys(seriesMeta) as Series[]).map((series) => ({
      series,
      path: axes
        .map((axis, index) => {
          const { x, y } = pointFor(index, axes.length, axis[series]);
          return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ")
        .concat(" Z"),
    }));
  }, [axes]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="relative mx-auto w-full max-w-[420px]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Radar chart comparing self-assessed skill levels for Sommay and Ramansh"
        >
          <defs>
            <radialGradient id={gradientId}>
              <stop offset="0%" stopColor="#4d7cff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#4d7cff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill={`url(#${gradientId})`} />

          {Array.from({ length: LEVELS }).map((_, level) => (
            <circle
              key={level}
              cx={CENTER}
              cy={CENTER}
              r={(RADIUS / LEVELS) * (level + 1)}
              fill="none"
              stroke="currentColor"
              className="text-hairline"
              strokeWidth="1"
            />
          ))}

          {axes.map((axis, index) => {
            const outer = pointFor(index, axes.length, 100);
            const labelPoint = pointFor(index, axes.length, 126);
            return (
              <g key={axis.label}>
                <line
                  x1={CENTER}
                  y1={CENTER}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="currentColor"
                  className="text-hairline"
                  strokeWidth="1"
                />
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor={
                    Math.abs(labelPoint.x - CENTER) < 12
                      ? "middle"
                      : labelPoint.x > CENTER
                        ? "start"
                        : "end"
                  }
                  dominantBaseline="middle"
                  className="fill-[var(--text-subtle)] text-[9px] uppercase tracking-[0.12em]"
                >
                  {axis.label}
                </text>
              </g>
            );
          })}

          {polygons.map(({ series, path }) =>
            active[series] ? (
              <motion.path
                key={series}
                d={path}
                fill={seriesMeta[series].color}
                fillOpacity={0.14}
                stroke={seriesMeta[series].color}
                strokeWidth="1.75"
                strokeLinejoin="round"
                initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              />
            ) : null,
          )}
        </svg>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(seriesMeta) as Series[]).map((series) => (
            <button
              key={series}
              type="button"
              aria-pressed={active[series]}
              onClick={() => setActive((state) => ({ ...state, [series]: !state[series] }))}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-display text-sm transition-colors",
                active[series]
                  ? "border-electric/40 bg-slate-surface text-fg"
                  : "border-hairline text-fg-subtle hover:text-fg-muted",
              )}
            >
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: seriesMeta[series].color }}
              />
              {seriesMeta[series].label}
            </button>
          ))}
        </div>

        {/* Accessible data table — the same numbers, without relying on the chart. */}
        <table className="mt-7 w-full text-left text-sm">
          <caption className="sr-only">
            Self-assessed skill levels out of 100 for Sommay and Ramansh Khanna
          </caption>
          <thead>
            <tr className="text-xs uppercase tracking-[0.16em] text-fg-subtle">
              <th scope="col" className="pb-3 font-medium">Skill</th>
              <th scope="col" className="pb-3 text-right font-medium">Sommay</th>
              <th scope="col" className="pb-3 text-right font-medium">Ramansh</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--hairline)]">
            {axes.map((axis) => (
              <tr key={axis.label}>
                <th scope="row" className="py-2.5 font-normal text-fg-muted">{axis.label}</th>
                <td className="py-2.5 text-right tabular-nums text-fg">{axis.sommay}</td>
                <td className="py-2.5 text-right tabular-nums text-fg">{axis.ramansh}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-5 text-xs leading-relaxed text-fg-subtle">
          Values are self-assessed on a 0–100 scale relative to peers of the same age. They are a
          guide to focus and experience, not a certification or test score.
        </p>
      </div>
    </div>
  );
}
