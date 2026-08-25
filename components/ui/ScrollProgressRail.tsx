"use client";

import { TIMELINE_STAGES, TimelineStage } from "@/lib/constants";
import { audio } from "@/lib/audio";

interface ScrollProgressRailProps {
  currentStage: TimelineStage;
  onJumpToStage: (stage: TimelineStage) => void;
}

export default function ScrollProgressRail({
  currentStage,
  onJumpToStage,
}: ScrollProgressRailProps) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3 font-mono text-[10px] select-none">
      <div className="flex flex-col items-end gap-2.5">
        {TIMELINE_STAGES.map((stage) => {
          const isActive = currentStage.id === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => {
                audio.playSelect();
                onJumpToStage(stage);
              }}
              onMouseEnter={() => audio.playTick(1600, 0.01)}
              className="group flex items-center gap-3 cursor-pointer py-0.5 text-right transition-all"
            >
              <span
                className={`text-[9px] tracking-widest transition-all duration-200 ${
                  isActive
                    ? "text-rose-400 font-bold opacity-100 translate-x-0"
                    : "text-zinc-500 opacity-0 group-hover:opacity-100 -translate-x-1"
                }`}
              >
                {stage.name}
              </span>
              <span
                className={`text-[10px] tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-zinc-600 group-hover:text-zinc-300"
                }`}
              >
                {stage.num}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-rose-500 scale-125 shadow-sm shadow-rose-500"
                    : "bg-zinc-700 group-hover:bg-zinc-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
