"use client";

import { SUBSYSTEMS, ComponentSubsystem } from "@/lib/camera-components";
import { audio } from "@/lib/audio";

interface ComponentRailProps {
  selectedSubsystem: ComponentSubsystem | null;
  onSelectSubsystem: (subsystem: ComponentSubsystem | null) => void;
}

const RAIL_ITEMS: ComponentSubsystem[] = [
  "LENS",
  "SENSOR",
  "DISPLAY",
  "VIEWFINDER",
  "CONTROLS",
  "CHASSIS",
];

export default function ComponentRail({
  selectedSubsystem,
  onSelectSubsystem,
}: ComponentRailProps) {
  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-2 font-mono text-[10px] select-none">
      <div className="text-[9px] text-zinc-600 tracking-[0.25em] pl-2 uppercase">
        COMPONENTS
      </div>
      <div className="flex flex-col gap-1 p-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/5">
        {RAIL_ITEMS.map((subsystemKey) => {
          const item = SUBSYSTEMS[subsystemKey];
          const isSelected = selectedSubsystem === subsystemKey;

          return (
            <button
              key={subsystemKey}
              onClick={() => {
                if (isSelected) {
                  audio.playTick();
                  onSelectSubsystem(null);
                } else {
                  audio.playSelect();
                  onSelectSubsystem(subsystemKey);
                }
              }}
              onMouseEnter={() => audio.playTick(1600, 0.01)}
              className={`flex items-center justify-between gap-4 px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-rose-500/20 text-white border border-rose-500/40 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              <span className="tracking-wider">{item.label}</span>
              <span
                className={`text-[8px] tracking-widest ${
                  isSelected ? "text-rose-400 font-bold" : "text-zinc-600"
                }`}
              >
                {item.code}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
