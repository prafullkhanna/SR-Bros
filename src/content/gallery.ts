/**
 * Gallery items.
 *
 * Every entry currently uses generated placeholder artwork. When a real
 * photograph is available, add `src: "/gallery/<file>.webp"` and set
 * `placeholder: false`. See docs/ASSETS-NEEDED.md.
 */
import type { GalleryItem } from "@/types";

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Robo Car build", caption: "Chassis, motor drivers and wiring during assembly.", category: "builds", ratio: "landscape", placeholder: true },
  { id: "g2", title: "IIT Bombay — championship", caption: "Single Line Robotics Championship, IIT Bombay.", category: "competitions", ratio: "portrait", placeholder: true },
  { id: "g3", title: "Line-following robot", caption: "Sensor array calibration before a run.", category: "robotics", ratio: "square", placeholder: true },
  { id: "g4", title: "Sensor bench testing", caption: "Thermal and life-detection sensor characterisation.", category: "robotics", ratio: "landscape", placeholder: true },
  { id: "g5", title: "Drone payload trials", caption: "Payload weight versus flight-time testing.", category: "robotics", ratio: "portrait", placeholder: true },
  { id: "g6", title: "Robotics workshop", caption: "Hands-on session on embedded control.", category: "workshops", ratio: "landscape", placeholder: true },
  { id: "g7", title: "School science exhibition", caption: "The Heritage School, Rohini.", category: "school", ratio: "square", placeholder: true },
  { id: "g8", title: "Firmware debugging", caption: "Serial output during a control-loop tuning session.", category: "builds", ratio: "portrait", placeholder: true },
  { id: "g9", title: "Ramansh — first circuit", caption: "Early experiments with breadboards and LEDs.", category: "school", ratio: "landscape", placeholder: true },
  { id: "g10", title: "Competition pit", caption: "Last-minute adjustments between runs.", category: "competitions", ratio: "square", placeholder: true },
  { id: "g11", title: "Prototype chassis", caption: "Tracked base being fitted for debris terrain.", category: "builds", ratio: "landscape", placeholder: true },
  { id: "g12", title: "Team workbench", caption: "Where most of it actually happens.", category: "workshops", ratio: "portrait", placeholder: true },
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "robotics", label: "Robotics" },
  { id: "competitions", label: "Competitions" },
  { id: "builds", label: "Builds" },
  { id: "workshops", label: "Workshops" },
  { id: "school", label: "School" },
] as const;
