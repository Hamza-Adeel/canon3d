"use client";

import "@/lib/suppress-three-deprecations";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import CameraScene from "@/components/3d/CameraScene";
import MinimalHUD from "@/components/ui/MinimalHUD";
import MagneticControls from "@/components/ui/MagneticControls";
import ComponentRail from "@/components/ui/ComponentRail";
import PartInspectorTag from "@/components/ui/PartInspectorTag";
import MaterialDrawer from "@/components/ui/MaterialDrawer";
import ScrollProgressRail from "@/components/ui/ScrollProgressRail";
import CustomCursor from "@/components/ui/CustomCursor";

import {
  TIMELINE_STAGES,
  TimelineStage,
  getStageFromProgress,
} from "@/lib/constants";
import {
  ComponentSubsystem,
  MaterialPresetId,
  SUBSYSTEMS,
} from "@/lib/camera-components";
import { audio } from "@/lib/audio";

gsap.registerPlugin(ScrollTrigger);

export default function CameraLabPage() {
  const [currentStage, setCurrentStage] = useState<TimelineStage>(
    TIMELINE_STAGES[0]
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExploreMode, setIsExploreMode] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [selectedSubsystem, setSelectedSubsystem] =
    useState<ComponentSubsystem | null>(null);
  const [selectedPartName, setSelectedPartName] = useState<string | null>(null);
  const [hoveredPartName, setHoveredPartName] = useState<string | null>(null);

  const [materialPreset, setMaterialPreset] =
    useState<MaterialPresetId>("ORIGINAL");
  const [materialDrawerOpen, setMaterialDrawerOpen] = useState(false);
  const [wireframeActive, setWireframeActive] = useState(false);
  const [xrayActive, setXrayActive] = useState(false);
  const [techModeActive, setTechModeActive] = useState(false);
  const [lensMacroActive, setLensMacroActive] = useState(false);

  // High-performance animation refs (no React re-renders during RAF)
  const explosionProgressRef = useRef(0);
  const rotationOffsetRef = useRef(0);
  const cameraPoseRef = useRef({
    position: [0.0, 0.2, -4.6] as [number, number, number],
    target: [0.0, -0.05, 0.3] as [number, number, number],
  });
  const mouseParallaxRef = useRef({ x: 0, y: 0 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Setup Lenis Smooth Scrolling and Master GSAP ScrollTrigger Timeline
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    // Master Timeline Scrubbing
    const st = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.0,
      onUpdate: (self) => {
        if (isExploreMode) return;

        const p = self.progress;
        setScrollProgress(p);
        const stage = getStageFromProgress(p);
        setCurrentStage(stage);

        // Compute stage interpolation factor within current segment
        const [start, end] = stage.range;
        const segmentProgress = Math.max(
          0,
          Math.min(1, (p - start) / (end - start || 1))
        );

        // If no manual subsystem isolation active, follow timeline camera pose
        if (!selectedSubsystem && !lensMacroActive) {
          // Find next stage for smooth camera blending
          const stageIdx = TIMELINE_STAGES.findIndex((s) => s.id === stage.id);
          const nextStage = TIMELINE_STAGES[stageIdx + 1] || stage;

          const curPos = stage.cameraPose.position;
          const nextPos = nextStage.cameraPose.position;
          const curTarget = stage.cameraPose.target;
          const nextTarget = nextStage.cameraPose.target;

          cameraPoseRef.current.position = [
            curPos[0] + (nextPos[0] - curPos[0]) * segmentProgress,
            curPos[1] + (nextPos[1] - curPos[1]) * segmentProgress,
            curPos[2] + (nextPos[2] - curPos[2]) * segmentProgress,
          ];

          cameraPoseRef.current.target = [
            curTarget[0] + (nextTarget[0] - curTarget[0]) * segmentProgress,
            curTarget[1] + (nextTarget[1] - curTarget[1]) * segmentProgress,
            curTarget[2] + (nextTarget[2] - curTarget[2]) * segmentProgress,
          ];
        }

        // Timeline rotation & explosion
        const curRot = stage.rotationOffset;
        const stageIdx = TIMELINE_STAGES.findIndex((s) => s.id === stage.id);
        const nextStage = TIMELINE_STAGES[stageIdx + 1] || stage;
        const nextRot = nextStage.rotationOffset;

        rotationOffsetRef.current =
          curRot + (nextRot - curRot) * segmentProgress;

        // Auto explosion factor based on stage
        if (!selectedSubsystem) {
          const curExp = stage.explosionFactor;
          const nextExp = nextStage.explosionFactor;
          const targetExp = curExp + (nextExp - curExp) * segmentProgress;
          explosionProgressRef.current = targetExp;
          setIsExploded(targetExp > 0.3);
        }
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      st.kill();
    };
  }, [isExploreMode, selectedSubsystem, lensMacroActive]);

  // Subtle Mouse Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseParallaxRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard Interaction Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.code === "Space") {
        e.preventDefault();
        handleToggleExplode();
      } else if (e.code === "KeyE") {
        e.preventDefault();
        handleToggleExplore();
      } else if (e.code === "KeyW") {
        e.preventDefault();
        setWireframeActive((prev) => !prev);
      } else if (e.code === "KeyX") {
        e.preventDefault();
        setXrayActive((prev) => !prev);
      } else if (e.code === "KeyT") {
        e.preventDefault();
        setTechModeActive((prev) => !prev);
      } else if (e.code === "KeyL") {
        e.preventDefault();
        handleToggleLensMacro();
      } else if (e.code === "KeyM") {
        e.preventDefault();
        audio.toggleMute();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        handleReset();
      } else if (e.code === "Escape") {
        e.preventDefault();
        if (selectedSubsystem || selectedPartName) {
          setSelectedSubsystem(null);
          setSelectedPartName(null);
        } else if (isExploreMode) {
          setIsExploreMode(false);
          document.body.style.overflow = "auto";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExploreMode, isExploded, selectedSubsystem, selectedPartName]);

  // Handle Explode / Assemble Smooth GSAP Animation
  const handleToggleExplode = useCallback(() => {
    const nextExploded = !isExploded;
    setIsExploded(nextExploded);

    gsap.to(explosionProgressRef, {
      current: nextExploded ? 1.0 : 0.0,
      duration: 1.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (!nextExploded) {
          audio.playAssembleLock();
        }
      },
    });
  }, [isExploded]);

  // Handle Free Orbit Explore Mode
  const handleToggleExplore = useCallback(() => {
    setIsExploreMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return next;
    });
  }, []);

  // Handle Lens Macro Focus Mode
  const handleToggleLensMacro = useCallback(() => {
    setLensMacroActive((prev) => {
      const next = !prev;
      if (next) {
        setSelectedSubsystem("LENS");
        cameraPoseRef.current = SUBSYSTEMS.LENS.cameraPose;
      } else {
        setSelectedSubsystem(null);
      }
      return next;
    });
  }, []);

  // Handle Selecting a Specific Subsystem
  const handleSelectSubsystem = useCallback(
    (subsystem: ComponentSubsystem | null) => {
      setSelectedSubsystem(subsystem);
      setSelectedPartName(null);

      if (subsystem) {
        const meta = SUBSYSTEMS[subsystem];
        gsap.to(cameraPoseRef.current.position, {
          0: meta.cameraPose.position[0],
          1: meta.cameraPose.position[1],
          2: meta.cameraPose.position[2],
          duration: 1.4,
          ease: "power2.inOut",
        });
        gsap.to(cameraPoseRef.current.target, {
          0: meta.cameraPose.target[0],
          1: meta.cameraPose.target[1],
          2: meta.cameraPose.target[2],
          duration: 1.4,
          ease: "power2.inOut",
        });
      } else {
        // Return to current timeline stage pose
        const curStage = getStageFromProgress(scrollProgress);
        cameraPoseRef.current = {
          position: [...curStage.cameraPose.position],
          target: [...curStage.cameraPose.target],
        };
      }
    },
    [scrollProgress]
  );

  // Handle Direct 3D Part Click / Raycast
  const handleSelectPart = useCallback(
    (partName: string, subsystem: ComponentSubsystem) => {
      setSelectedPartName(partName);
      setSelectedSubsystem(subsystem);

      const meta = SUBSYSTEMS[subsystem];
      gsap.to(cameraPoseRef.current.position, {
        0: meta.cameraPose.position[0],
        1: meta.cameraPose.position[1],
        2: meta.cameraPose.position[2],
        duration: 1.2,
        ease: "power2.inOut",
      });
      gsap.to(cameraPoseRef.current.target, {
        0: meta.cameraPose.target[0],
        1: meta.cameraPose.target[1],
        2: meta.cameraPose.target[2],
        duration: 1.2,
        ease: "power2.inOut",
      });
    },
    []
  );

  // Jump directly to a stage via the progress rail
  const handleJumpToStage = useCallback((stage: TimelineStage) => {
    const targetScrollY =
      stage.range[0] *
      (document.documentElement.scrollHeight - window.innerHeight);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScrollY, { duration: 1.6 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  }, []);

  // Complete System Reset
  const handleReset = useCallback(() => {
    setSelectedSubsystem(null);
    setSelectedPartName(null);
    setHoveredPartName(null);
    setMaterialPreset("ORIGINAL");
    setWireframeActive(false);
    setXrayActive(false);
    setTechModeActive(false);
    setLensMacroActive(false);
    setIsExploded(false);
    setIsExploreMode(false);
    document.body.style.overflow = "auto";

    gsap.to(explosionProgressRef, {
      current: 0,
      duration: 1.4,
      ease: "power3.inOut",
    });

    const initStage = TIMELINE_STAGES[0];
    cameraPoseRef.current = {
      position: [...initStage.cameraPose.position],
      target: [...initStage.cameraPose.target],
    };

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    }
  }, []);

  // Active mode human-readable label
  const activeModeLabel = selectedSubsystem
    ? `${SUBSYSTEMS[selectedSubsystem].label} ISOLATED`
    : wireframeActive
    ? "BLUEPRINT WIREFRAME"
    : xrayActive
    ? "HOLOGRAPHIC X-RAY"
    : techModeActive
    ? "TECHNICAL SCHEMATICS"
    : lensMacroActive
    ? "MACRO OPTICAL INSPECTION"
    : materialPreset !== "ORIGINAL"
    ? `MATERIAL: ${materialPreset}`
    : isExploded
    ? "EXPLODED ARCHITECTURE"
    : "NORMAL ARCHITECTURE";

  return (
    <div className="relative min-h-screen bg-[#09090c] text-white selection:bg-rose-500/30 selection:text-white font-mono antialiased overflow-x-hidden">
      {/* Precision Custom Cursor */}
      <CustomCursor isExploring={isExploreMode} />

      {/* Floating Minimalist Telemetry HUD */}
      <MinimalHUD
        currentStage={currentStage}
        activeModeLabel={activeModeLabel}
        selectedSubsystem={selectedSubsystem}
        selectedPartName={selectedPartName}
        isExploreMode={isExploreMode}
        totalScrollProgress={scrollProgress}
      />

      {/* Left Subsystem Selection Rail */}
      <ComponentRail
        selectedSubsystem={selectedSubsystem}
        onSelectSubsystem={handleSelectSubsystem}
      />

      {/* Right Scroll Timeline Step Rail */}
      <ScrollProgressRail
        currentStage={currentStage}
        onJumpToStage={handleJumpToStage}
      />

      {/* Hover / Click Part Inspector Micro-Tag */}
      <PartInspectorTag
        selectedPartName={selectedPartName}
        hoveredPartName={hoveredPartName}
        onClearSelection={() => {
          setSelectedPartName(null);
          setSelectedSubsystem(null);
        }}
      />

      {/* Surface Material Selection Drawer */}
      <MaterialDrawer
        isOpen={materialDrawerOpen}
        activePreset={materialPreset}
        onSelectPreset={(preset) => {
          setMaterialPreset(preset);
          setMaterialDrawerOpen(false);
        }}
        onClose={() => setMaterialDrawerOpen(false)}
      />

      {/* Bottom Floating Magnetic Controls */}
      <MagneticControls
        isExploded={isExploded}
        isExploreMode={isExploreMode}
        wireframeActive={wireframeActive}
        xrayActive={xrayActive}
        techModeActive={techModeActive}
        lensMacroActive={lensMacroActive}
        materialDrawerOpen={materialDrawerOpen}
        onToggleExplode={handleToggleExplode}
        onToggleExplore={handleToggleExplore}
        onToggleWireframe={() => setWireframeActive((prev) => !prev)}
        onToggleXray={() => setXrayActive((prev) => !prev)}
        onToggleTechMode={() => setTechModeActive((prev) => !prev)}
        onToggleLensMacro={handleToggleLensMacro}
        onToggleMaterialDrawer={() => setMaterialDrawerOpen((prev) => !prev)}
        onReset={handleReset}
      />

      {/* Full-Screen 3D Interactive Canvas */}
      <Suspense
        fallback={
          <div className="fixed inset-0 z-0 bg-[#09090c] flex items-center justify-center">
            <div className="text-zinc-600 text-xs font-mono tracking-[0.3em] animate-pulse">
              INITIALIZING 3D OPTICAL LAB...
            </div>
          </div>
        }
      >
        <CameraScene
          isExploreMode={isExploreMode}
          explosionProgressRef={explosionProgressRef}
          rotationOffsetRef={rotationOffsetRef}
          cameraPoseRef={cameraPoseRef}
          selectedSubsystem={selectedSubsystem}
          selectedPartName={selectedPartName}
          materialPreset={materialPreset}
          wireframeActive={wireframeActive}
          xrayActive={xrayActive}
          techModeActive={techModeActive}
          lensMacroActive={lensMacroActive}
          mouseParallaxRef={mouseParallaxRef}
          onSelectPart={handleSelectPart}
          onHoverPart={setHoveredPartName}
        />
      </Suspense>

      {/* Virtual Scroll Timeline Track (750vh allows high-fidelity scrubbing) */}
      <div
        ref={scrollContainerRef}
        className={`w-full h-[750vh] pointer-events-none relative z-10 ${
          isExploreMode ? "invisible" : "visible"
        }`}
      />
    </div>
  );
}
