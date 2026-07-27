"use client";

import { useState } from "react";
import { Braces, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function JsonViewer({ data }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="mb-12">
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-7 py-6 hover:bg-white/[0.03] transition"
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(160deg, #2a2a2a, #131313)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <Braces className="text-white/60" size={22} />
            </div>

            <div className="text-left">
              <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
                Developer Data
              </h2>

              <p className="text-sm text-zinc-400">Raw parsed JSON response</p>
            </div>
          </div>

          {open ? (
            <ChevronUp className="text-zinc-400" />
          ) : (
            <ChevronDown className="text-zinc-400" />
          )}
        </button>
        <AnimatePresence>
          {open && (
            <div className="border-t border-white/10">
              <div className="px-6 pb-6">
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative max-h-[550px] overflow-auto rounded-2xl scrollbar-none"
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.55)",
                  }}
                >
                  <div className="sticky top-0 z-30 flex justify-end px-4 pt-4 pb-2 bg-[#0a0a0a]">
                    <button
                      onClick={handleCopy}
                      className="group flex items-center gap-2 rounded-2xl px-5 py-2 transition-all duration-300 active:scale-95"
                      style={{
                        background:
                          "linear-gradient(160deg, #2c2c2c, #151515)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow:
                          "inset 0 1px 1px rgba(255,255,255,0.12), 0 4px 10px rgba(0,0,0,0.5)",
                      }}
                    >
                      {copied ? (
                        <Check size={18} className="text-emerald-400" />
                      ) : (
                        <Copy
                          size={18}
                          className="text-white/60 group-hover:rotate-6 transition-transform"
                        />
                      )}
                      <span className="text-sm text-white font-medium">
                        {copied ? "Copied" : "Copy JSON"}
                      </span>
                    </button>
                  </div>

                  <pre className="px-6 pb-6 text-xs leading-6 text-zinc-300 font-mono">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}