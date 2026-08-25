// Registry and Physics Definition for NOVA X1 Camera Model (95 Meshes)
import * as THREE from "three";

export type ComponentSubsystem =
  | "LENS"
  | "SENSOR"
  | "DISPLAY"
  | "VIEWFINDER"
  | "CONTROLS"
  | "CHASSIS"
  | "LABELS";

export interface PartDefinition {
  name: string;
  subsystem: ComponentSubsystem;
  label: string;
  techSpec: string;
  // Explosion trajectory offset vector [dx, dy, dz] and optional rotation delta [rx, ry, rz]
  explodeOffset: [number, number, number];
  explodeRotation?: [number, number, number];
  // Macro camera target offset when this part is isolated
  focusDistance?: number;
  highlightColor?: string;
}

export interface SubsystemMeta {
  id: ComponentSubsystem;
  label: string;
  code: string;
  title: string;
  description: string;
  cameraPose: {
    position: [number, number, number];
    target: [number, number, number];
  };
}

// 7 Precision Subsystems Definition
export const SUBSYSTEMS: Record<ComponentSubsystem, SubsystemMeta> = {
  LENS: {
    id: "LENS",
    label: "OPTICAL SYSTEM",
    code: "OPT-01",
    title: "17-ELEMENT F/1.2 ASPHERICAL ARCHITECTURE",
    description: "Sub-wavelength nano-structure coating with dual linear ultrasonic focus motors.",
    cameraPose: {
      position: [0.0, 0.0, -2.6],
      target: [0.0, 0.0, -0.2],
    },
  },
  SENSOR: {
    id: "SENSOR",
    label: "IMAGE SENSOR & IBIS",
    code: "SNS-02",
    title: "61.2 MP BACK-ILLUMINATED FULL-FRAME SENSOR",
    description: "35.9 × 23.9 mm CMOS with 5-axis sensor-shift stabilization delivering 7.5 stops compensation.",
    cameraPose: {
      position: [0.3, 0.15, -1.9],
      target: [0.0, 0.0, 0.5],
    },
  },
  DISPLAY: {
    id: "DISPLAY",
    label: "VARI-ANGLE DISPLAY",
    code: "DSP-03",
    title: "3.2-INCH 2.1M-DOT ARTICULATED LCD",
    description: "Dual-axis aerospace hinge with 100% DCI-P3 color gamut and capacitive multi-touch interface.",
    cameraPose: {
      position: [1.8, 0.4, 2.6],
      target: [0.2, 0.0, 0.9],
    },
  },
  VIEWFINDER: {
    id: "VIEWFINDER",
    label: "ELECTRONIC VIEWFINDER",
    code: "EVF-04",
    title: "5.76M-DOT 120HZ OLED VIEWFINDER",
    description: "0.82× magnification optics with -4.0 to +2.0 diopter adjustment and anti-fog fluoride coating.",
    cameraPose: {
      position: [-0.2, 1.2, 2.2],
      target: [0.0, 0.5, 0.8],
    },
  },
  CONTROLS: {
    id: "CONTROLS",
    label: "TACTILE CONTROLS & DIALS",
    code: "CTR-05",
    title: "MILLED ALUMINUM DUAL COMMAND DIALS",
    description: "Rated for 500,000 actuations with progressive tactile detents and weatherproof silicone gaskets.",
    cameraPose: {
      position: [-1.4, 1.8, -0.6],
      target: [0.0, 0.3, 0.2],
    },
  },
  CHASSIS: {
    id: "CHASSIS",
    label: "MAGNESIUM CHASSIS",
    code: "CHS-06",
    title: "MONOCOQUE DIE-CAST MAGNESIUM SHELL",
    description: "68 gasket-sealed environmental barriers engineered for operation from -10°C to +45°C.",
    cameraPose: {
      position: [-2.6, 0.8, -1.8],
      target: [0.0, 0.0, 0.4],
    },
  },
  LABELS: {
    id: "LABELS",
    label: "LASER ETCHING & MARKINGS",
    code: "LBL-07",
    title: "HIGH-CONTRAST PRECISION APERTURE & FOCAL SCALE",
    description: "Permanent laser-annealed typography and tactile index markers.",
    cameraPose: {
      position: [0.8, 0.4, -1.8],
      target: [0.0, 0.0, -0.4],
    },
  },
};

// All 95 GLB Mesh Components Mapped to Physical Explosion Trajectories
export const CAMERA_PARTS_REGISTRY: Record<string, PartDefinition> = {
  // --- OPTICAL ELEMENTS (Lens Barrel, Rings, and Glass Elements) ---
  Text001: {
    name: "Text001",
    subsystem: "LENS",
    label: "LENS BEZEL ENGRAVING",
    techSpec: "NOVA 50mm F/1.2 LENS MARKINGS // Ø72mm FILTER THREAD",
    explodeOffset: [0, 0, -2.5],
  },
  Circle002: {
    name: "Circle002",
    subsystem: "LENS",
    label: "FRONT LENS HOOD MOUNT",
    techSpec: "ANODIZED ALUMINUM THREAD RING",
    explodeOffset: [0, 0, -2.3],
  },
  "+Sphere001001": {
    name: "+Sphere001001",
    subsystem: "LENS",
    label: "FRONT ASPHERICAL GLASS ELEMENT",
    techSpec: "HIGH-REFRACTIVE INDEX FLUORITE GLASS // SWC NANO COATING",
    explodeOffset: [0, 0, -2.0],
  },
  "+Plane008001": {
    name: "+Plane008001",
    subsystem: "LENS",
    label: "OPTICAL SPECIFICATION BADGE",
    techSpec: "LASER ETCHED APERTURE & FOCAL RANGE INDICATOR",
    explodeOffset: [0, 0.15, -1.8],
  },
  "+Circle001001": {
    name: "+Circle001001",
    subsystem: "LENS",
    label: "PRECISION RED RING ACCENT",
    techSpec: "NOVA PROFESSIONAL SERIES IDENTITY BAND",
    explodeOffset: [0, 0, -1.6],
  },
  "+Sphere003001": {
    name: "+Sphere003001",
    subsystem: "LENS",
    label: "MID-OPTIC CORRECTION ELEMENT",
    techSpec: "EXTRA-LOW DISPERSION (ED) DOUBLET",
    explodeOffset: [0, 0, -1.35],
  },
  "+Circle003001": {
    name: "+Circle003001",
    subsystem: "LENS",
    label: "11-BLADE APERTURE MECHANISM",
    techSpec: "STEPPER MOTOR DRIVEN CIRCULAR DIAPHRAGM // F/1.2 - F/16",
    explodeOffset: [0, 0, -1.1],
  },
  Rings2001: {
    name: "Rings2001",
    subsystem: "LENS",
    label: "FOCUS CONTROL RING",
    techSpec: "TEXTURED SYNTHETIC RUBBER // ELECTRONIC FLY-BY-WIRE",
    explodeOffset: [0, 0, -0.85],
  },
  Plane006001: {
    name: "Plane006001",
    subsystem: "LENS",
    label: "AF/MF SWITCH BEZEL",
    techSpec: "WEATHER-SEALED TOGGLE HOUSING",
    explodeOffset: [-0.25, 0.15, -0.65],
  },
  "+Plane005001": {
    name: "+Plane005001",
    subsystem: "LENS",
    label: "STABILIZATION SELECTOR SWITCH",
    techSpec: "OPTICAL IS MODE 1/2/3 SLIDER",
    explodeOffset: [-0.25, 0.25, -0.65],
  },
  "+SideButtons001": {
    name: "+SideButtons001",
    subsystem: "LENS",
    label: "CUSTOM LENS FUNCTION BUTTONS",
    techSpec: "DUAL PROGRAMMABLE AF-STOP SWITCHES",
    explodeOffset: [-0.2, 0, -0.55],
  },
  new: {
    name: "new",
    subsystem: "LENS",
    label: "CENTRAL BARREL CHASSIS",
    techSpec: "INTERNAL MAGNESIUM SKELETON WITH LINEAR USM TRACKS",
    explodeOffset: [0, 0, -0.4],
  },
  "+Rings1001": {
    name: "+Rings1001",
    subsystem: "LENS",
    label: "CUSTOM CONTROL RING",
    techSpec: "CLICK/CLICKLESS TACTILE PARAMETER DIAL",
    explodeOffset: [0, 0, -0.15],
  },
  "+Sphere001": {
    name: "+Sphere001",
    subsystem: "LENS",
    label: "REAR ASPHERICAL CONVERGENCE ELEMENT",
    techSpec: "TELECENTRIC REAR GROUP DIRECTING LIGHT TO BSI SENSOR",
    explodeOffset: [0, 0, 0.05],
  },
  korpus001: {
    name: "korpus001",
    subsystem: "LENS",
    label: "REAR LENS BARREL COLLAR",
    techSpec: "WEATHER SEAL GASKET // FLANGE INTERFACE",
    explodeOffset: [0, 0, 0.2],
  },
  Circle004_1001: {
    name: "Circle004_1001",
    subsystem: "LENS",
    label: "STAINLESS STEEL BAYONET MOUNT",
    techSpec: "54mm INNER DIAMETER // 20mm FLANGE FOCAL DISTANCE",
    explodeOffset: [0, 0, 0.35],
  },
  Circle004001: {
    name: "Circle004001",
    subsystem: "LENS",
    label: "MOUNT LOCKING RIM",
    techSpec: "HIGH-TORQUE SPRING RETENTION MECHANISM",
    explodeOffset: [0, 0, 0.42],
  },
  "+Circle001": {
    name: "+Circle001",
    subsystem: "LENS",
    label: "12-PIN GOLD DATA CONTACTS",
    techSpec: "HIGH-SPEED BIDIRECTIONAL BUS // 1 Gbps BUS BANDWIDTH",
    explodeOffset: [0, 0, 0.48],
  },
  "+Cylinder001": {
    name: "+Cylinder001",
    subsystem: "LENS",
    label: "REAR LIGHT BAFFLE",
    techSpec: "INTERNAL ANTI-REFLECTIVE VELVET FLOCKING",
    explodeOffset: [0, 0, 0.55],
  },
  "+BODY044001": {
    name: "+BODY044001",
    subsystem: "LENS",
    label: "CAMERA BODY LENS RECEIVER",
    techSpec: "CHASSIS MATING FLANGE WITH WEATHER SEAL RING",
    explodeOffset: [0, 0, 0.65],
  },

  // --- SENSOR & STABILIZATION SYSTEM ---
  Cube085_1001: {
    name: "Cube085_1001",
    subsystem: "SENSOR",
    label: "61.2 MP BSI CMOS SENSOR GLASS",
    techSpec: "35.9 × 23.9 mm // ZERO LOW-PASS FILTER // DUAL NATIVE ISO",
    explodeOffset: [0, -0.15, -0.35],
  },
  Cube085001: {
    name: "Cube085001",
    subsystem: "SENSOR",
    label: "SENSOR HOUSING & HEAT SINK",
    techSpec: "COPPER-VAPOR CHAMBER DISSIPATION UNIT",
    explodeOffset: [0, -0.2, 0.0],
  },
  "+BODY082001": {
    name: "+BODY082001",
    subsystem: "SENSOR",
    label: "5-AXIS IBIS STABILIZATION FRAME",
    techSpec: "VOICE COIL MOTOR MAGNET ACTUATORS // 7.5 STOPS CIPA",
    explodeOffset: [0, -0.25, 0.15],
  },

  // --- VARI-ANGLE DISPLAY SYSTEM ---
  "+BODY075001": {
    name: "+BODY075001",
    subsystem: "DISPLAY",
    label: "3.2\" 2.1M-DOT TOUCHSCREEN LCD",
    techSpec: "1000 NITS PEAK BRIGHTNESS // CAPACITIVE MULTI-TOUCH",
    explodeOffset: [0.1, 0, 1.35],
    explodeRotation: [0, 0.45, 0],
  },
  Cube005_1001: {
    name: "Cube005_1001",
    subsystem: "DISPLAY",
    label: "LCD ARTICULATION HINGE",
    techSpec: "TITANIUM MULTI-AXIS SWIVEL MECHANISM",
    explodeOffset: [0.05, 0, 1.25],
    explodeRotation: [0, 0.45, 0],
  },
  Cube005_2001: {
    name: "Cube005_2001",
    subsystem: "DISPLAY",
    label: "LCD BACKPLATE ASSEMBLY",
    techSpec: "DIE-CAST MAGNESIUM MONITOR CHASSIS",
    explodeOffset: [0.1, 0, 1.3],
    explodeRotation: [0, 0.45, 0],
  },
  Cube005_3001: {
    name: "Cube005_3001",
    subsystem: "DISPLAY",
    label: "REAR LEATHERETTE ACCENT",
    techSpec: "TACTILE NON-SLIP COMPOSITE WRAP",
    explodeOffset: [0.1, 0, 1.32],
    explodeRotation: [0, 0.45, 0],
  },
  Cube005_4001: {
    name: "Cube005_4001",
    subsystem: "DISPLAY",
    label: "LCD PROTECTIVE BEZEL",
    techSpec: "IMPACT RESISTANT REINFORCED FRAME",
    explodeOffset: [0.1, 0, 1.38],
    explodeRotation: [0, 0.45, 0],
  },
  Cube005001: {
    name: "Cube005001",
    subsystem: "DISPLAY",
    label: "MONITOR RETENTION RECESS",
    techSpec: "MAGNETIC CLOSURE SENSOR MATRIX",
    explodeOffset: [0, 0, 1.1],
  },
  "+BODY076001": {
    name: "+BODY076001",
    subsystem: "DISPLAY",
    label: "DISPLAY REAR HOUSING",
    techSpec: "GASKET SEALED CONNECTOR HOUSING",
    explodeOffset: [0, 0, 1.15],
  },
  "+BODY074001": {
    name: "+BODY074001",
    subsystem: "DISPLAY",
    label: "DISPLAY INTERFACE FLEX BUS",
    techSpec: "HIGH-CYCLE RIBBON CABLE CONNECTOR",
    explodeOffset: [0, 0, 1.2],
  },

  // --- VIEWFINDER (EVF) SYSTEM ---
  wizjer: {
    name: "wizjer",
    subsystem: "VIEWFINDER",
    label: "ERGONOMIC RUBBER EYECUP",
    techSpec: "ANTI-FATIGUE SOFT SILICONE EYECUP",
    explodeOffset: [0, 0.65, 1.2],
  },
  "+BODY046001": {
    name: "+BODY046001",
    subsystem: "VIEWFINDER",
    label: "5.76M-DOT OLED OPTICAL PRISM",
    techSpec: "0.82× MAGNIFICATION // 120 FPS ULTRA-LOW LATENCY",
    explodeOffset: [0, 0.55, 0.95],
  },
  "+BODY047001": {
    name: "+BODY047001",
    subsystem: "VIEWFINDER",
    label: "EVF DIOPTER ADJUSTMENT WHEEL",
    techSpec: "-4.0 TO +2.0 M-1 CONTINUOUS ADJUSTMENT",
    explodeOffset: [0.15, 0.55, 0.9],
  },
  "+BODY061001": {
    name: "+BODY061001",
    subsystem: "VIEWFINDER",
    label: "EYE PROXIMITY SENSOR",
    techSpec: "INFRARED AUTO LCD/EVF SWITCH",
    explodeOffset: [0, 0.5, 0.85],
  },
  "+BODY062001": {
    name: "+BODY062001",
    subsystem: "VIEWFINDER",
    label: "EVF MAGNESIUM BRACKET",
    techSpec: "INTERNAL STRUCTURAL VIEWFINDER CARRIER",
    explodeOffset: [0, 0.45, 0.8],
  },

  // --- TOP CONTROLS & COMMAND DIALS ---
  "+BODY001001": {
    name: "+BODY001001",
    subsystem: "CONTROLS",
    label: "MAIN POWER SWITCH & LOCK",
    techSpec: "MACHINED ROTARY TOGGLE",
    explodeOffset: [-0.4, 0.7, 0],
  },
  "+BODY092001": {
    name: "+BODY092001",
    subsystem: "CONTROLS",
    label: "SHUTTER RELEASE BUTTON",
    techSpec: "DUAL STAGE TACTILE SWITCH (AF-LOCK / EXPOSURE)",
    explodeOffset: [-0.45, 0.85, -0.2],
  },
  "+BODY087001": {
    name: "+BODY087001",
    subsystem: "CONTROLS",
    label: "SHUTTER ACCENT BEZEL",
    techSpec: "COPPER-TINTED PRECISION KNURLED RING",
    explodeOffset: [-0.45, 0.8, -0.2],
  },
  "+BODY085001": {
    name: "+BODY085001",
    subsystem: "CONTROLS",
    label: "TOP FRONT COMMAND DIAL",
    techSpec: "INDEX-FINGER APERTURE/SHUTTER CONTROLLER",
    explodeOffset: [-0.45, 0.75, -0.3],
  },
  "+BODY086001": {
    name: "+BODY086001",
    subsystem: "CONTROLS",
    label: "M-FN MULTI-FUNCTION BUTTON",
    techSpec: "CUSTOM ACCELERATED PRESET SWITCH",
    explodeOffset: [-0.4, 0.8, -0.35],
  },
  "+BODY089001": {
    name: "+BODY089001",
    subsystem: "CONTROLS",
    label: "ISO DIRECT ACCESS BUTTON",
    techSpec: "INSTANT SENSITIVITY OVERRIDE",
    explodeOffset: [-0.3, 0.75, -0.15],
  },
  "+BODY091001": {
    name: "+BODY091001",
    subsystem: "CONTROLS",
    label: "MOVIE RECORD BUTTON",
    techSpec: "RECESSED DEDICATED 8K RECORD TRIGGER",
    explodeOffset: [-0.2, 0.75, -0.1],
  },
  "+BODY088001": {
    name: "+BODY088001",
    subsystem: "CONTROLS",
    label: "TOP REAR COMMAND DIAL",
    techSpec: "THUMB EXPOSURE COMPENSATION DIAL",
    explodeOffset: [-0.1, 0.75, 0.2],
  },
  "+BODY090001": {
    name: "+BODY090001",
    subsystem: "CONTROLS",
    label: "MODE DIAL RELEASE LOCK",
    techSpec: "SPRING-LOADED SECURITY CENTER PIN",
    explodeOffset: [0.45, 0.85, 0.1],
  },
  "+BODY077001": {
    name: "+BODY077001",
    subsystem: "CONTROLS",
    label: "MAIN SHOOTING MODE DIAL",
    techSpec: "P/Tv/Av/M/CUSTOM MODES // LASER ENGRAVED",
    explodeOffset: [0.45, 0.75, 0.1],
  },
  "+BODY078001": {
    name: "+BODY078001",
    subsystem: "CONTROLS",
    label: "PHOTO / VIDEO / S&Q SELECTOR",
    techSpec: "3-POSITION QUICK ARCHITECTURE SWITCH",
    explodeOffset: [0.45, 0.65, 0.1],
  },
  "+BODY079001": {
    name: "+BODY079001",
    subsystem: "CONTROLS",
    label: "STRAP LUG EYELET (LEFT)",
    techSpec: "REINFORCED TITANIUM ALLOY LUG (50KG RATED)",
    explodeOffset: [-0.75, 0.45, 0.0],
  },
  "+BODY095001": {
    name: "+BODY095001",
    subsystem: "CONTROLS",
    label: "STRAP LUG EYELET (RIGHT)",
    techSpec: "REINFORCED TITANIUM ALLOY LUG (50KG RATED)",
    explodeOffset: [0.75, 0.45, 0.0],
  },
  Cube046001: {
    name: "Cube046001",
    subsystem: "CONTROLS",
    label: "MULTI-FUNCTION HOT SHOE COVER",
    techSpec: "21-PIN DIGITAL AUDIO & ACCESSORY RECEIVER",
    explodeOffset: [0, 0.8, 0.4],
  },

  // --- REAR & SIDE BUTTONS, CHASSIS & INTERFACES ---
  "+BODY013001": { name: "+BODY013001", subsystem: "CHASSIS", label: "AF-ON BUTTON", techSpec: "INSTANT NEURAL AUTOFOCUS ENGAGE", explodeOffset: [0.35, 0.35, 0.75] },
  "+BODY050001": { name: "+BODY050001", subsystem: "CHASSIS", label: "AE LOCK (*) BUTTON", techSpec: "EXPOSURE LOCK & INDEX ZOOM", explodeOffset: [0.45, 0.35, 0.75] },
  "+BODY033001": { name: "+BODY033001", subsystem: "CHASSIS", label: "AF POINT SELECTION", techSpec: "FOCUS ZONE DIRECT TOGGLE", explodeOffset: [0.55, 0.35, 0.75] },
  "+BODY067001": { name: "+BODY067001", subsystem: "CHASSIS", label: "MULTI-CONTROLLER JOYSTICK", techSpec: "8-DIRECTIONAL ANALOG FOCUS POINT NUDGE", explodeOffset: [0.38, 0.2, 0.8] },
  "+BODY055001": { name: "+BODY055001", subsystem: "CHASSIS", label: "INFO BUTTON", techSpec: "ON-SCREEN HISTOGRAM & GYRO HORIZON", explodeOffset: [0.38, 0.05, 0.8] },
  "+BODY037001": { name: "+BODY037001", subsystem: "CHASSIS", label: "MENU BUTTON", techSpec: "DEEP SYSTEM PREFERENCES & LUT SELECT", explodeOffset: [-0.45, 0.4, 0.75] },
  "+BODY025001": { name: "+BODY025001", subsystem: "CHASSIS", label: "RATE / PROTECT BUTTON", techSpec: "EDITORIAL IN-CAMERA METADATA TAGGING", explodeOffset: [-0.45, 0.25, 0.75] },
  "+BODY036001": { name: "+BODY036001", subsystem: "CHASSIS", label: "PLAYBACK BUTTON", techSpec: "RAW MEDIA INSTANT PREVIEW", explodeOffset: [0.38, -0.15, 0.8] },
  "+BODY015001": { name: "+BODY015001", subsystem: "CHASSIS", label: "ERASE / DELETE BUTTON", techSpec: "DUAL CONFIRMATION PURGE", explodeOffset: [0.38, -0.3, 0.8] },
  "+BODY073001": { name: "+BODY073001", subsystem: "CHASSIS", label: "QUICK (Q) MENU BUTTON", techSpec: "OVERLAY STATUS HUD GRID", explodeOffset: [0.38, -0.02, 0.8] },
  "+BODY014001": { name: "+BODY014001", subsystem: "CHASSIS", label: "REAR CONTROL WHEEL (SET)", techSpec: "CONTINUOUS ROTARY PARAMETER NAVIGATOR", explodeOffset: [0.38, -0.1, 0.85] },
  "+BODY017001": { name: "+BODY017001", subsystem: "CHASSIS", label: "SET CENTER BUTTON", techSpec: "PARAMETER CONFIRMATION KEY", explodeOffset: [0.38, -0.1, 0.88] },
  "+BODY021001": { name: "+BODY021001", subsystem: "CHASSIS", label: "DUAL CARD DOOR LATCH", techSpec: "CFEXPRESS TYPE B + SD UHS-II WEATHER DOOR", explodeOffset: [0.8, 0, 0.3] },
  "+BODY098001": { name: "+BODY098001", subsystem: "CHASSIS", label: "CARD SLOT SPRING MECHANISM", techSpec: "POSITIVE PUSH-PUSH EJECT ARCHITECTURE", explodeOffset: [0.85, 0, 0.3] },
  "+BODY030001": { name: "+BODY030001", subsystem: "CHASSIS", label: "USB-C 3.2 GEN 2X2 PORT DOOR", techSpec: "20 Gbps TETHERING & USB-PD CHARGING", explodeOffset: [-0.8, 0.15, 0.2] },
  "+BODY094001": { name: "+BODY094001", subsystem: "CHASSIS", label: "FULL-SIZE HDMI 2.1 PORT COVER", techSpec: "UNCOMPRESSED 8K RAW STREAM OUT", explodeOffset: [-0.8, 0.0, 0.2] },
  "+BODY093001": { name: "+BODY093001", subsystem: "CHASSIS", label: "3.5MM MIC / HEADPHONE JACK COVER", techSpec: "24-BIT 48KHZ LOW-NOISE PREAMPS", explodeOffset: [-0.8, -0.15, 0.2] },
  "+BODY026001": { name: "+BODY026001", subsystem: "CHASSIS", label: "REMOTE / TIME-CODE SYNC PORT", techSpec: "BNC TIMECODE & E3 TERMINAL", explodeOffset: [-0.8, -0.3, 0.2] },
  "+BODY057001": { name: "+BODY057001", subsystem: "CHASSIS", label: "FRONT CUSTOM FN-1 BUTTON", techSpec: "DEPTH OF FIELD PREVIEW SWITCH", explodeOffset: [-0.35, -0.15, -0.6] },
  "+BODY083001": { name: "+BODY083001", subsystem: "CHASSIS", label: "FRONT CUSTOM FN-2 BUTTON", techSpec: "ZEBRA & FOCUS PEAKING TOGGLE", explodeOffset: [-0.35, -0.3, -0.6] },
  "+BODY032001": { name: "+BODY032001", subsystem: "CHASSIS", label: "LENS RELEASE BUTTON", techSpec: "SPRING-LOADED CHROME PIN RELEASE", explodeOffset: [-0.4, 0.05, -0.55] },
  "+BODY031001": { name: "+BODY031001", subsystem: "CHASSIS", label: "AF ASSIST BEAM EMITTER", techSpec: "PATTERNED IR GRID PROJECTOR", explodeOffset: [-0.45, 0.25, -0.45] },
  "+BODY027001": { name: "+BODY027001", subsystem: "CHASSIS", label: "FRONT STEREO MICROPHONE (L)", techSpec: "ACOUSTIC WIND-REDUCTION PORTS", explodeOffset: [-0.15, 0.6, -0.4] },
  "+BODY016001": { name: "+BODY016001", subsystem: "CHASSIS", label: "FRONT STEREO MICROPHONE (R)", techSpec: "ACOUSTIC WIND-REDUCTION PORTS", explodeOffset: [0.15, 0.6, -0.4] },
  "+BODY022001": { name: "+BODY022001", subsystem: "CHASSIS", label: "INTERNAL MONO SPEAKER", techSpec: "AUDIO PLAYBACK TRANSDUCER", explodeOffset: [-0.4, 0.5, 0.4] },
  "+BODY019001": { name: "+BODY019001", subsystem: "CHASSIS", label: "BATTERY COMPARTMENT DOOR", techSpec: "LP-E6NH HIGH-CAPACITY PACK SECURE HOUSING", explodeOffset: [0.3, -0.65, 0.1] },
  "+BODY020001": { name: "+BODY020001", subsystem: "CHASSIS", label: "BATTERY RELEASE SAFETY LATCH", techSpec: "ACCIDENTAL DROP PREVENTION MECHANISM", explodeOffset: [0.3, -0.7, 0.1] },
  "+BODY097001": { name: "+BODY097001", subsystem: "CHASSIS", label: "TRIPOD MOUNT SOCKET (1/4\"-20)", techSpec: "STAINLESS STEEL REINFORCED BASE PLATE", explodeOffset: [0, -0.65, 0.4] },
  "+BODY035001": { name: "+BODY035001", subsystem: "CHASSIS", label: "ANTI-ROTATION LOCATING PIN RECESS", techSpec: "VIDEO CAGE & ARCA-SWISS RIG MATING", explodeOffset: [0, -0.65, 0.3] },
  "+BODY058001": { name: "+BODY058001", subsystem: "CHASSIS", label: "RIGHT ERGONOMIC DEEP HANDGRIP", techSpec: "CONTOURED FINGER REST FOR HEAVY TELEPHOTO", explodeOffset: [-0.65, 0, -0.1] },
  "+BODY023001": { name: "+BODY023001", subsystem: "CHASSIS", label: "THUMB REST REAR SUPPORT", techSpec: "INTEGRATED LEVERAGE POINT FOR STABILITY", explodeOffset: [0.55, 0.25, 0.6] },
  "+BODY096001": { name: "+BODY096001", subsystem: "CHASSIS", label: "LEFT ACCESSORY GRIP TEXTURE", techSpec: "DIAMOND PATTERN SYNTHETIC RUBBER", explodeOffset: [0.65, 0, -0.1] },
  "+BODY028001": { name: "+BODY028001", subsystem: "CHASSIS", label: "TOP PRISM HOUSING SHELL", techSpec: "MAGNESIUM PENTAPRISM PROFILE", explodeOffset: [0, 0.55, 0.1] },
  "+BODY034001": { name: "+BODY034001", subsystem: "CHASSIS", label: "INTERNAL SENSOR SHIELDING", techSpec: "EMI/RFI INTERFERENCE SHIELD CAGE", explodeOffset: [0, 0, 0.25] },
  "+BODY054001": { name: "+BODY054001", subsystem: "CHASSIS", label: "MAIN LOGIC BOARD (DIGIC NEURAL)", techSpec: "DUAL AI INFERENCE ACCELERATORS", explodeOffset: [0, -0.1, 0.5] },
  "+BODY024001": { name: "+BODY024001", subsystem: "CHASSIS", label: "DC-DC POWER REGULATION BOARD", techSpec: "ULTRA-LOW RIPPLE POWER DELIVERY", explodeOffset: [0.2, -0.3, 0.4] },
  "+BODY002001": { name: "+BODY002001", subsystem: "CHASSIS", label: "RUBBER INTERFACE SEALS", techSpec: "68 INJECTION-MOLDED SILICONE JOINTS", explodeOffset: [-0.6, 0, 0.1] },
  "+BODY064001": { name: "+BODY064001", subsystem: "CHASSIS", label: "BOTTOM MAGNESIUM BASEPLATE", techSpec: "RIGID INTEGRATED LOWER FRAME", explodeOffset: [0, -0.6, 0.4] },
  "+BODY029001": { name: "+BODY029001", subsystem: "CHASSIS", label: "TOP RIGHT SHOULDER COVER", techSpec: "MAGNESIUM TOP DECK CONTOUR", explodeOffset: [-0.4, 0.5, -0.1] },
  "+BODY080001": { name: "+BODY080001", subsystem: "CHASSIS", label: "FRONT SKELETON REINFORCEMENT", techSpec: "TITANIUM CORE REINFORCEMENT TRUSS", explodeOffset: [0, 0, -0.2] },
  "+BODY081001": { name: "+BODY081001", subsystem: "CHASSIS", label: "INTERNAL COOLING FIN ARRAY", techSpec: "PASSIVE HEAT PIPES CONVECTING TO CHASSIS", explodeOffset: [0, 0.1, 0.35] },
  "+BODY012001": { name: "+BODY012001", subsystem: "CHASSIS", label: "SIDE STRAP BRACKET REINFORCEMENT", techSpec: "HIGH-TENSILE INTERNAL ANCHOR BOLT", explodeOffset: [-0.65, 0.35, 0.1] },

  // --- SCREEN PRINTED LABELS & MARKINGS ---
  "+BODY018001": { name: "+BODY018001", subsystem: "LABELS", label: "BRAND / MODEL LOGO EMBOSS", techSpec: "NOVA ARCHITECTURAL IDENTIFIER", explodeOffset: [-0.25, 0.4, -0.55] },
  "+BODY018002": { name: "+BODY018002", subsystem: "LABELS", label: "REAR BUTTON LABELS", techSpec: "LUMINESCENT SCREEN PRINTED MARKINGS", explodeOffset: [0.35, 0.1, 0.8] },
  "+BODY066001": { name: "+BODY066001", subsystem: "LABELS", label: "TOP DIAL POSITION MARKINGS", techSpec: "LASER ETCHED APERTURE / MODE GRADUATIONS", explodeOffset: [0.4, 0.6, 0.1] },
};

// Material Presets for the Materials Lab
export type MaterialPresetId =
  | "ORIGINAL"
  | "TITANIUM_MATTE"
  | "ALUMINUM_RAW"
  | "CARBON_FIBER"
  | "OBSIDIAN_GLASS"
  | "STUDIO_RUBBER";

export interface MaterialPreset {
  id: MaterialPresetId;
  name: string;
  subhead: string;
  colorHex: string;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  transmission?: number;
  ior?: number;
  emissive?: string;
}

export const MATERIAL_PRESETS: Record<MaterialPresetId, MaterialPreset> = {
  ORIGINAL: {
    id: "ORIGINAL",
    name: "FACTORY FINISH",
    subhead: "Factory Magnesium Obsidian PBR",
    colorHex: "#111116",
    roughness: 0.28,
    metalness: 0.75,
  },
  TITANIUM_MATTE: {
    id: "TITANIUM_MATTE",
    name: "MATTE TITANIUM",
    subhead: "Bead-Blasted Grade 5 Titanium",
    colorHex: "#525459",
    roughness: 0.42,
    metalness: 0.95,
  },
  ALUMINUM_RAW: {
    id: "ALUMINUM_RAW",
    name: "BRUSHED ALUMINUM",
    subhead: "Aerospace 7075-T6 Brushed Monocoque",
    colorHex: "#c8ccd4",
    roughness: 0.18,
    metalness: 0.98,
  },
  CARBON_FIBER: {
    id: "CARBON_FIBER",
    name: "FORGED CARBON",
    subhead: "High-Modulus Structural Composite",
    colorHex: "#181a1f",
    roughness: 0.35,
    metalness: 0.2,
    clearcoat: 0.8,
  },
  OBSIDIAN_GLASS: {
    id: "OBSIDIAN_GLASS",
    name: "OBSIDIAN CRYSTAL",
    subhead: "Deep Tinted Optical Smoked Glass",
    colorHex: "#0c0f14",
    roughness: 0.04,
    metalness: 0.1,
    transmission: 0.7,
    ior: 1.55,
  },
  STUDIO_RUBBER: {
    id: "STUDIO_RUBBER",
    name: "TACTICAL RUBBER",
    subhead: "Non-Reflective Stealth Polymer",
    colorHex: "#08090b",
    roughness: 0.85,
    metalness: 0.0,
  },
};
