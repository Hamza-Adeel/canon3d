/**
 * Suppresses Three.js 0.185+ deprecation warnings that originate from
 * @react-three/fiber and @react-three/drei internals (not our code).
 *
 * THREE.Clock → THREE.Timer (R3F store still uses Clock)
 * PCFSoftShadowMap → PCFShadowMap (drei ContactShadows internals)
 *
 * This module must be imported before any R3F Canvas mounts.
 */
if (typeof window !== "undefined") {
  const originalWarn = console.warn;

  console.warn = function (...args: unknown[]) {
    const msg = typeof args[0] === "string" ? args[0] : "";

    // Suppress THREE.Clock deprecation (R3F store uses it internally)
    if (msg.includes("THREE.Clock") && msg.includes("deprecated")) return;

    // Suppress PCFSoftShadowMap deprecation from library internals
    if (msg.includes("PCFSoftShadowMap") && msg.includes("deprecated")) return;

    originalWarn.apply(console, args);
  };
}
