"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const ACCENTS = {
  success: { icon: "text-emerald-400", ring: "rgba(52,211,153,0.25)" },
  error: { icon: "text-red-400", ring: "rgba(248,113,113,0.25)" },
  info: { icon: "text-[#9FC6FF]", ring: "rgba(74,111,165,0.3)" },
};

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2.5 w-full max-w-[340px]">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          const accent = ACCENTS[toast.type] || ACCENTS.info;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex items-start gap-3 rounded-xl p-3.5 pr-3"
              style={{
                background:
                  "linear-gradient(165deg, #1a1a1a 0%, #131313 60%, #0f0f0f 100%)",
                border: `1px solid ${accent.ring}`,
                boxShadow:
                  "0 20px 40px -16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <Icon size={18} className={`mt-0.5 shrink-0 ${accent.icon}`} strokeWidth={1.75} />
              <p className="text-[13px] text-white/80 leading-snug flex-1">
                {toast.message}
              </p>
              <button
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
              >
                <X size={12} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}