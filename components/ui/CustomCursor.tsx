"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor({
  isExploring = false,
}: {
  isExploring?: boolean;
}) {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop fine pointer devices
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest(
            "button, a, input, [role='button'], .cursor-pointer, .interactive-target"
          )
        );
        setIsHovered(isClickable);

        const isCanvas = Boolean(
          target.closest("#camera-lab-canvas-container, canvas")
        );
        setIsCanvasHovered(isCanvas && !isClickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let rafId: number;
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.25;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.25;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out will-change-transform ${
          isHovered
            ? "w-2.5 h-2.5 bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.8)]"
            : isCanvasHovered || isExploring
            ? "w-2 h-2 bg-sky-400"
            : "w-1.5 h-1.5 bg-white"
        }`}
      />

      {/* Trailing Reticle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 will-change-transform ${
          isHovered
            ? "w-9 h-9 border border-rose-500/50 bg-rose-500/10 scale-110"
            : isExploring
            ? "w-24 h-7 rounded-full border border-sky-400/40 bg-black/70 backdrop-blur-md"
            : "w-7 h-7 border border-white/20 scale-100"
        }`}
      >
        {isExploring && (
          <span className="text-[8px] font-mono tracking-widest text-sky-300 font-medium px-2">
            ORBIT 360°
          </span>
        )}
      </div>
    </div>
  );
}
