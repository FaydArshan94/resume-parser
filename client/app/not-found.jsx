import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-[#0e0e0e] px-6"
      style={{
        // Consistent cinematic top-glow
        backgroundImage:
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255,255,255,0.06), transparent)",
      }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 text-center flex flex-col items-center"
        style={{
          background:
            "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 20px 40px -16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Sleek metallic icon container */}
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6"
          style={{
            background: "linear-gradient(160deg, #2a2a2a, #131313)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
          }}
        >
          <FileQuestion className="text-zinc-400" size={28} />
        </div>

        <h1 className="text-xl font-semibold text-white tracking-[-0.01em] mb-3">
          Page Not Found
        </h1>
        
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
          The resume or page you are looking for doesn't exist or has been moved. 
          Please check the URL or return to the dashboard.
        </p>

        {/* Action Container */}
        <div className="flex w-full justify-center">
          <Link
            href="/"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-125"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
            }}
          >
            <Home 
              size={16} 
              className="text-zinc-300 " 
            />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}