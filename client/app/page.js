"use client";
import { useState, useEffect } from "react";
import UploadZone from "@/components/UploadZone";
import ResultsView from "@/components/ResultsView";
import ResumeList from "@/components/ResumeList";
import {
  parseResume,
  getResumeById,
  getAllResumes,
  deleteResume,
  deleteAllResumes,
} from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function Home() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [pastResumes, setPastResumes] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
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

      setTimeout(() => {
        setResult(data.parsedData);
        setStatus("success");
        setPage(1);
        loadResumeList(1);
      }, 500);
    } catch (err) {
      stopProgress();

      setError(err.response?.data?.message || err.message);
      setStatus("error");
    }
  };

  const handleSelectPast = async (id) => {
    try {
      const data = await getResumeById(id);
      setResult(data.parsedData);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setResult(null);
    setError(null);
    setCurrentStep(0);
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      const confirmed = window.confirm("Delete this resume permanently?");

      if (!confirmed) return;

      setPastResumes((prev) => prev.filter((resume) => resume._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all resumes? This action cannot be undone.",
    );

    if (!confirmed) return;

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
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F1115] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#4A6FA5]/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
        {status === "success" && result ? (
          <ResultsView data={result} onBack={handleReset} />
        ) : (
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
                  className="inline-flex items-center rounded-full border border-[#4A6FA5]/30 bg-[#4A6FA5]/10 px-4 py-2 text-sm text-[#9FC6FF] cursor-default"
                >
                  Powered by Gemini AI
                </motion.span>

                <motion.h1
                  variants={fadeInUp}
                  className="mt-8 text-5xl font-bold leading-tight md:text-6xl"
                >
                  Turn resumes into
                  <br />
                  <span className="bg-gradient-to-r from-white via-zinc-300 to-[#4A6FA5] bg-clip-text text-transparent">
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
                className="rounded-[32px] border border-white/10 bg-[#161B22]/70 p-8 shadow-2xl backdrop-blur-xl"
              >
                <UploadZone
                  onParse={handleParse}
                  status={status}
                  error={error}
                  currentStep={currentStep}
                />
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
                  <p className="text-sm uppercase tracking-[0.25em] text-[#4A6FA5]">
                    Candidate Database
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-white">
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
                      className="flex items-center gap-2 rounded-xl
                      border border-red-500/20
                      bg-red-500/10
                      px-5 py-3
                      text-red-400
                      hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                      Delete All
                    </motion.button>
                  )}

                  {/* Stats */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="hidden rounded-2xl border border-white/10 bg-[#171C23] px-5 py-3 lg:block"
                  >
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Total
                    </p>

                    <p className="mt-1 text-2xl font-bold text-white">
                      {pastResumes.length} / {pagination?.total}
                    </p>
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
                          className="rounded-xl border border-[#8B7355]/20
                              bg-[#1A1D23]
                              px-6 py-3
                              text-[#F5F3EE]
                              transition-all
                              hover:border-[#4A6FA5]/60
                              hover:bg-[#1F232B]
                              disabled:opacity-50"
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
                    className="rounded-3xl border border-dashed border-white/10 bg-[#161B22]/50 p-16 text-center"
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
        )}
      </AnimatePresence>
    </main>
  );
}

function FeatureBadge({ text }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-[#4A6FA5]/40 hover:bg-[#4A6FA5]/10">
      {text}
    </div>
  );
}
