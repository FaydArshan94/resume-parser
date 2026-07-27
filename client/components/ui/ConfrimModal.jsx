"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  danger = true,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Modal shell */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-100 rounded-[20px] p-px"
            style={{
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.1))",
              boxShadow:
                "0 30px 60px -20px rgba(0,0,0,0.85), 0 10px 20px -8px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="rounded-[19px] p-6"
              style={{
                background:
                  "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: danger
                      ? "linear-gradient(160deg, #3a1f1f, #1a1010)"
                      : "linear-gradient(160deg, #2a2a2a, #131313)",
                    border: danger
                      ? "1px solid rgba(248,113,113,0.25)"
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                  }}
                >
                  <AlertTriangle
                    size={18}
                    className={danger ? "text-red-400" : "text-white/60"}
                    strokeWidth={1.75}
                  />
                </div>
                <button
                  onClick={onCancel}
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(160deg, #262626, #121212)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <X size={13} className="text-white/50" />
                </button>
              </div>

              <h2 className="text-white text-[17px] font-semibold mt-4 tracking-[-0.01em]">
                {title}
              </h2>
              <p className="text-white/45 text-[13.5px] mt-2 leading-relaxed">
                {description}
              </p>

              <div className="flex gap-2.5 mt-6">
                <button
                  onClick={onCancel}
                  className="flex-1 rounded-xl text-white text-[13px] font-medium py-2.5 transition-transform active:scale-[0.99]"
                  style={{
                    background: "linear-gradient(160deg, #2c2c2c, #1a1a1a)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.12)",
                  }}
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 rounded-xl text-[13px] font-semibold py-2.5 transition-transform active:scale-[0.99]"
                  style={
                    danger
                      ? {
                          background:
                            "linear-gradient(180deg, #f87171, #dc2626)",
                          color: "#fff",
                          boxShadow:
                            "0 6px 16px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                        }
                      : {
                          background: "linear-gradient(180deg, #ffffff, #d8d8d8)",
                          color: "#000",
                          boxShadow:
                            "0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
                        }
                  }
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}