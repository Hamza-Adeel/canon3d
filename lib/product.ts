// NOVA X1 — Camera System Specifications & Editorial Content

export interface SpecItem {
  name: string;
  value: string;
  highlight?: boolean;
}

export interface SpecCategory {
  id: string;
  label: string;
  headline: string;
  specs: SpecItem[];
}

export interface GalleryShot {
  id: string;
  title: string;
  category: string;
  caption: string;
  focalLength: string;
  aperture: string;
  shutter: string;
  iso: string;
  imageUrl: string;
  accentColor: string;
}

export interface LightingPreset {
  id: string;
  name: string;
  label: string;
  keyLight: [number, number, number];
  keyColor: string;
  fillColor: string;
  ambientIntensity: number;
  bgGradient: string;
}

export const BRAND = {
  name: "NOVA",
  series: "SERIES 01",
  model: "NOVA X1",
  descriptor: "FULL-FRAME ARCHITECTURAL MIRRORLESS SYSTEM",
  tagline: "SEE MORE.",
  subTagline: "ENGINEERED FOR THE UNSEEN",
  intro:
    "An uncompromising fusion of optical physics and aerospace-grade craftsmanship. Designed to disappear in your hands and elevate your vision.",
  description:
    "An uncompromising fusion of optical physics and aerospace-grade craftsmanship. Designed to disappear in your hands and elevate your vision.",
  cta: "EXPLORE THE CAMERA",
  secondaryCta: "VIEW SPECS",
  hudCoords: "LAT 35.6762° N // LON 139.6503° E",
  version: "FIRMWARE 3.2.0 // NEURAL AF ENABLED",
} as const;

export const HERO_METRICS = [
  { label: "SENSOR", value: "61.2 MP", desc: "Back-illuminated CMOS" },
  { label: "SHUTTER", value: "1/8000s", desc: "Dual Mechanical / Elec" },
  { label: "BURST", value: "30 FPS", desc: "Full RAW continuous" },
  { label: "STABILIZATION", value: "7.5 STOPS", desc: "5-Axis Sync IBIS" },
] as const;

export const PERFORMANCE_METRICS = [
  {
    id: "sensor",
    number: "61.2",
    unit: "MP",
    label: "FULL-FRAME SENSOR",
    description: "Ultra-high resolution sensor with zero low-pass filter for extreme micro-contrast.",
  },
  {
    id: "burst",
    number: "30",
    unit: "FPS",
    label: "RAW CONTINUOUS",
    description: "Zero blackout blackout-free EVF tracking at 120Hz with deep neural subject lock.",
  },
  {
    id: "video",
    number: "8K",
    unit: "60P",
    label: "INTERNAL PRORES RAW",
    description: "Uncompressed 12-bit video recording across full 35mm sensor width.",
  },
  {
    id: "iso",
    number: "102K",
    unit: "ISO",
    label: "EXPANDED SENSITIVITY",
    description: "Dual native ISO architecture (800 / 3200) delivering 15.8 stops dynamic range.",
  },
] as const;

export const SPECIFICATIONS: SpecCategory[] = [
  {
    id: "sensor",
    label: "IMAGE SENSOR",
    headline: "61.2 Megapixel Full-Frame BSI Sensor",
    specs: [
      { name: "Sensor Type", value: "35.9 × 23.9 mm Back-Illuminated CMOS", highlight: true },
      { name: "Effective Pixels", value: "61.2 Megapixels (9504 × 6336)" },
      { name: "Pixel Pitch", value: "3.76 µm" },
      { name: "Dynamic Range", value: "15.8 stops at ISO 100", highlight: true },
      { name: "Color Filter Array", value: "RGB Primary Color Filter" },
      { name: "Low-Pass Filter", value: "None (Optical Low-Pass Cancelled)" },
      { name: "Dust Reduction", value: "Ultrasonic Wave Vibration Matrix" },
    ],
  },
  {
    id: "optics",
    label: "OPTICAL & MOUNT",
    headline: "High-Speed NOVA-RF Lens Communication",
    specs: [
      { name: "Lens Mount", value: "NOVA-RF Mount (54mm diameter, 20mm flange)", highlight: true },
      { name: "Lens Compatibility", value: "Native RF Series & PL Cinema Adapters" },
      { name: "In-Body Image Stabilization", value: "5-Axis Sensor-Shift (Up to 7.5 stops CIPA)", highlight: true },
      { name: "Lens Element Architecture", value: "17 Elements in 12 Groups (Standard Prime)" },
      { name: "Aperture Blades", value: "11 Rounded Diaphragm Blades" },
      { name: "Coating Technology", value: "Sub-Wavelength Nano Structure Coating (SWC)" },
    ],
  },
  {
    id: "autofocus",
    label: "AUTOFOCUS SYSTEM",
    headline: "Deep Learning Dual-Pixel Neural AF",
    specs: [
      { name: "AF Detection Points", value: "1,053 Phase Detection Points (100% Coverage)", highlight: true },
      { name: "Sensitivity Range", value: "EV -6.5 to 21 (at ISO 100 with f/1.2 lens)" },
      { name: "Subject Recognition", value: "Humans (Eye/Face/Head/Body), Animals, Vehicles, Aircraft", highlight: true },
      { name: "Acquisition Speed", value: "0.03 seconds Lock Time" },
      { name: "Tracking Algorithm", value: "Real-Time Neural Predictive Trajectory Engine" },
    ],
  },
  {
    id: "video",
    label: "CINEMA VIDEO",
    headline: "Uncompromised 8K 60p Internal RAW",
    specs: [
      { name: "Internal Recording", value: "8K DCI (8192 × 4320) up to 59.94p", highlight: true },
      { name: "High Speed 4K", value: "4K DCI up to 120p without crop" },
      { name: "Recording Formats", value: "ProRes RAW, ProRes 422 HQ, H.265 / HEVC 10-bit 4:2:2" },
      { name: "Color Profiles", value: "NOVA Log 3, Cine-D, Rec.709, HDR PQ" },
      { name: "Audio", value: "4-Channel 24-bit 48kHz LPCM" },
      { name: "Cooling Architecture", value: "Active Magnesium Heat Dissipation System", highlight: true },
    ],
  },
  {
    id: "chassis",
    label: "BODY & ERGONOMICS",
    headline: "Monocoque Magnesium Alloy Chassis",
    specs: [
      { name: "Frame Material", value: "Die-cast Magnesium Alloy Shell", highlight: true },
      { name: "Weather Sealing", value: "68 Gasket-Sealed Joints (Dust & Drip Resistant)" },
      { name: "Operating Temp", value: "-10°C to +45°C (14°F to 113°F)" },
      { name: "Viewfinder (EVF)", value: "0.5-inch 5.76M-Dot OLED (120 fps, 0.82× mag)", highlight: true },
      { name: "Rear Display", value: "3.2-inch 2.1M-Dot Vari-Angle Touchscreen LCD" },
      { name: "Weight", value: "645g (Chassis only) / 735g (With battery and card)" },
      { name: "Dimensions", value: "138.5 × 97.5 × 84.0 mm" },
    ],
  },
  {
    id: "connectivity",
    label: "IO & CONNECTIVITY",
    headline: "Studio Workflow & High-Speed Tethering",
    specs: [
      { name: "Card Slots", value: "Dual Slots (CFexpress Type B + UHS-II SD)", highlight: true },
      { name: "USB Interface", value: "USB 3.2 Gen 2x2 Type-C (20 Gbps Power Delivery)" },
      { name: "Video Output", value: "Full-Size HDMI 2.1 Type-A (Raw Stream Out)" },
      { name: "Wireless", value: "Wi-Fi 6E (802.11ax 2.4/5/6 GHz) + Bluetooth 5.3 Low Energy" },
      { name: "Ethernet", value: "Gigabit Ethernet via USB-C Adapter Protocol" },
    ],
  },
];

export const GALLERY_SHOTS: GalleryShot[] = [
  {
    id: "shot-01",
    title: "ALPINE DRIFT",
    category: "MOTION & VELOCITY",
    caption: "High-speed panning capture at dusk utilizing 30 FPS electronic shutter and intelligent tracking.",
    focalLength: "85mm",
    aperture: "f/1.4",
    shutter: "1/2000s",
    iso: "ISO 200",
    imageUrl: "https://images.unsplash.com/photo-1509744645300-a2098b11871a?q=80&w=1600&auto=format&fit=crop",
    accentColor: "#f97316",
  },
  {
    id: "shot-02",
    title: "NEO TOKYO NOCTURNE",
    category: "LOW LIGHT ARCHITECTURE",
    caption: "Handheld 0.5s exposure leveraging 7.5-stop sensor stabilization and dual native ISO 3200.",
    focalLength: "24mm",
    aperture: "f/1.8",
    shutter: "0.5s",
    iso: "ISO 3200",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop",
    accentColor: "#38bdf8",
  },
  {
    id: "shot-03",
    title: "CHRONO MONOLITH",
    category: "STRUCTURAL GEOMETRY",
    caption: "61.2 MP extreme resolving power resolving microscopic surface textures on titanium facade.",
    focalLength: "50mm",
    aperture: "f/5.6",
    shutter: "1/500s",
    iso: "ISO 64",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    accentColor: "#a855f7",
  },
  {
    id: "shot-04",
    title: "SILENT BOTANICAL",
    category: "MACRO RESOLUTION",
    caption: "Zero chromatic aberration across extreme contrast gradients under harsh morning backlighting.",
    focalLength: "100mm Macro",
    aperture: "f/2.8",
    shutter: "1/1250s",
    iso: "ISO 100",
    imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1600&auto=format&fit=crop",
    accentColor: "#10b981",
  },
];

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: "studio",
    name: "STUDIO OBSIDIAN",
    label: "Clean Rim & Metallic Contrast",
    keyLight: [6, 8, 6],
    keyColor: "#ffffff",
    fillColor: "#e2e8f0",
    ambientIntensity: 0.9,
    bgGradient: "radial-gradient(ellipse at center, #111116 0%, #070709 100%)",
  },
  {
    id: "golden",
    name: "WARM TUNGSTEN",
    label: "Golden Optical Horizon",
    keyLight: [7, 4, 5],
    keyColor: "#ffedd5",
    fillColor: "#fb923c",
    ambientIntensity: 0.7,
    bgGradient: "radial-gradient(ellipse at center, #1c1512 0%, #090605 100%)",
  },
  {
    id: "cyber",
    name: "CYBERPUNK NEON",
    label: "Cold Cyan & Precision Magenta",
    keyLight: [-6, 6, 6],
    keyColor: "#38bdf8",
    fillColor: "#e11d48",
    ambientIntensity: 0.5,
    bgGradient: "radial-gradient(ellipse at center, #0e1726 0%, #05070c 100%)",
  },
  {
    id: "mono",
    name: "HIGH-KEY MONOCHROME",
    label: "Architectural Studio White",
    keyLight: [0, 10, 4],
    keyColor: "#f8fafc",
    fillColor: "#94a3b8",
    ambientIntensity: 1.4,
    bgGradient: "radial-gradient(ellipse at center, #1e2029 0%, #0c0d12 100%)",
  },
];
