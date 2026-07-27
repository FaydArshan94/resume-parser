"use client";
import { useState, useEffect } from "react";
import UploadZone from "../components/UploadZone";
import ResultsView from "../components/ResultsView";
import ResumeList from "../components/ResumeList";
import {
  parseResume,
  getResumeById,
  getAllResumes,
  deleteResume,
  deleteAllResumes,
} from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import ConfirmModal from "../components/ui/ConfrimModal";
import { ToastContainer } from "../components/ui/Toast";

import { useRouter } from "next/navigation";

export default function Home() {
  const [error, setError] = useState(null);
  const [pastResumes, setPastResumes] = useState([]);
  const [status, setStatus] = useState("idle")

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();

  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null); // { type: 'single' | 'all', id? }

  const pushToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Spring physics configurations for that "cute & smooth" bounce
  const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 0.8,
  };

  // Container variant to stagger children animations cleanly
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item variant for subtle fade-in up with a spring bounce
  const fadeInUp = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: springTransition },
  };

  // Scale up variant for the right side upload box
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: springTransition },
  };

  useEffect(() => {
    loadResumeList(1);
  }, []);

  const handleLoadMore = () => {
    if (!pagination?.hasNextPage) return;

    const nextPage = page + 1;

    setPage(nextPage);

    loadResumeList(nextPage, true);
  };

  const loadResumeList = async (pageNumber = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      }

      const data = await getAllResumes(pageNumber, 10);

      setPagination(data.pagination);

      if (append) {
        setPastResumes((prev) => [...prev, ...data.resumes]);
      } else {
        setPastResumes(data.resumes);
      }
    } catch (err) {
      console.error("Failed to load resume list:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const startProgress = () => {
    setCurrentStep(0);

    const timers = [
      setTimeout(() => setCurrentStep(1), 1500),
      setTimeout(() => setCurrentStep(2), 3500),
      setTimeout(() => setCurrentStep(3), 5500),
    ];

    return () => timers.forEach(clearTimeout);
  };
  const handleParse = async (file) => {
    setSelectedFile(file);
    setStatus("loading");
    setError(null);

    const stopProgress = startProgress();

    try {
      const data = await parseResume(file);

      stopProgress();

      setCurrentStep(4);

      loadResumeList();

      setTimeout(() => {
        router.push(`/resume/${data._id}`);
      }, 500);
    } catch (err) {
      stopProgress();

      const message = err.response?.data?.message || err.message;
      setError(message);
      setStatus("error");
      pushToast(message || "Failed to parse resume.", "error");
    }
  };

  const handleSelectPast = (id) => {
    router.push(`/resume/${id}`);
  };

  const handleDelete = (id) => {
    setConfirmState({ type: "single", id });
  };

  const handleDeleteAll = () => {
    if (pastResumes.length === 0) return;
    setConfirmState({ type: "all" });
  };

  const closeConfirm = () => setConfirmState(null);

  const runConfirmedDelete = async () => {
    if (!confirmState) return;

    if (confirmState.type === "single") {
      const { id } = confirmState;
      try {
        await deleteResume(id);
        setPastResumes((prev) => prev.filter((resume) => resume._id !== id));
        setPagination((prev) =>
          prev ? { ...prev, total: Math.max(0, prev.total - 1) } : prev,
        );
        pushToast("Resume deleted.", "success");
      } catch (err) {
        pushToast(err.message || "Failed to delete resume.", "error");
      }
    }

    if (confirmState.type === "all") {
      try {
        await deleteAllResumes();
        setPastResumes([]);
        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
        setPage(1);
        pushToast("All resumes deleted.", "success");
      } catch (err) {
        pushToast(err.message || "Failed to delete resumes.", "error");
      }
    }

    setConfirmState(null);
  };
  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, #1c1c1e 0%, #0a0a0a 45%, #050505 100%)",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-white/4 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-87.5 w-87.5 rounded-full bg-white/3 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* HERO SECTION */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            {/* Left Column Content */}
            <motion.div className="flex flex-col items-start">
              <motion.span
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm text-white/70 cursor-default"
                style={{
                  background: "linear-gradient(160deg, #2a2a2a, #131313)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                }}
              >
                Powered by Gemini AI
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="mt-8 text-5xl font-bold leading-tight md:text-6xl tracking-[-0.02em]"
              >
                Turn resumes into
                <br />
                <span className="bg-linear-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                  structured candidate data
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-xl text-lg leading-8 text-zinc-400"
              >
                Upload a PDF or DOCX resume and extract clean, structured
                candidate information in seconds using AI.
              </motion.p>

              {/* Feature Badges Container */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-wrap gap-3"
              >
                <FeatureBadge text="Gemini AI" />
                <FeatureBadge text="PDF & DOCX" />
                <FeatureBadge text="Structured JSON" />
                <FeatureBadge text="Secure Processing" />
              </motion.div>
            </motion.div>

            {/* Right Column Upload Box */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="rounded-4xl p-px"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.06) 70%, rgba(255,255,255,0.14))",
                boxShadow:
                  "0 30px 60px -20px rgba(0,0,0,0.85), 0 10px 20px -8px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="rounded-[31px] p-8"
                style={{
                  background:
                    "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <UploadZone
                  onParse={handleParse}
                  status={status}
                  error={error}
                  currentStep={currentStep}
                />
              </div>
            </motion.div>
          </motion.section>

          {/* RECENT RESUMES SECTION */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="mt-24"
          >
            {/* ================= HEADER ================= */}
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                  Candidate Database
                </p>

                <h2 className="mt-2 text-4xl font-bold text-white tracking-[-0.02em]">
                  Recently Parsed Resumes
                </h2>

                <p className="mt-3 max-w-xl text-zinc-400">
                  Browse previously analyzed candidates without uploading the
                  resume again.
                </p>
              </div>

              <div className="flex items-end gap-4">
                {/* Delete All */}
                {pastResumes.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDeleteAll}
                    className="flex items-center gap-2 rounded-xl px-5 py-3 text-red-400 transition-colors"
                    style={{
                      background: "linear-gradient(160deg, #3a1f1f, #1a1010)",
                      border: "1px solid rgba(248,113,113,0.25)",
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                    }}
                  >
                    <Trash2 size={16} />
                    Delete All
                  </motion.button>
                )}

                {/* Stats */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="hidden rounded-2xl px-5 py-2 lg:block"
                  style={{
                    background: "linear-gradient(165deg, #1c1c1c, #141414)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      {pastResumes.length} / {pagination?.total}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <AnimatePresence mode="wait">
              {pastResumes.length > 0 ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <ResumeList
                    resumes={pastResumes}
                    onSelect={handleSelectPast}
                    onDelete={handleDelete}
                  />

                  {pagination?.hasNextPage && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="rounded-xl px-6 py-3 text-white/80 transition-all disabled:opacity-50"
                        style={{
                          background:
                            "linear-gradient(160deg, #2c2c2c, #1a1a1a)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                        }}
                      >
                        {loadingMore ? "Loading..." : "Load More"}
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={springTransition}
                  className="rounded-3xl border border-dashed border-white/12 p-16 text-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.25))",
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.55)",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    className="mb-4 text-6xl"
                  >
                    📄
                  </motion.div>

                  <h3 className="text-2xl font-semibold text-white">
                    No resumes yet
                  </h3>

                  <p className="mt-3 text-zinc-400">
                    Parse your first resume and it will appear here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>
      </AnimatePresence>

      <ConfirmModal
        open={!!confirmState}
        title={
          confirmState?.type === "all"
            ? "Delete all resumes?"
            : "Delete this resume?"
        }
        description={
          confirmState?.type === "all"
            ? "This will permanently remove every parsed resume from your database. This action cannot be undone."
            : "This will permanently remove this candidate's parsed data. This action cannot be undone."
        }
        confirmLabel="Delete"
        danger
        onConfirm={runConfirmedDelete}
        onCancel={closeConfirm}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}

function FeatureBadge({ text }) {
  return (
    <div
      className="rounded-full px-4 py-2 text-sm text-zinc-300 transition"
      style={{
        background: "linear-gradient(160deg, #262626, #131313)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08)",
      }}
    >
      {text}
    </div>
  );
}
