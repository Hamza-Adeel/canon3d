"use client";

import { ContactShadows } from "@react-three/drei";

export default function Studio() {
  return (
    <group position={[0, -1.35, 0]}>
      {/* Deep Contact Shadows on Floor */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.88}
        scale={12}
        blur={1.8}
        far={5}
        resolution={1024}
        color="#000000"
      />

      {/* Studio Floor Radial Grid Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <ringGeometry args={[0.5, 4.5, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.03}
          wireframe
        />
      </mesh>

      {/* Outer Studio Floor Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}
