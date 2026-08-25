"use client";

import React, { useRef, type ReactNode } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import CameraModel from "./CameraModel";
import Lighting from "./Lighting";
import Studio from "./Studio";
import TechOverlay3D from "./TechOverlay3D";
import { ComponentSubsystem, MaterialPresetId } from "@/lib/camera-components";

interface CameraSceneProps {
  isExploreMode: boolean;
  explosionProgressRef: React.RefObject<number>;
  rotationOffsetRef: React.RefObject<number>;
  cameraPoseRef: React.RefObject<{
    position: [number, number, number];
    target: [number, number, number];
  }>;
  selectedSubsystem: ComponentSubsystem | null;
  selectedPartName: string | null;
  materialPreset: MaterialPresetId;
  wireframeActive: boolean;
  xrayActive: boolean;
  techModeActive: boolean;
  lensMacroActive: boolean;
  mouseParallaxRef: React.RefObject<{ x: number; y: number }>;
  onSelectPart: (partName: string, subsystem: ComponentSubsystem) => void;
  onHoverPart: (partName: string | null) => void;
  onLoaded?: () => void;
}

// Controller that smooths camera position & lookAt, and bridges with OrbitControls in explore mode
function DynamicCameraRig({
  isExploreMode,
  cameraPoseRef,
  mouseParallaxRef,
}: {
  isExploreMode: boolean;
  cameraPoseRef: React.RefObject<{
    position: [number, number, number];
    target: [number, number, number];
  }>;
  mouseParallaxRef: React.RefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (isExploreMode) return;

    const pose = cameraPoseRef.current ?? {
      position: [0, 0.2, -4.6],
      target: [0, 0, 0],
    };
    const parallax = mouseParallaxRef.current ?? { x: 0, y: 0 };

    // Subtle parallax offset
    const targetPosX = pose.position[0] + parallax.x * 0.25;
    const targetPosY = pose.position[1] + parallax.y * 0.18;
    const targetPosZ = pose.position[2];

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPosX, 5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPosY, 5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPosZ, 5, delta);

    currentTarget.current.x = THREE.MathUtils.damp(
      currentTarget.current.x,
      pose.target[0],
      6,
      delta
    );
    currentTarget.current.y = THREE.MathUtils.damp(
      currentTarget.current.y,
      pose.target[1],
      6,
      delta
    );
    currentTarget.current.z = THREE.MathUtils.damp(
      currentTarget.current.z,
      pose.target[2],
      6,
      delta
    );

    camera.lookAt(currentTarget.current);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={isExploreMode}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.8}
      zoomSpeed={0.8}
      minDistance={1.4}
      maxDistance={9.0}
      maxPolarAngle={Math.PI / 2 + 0.15}
    />
  );
}

// Error boundary for safe Canvas fallback
class CanvasErrorBoundary extends React.Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function CameraScene({
  isExploreMode,
  explosionProgressRef,
  rotationOffsetRef,
  cameraPoseRef,
  selectedSubsystem,
  selectedPartName,
  materialPreset,
  wireframeActive,
  xrayActive,
  techModeActive,
  lensMacroActive,
  mouseParallaxRef,
  onSelectPart,
  onHoverPart,
  onLoaded,
}: CameraSceneProps) {
  return (
    <div
      id="camera-lab-canvas-container"
      className="fixed inset-0 z-0 select-none overflow-hidden"
      style={{
        pointerEvents: "auto",
        cursor: isExploreMode ? "grab" : "default",
      }}
    >
      <CanvasErrorBoundary
        fallback={
          <div className="w-full h-full bg-[#09090c] flex items-center justify-center">
            <div className="text-white/40 text-xs font-mono tracking-[0.25em]">
              3D LAB INITIALIZATION FAILED
            </div>
          </div>
        }
      >
        <Canvas
          id="camera-canvas"
          shadows
          dpr={[1, typeof window !== "undefined" ? Math.min(2, window.devicePixelRatio) : 1.5]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [0, 0.2, -4.6],
            fov: 36,
            near: 0.1,
            far: 50,
          }}
          style={{ background: "transparent" }}
        >
          {/* Studio Lighting & Ambience */}
          <Lighting techMode={techModeActive} />

          {/* Contact Shadow Ground & Concentric Grids */}
          <Studio />

          {/* Technical HUD Overlay Line Schematics */}
          <TechOverlay3D active={techModeActive} />

          {/* The Primary 95-Mesh Camera Interface */}
          <CameraModel
            explosionProgressRef={explosionProgressRef}
            rotationOffsetRef={rotationOffsetRef}
            selectedSubsystem={selectedSubsystem}
            selectedPartName={selectedPartName}
            materialPreset={materialPreset}
            wireframeActive={wireframeActive}
            xrayActive={xrayActive}
            lensMacroActive={lensMacroActive}
            onSelectPart={onSelectPart}
            onHoverPart={onHoverPart}
            onModelLoaded={onLoaded}
          />

          {/* Dynamic Lerp Camera Controller */}
          <DynamicCameraRig
            isExploreMode={isExploreMode}
            cameraPoseRef={cameraPoseRef}
            mouseParallaxRef={mouseParallaxRef}
          />

          {/* HDR Environment Reflections */}
          <Environment preset="city" environmentIntensity={0.5} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
