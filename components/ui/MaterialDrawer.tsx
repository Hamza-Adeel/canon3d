"use client";

import {
  MATERIAL_PRESETS,
  MaterialPresetId,
  MaterialPreset,
} from "@/lib/camera-components";
import { X, Sparkles } from "lucide-react";
import { audio } from "@/lib/audio";

interface MaterialDrawerProps {
  isOpen: boolean;
  activePreset: MaterialPresetId;
  onSelectPreset: (presetId: MaterialPresetId) => void;
  onClose: () => void;
}

const PRESET_LIST: MaterialPreset[] = Object.values(MATERIAL_PRESETS);

export default function MaterialDrawer({
  isOpen,
  activePreset,
  onSelectPreset,
  onClose,
}: MaterialDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-22 left-1/2 -translate-x-1/2 z-30 flex flex-col gap-2.5 p-4 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl font-mono text-[11px] select-none w-[92vw] max-w-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>MATERIAL LAB // SURFACE FINISH</span>
        </div>
        <button
          onClick={() => {
            audio.playTick();
            onClose();
          }}
          className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/10 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {PRESET_LIST.map((preset) => {
          const isSelected = activePreset === preset.id;

          return (
            <button
              key={preset.id}
              onClick={() => {
                audio.playSelect();
                onSelectPreset(preset.id);
              }}
              onMouseEnter={() => audio.playTick(1800, 0.01)}
              className={`flex flex-col text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-purple-500 bg-purple-500/15 shadow-md shadow-purple-500/10"
                  : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-white tracking-wide">
                  {preset.name}
                </span>
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: preset.colorHex }}
                />
              </div>
              <span className="text-[9px] text-zinc-400 leading-tight">
                {preset.subhead}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
