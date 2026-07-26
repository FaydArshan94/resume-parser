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
    <div className="w-full max-w-md mt-6 rounded-xl border border-[#4A6FA5]/25 bg-[#161B22] p-4 animate-in fade-in duration-300">

      <div className="flex items-center gap-3">

        {currentStep === steps.length - 1 ? (
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        ) : (
          <LoaderCircle className="w-5 h-5 text-[#4A6FA5] animate-spin" />
        )}

        <div className="flex-1">

          <div className="flex justify-between items-center">

            <p className="text-sm text-[#F5F3EE] font-medium">
              {step.label}
            </p>

            <span className="text-xs text-[#8B7355]">
              {step.progress}%
            </span>

          </div>

          <div className="mt-3 h-2 rounded-full bg-[#2A2F38] overflow-hidden">

            <div
              className="h-full rounded-full bg-linear-to-r from-[#4A6FA5] to-cyan-400 transition-all duration-700"
              style={{
                width: `${step.progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}