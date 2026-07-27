"use client";

import { FileText } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

export default function SummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <section className="mb-10">
      <div
        className="rounded-3xl p-7"
        style={{
          background:
            "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 20px 40px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <FadeInSection>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(160deg, #2a2a2a, #131313)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <FileText size={22} className="text-white/60" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
                Professional Summary
              </h2>

              <p className="text-sm text-zinc-400">
                AI extracted candidate overview
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="relative">
            <div
              className="absolute left-0 top-0 h-full w-1 rounded-full"
              style={{
                background: "linear-gradient(180deg, #999, #444)",
              }}
            />

            <p className="pl-5 text-[15px] leading-8 text-zinc-300">
              {summary}
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}