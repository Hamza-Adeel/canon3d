"use client";

import { useState } from "react";
import {
  Maximize2,
  Minimize2,
  Box,
  Layers,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Eye,
  Sliders,
  Cpu,
} from "lucide-react";
import { audio } from "@/lib/audio";

interface MagneticControlsProps {
  isExploded: boolean;
  isExploreMode: boolean;
  wireframeActive: boolean;
  xrayActive: boolean;
  techModeActive: boolean;
  lensMacroActive: boolean;
  materialDrawerOpen: boolean;
  onToggleExplode: () => void;
  onToggleExplore: () => void;
  onToggleWireframe: () => void;
  onToggleXray: () => void;
  onToggleTechMode: () => void;
  onToggleLensMacro: () => void;
  onToggleMaterialDrawer: () => void;
  onReset: () => void;
}

export default function MagneticControls({
  isExploded,
  isExploreMode,
  wireframeActive,
  xrayActive,
  techModeActive,
  lensMacroActive,
  materialDrawerOpen,
  onToggleExplode,
  onToggleExplore,
  onToggleWireframe,
  onToggleXray,
  onToggleTechMode,
  onToggleLensMacro,
  onToggleMaterialDrawer,
  onReset,
}: MagneticControlsProps) {
  const [isMuted, setIsMuted] = useState(audio.getMuted());

  const handleSoundToggle = () => {
    const nextMuted = audio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleHover = () => {
    audio.playTick(1800, 0.015);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl font-mono text-[11px] select-none max-w-[95vw] overflow-x-auto scrollbar-none">
      {/* 1. EXPLODE / ASSEMBLE TOGGLE */}
      <button
        onClick={() => {
          audio.playSelect();
          onToggleExplode();
        }}
        onMouseEnter={handleHover}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          isExploded
            ? "bg-rose-500 text-white font-medium shadow-lg shadow-rose-500/25"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        title="Toggle Exploded View"
      >
        <Layers className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{isExploded ? "ASSEMBLE" : "EXPLODE"}</span>
      </button>

      {/* 2. FREE ORBIT MODE */}
      <button
        onClick={() => {
          audio.playSelect();
          onToggleExplore();
        }}
        onMouseEnter={handleHover}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          isExploreMode
            ? "bg-sky-500 text-white font-medium shadow-lg shadow-sky-500/25"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        title="Free 360° Orbit Mode"
      >
        {isExploreMode ? (
          <>
            <Minimize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXIT ORBIT</span>
          </>
        ) : (
          <>
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FREE ORBIT</span>
          </>
        )}
      </button>

      {/* 3. LENS MACRO */}
      <button
        onClick={() => {
          audio.playSelect();
          onToggleLensMacro();
        }}
        onMouseEnter={handleHover}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          lensMacroActive
            ? "bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/25"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        title="Lens Macro View"
      >
        <Eye className="w-3.5 h-3.5" />
        <span className="hidden md:inline">LENS</span>
      </button>

      {/* 4. MATERIALS DRAWER TOGGLE */}
      <button
        onClick={() => {
          audio.playSelect();
          onToggleMaterialDrawer();
        }}
        onMouseEnter={handleHover}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          materialDrawerOpen
            ? "bg-purple-500 text-white font-medium shadow-lg shadow-purple-500/25"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        title="Material Finishes"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span className="hidden md:inline">MATERIAL</span>
      </button>

      {/* 5. WIREFRAME */}
      <button
        onClick={() => {
          audio.playSelect();
          onToggleWireframe();
        }}
        onMouseEnter={handleHover}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          wireframeActive
            ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/25"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        title="Blueprint Wireframe Mode"
      >
        <Box className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">WIREFRAME</span>
      </button>

      {/* 6. X-RAY */}
      <button
        onClick={() => {
          audio.playSelect();
          onToggleXray();
        }}
        onMouseEnter={handleHover}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          xrayActive
            ? "bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/25"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        title="Holographic X-Ray Mode"
      >
        <Sliders className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">X-RAY</span>
      </button>

      {/* 7. TECHNICAL HUD */}
      <button
        onClick={() => {
          audio.playSelect();
          onToggleTechMode();
        }}
        onMouseEnter={handleHover}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          techModeActive
            ? "bg-sky-400 text-black font-semibold shadow-lg shadow-sky-400/25"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
        title="Technical Dimensions & Axis"
      >
        <Cpu className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">TECH HUD</span>
      </button>

      <div className="w-[1px] h-4 bg-zinc-800 my-auto" />

      {/* 8. SOUND TOGGLE */}
      <button
        onClick={handleSoundToggle}
        onMouseEnter={handleHover}
        className="p-1.5 rounded-full text-zinc-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        title={isMuted ? "Unmute Sound" : "Mute Sound"}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-zinc-300" />}
      </button>

      {/* 9. RESET */}
      <button
        onClick={() => {
          audio.playAssembleLock();
          onReset();
        }}
        onMouseEnter={handleHover}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-zinc-500 hover:text-rose-400 hover:bg-white/5 transition-all cursor-pointer"
        title="Reset All Transforms and Materials"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span className="text-[10px]">RESET</span>
      </button>
    </div>
  );
}
