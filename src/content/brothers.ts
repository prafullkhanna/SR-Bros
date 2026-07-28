/**
 * Profiles for Sommay and Ramansh.
 *
 * Editing rules (please keep them):
 *  1. Never add an achievement that has not actually happened.
 *  2. Every achievement carries a `status`; use "concept" or "planned" for
 *     anything aspirational so the UI can label it clearly.
 *  3. Skill levels are self-assessed and presented as such in the UI.
 */
import type { Brother } from "@/types";

export const brothers: Brother[] = [
  {
    id: "sommay",
    name: "Sommay Khanna",
    age: 16,
    role: "Robotics, AI & software",
    school: "The Heritage School, Rohini",
    grade: "Class XI",
    location: "New Delhi, India",
    accent: "electric",
    bio: [
      "Sommay builds systems end to end — the mechanics, the electronics and the code that ties them together. He started with small automation scripts, moved to microcontrollers, and now works on robotics platforms and applied AI.",
      "His current focus is a disaster-management robot system: a ground robot and a support drone designed to locate people trapped after a disaster and deliver essential supplies until rescue teams arrive.",
      "Alongside robotics he writes production software — including a management system used by a running business — and experiments with large language models for practical automation.",
    ],
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    focusAreas: [
      "Autonomous robotics",
      "Applied AI & LLM automation",
      "Embedded electronics",
      "Full-stack software",
    ],
    skills: [
      { label: "Programming", level: 82 },
      { label: "Robotics", level: 78 },
      { label: "Artificial Intelligence", level: 72 },
      { label: "Electronics", level: 70 },
      { label: "Automation", level: 76 },
      { label: "Web development", level: 80 },
      { label: "Problem solving", level: 84 },
    ],
    achievements: [
      {
        title: "Single Line Robotics Championship, IIT Bombay",
        detail:
          "Participated in the Single Line Robotics Championship held at IIT Bombay — designing, tuning and running a line-following robot under competition conditions.",
        status: "completed",
      },
      {
        title: "Project selected at IIT Delhi",
        detail:
          "A project by Sommay was selected at IIT Delhi.",
        status: "completed",
      },
      {
        title: "Built a robo car",
        detail:
          "Designed and assembled a working robotic car — chassis, motor drivers, microcontroller and control firmware.",
        status: "completed",
      },
      {
        title: "Software for a running business",
        detail:
          "Developed and shipped management software that is in day-to-day use by an operating business.",
        status: "completed",
      },
      {
        title: "Multiple websites delivered",
        detail:
          "Designed and developed several websites, covering layout, front-end implementation and deployment.",
        status: "completed",
      },
      {
        title: "AI-based automation systems",
        detail:
          "Designing and developing automation workflows built on large language models. Work is ongoing.",
        status: "ongoing",
      },
    ],
  },
  {
    id: "ramansh",
    name: "Ramansh Khanna",
    age: 10,
    role: "Science, coding & making",
    school: "The Heritage School, Rohini",
    grade: "Class VI",
    location: "New Delhi, India",
    accent: "emerald",
    bio: [
      "Ramansh is at the beginning of his journey. He asks a lot of questions, takes things apart, and is learning to code and build.",
      "This section is intentionally open. It records what he is learning now and will fill with real projects, competitions and results as he completes them — nothing is listed here before it happens.",
    ],
    interests: [
      "Technology",
      "Science",
      "Creative thinking",
      "Robotics",
      "Coding",
      "Innovation",
      "Learning",
    ],
    focusAreas: [
      "STEM fundamentals",
      "Block-based & beginner coding",
      "Hands-on science experiments",
      "Creative building",
    ],
    skills: [
      { label: "Curiosity", level: 92 },
      { label: "Science", level: 62 },
      { label: "Coding", level: 45 },
      { label: "Creative building", level: 70 },
      { label: "Problem solving", level: 58 },
    ],
    achievements: [
      {
        title: "Learning journey in progress",
        detail:
          "Ramansh is currently building foundations in science, coding and making. Completed projects, competitions and awards will be added here as they happen — this space is deliberately empty until then.",
        status: "ongoing",
      },
    ],
  },
];

export const getBrother = (id: Brother["id"]) =>
  brothers.find((brother) => brother.id === id);

/** Placeholder tracks for Ramansh — rendered as clearly-labelled future work. */
export const ramanshTracks = [
  {
    title: "Science projects",
    description:
      "Experiment-led projects in physics and chemistry, documented with method, observation and result.",
  },
  {
    title: "Coding",
    description:
      "From block-based logic to Python — small programs, games and tools written from scratch.",
  },
  {
    title: "Robotics",
    description:
      "Sensors, motors and simple autonomy. Learning the same fundamentals his brother started with.",
  },
  {
    title: "STEM experiments",
    description:
      "Short investigations that answer one question at a time and build scientific method.",
  },
  {
    title: "Creative builds",
    description:
      "Models, mechanisms and prototypes made with whatever is at hand.",
  },
  {
    title: "Competitions",
    description:
      "School and open competitions he plans to enter as his skills develop.",
  },
] as const;
