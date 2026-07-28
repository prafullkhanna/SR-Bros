/**
 * Media and press.
 *
 * Nothing is listed here until it exists. The page renders an honest empty
 * state with the categories that will be filled in as coverage happens.
 */
import type { MediaMention } from "@/types";

export const mediaMentions: MediaMention[] = [];

export const mediaCategories = [
  { title: "News articles", description: "Press coverage of projects and competition results." },
  { title: "Interviews", description: "Conversations, podcasts and features." },
  { title: "Publications", description: "Technical write-ups and papers." },
  { title: "School recognition", description: "Recognition from The Heritage School, Rohini." },
  { title: "Competition coverage", description: "Event reports and result listings." },
] as const;

/**
 * Recognition that has actually happened. Kept separate from press coverage.
 */
export const recognition = [
  {
    title: "Single Line Robotics Championship",
    org: "IIT Bombay",
    detail: "Participated with a purpose-built line-following robot.",
    status: "completed" as const,
  },
  {
    title: "Project selected",
    org: "IIT Delhi",
    detail: "A project by Sommay Khanna was selected at IIT Delhi.",
    status: "completed" as const,
  },
];
