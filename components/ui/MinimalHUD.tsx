"use client";

import { TimelineStage } from "@/lib/constants";
import { ComponentSubsystem, SUBSYSTEMS } from "@/lib/camera-components";

interface MinimalHUDProps {
  currentStage: TimelineStage;
  activeModeLabel: string;
  selectedSubsystem: ComponentSubsystem | null;
  selectedPartName: string | null;
  isExploreMode: boolean;
  totalScrollProgress: number;
}

export default function MinimalHUD({
  currentStage,
  activeModeLabel,
  selectedSubsystem,
  selectedPartName,
  isExploreMode,
  totalScrollProgress,
}: MinimalHUDProps) {
  const subsystemInfo = selectedSubsystem ? SUBSYSTEMS[selectedSubsystem] : null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-6 md:p-10 font-mono select-none">
      {/* --- TOP BAR --- */}
      <header className="flex items-start justify-between">
        {/* TOP LEFT: Brand & System Telemetry */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xs font-semibold tracking-[0.25em] text-zinc-100">
              NOVA SYSTEM
            </h1>
            <span className="text-[10px] text-zinc-500 tracking-widest">// LAB-01</span>
          </div>
          <p className="text-[10px] text-zinc-500 tracking-wider">
            OPTICAL ENGINE // 61.2MP BSI
          </p>
        </div>

        {/* TOP RIGHT: Stage Counter & Status */}
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] text-zinc-100">
              {currentStage.num} / 08
            </span>
            <span className="text-[10px] text-rose-500 font-bold tracking-widest uppercase">
              [{currentStage.name}]
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <span>SCRUB {(totalScrollProgress * 100).toFixed(0)}%</span>
            <div className="w-16 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-150"
                style={{ width: `${Math.round(totalScrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- CENTER DYNAMIC CALLOUT (If Subsystem Selected) --- */}
      {subsystemInfo && (
        <div className="self-start my-auto max-w-sm border-l-2 border-rose-500 pl-4 py-2 bg-black/40 backdrop-blur-md transition-all duration-300">
          <div className="text-[10px] text-rose-400 tracking-widest mb-0.5">
            {subsystemInfo.code} // SUBSYSTEM ISOLATED
          </div>
          <div className="text-sm font-semibold tracking-wider text-white">
            {subsystemInfo.title}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
            {subsystemInfo.description}
          </p>
          {selectedPartName && (
            <div className="mt-2 text-[10px] text-zinc-500">
              NODE: <span className="text-zinc-300">{selectedPartName}</span>
            </div>
          )}
        </div>
      )}

      {/* --- BOTTOM BAR --- */}
      <footer className="flex items-end justify-between">
        {/* BOTTOM LEFT: Current Active Mode */}
        <div className="flex flex-col gap-1">
          <div className="text-[10px] text-zinc-500 tracking-widest uppercase">
            ACTIVE STATE
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-widest text-zinc-300">
              {isExploreMode ? "FREE ORBIT MODE (SCROLL PAUSED)" : activeModeLabel}
            </span>
          </div>
        </div>

        {/* BOTTOM RIGHT: Interaction Guide */}
        <div className="hidden sm:flex flex-col items-end gap-1 text-right text-[10px] text-zinc-500 tracking-wider">
          <div>{isExploreMode ? "DRAG TO ORBIT // SCROLL TO ZOOM" : "SCROLL TO TRANSFORM // TAP PARTS"}</div>
          <div className="text-zinc-600 tracking-widest">[ SPACE: EXPLODE ] [ E: ORBIT ] [ R: RESET ]</div>
        </div>
      </footer>
    </div>
  );
}
