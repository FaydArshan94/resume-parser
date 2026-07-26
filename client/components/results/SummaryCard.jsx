"use client";

import { FileText } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

export default function SummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <section className="mb-10">
      <div className="rounded-3xl border border-white/10 bg-[#161B22] p-7 shadow-lg">
        <FadeInSection>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
              <FileText size={22} className="text-[#4A6FA5]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
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
            <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-[#4A6FA5]" />

            <p className="pl-5 text-[15px] leading-8 text-zinc-300">
              {summary}
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
