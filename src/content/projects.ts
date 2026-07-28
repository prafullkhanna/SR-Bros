/**
 * Project catalogue.
 *
 * `status` is mandatory and drives the label shown on every card:
 *   completed → shipped and working
 *   ongoing   → actively being built
 *   concept   → designed on paper, not built
 *   planned   → intended, not started
 *
 * Do not promote a project to "completed" until it actually is.
 */
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "disaster-management-robot",
    title: "Disaster Management Robot System",
    tagline: "A ground robot and support drone for locating and supplying disaster survivors.",
    summary:
      "An integrated rescue-support system: a tracked robot enters unsafe structures to detect survivors and report exact coordinates, while a drone delivers essential supplies to those locations until rescue teams reach them.",
    category: "robotics",
    status: "ongoing",
    owner: "sommay",
    period: "2024 — present",
    featured: true,
    accent: "cyan",
    stack: [
      "Tracked robot chassis",
      "Drone platform",
      "Thermal sensing",
      "Life-detection sensors",
      "GPS",
      "Wireless telemetry",
      "Microcontroller firmware",
      "Sensor fusion",
    ],
    sections: [
      {
        heading: "Problem",
        body: "After an earthquake, building collapse, flood or fire, the first hours decide survival. Rescue teams enter without knowing where people are or whether a structure is safe, so search is slow and dangerous. Survivors trapped in debris are frequently unreachable and have no way to signal their position or receive water, medicine or a communication device while they wait.",
        points: [
          "Search is manual, slow and hazardous to responders",
          "Survivor positions are unknown until an area is physically cleared",
          "No supply route exists to people who are located but not yet reachable",
        ],
      },
      {
        heading: "Solution",
        body: "A two-part robotic system that separates the two hard problems: finding people, and reaching them. A ground robot handles detection inside rubble and confined spaces. An aerial platform handles delivery once a position is known. Both report to a single operator view used by the rescue team.",
        points: [
          "Ground robot enters areas that are unsafe for responders",
          "Sensor stack detects signs of human life and fixes a coordinate",
          "Coordinates are relayed to the rescue team over a wireless link",
          "Drone flies a supply payload to the reported coordinate",
        ],
      },
      {
        heading: "System architecture",
        body: "The design is modular so each subsystem can be developed and tested independently before integration.",
        points: [
          "Mobility: tracked chassis for debris and uneven ground",
          "Detection: thermal sensing plus life-detection sensors for body heat and motion",
          "Localisation: GPS fix, reported with each detection event",
          "Communication: wireless telemetry link between robot, drone and operator",
          "Payload: food, water, a medical kit and a communication device",
          "Control: microcontroller firmware with a supervisory operator interface",
        ],
      },
      {
        heading: "Mission flow",
        body: "The operating sequence the system is being built around.",
        points: [
          "1 — Robot is deployed into the hazardous area",
          "2 — Sensor stack scans for signs of human life",
          "3 — On detection, the robot fixes and logs exact coordinates",
          "4 — Coordinates are transmitted to the rescue team",
          "5 — Drone is dispatched with a supply payload to that coordinate",
          "6 — Survivor receives water, food, a medical kit and a communication device",
          "7 — Rescue team proceeds to a confirmed, prioritised location",
        ],
      },
      {
        heading: "Development status",
        body: "This is active work, not a finished product. The architecture and mission flow above describe the system as designed; subsystems are being prototyped and tested individually. Nothing on this page should be read as a deployed or field-certified system.",
      },
      {
        heading: "Engineering challenges",
        body: "The problems that currently define the work.",
        points: [
          "Distinguishing a human heat signature from residual heat in debris",
          "Maintaining a reliable radio link through concrete and steel",
          "GPS accuracy degradation inside and beneath structures",
          "Power budget versus mission duration on both platforms",
          "Payload weight against drone flight time and stability",
        ],
      },
    ],
    futureScope: [
      "AI vision for victim identification and debris classification",
      "Satellite communication as a fallback when local links fail",
      "Swarm coordination across multiple drones and robots",
      "Computer-vision-assisted path planning",
      "Fully autonomous navigation without an operator in the loop",
    ],
    links: [
      { label: "GitHub repository", href: "#", placeholder: true },
      { label: "Technical write-up", href: "#", placeholder: true },
      { label: "Demonstration video", href: "#", placeholder: true },
    ],
  },
  {
    slug: "robo-car",
    title: "Robo Car",
    tagline: "A self-built robotic car — chassis, drive electronics and control firmware.",
    summary:
      "A ground vehicle built from the chassis up: motor drivers, microcontroller, power distribution and control firmware, used as the platform for learning motion control and sensor handling.",
    category: "robotics",
    status: "completed",
    owner: "sommay",
    period: "2023",
    accent: "electric",
    stack: ["Microcontroller", "DC motors", "Motor driver", "Chassis fabrication", "Embedded C"],
    sections: [
      {
        heading: "Objective",
        body: "Build a working robotic vehicle from individual components rather than a kit, to understand every layer of the stack — mechanical, electrical and firmware.",
      },
      {
        heading: "Build",
        body: "Chassis assembly, motor and driver selection, power distribution, wiring and microcontroller integration, followed by control firmware for drive and steering.",
        points: [
          "Motor driver sizing and wiring",
          "Power distribution and battery management",
          "Drive and turn control logic in firmware",
          "Calibration and iterative testing",
        ],
      },
      {
        heading: "Result",
        body: "A functioning platform that became the foundation for later robotics work, including line-following control used in competition.",
      },
    ],
    futureScope: [
      "Add obstacle avoidance with ultrasonic and IR sensing",
      "Closed-loop speed control with wheel encoders",
      "Remote telemetry and a live control dashboard",
    ],
    links: [
      { label: "Build photos", href: "/gallery", placeholder: true },
      { label: "GitHub repository", href: "#", placeholder: true },
    ],
  },
  {
    slug: "line-following-robot",
    title: "Line-Following Robot — IIT Bombay",
    tagline: "Competition robot built for the Single Line Robotics Championship at IIT Bombay.",
    summary:
      "A line-following robot prepared for and run at the Single Line Robotics Championship held at IIT Bombay — sensor array, control tuning and track testing under competition rules.",
    category: "robotics",
    status: "completed",
    owner: "sommay",
    period: "2024",
    accent: "violet",
    stack: ["IR sensor array", "Microcontroller", "PID-style control tuning", "Embedded C"],
    sections: [
      {
        heading: "Objective",
        body: "Compete in the Single Line Robotics Championship at IIT Bombay: follow a marked line accurately and quickly, without leaving the track.",
      },
      {
        heading: "Approach",
        body: "An infrared sensor array reads the line position; the controller converts that error into differential motor speeds. Most of the work was in tuning — balancing speed against stability on tight curves.",
        points: [
          "Sensor array calibration for track surface and lighting",
          "Error-to-steering control loop with tuned gains",
          "Speed-versus-stability trade-off testing on practice tracks",
        ],
      },
      {
        heading: "Outcome",
        body: "Participated in the championship at IIT Bombay. The experience of testing against other teams under time pressure directly shaped how later robots were designed and tested.",
      },
    ],
    futureScope: [
      "Encoder feedback for consistent speed across surfaces",
      "Adaptive gain tuning based on measured curvature",
    ],
    links: [
      { label: "Competition photos", href: "/gallery", placeholder: true },
    ],
  },
  {
    slug: "business-management-software",
    title: "Business Management Software",
    tagline: "Management software built for, and used by, an operating business.",
    summary:
      "A management system developed for a running business — covering day-to-day records, reporting and the workflows the business actually depends on. Built to be used, not demonstrated.",
    category: "software",
    status: "completed",
    owner: "sommay",
    period: "2024 — present",
    accent: "emerald",
    stack: ["Web application", "Database", "Authentication", "Reporting"],
    sections: [
      {
        heading: "Problem",
        body: "A working business was running its records manually. Data was scattered, reporting was slow, and repeated tasks consumed time that should have gone elsewhere.",
      },
      {
        heading: "Solution",
        body: "A management application that centralises records, enforces consistent data entry, and produces reports on demand. Designed around the business's real workflow rather than a generic template.",
        points: [
          "Structured records replacing manual sheets",
          "Role-based access to sensitive data",
          "Reporting views for day-to-day decisions",
        ],
      },
      {
        heading: "Result",
        body: "The software is in active use. Because it is deployed with real users and real data, it is maintained continuously — bugs, changes and new requirements are handled as they come.",
      },
    ],
    futureScope: [
      "Analytics dashboard with trend reporting",
      "Automated reminders and scheduled reports",
      "Mobile-first interface for on-the-floor use",
    ],
    links: [
      { label: "Private — client system", href: "#", placeholder: true },
      { label: "Screenshots", href: "#", placeholder: true },
    ],
  },
  {
    slug: "inventory-system",
    title: "Inventory System",
    tagline: "Stock tracking with structured records and low-stock visibility.",
    summary:
      "An inventory module that tracks stock levels, movements and reorder points, built alongside the business management software.",
    category: "software",
    status: "ongoing",
    owner: "sommay",
    period: "2025 — present",
    accent: "amber",
    stack: ["Web application", "Database", "CRUD workflows", "Search & filtering"],
    sections: [
      {
        heading: "Problem",
        body: "Stock counts drift when they are recorded by hand. Shortages are discovered late and overstocking ties up capital.",
      },
      {
        heading: "Approach",
        body: "Every movement is a record. Current levels are derived rather than typed, so the count cannot silently drift, and low-stock thresholds surface items before they run out.",
        points: [
          "Item catalogue with categories and units",
          "Inward and outward movement logging",
          "Derived stock levels and low-stock alerts",
        ],
      },
      {
        heading: "Status",
        body: "In active development. Core record-keeping works; reporting and alerting are being extended.",
      },
    ],
    futureScope: [
      "Barcode scanning for faster entry",
      "Demand forecasting from historical movement",
      "Supplier and purchase-order tracking",
    ],
    links: [{ label: "Screenshots", href: "#", placeholder: true }],
  },
  {
    slug: "web-development",
    title: "Website Projects",
    tagline: "Multiple websites designed, built and deployed.",
    summary:
      "A series of websites covering design, front-end implementation, responsive layout, performance and deployment — including this one.",
    category: "web",
    status: "completed",
    owner: "sommay",
    period: "2023 — present",
    accent: "electric",
    stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Vercel"],
    sections: [
      {
        heading: "Scope",
        body: "Each site was taken from a blank page to a deployed URL: structure, visual design, responsive implementation, accessibility, SEO and hosting.",
        points: [
          "Component-driven front-end architecture",
          "Responsive layouts from mobile to ultra-wide",
          "Metadata, structured data and sitemap generation",
          "Continuous deployment",
        ],
      },
      {
        heading: "This site",
        body: "SRbros.in is itself part of this body of work — built with Next.js, TypeScript and TailwindCSS, with a typed content layer so new projects can be added without touching the interface code.",
      },
    ],
    futureScope: [
      "Headless CMS so content can be edited without a deploy",
      "Automatic GitHub repository sync on the projects page",
    ],
    links: [
      { label: "GitHub repository", href: "#", placeholder: true },
      { label: "Live sites", href: "#", placeholder: true },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation Systems",
    tagline: "LLM-driven workflows that remove repetitive work.",
    summary:
      "Automation built on large language models: structured prompting, tool use and multi-step agents applied to real, repetitive tasks rather than demos.",
    category: "ai",
    status: "ongoing",
    owner: "sommay",
    period: "2024 — present",
    accent: "violet",
    stack: ["Large language models", "Prompt engineering", "Agent workflows", "APIs", "Python"],
    sections: [
      {
        heading: "Idea",
        body: "Most repetitive work is a sequence of small decisions with a clear rule behind each one. Language models can execute that sequence if the task is decomposed precisely and given the right tools.",
      },
      {
        heading: "Architecture",
        body: "Each workflow is defined as a chain: input parsing, a model step with a constrained prompt, a validation step, and an action. Failures are caught at validation rather than at the output.",
        points: [
          "Structured prompts with explicit output schemas",
          "Validation before any action is taken",
          "Tool/API calls for anything the model should not guess",
          "Logging so every run can be inspected",
        ],
      },
      {
        heading: "Status",
        body: "Ongoing experimental work. Individual workflows function; the goal is a reusable pattern rather than one-off scripts.",
      },
    ],
    futureScope: [
      "Retrieval over a private knowledge base",
      "Evaluation harness to measure workflow reliability",
      "Local model deployment for privacy-sensitive tasks",
    ],
    links: [
      { label: "Write-up", href: "#", placeholder: true },
      { label: "GitHub repository", href: "#", placeholder: true },
    ],
  },
  {
    slug: "ai-vision-for-rescue",
    title: "AI Vision for Rescue Robotics",
    tagline: "Concept — computer vision to identify survivors and classify debris.",
    summary:
      "A research direction, not a build: applying computer vision to the disaster robot so it can distinguish a person from surrounding debris and assess whether a path is passable.",
    category: "research",
    status: "concept",
    owner: "sommay",
    period: "Concept",
    accent: "cyan",
    stack: ["Computer vision", "Object detection", "Edge inference"],
    sections: [
      {
        heading: "Why",
        body: "Thermal and life-detection sensors report that something is there. Vision could report what it is — reducing false positives and helping responders prioritise.",
      },
      {
        heading: "Open questions",
        body: "This is unbuilt work. The questions below are what would need answering first.",
        points: [
          "What training data exists for partially occluded people in rubble?",
          "Can inference run on the robot's power and compute budget?",
          "How is a false negative handled when a life is at stake?",
        ],
      },
    ],
    futureScope: [
      "Dataset collection from staged rubble environments",
      "On-device inference benchmarking",
      "Sensor fusion between vision and thermal channels",
    ],
  },
  {
    slug: "future-saas",
    title: "SaaS Products",
    tagline: "Planned — productising the tools built for individual businesses.",
    summary:
      "Several internal tools have proved useful for one business. Turning them into products that other businesses can use is a stated goal, not current work.",
    category: "software",
    status: "planned",
    owner: "both",
    period: "Planned",
    accent: "emerald",
    sections: [
      {
        heading: "Direction",
        body: "The management and inventory systems solve problems that are not unique to one business. The plan is to generalise them into multi-tenant products once the single-tenant versions are stable.",
      },
      {
        heading: "Not yet started",
        body: "No product has been built, launched or sold. This entry exists to record intent, and will be updated with real progress if and when it begins.",
      },
    ],
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "robotics", label: "Robotics" },
  { id: "ai", label: "AI" },
  { id: "software", label: "Software" },
  { id: "web", label: "Web" },
  { id: "research", label: "Research" },
] as const;
