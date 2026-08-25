"use client";

import { useRef } from "react";
import * as THREE from "three";

interface LightingProps {
  techMode?: boolean;
}

export default function Lighting({ techMode = false }: LightingProps) {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {/* Base Ambient Fill */}
      <ambientLight intensity={techMode ? 1.2 : 0.85} color="#e2e8f0" />

      {/* Main Key Rim Light */}
      <directionalLight
        ref={mainLightRef}
        position={[5, 8, 6]}
        intensity={techMode ? 2.5 : 3.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-bias={-0.0001}
      />

      {/* Top Cool Specular Rim */}
      <directionalLight
        position={[-6, 6, -5]}
        intensity={2.2}
        color="#38bdf8"
      />

      {/* Front Optical Fill */}
      <directionalLight
        position={[0, 1.5, -6]}
        intensity={1.6}
        color="#ffffff"
      />

      {/* Bottom Under-Chassis Warm Bounce */}
      <directionalLight
        position={[0, -5, 0]}
        intensity={0.5}
        color="#94a3b8"
      />
    </>
  );
}
