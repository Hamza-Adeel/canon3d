"use client";

import { CAMERA_PARTS_REGISTRY } from "@/lib/camera-components";
import { X, CornerRightDown } from "lucide-react";
import { audio } from "@/lib/audio";

interface PartInspectorTagProps {
  selectedPartName: string | null;
  hoveredPartName: string | null;
  onClearSelection: () => void;
}

export default function PartInspectorTag({
  selectedPartName,
  hoveredPartName,
  onClearSelection,
}: PartInspectorTagProps) {
  const activeName = selectedPartName || hoveredPartName;
  if (!activeName) return null;

  const partDef = CAMERA_PARTS_REGISTRY[activeName];
  if (!partDef) return null;

  const isSelected = selectedPartName === activeName;

  return (
    <div
      className={`fixed top-24 left-6 md:left-10 z-30 flex flex-col gap-1 p-3.5 rounded-xl bg-black/75 backdrop-blur-xl border transition-all duration-200 font-mono text-[11px] select-none max-w-xs shadow-2xl ${
        isSelected
          ? "border-rose-500/50 shadow-rose-500/10"
          : "border-white/10"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 tracking-widest uppercase">
          <CornerRightDown className="w-3 h-3 text-rose-500" />
          <span>{partDef.subsystem} // INSPECTOR</span>
        </div>
        {isSelected && (
          <button
            onClick={() => {
              audio.playTick();
              onClearSelection();
            }}
            className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/10 cursor-pointer"
            title="Dismiss Inspector"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="text-xs font-semibold text-white tracking-wide mt-0.5">
        {partDef.label}
      </div>

      <p className="text-[10px] text-zinc-400 leading-snug mt-0.5">
        {partDef.techSpec}
      </p>

      <div className="flex items-center justify-between text-[9px] text-zinc-600 mt-1 pt-1 border-t border-white/5">
        <span>GLB NODE: {partDef.name}</span>
        <span className="text-rose-400/80">
          {isSelected ? "ISOLATED" : "HOVERED"}
        </span>
      </div>
    </div>
  );
}
