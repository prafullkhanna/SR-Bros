/**
 * Blog content.
 *
 * Posts are typed objects today so the site ships without a CMS dependency.
 * The layout is MDX/CMS-ready: swap this array for a loader over
 * `content/posts/*.mdx` (or a Sanity/Contentful query) and nothing in the UI
 * has to change. See docs/CONTENT.md.
 */
import type { BlogPost } from "@/types";

export const posts: BlogPost[] = [
  {
    slug: "what-a-line-following-robot-teaches-you",
    title: "What a line-following robot actually teaches you",
    excerpt:
      "The sensor array is the easy part. Everything interesting happens in the tuning — and in what breaks when the track surface changes.",
    date: "2025-03-18",
    author: "sommay",
    tags: ["Robotics", "Competition"],
    readingMinutes: 5,
    status: "published",
    body: [
      "A line follower looks like a solved problem. Read the line, steer towards it, repeat. The first version works in the living room and fails on the competition track, and the gap between those two outcomes is where the actual engineering lives.",
      "Lighting changes the sensor readings. A surface with a slight sheen reflects differently from matte tape. A gain that is stable at low speed oscillates at high speed. None of this appears in the tutorial — it appears the first time you run on a track you did not build.",
      "The lesson that carried into every project since: calibrate against the environment you will actually run in, and treat every constant in the code as something that will need re-tuning, not as a fact.",
    ],
  },
  {
    slug: "designing-a-rescue-robot-around-constraints",
    title: "Designing a rescue robot around constraints, not features",
    excerpt:
      "Power budget, radio range and payload weight decide the architecture. The feature list comes afterwards.",
    date: "2025-06-02",
    author: "sommay",
    tags: ["Robotics", "Engineering"],
    readingMinutes: 7,
    status: "published",
    body: [
      "It is tempting to start a rescue robot from the capability list: thermal sensing, life detection, GPS, delivery. Start there and you end up with a machine that cannot carry its own battery.",
      "The honest starting point is a set of hard limits. How long must the platform run on one charge? How far does the radio need to reach through concrete? How much mass can the drone lift and still stay in the air long enough to be useful?",
      "Every one of those constraints removes options, and what is left is the design. That is why the ground robot and the drone are separate: finding people and reaching them have almost nothing in common as engineering problems, and forcing them onto one platform makes both worse.",
    ],
  },
  {
    slug: "llm-automation-that-does-not-break",
    title: "Building LLM automation that does not quietly break",
    excerpt:
      "A model that is right 90% of the time is not 90% useful if you cannot tell which 10% went wrong.",
    date: "2025-09-14",
    author: "sommay",
    tags: ["AI", "Automation"],
    readingMinutes: 6,
    status: "published",
    body: [
      "The failure mode of language-model automation is not a crash. It is a plausible, well-formatted, wrong answer that flows straight into the next step.",
      "The fix is structural rather than clever prompting: constrain the output to a schema, validate it before anything acts on it, and give the model tools for anything it should not be inferring. If a value can be looked up, look it up.",
      "Log every run. A workflow you cannot inspect is a workflow you cannot trust, and trust is the entire point of automating something you used to do by hand.",
    ],
  },
];

export const publishedPosts = posts
  .filter((post) => post.status === "published")
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);

export const blogTags = Array.from(
  new Set(publishedPosts.flatMap((post) => post.tags)),
).sort();
