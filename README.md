# NOVA X1 — Interactive 3D Camera System Visualizer

An immersive, scroll-driven 3D product visualization of a fictional full-frame mirrorless camera system. Explore 95 precision-modeled components through exploded architecture, subsystem isolation, material labs, and real-time technical diagnostics — all in the browser.

## ✨ Features

### 🎬 Scroll-Driven Storytelling
8 cinematic timeline stages that blend camera poses, rotation, and exploded-view transitions as you scroll through a 750vh virtual track. Smooth 60fps interpolation with Lenis smooth scrolling.

### 🔩 Exploded Architecture
Every component separates along calculated spatial trajectories with GSAP-powered spring animations. 95 individual mesh parts with per-part rotation offsets and explosion vectors.

### 🧩 Subsystem Isolation
Click or keyboard-select to isolate and focus on individual subsystems:
- **Optical System** — 17-element lens barrel with nano-coated glass elements
- **Image Sensor & IBIS** — 61.2 MP BSI CMOS with 5-axis stabilization
- **Vari-Angle Display** — Articulated LCD with magnetic closure
- **Electronic Viewfinder** — 5.76M-dot OLED optical prism
- **Tactile Controls** — Milled aluminum command dials and mode selectors
- **Magnesium Chassis** — Die-cast monocoque shell with 68 weather seals
- **Laser Etching** — Precision aperture and focal scale markings

### 🎨 Material Lab
4 surface finish presets to inspect the camera under different aesthetics:
- **Original** — Factory default materials
- **Titanium Matte** — Aerospace-grade brushed titanium
- **Forged Carbon** — Woven composite pattern
- **Optical Crystal** — Transparent lens-focused glass

### 📐 Visual Modes
- **Wireframe** — Blueprint wireframe rendering
- **X-Ray** — Holographic translucent pass-through
- **Tech Schematics** — 3D dimension lines and axis indicators
- **Lens Macro** — Close-up optical inspection camera pose

### 🖱️ Interactive Controls
- **Magnetic Controls** — Floating bottom toolbar with hover magnetic physics
- **Component Rail** — Left sidebar for quick subsystem selection
- **Progress Rail** — Right timeline scrubber with stage jump navigation
- **Part Inspector Tag** — Hover/click tooltip showing component details
- **Custom Cursor** — Precision crosshair that adapts to explore mode
- **Minimal HUD** — Telemetry overlay with stage, mode, and coordinate data

### 🔊 Procedural Audio
Web Audio API sound engine with tactile feedback:
- Micro tick on UI hover
- Mechanical latch on component selection
- Magnetic lock on reassembly
- Shutter click effect

### ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Toggle explode/assemble |
| `E` | Toggle free-orbit explore mode |
| `W` | Toggle wireframe |
| `X` | Toggle x-ray |
| `T` | Toggle tech schematics |
| `L` | Toggle lens macro focus |
| `M` | Toggle mute |
| `R` | Reset to initial state |
| `Esc` | Exit current selection/mode |

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org/) | App Router, server framework |
| [React 19](https://react.dev/) | UI framework |
| [Three.js](https://threejs.org/) | 3D rendering engine |
| [React Three Fiber](https://r3f.docs.pmnd.rs/) | React renderer for Three.js |
| [Drei](https://drei.docs.pmnd.rs/) | Three.js helpers & presets |
| [GSAP](https://greensock.com/gsap/) | ScrollTrigger, timeline animations |
| [Lenis](https://lenis.darkroom.engineering/) | Buttery smooth scrolling |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Procedural sound synthesis |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nova-x1-camera-lab.git
cd nova-x1-camera-lab

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main camera lab page (orchestrator)
│   └── globals.css         # Tailwind + custom luxury CSS
├── components/
│   ├── 3d/
│   │   ├── CameraModel.tsx  # 95-mesh GLB model loader & part logic
│   │   ├── CameraScene.tsx  # R3F Canvas, camera rig, environment
│   │   ├── Lighting.tsx     # Studio HDRI lighting setup
│   │   ├── Studio.tsx       # Ground shadows & concentric grids
│   │   └── TechOverlay3D.tsx # 3D dimension lines & axis indicators
│   └── ui/
│       ├── ComponentRail.tsx    # Left subsystem navigation rail
│       ├── CustomCursor.tsx     # Adaptive precision cursor
│       ├── MagneticControls.tsx # Bottom floating control toolbar
│       ├── MaterialDrawer.tsx   # Surface finish selection drawer
│       ├── MinimalHUD.tsx       # Top telemetry overlay
│       ├── PartInspectorTag.tsx # Hover/click part info tooltip
│       └── ScrollProgressRail.tsx # Right timeline stage scrubber
├── lib/
│   ├── audio.ts              # Web Audio API procedural sound engine
│   ├── camera-components.ts  # 95-mesh registry & 7 subsystem definitions
│   ├── constants.ts          # Timeline stages & scroll mapping
│   ├── product.ts            # Camera specs, gallery, lighting presets
│   └── suppress-three-deprecations.ts  # Three.js console noise filter
├── public/
│   └── models/
│       └── camera.glb        # The 95-mesh NOVA X1 3D model
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 📊 Camera Specifications

The NOVA X1 is a fictional concept camera with these headline specs:

- **Sensor:** 61.2 MP Full-Frame BSI CMOS (35.9 × 23.9mm)
- **Mount:** NOVA-RF (54mm diameter, 20mm flange distance)
- **Lens:** 50mm f/1.2 — 17 elements in 12 groups, sub-wavelength nano-coating
- **Stabilization:** 5-axis sensor-shift IBIS (7.5 stops CIPA)
- **Autofocus:** 1,053 phase-detection points, 0.03s lock time
- **Video:** 8K DCI 60p internal ProRes RAW
- **Burst:** 30 FPS full RAW continuous
- **ISO:** 102,400 expanded (dual native 800/3200)
- **Body:** Die-cast magnesium alloy, 645g, 68 weather seals
- **EVF:** 5.76M-dot OLED, 120Hz, 0.82× magnification

## 🎨 Design System

- **Font:** Plus Jakarta Sans (UI) + JetBrains Mono (HUD/Data)
- **Color Palette:** Obsidian black (#09090c), slate neutrals, crimson accent (#e11d48), amber accent (#f97316)
- **Glass Panels:** Frosted backdrop-blur with subtle border transparency
- **Micro-interactions:** Magnetic hover physics, spring-animated tooltips, damped camera motion

## 📄 License

This project is for demonstration and portfolio purposes. The NOVA X1 is a fictional product concept.

---

Built with obsessive precision. Every pixel, every frame, every mesh matters.
