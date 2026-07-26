"use client";

import {
  BrainCircuit,
  CheckCircle2,
  Database,
  FileText,
  LoaderCircle,
  ScanText,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    title: "Resume uploaded",
    subtitle: "Your file has been received.",
    icon: FileText,
  },
  {
    title: "Extracting text",
    subtitle: "Reading your PDF/DOCX content.",
    icon: ScanText,
  },
  {
    title: "Parsing with Gemini AI",
    subtitle: "Understanding your resume.",
    icon: BrainCircuit,
  },
  {
    title: "Validating data",
    subtitle: "Checking extracted information.",
    icon: Sparkles,
  },
  {
    title: "Saving to database",
    subtitle: "Storing your parsed resume.",
    icon: Database,
  },
  {
    title: "Opening results",
    subtitle: "Preparing your dashboard.",
    icon: CheckCircle2,
  },
];

const progress = [10, 28, 52, 74, 92, 100];

function formatFileSize(bytes) {
  if (!bytes) return "";

  const kb = bytes / 1024;

  if (kb < 1024) return `${kb.toFixed(1)} KB`;

  return `${(kb / 1024).toFixed(2)} MB`;
}

export default function ParsingLoader({
  currentStep = 0,
  fileName,
  fileSize,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-6">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-2xl">

        {/* Glow */}
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />

        <div className="relative">

          {/* Header */}

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-indigo-500/15 p-4">
              <BrainCircuit className="h-8 w-8 text-indigo-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                Parsing Resume
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Our AI is extracting structured information from your resume.
              </p>
            </div>

          </div>

          {/* File */}

          {fileName && (
            <div className="mt-8 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">

              <div className="flex items-center gap-3">

                <FileText className="h-8 w-8 text-indigo-400" />

                <div>

                  <p className="font-medium text-white">
                    {fileName}
                  </p>

                  <p className="text-sm text-slate-400">
                    {formatFileSize(fileSize)}
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                Uploaded
              </span>

            </div>
          )}

          {/* Timeline */}

          <div className="mt-10 space-y-6">

            {steps.map((step, index) => {
              const Icon = step.icon;

              const completed = index < currentStep;
              const active = index === currentStep;

              return (
                <div
                  key={step.title}
                  className="flex items-start gap-4"
                >
                  <div className="mt-0.5">

                    {completed ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    ) : active ? (
                      <LoaderCircle className="h-6 w-6 animate-spin text-indigo-400" />
                    ) : (
                      <Icon className="h-6 w-6 text-slate-600" />
                    )}

                  </div>

                  <div>

                    <p
                      className={`font-medium transition-colors ${
                        completed
                          ? "text-emerald-400"
                          : active
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      {step.subtitle}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Progress */}

          <div className="mt-10">

            <div className="h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700"
                style={{
                  width: `${progress[currentStep]}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>Please don't close this window</span>
              <span>{progress[currentStep]}%</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}