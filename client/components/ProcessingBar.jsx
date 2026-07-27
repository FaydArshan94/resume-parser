"use client";

import {
  BrainCircuit,
  Database,
  ScanText,
  Sparkles,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

const steps = [
  {
    label: "Extracting text from resume...",
    progress: 20,
    icon: ScanText,
  },
  {
    label: "Parsing with Gemini AI...",
    progress: 50,
    icon: BrainCircuit,
  },
  {
    label: "Validating extracted data...",
    progress: 75,
    icon: Sparkles,
  },
  {
    label: "Saving resume...",
    progress: 95,
    icon: Database,
  },
  {
    label: "Resume parsed successfully",
    progress: 100,
    icon: CheckCircle2,
  },
];

export default function ProcessingBar({ currentStep }) {
  const step = steps[currentStep];

  const Icon = step.icon;

  return (
    <div
      className="w-full max-w-md mt-6 rounded-xl p-4 animate-in fade-in duration-300"
      style={{
        background: "linear-gradient(180deg, #1c1c1c, #151515)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-center gap-3">
        {currentStep === steps.length - 1 ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        ) : (
          <LoaderCircle className="w-5 h-5 text-white/60 animate-spin" />
        )}

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm text-white/85 font-medium">{step.label}</p>

            <span className="text-xs text-zinc-500">{step.progress}%</span>
          </div>

          <div className="mt-3 h-2 rounded-full bg-black/40 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${step.progress}%`,
                background: "linear-gradient(90deg, #999, #fff)",
                boxShadow: "0 0 6px rgba(255,255,255,0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}