"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ResultsView from "@/components/ResultsView";
import { getResumeById } from "@/lib/api";

export default function ResumeDetail({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {
    setIsLoading(true);
    try {
      const data = await getResumeById(id);
      setResume(data);
    } catch (error) {
      console.error("Failed to load resume", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Improved UX: Sleek loading state instead of just returning null
  if (isLoading || !resume) {
    return (
      <main className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-zinc-800 border-t-white/80"></div>
          <p className="text-sm font-medium text-zinc-500 animate-pulse tracking-[-0.01em]">
            Loading resume data...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main 
      className="min-h-screen bg-[#0e0e0e]"
      style={{
        // A subtle, premium top-glow effect to match the dark theme
        backgroundImage: "radial-gradient(circle at 50% -10%, #1c1c1e 0%, #0a0a0a 45%, #050505 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto py-12 px-6">
        
        {/* Upgraded Back Button using the same glass-morphism UI */}
        <button
          onClick={() => router.push("/")}
          className="group flex w-fit items-center gap-2 mb-10 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:text-white"
          style={{
            background: "linear-gradient(160deg, rgba(42,42,42,0.4), rgba(19,19,19,0.4))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <ArrowLeft 
            size={16} 
            className="transition-transform duration-300 group-hover:-translate-x-1" 
          />
          Back to Dashboard
        </button>

        <ResultsView data={resume.parsedData} />
      </div>
    </main>
  );
}