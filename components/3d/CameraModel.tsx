"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

import {
  CAMERA_PARTS_REGISTRY,
  ComponentSubsystem,
  MaterialPresetId,
  MATERIAL_PRESETS,
} from "@/lib/camera-components";
import { audio } from "@/lib/audio";

interface CachedMeshInfo {
  mesh: THREE.Mesh;
  initialPos: THREE.Vector3;
  initialRot: THREE.Euler;
  explodeOffset: THREE.Vector3;
  explodeRotation: THREE.Euler;
  subsystem: ComponentSubsystem;
  partName: string;
  // Store original material properties as plain data (not cloned materials)
  originalColor: THREE.Color;
  originalRoughness: number;
  originalMetalness: number;
  originalTransparent: boolean;
  originalOpacity: number;
}

interface CameraModelProps {
  explosionProgressRef: React.RefObject<number>;
  rotationOffsetRef: React.RefObject<number>;
  selectedSubsystem: ComponentSubsystem | null;
  selectedPartName: string | null;
  materialPreset: MaterialPresetId;
  wireframeActive: boolean;
  xrayActive: boolean;
  lensMacroActive: boolean;
  onSelectPart: (partName: string, subsystem: ComponentSubsystem) => void;
  onHoverPart: (partName: string | null) => void;
  onModelLoaded?: () => void;
}

export default function CameraModel({
  explosionProgressRef,
  rotationOffsetRef,
  selectedSubsystem,
  selectedPartName,
  materialPreset,
  wireframeActive,
  xrayActive,
  lensMacroActive,
  onSelectPart,
  onHoverPart,
  onModelLoaded,
}: CameraModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/camera.glb", true, false);

  const meshCacheRef = useRef<CachedMeshInfo[]>([]);
  const [isReady, setIsReady] = useState(false);
  const initDoneRef = useRef(false);

  // Initialize and index all meshes — runs once
  useEffect(() => {
    if (!scene || initDoneRef.current) return;
    initDoneRef.current = true;

    const cache: CachedMeshInfo[] = [];

    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      if (!mesh.geometry) return;

      // Performance: only large meshes cast shadows
      try {
        const bbox = new THREE.Box3().setFromObject(mesh);
        const size = bbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        mesh.castShadow = maxDim > 0.02;
        mesh.receiveShadow = true;
      } catch {
        mesh.castShadow = false;
        mesh.receiveShadow = true;
      }

      const partDef = CAMERA_PARTS_REGISTRY[mesh.name];
      const subsystem = partDef ? partDef.subsystem : "CHASSIS";

      // Extract original material properties as plain data (no cloning)
      const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      const stdMat = mat instanceof THREE.MeshStandardMaterial ? mat : null;

      cache.push({
        mesh,
        initialPos: mesh.position.clone(),
        initialRot: mesh.rotation.clone(),
        explodeOffset: partDef
          ? new THREE.Vector3(...partDef.explodeOffset)
          : new THREE.Vector3(0, 0, 0),
        explodeRotation: partDef?.explodeRotation
          ? new THREE.Euler(...partDef.explodeRotation)
          : new THREE.Euler(0, 0, 0),
        subsystem,
        partName: mesh.name,
        originalColor: stdMat ? stdMat.color.clone() : new THREE.Color(0x888888),
        originalRoughness: stdMat?.roughness ?? 0.3,
        originalMetalness: stdMat?.metalness ?? 0.6,
        originalTransparent: stdMat?.transparent ?? false,
        originalOpacity: stdMat?.opacity ?? 1.0,
      });
    });

    meshCacheRef.current = cache;
    setIsReady(true);
    onModelLoaded?.();
  }, [scene, onModelLoaded]);

  // Update materials based on current state
  useEffect(() => {
    if (!isReady) return;

    const preset = MATERIAL_PRESETS[materialPreset] || MATERIAL_PRESETS.ORIGINAL;

    for (const info of meshCacheRef.current) {
      const { mesh, subsystem, partName } = info;
      if (!mesh.geometry) continue;

      const isSelected =
        (selectedPartName !== null && partName === selectedPartName) ||
        (selectedSubsystem !== null && subsystem === selectedSubsystem);
      const isAnySelected = selectedSubsystem !== null || selectedPartName !== null;

      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      for (const mat of mats) {
        if (!(mat instanceof THREE.MeshStandardMaterial)) continue;

        // 1. Base color from preset
        if (materialPreset === "ORIGINAL") {
          mat.color.copy(info.originalColor);
          mat.roughness = info.originalRoughness;
          mat.metalness = info.originalMetalness;
          mat.transparent = info.originalTransparent;
          mat.opacity = info.originalOpacity;
        } else {
          const isGlassOrScreen =
            mat.name.toLowerCase().includes("glass") ||
            mat.name.toLowerCase().includes("screen") ||
            mat.name.toLowerCase().includes("szklo");
          if (!isGlassOrScreen) {
            mat.color.set(preset.colorHex);
            mat.roughness = preset.roughness;
            mat.metalness = preset.metalness;
          }
        }

        // 2. Wireframe
        mat.wireframe = wireframeActive;

        // 3. X-Ray mode
        if (xrayActive) {
          const isInternal =
            subsystem === "SENSOR" ||
            subsystem === "LENS" ||
            mat.name.toLowerCase().includes("szklo") ||
            mat.name.toLowerCase().includes("glass");

          if (isInternal) {
            mat.transparent = true;
            mat.opacity = 1.0;
            mat.emissive.set(subsystem === "SENSOR" ? "#10b981" : "#38bdf8");
            mat.emissiveIntensity = 0.4;
          } else {
            mat.transparent = true;
            mat.opacity = 0.18;
            mat.roughness = 0.1;
            mat.metalness = 0.9;
            mat.emissive.set("#000000");
            mat.emissiveIntensity = 0;
          }
        } else {
          mat.emissive.set("#000000");
          mat.emissiveIntensity = 0;
        }

        // 4. Part isolation ghosting
        if (isAnySelected) {
          if (isSelected) {
            mat.transparent = false;
            mat.opacity = 1.0;
            mat.emissive.set(subsystem === "SENSOR" ? "#10b981" : "#f43f5e");
            mat.emissiveIntensity = 0.25;
          } else {
            mat.transparent = true;
            mat.opacity = 0.12;
          }
        } else if (!xrayActive) {
          mat.transparent = info.originalTransparent;
          mat.opacity = info.originalOpacity;
        }

        mat.needsUpdate = true;
      }
    }
  }, [
    isReady,
    materialPreset,
    wireframeActive,
    xrayActive,
    selectedSubsystem,
    selectedPartName,
  ]);

  // Per-frame animation: explosion, rotation, lens macro
  useFrame((_, delta) => {
    if (!groupRef.current || !isReady) return;
    const clampedDelta = Math.min(delta, 0.1); // prevent huge jumps

    const explosion = explosionProgressRef.current ?? 0;
    const rotOffset = rotationOffsetRef.current ?? 0;

    // Smooth base rotation
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      rotOffset,
      6,
      clampedDelta
    );

    for (const info of meshCacheRef.current) {
      const { mesh, initialPos, initialRot, explodeOffset, explodeRotation, subsystem, partName } = info;
      if (!mesh.geometry) continue;

      const isIsolated =
        (selectedPartName !== null && partName === selectedPartName) ||
        (selectedSubsystem !== null && subsystem === selectedSubsystem);

      // Target position
      let targetX = initialPos.x + explodeOffset.x * explosion;
      let targetY = initialPos.y + explodeOffset.y * explosion;
      let targetZ = initialPos.z + explodeOffset.z * explosion;

      if (isIsolated && selectedPartName === partName) {
        targetX += explodeOffset.x * 0.4;
        targetY += explodeOffset.y * 0.4;
        targetZ += explodeOffset.z * 0.4;
      }

      // Lens macro rotation
      if (lensMacroActive && subsystem === "LENS" && partName.includes("Rings")) {
        mesh.rotation.z += clampedDelta * 0.8;
      }

      // Smooth position
      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, 8, clampedDelta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 8, clampedDelta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetZ, 8, clampedDelta);

      // Smooth rotation
      mesh.rotation.x = THREE.MathUtils.damp(
        mesh.rotation.x,
        initialRot.x + explodeRotation.x * explosion,
        8,
        clampedDelta
      );
      mesh.rotation.y = THREE.MathUtils.damp(
        mesh.rotation.y,
        initialRot.y + explodeRotation.y * explosion,
        8,
        clampedDelta
      );
      mesh.rotation.z = THREE.MathUtils.damp(
        mesh.rotation.z,
        initialRot.z + explodeRotation.z * explosion,
        8,
        clampedDelta
      );
    }
  });

  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      const partDef = CAMERA_PARTS_REGISTRY[(e.object as THREE.Mesh).name];
      if (partDef) {
        audio.playSelect();
        onSelectPart(partDef.name, partDef.subsystem);
      }
    },
    [onSelectPart]
  );

  const handlePointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      const partDef = CAMERA_PARTS_REGISTRY[(e.object as THREE.Mesh).name];
      if (partDef) {
        audio.playTick(1600, 0.02);
        onHoverPart(partDef.name);
        document.body.style.cursor = "pointer";
      }
    },
    [onHoverPart]
  );

  const handlePointerOut = useCallback(() => {
    onHoverPart(null);
    document.body.style.cursor = "default";
  }, [onHoverPart]);

  return (
    <group
      ref={groupRef}
      dispose={null}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </group>
  );
}
