// NOVA X1 Master Virtual Timeline & Interactive Stage Definitions

export interface TimelineStage {
  id: string;
  num: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  range: [number, number]; // Normalized scroll range [start, end]
  cameraPose: {
    position: [number, number, number];
    target: [number, number, number];
  };
  explosionFactor: number; // 0.0 to 1.0
  rotationOffset: number; // in radians
}

export const TIMELINE_STAGES: TimelineStage[] = [
  {
    id: "intro",
    num: "01",
    code: "SYS-INIT",
    name: "CAMERA SYSTEM",
    tagline: "ARCHITECTURAL FULL-FRAME",
    description: "61.2 MP BSI Sensor // Dual Digic Neural Engine",
    range: [0.0, 0.15],
    cameraPose: {
      position: [0.0, 0.2, -4.6],
      target: [0.0, -0.05, 0.3],
    },
    explosionFactor: 0.0,
    rotationOffset: 0.0,
  },
  {
    id: "rotate",
    num: "02",
    code: "ROT-360",
    name: "360° INSPECTION",
    tagline: "TACTILE MONOCOQUE PROFILE",
    description: "Die-cast magnesium shell with 68 weather-sealed joints",
    range: [0.15, 0.30],
    cameraPose: {
      position: [-3.8, 0.4, -3.2],
      target: [0.0, 0.0, 0.3],
    },
    explosionFactor: 0.0,
    rotationOffset: Math.PI * 1.75,
  },
  {
    id: "explode",
    num: "03",
    code: "EXP-95",
    name: "EXPLODED ARCHITECTURE",
    tagline: "95 DECONSTRUCTED COMPONENTS",
    description: "Precision spatial separation along optical and lateral axes",
    range: [0.30, 0.48],
    cameraPose: {
      position: [-3.2, 1.4, -4.8],
      target: [0.0, 0.0, 0.3],
    },
    explosionFactor: 1.0,
    rotationOffset: Math.PI * 0.35,
  },
  {
    id: "components",
    num: "04",
    code: "PRT-ISO",
    name: "SUBSYSTEM EXPLORER",
    tagline: "SELECTIVE COMPONENT ISOLATION",
    description: "Direct raycast selection of optics, sensor, LCD, and controls",
    range: [0.48, 0.62],
    cameraPose: {
      position: [2.8, 0.8, -3.6],
      target: [0.0, 0.0, 0.2],
    },
    explosionFactor: 0.75,
    rotationOffset: Math.PI * 0.1,
  },
  {
    id: "lens",
    num: "05",
    code: "OPT-MACRO",
    name: "LENS & OPTICS",
    tagline: "17-ELEMENT F/1.2 APERTURE",
    description: "Sub-wavelength nano-coating with telecentric rear convergence",
    range: [0.62, 0.75],
    cameraPose: {
      position: [0.0, 0.05, -2.4],
      target: [0.0, 0.0, -0.4],
    },
    explosionFactor: 0.2,
    rotationOffset: 0.0,
  },
  {
    id: "material",
    num: "06",
    code: "MAT-LAB",
    name: "SURFACE & FINISH",
    tagline: "AEROSPACE GRADE FINISHES",
    description: "Titanium matte, brushed alloy, forged carbon, and optical crystal",
    range: [0.75, 0.86],
    cameraPose: {
      position: [-2.6, 0.8, -3.2],
      target: [0.0, 0.0, 0.3],
    },
    explosionFactor: 0.0,
    rotationOffset: Math.PI * 0.6,
  },
  {
    id: "tech",
    num: "07",
    code: "ENG-HUD",
    name: "TECHNICAL DIAGNOSTICS",
    tagline: "OPTICAL AXIS & DIMENSIONS",
    description: "54mm mount // 20mm flange distance // 35.9x23.9mm sensor",
    range: [0.86, 0.94],
    cameraPose: {
      position: [0.0, 2.8, -3.8],
      target: [0.0, -0.1, 0.2],
    },
    explosionFactor: 0.3,
    rotationOffset: Math.PI * 0.2,
  },
  {
    id: "assemble",
    num: "08",
    code: "HERO-LOCK",
    name: "SYSTEM LOCKED",
    tagline: "READY FOR CAPTURE",
    description: "Fully calibrated production unit ready for mission-critical deployment",
    range: [0.94, 1.0],
    cameraPose: {
      position: [-2.9, 0.3, -4.2],
      target: [0.0, -0.05, 0.25],
    },
    explosionFactor: 0.0,
    rotationOffset: Math.PI * 0.15,
  },
];

export interface SectionMeta {
  id: string;
  num: string;
  name: string;
  targetClass: string;
  tagline: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", num: "01", name: "OVERVIEW", targetClass: ".cam-view-1", tagline: "PRECISION ARCHITECTURE" },
  { id: "performance", num: "02", name: "PERFORMANCE", targetClass: ".cam-view-2", tagline: "61.2 MP BSI SENSOR" },
  { id: "controls", num: "03", name: "CONTROLS", targetClass: ".cam-view-3", tagline: "TACTILE ERGONOMICS" },
  { id: "optics", num: "04", name: "OPTICAL SYSTEM", targetClass: ".cam-view-4", tagline: "17-ELEMENT EXPLODE" },
  { id: "lab", num: "05", name: "3D STUDIO LAB", targetClass: ".cam-view-5", tagline: "360° INTERACTIVE INSPECT" },
];

// Helper to determine stage from normalized scroll progress
export function getStageFromProgress(progress: number): TimelineStage {
  const p = Math.max(0, Math.min(1, progress));
  for (const stage of TIMELINE_STAGES) {
    if (p >= stage.range[0] && p <= stage.range[1]) {
      return stage;
    }
  }
  return TIMELINE_STAGES[0];
}
