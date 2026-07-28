/**
 * Skill axes for the radar chart.
 * Values are self-assessed on a 0–100 scale, relative to peers of the same
 * age, and are presented in the UI as self-assessment — not certification.
 */
import type { SkillAxis } from "@/types";

export const skillAxes: SkillAxis[] = [
  { label: "Programming", sommay: 82, ramansh: 42 },
  { label: "AI", sommay: 72, ramansh: 26 },
  { label: "Robotics", sommay: 78, ramansh: 34 },
  { label: "Electronics", sommay: 70, ramansh: 30 },
  { label: "Engineering", sommay: 74, ramansh: 38 },
  { label: "Problem solving", sommay: 84, ramansh: 58 },
  { label: "Creativity", sommay: 80, ramansh: 82 },
  { label: "Leadership", sommay: 68, ramansh: 44 },
];

export const aiExperiments = [
  {
    title: "LLM workflows",
    description:
      "Decomposing repetitive tasks into constrained model steps with explicit output schemas and validation before any action is taken.",
    status: "ongoing" as const,
  },
  {
    title: "AI agents",
    description:
      "Multi-step agents that call tools and APIs instead of guessing, with every run logged so failures can be traced.",
    status: "ongoing" as const,
  },
  {
    title: "Prompt engineering",
    description:
      "Systematic prompt design — role framing, few-shot examples, output constraints — tested against real inputs rather than cherry-picked ones.",
    status: "ongoing" as const,
  },
  {
    title: "Automation pipelines",
    description:
      "Connecting model steps to real systems so a workflow ends in an action, not a paragraph of text.",
    status: "ongoing" as const,
  },
  {
    title: "Vision for rescue robotics",
    description:
      "Concept: on-device computer vision to distinguish survivors from debris and assess whether a path is passable.",
    status: "concept" as const,
  },
  {
    title: "Retrieval over private knowledge",
    description:
      "Concept: grounding model answers in a controlled document set so outputs can be checked against a source.",
    status: "concept" as const,
  },
];
