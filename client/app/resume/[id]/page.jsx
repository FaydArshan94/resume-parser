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
    } catch (err) {
      if (err.response?.status === 404) {
        router.replace("/not-found");
        return;
      }

      console.error(err);

      router.replace("/error");
      return;
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-zinc-800 border-t-white" />
          <p className="text-zinc-500">Loading resume...</p>
        </div>
      </main>
    );
  }

  if (!resume) return null;

  return (
    <main
      className="min-h-screen bg-[#0e0e0e]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% -10%, #1c1c1e 0%, #0a0a0a 45%, #050505 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto py-12 px-6">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 mb-10 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Dashboard
        </button>

        <ResultsView data={resume.parsedData} />
      </div>
    </main>
  );
}