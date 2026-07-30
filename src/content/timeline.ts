/**
 * Learning and build timeline.
 * Entries marked "planned" or "concept" are rendered with an explicit label —
 * they describe intent, not history.
 */
import type { TimelineEntry } from "@/types";

export const timeline: TimelineEntry[] = [
  {
    id: "s-coding",
    year: "2022",
    title: "Started coding",
    description:
      "First programs, first bugs. Moved quickly from following tutorials to writing small tools that solved a specific problem.",
    who: "sommay",
    status: "completed",
    tags: ["Programming"],
  },
  {
    id: "s-robotics",
    year: "2023",
    title: "Learnt robotics",
    description:
      "Microcontrollers, motor drivers, sensors and power. Learning where software meets physical hardware — and where it fails.",
    who: "sommay",
    status: "completed",
    tags: ["Robotics", "Electronics"],
  },
  {
    id: "s-robocar",
    year: "2023",
    title: "Built the Robo Car",
    description:
      "A robotic car built from components rather than a kit — chassis, drive electronics and control firmware.",
    who: "sommay",
    status: "completed",
    tags: ["Robotics", "Firmware"],
  },
  {
    id: "r-stem",
    year: "2024",
    title: "Started STEM learning",
    description:
      "Ramansh began structured science and technology learning — experiments, questions and first steps into coding.",
    who: "ramansh",
    status: "completed",
    tags: ["STEM"],
  },
  {
    id: "s-web",
    year: "2024",
    title: "Websites shipped",
    description:
      "Multiple websites designed, built and deployed — front-end implementation, responsive layout and hosting.",
    who: "sommay",
    status: "completed",
    tags: ["Web"],
  },
  {
    id: "s-iitb",
    year: "2024",
    title: "Single Line Robotics Championship, IIT Bombay",
    description:
      "Participated in the Single Line Robotics Championship at IIT Bombay with a line-following robot built and tuned for the event.",
    who: "sommay",
    status: "completed",
    tags: ["Competition", "Robotics"],
  },
  {
    id: "s-business",
    year: "2024",
    title: "Business management software in production",
    description:
      "Built and deployed management software now used day to day by a running business.",
    who: "sommay",
    status: "completed",
    tags: ["Software"],
  },
  {
    id: "s-ai",
    year: "2025",
    title: "AI automation work",
    description:
      "Designing automation workflows on large language models — structured prompting, tool use and validation.",
    who: "sommay",
    status: "ongoing",
    tags: ["AI"],
  },
  {
    id: "s-iitd",
    year: "2025",
    title: "Project selected at IIT Delhi",
    description: "A project by Sommay was selected at IIT Delhi.",
    who: "sommay",
    status: "completed",
    tags: ["Recognition"],
  },
  {
    id: "s-disaster",
    year: "2025",
    title: "Disaster management robot system",
    description:
      "Active work on a ground robot and support drone for locating survivors and delivering supplies after a disaster.",
    who: "sommay",
    status: "ongoing",
    tags: ["Robotics", "AI"],
  },
  {
    id: "s-nexbrief",
    year: "2026",
    title: "NexBrief AI goes live",
    description:
      "Shipped NexBrief AI at newz.srbros.in — Left, Centre and Right perspectives on any story, a live feed with source-credibility ratings, and a fake-news detector. The first project taken all the way to a real product: accounts, a trial, and paid tiers.",
    who: "sommay",
    status: "ongoing",
    tags: ["AI", "Product"],
  },
  {
    id: "r-coding",
    year: "Next",
    title: "Coding",
    description:
      "Ramansh moves from block-based logic into written code, building small programs of his own.",
    who: "ramansh",
    status: "planned",
    tags: ["Learning"],
  },
  {
    id: "r-robotics",
    year: "Next",
    title: "Robotics",
    description:
      "First sensors, motors and simple autonomy — the same fundamentals his brother started with.",
    who: "ramansh",
    status: "planned",
    tags: ["Robotics"],
  },
  {
    id: "r-comp",
    year: "Next",
    title: "First competitions",
    description:
      "School and open STEM competitions, once the groundwork is in place.",
    who: "ramansh",
    status: "planned",
    tags: ["Competition"],
  },
  {
    id: "both-startup",
    year: "Ahead",
    title: "Building something that lasts",
    description:
      "The stated goal: turn this work into technology that reaches people beyond a workshop — robotics and AI applied to disaster response, education and healthcare.",
    who: "both",
    status: "planned",
    tags: ["Vision"],
  },
];
