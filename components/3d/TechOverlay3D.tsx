"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface TechOverlay3DProps {
  active: boolean;
}

export default function TechOverlay3D({ active }: TechOverlay3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Optical axis dashed line
  const opticalAxisObject = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(0, 0, -3.5),
      new THREE.Vector3(0, 0, 1.8),
    ];
    geometry.setFromPoints(points);
    const material = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.15,
      gapSize: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    return line;
  }, []);

  // Flange focal distance line
  const flangeLineObject = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(-0.7, 0, 0.46),
      new THREE.Vector3(-0.7, 0, 0.66),
    ];
    geometry.setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.85,
    });
    return new THREE.Line(geometry, material);
  }, []);

  useFrame((_, delta) => {
    if (ringRef.current && active) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Optical Center Axis Ray (Z-axis dashed line) */}
      <primitive object={opticalAxisObject} />

      {/* 2. Lens Mount Diameter Ring (Ø 54mm) */}
      <mesh ref={ringRef} position={[0, 0, 0.46]}>
        <ringGeometry args={[0.52, 0.54, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3. Flange Focal Distance Dimension Marker (20.0mm) */}
      <primitive object={flangeLineObject} />

      {/* 4. Full-Frame Sensor Dimension Rectangle (35.9 × 23.9 mm) */}
      <group position={[0, 0, 0.66]}>
        <lineSegments>
          <edgesGeometry
            args={[new THREE.PlaneGeometry(0.72, 0.48)]}
          />
          <lineBasicMaterial color="#10b981" transparent opacity={0.9} />
        </lineSegments>
      </group>

      {/* 5. Minimalist 3D Technical HTML Overlays */}
      <Html position={[0, 0.8, -1.8]} center distanceFactor={6}>
        <div className="pointer-events-none select-none flex flex-col items-center bg-black/85 border border-sky-500/40 px-2 py-1 rounded backdrop-blur-md text-[10px] font-mono text-sky-400 tracking-wider shadow-lg">
          <span>OPTICAL AXIS // Z-0</span>
          <span className="text-[8px] text-zinc-400">17 ELEMENTS // F/1.2</span>
        </div>
      </Html>

      <Html position={[-0.85, 0.2, 0.56]} center distanceFactor={6}>
        <div className="pointer-events-none select-none flex flex-col bg-black/85 border border-amber-500/40 px-2 py-1 rounded backdrop-blur-md text-[10px] font-mono text-amber-400 tracking-wider shadow-lg">
          <span>FLANGE DEPTH</span>
          <span className="text-[8px] text-zinc-400">20.00 mm ±0.01</span>
        </div>
      </Html>

      <Html position={[0.75, -0.4, 0.66]} center distanceFactor={6}>
        <div className="pointer-events-none select-none flex flex-col bg-black/85 border border-emerald-500/40 px-2 py-1 rounded backdrop-blur-md text-[10px] font-mono text-emerald-400 tracking-wider shadow-lg">
          <span>CMOS SENSOR</span>
          <span className="text-[8px] text-zinc-400">35.9 × 23.9 mm (61.2MP)</span>
        </div>
      </Html>
    </group>
  );
}
