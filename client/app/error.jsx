"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[#0e0e0e] p-6"
      style={{
        // Uses the same cinematic top-glow from the ResumeDetail page
        backgroundImage:
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255,255,255,0.06), transparent)",
      }}
    >
      {/* Premium Error Card Container */}
      <div
        className="w-full max-w-md rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl"
        style={{
          background:
            "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 20px 40px -16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Error Icon - Styled with a premium, subtle red gradient */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
          style={{
            background: "linear-gradient(160deg, #2a1616, #140a0a)",
            border: "1px solid rgba(255,90,90,0.15)",
            boxShadow:
              "inset 0 1px 1px rgba(255,100,100,0.15), 0 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          <AlertTriangle
            className="text-red-400/80"
            size={30}
            strokeWidth={1.5}
          />
        </div>

        {/* Typography block */}
        <h1 className="text-xl font-semibold text-white tracking-[-0.01em] mb-3">
          Something went wrong
        </h1>
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed max-w-[280px]">
          {error?.message ||
            "We encountered an unexpected issue while loading this page. Please try again."}
        </p>

        {/* Actions Layout */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Primary Action: Try Again */}
          <button
            onClick={() => reset()}
            className="group flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
            }}
          >
            <RefreshCcw
              size={16}
              className="transition-transform group-hover:rotate-180 duration-500"
            />
            Try again
          </button>

          {/* Secondary Action: Go Home */}
          <button
            onClick={() => router.push("/")}
            className="group flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:text-white"
            style={{
              background:
                "linear-gradient(160deg, rgba(42,42,42,0.4), rgba(19,19,19,0.4))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Home
              size={16}
              className="transition-transform group-hover:scale-110 duration-300"
            />
            Go home
          </button>
        </div>
      </div>
    </main>
  );
}
