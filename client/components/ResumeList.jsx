"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Briefcase, User, Trash2, Search, X } from "lucide-react";

export default function ResumeList({ resumes, onSelect, onDelete, onDeleteAll }) {
  const [query, setQuery] = useState("");

  const filteredResumes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resumes;

    return resumes.filter((resume) => {
      const person = resume.parsedData?.personalInfo || {};
      const profession = resume.parsedData?.profession || {};

      const haystack = [
        person.fullName,
        profession.currentDesignation,
        profession.targetRole,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [resumes, query]);

  return (
    <div>
      {/* Search bar */}
      <div
        className="mb-6 flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors"
        style={{
          background: "linear-gradient(180deg, #1c1c1c, #161616)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
        }}
      >
        <Search size={16} className="text-zinc-500 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search candidates by name or role..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="shrink-0 rounded-md p-1 text-zinc-500 hover:text-white hover:bg-white/5 transition"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {query && (
        <p className="mb-4 text-xs text-zinc-500">
          {filteredResumes.length} result{filteredResumes.length !== 1 ? "s" : ""} for "{query}"
        </p>
      )}

      {filteredResumes.length === 0 ? (
        <div
          className="rounded-3xl border border-dashed border-white/12p-12 text-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.25))",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.55)",
          }}
        >
          <p className="text-zinc-400">No candidates match "{query}".</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredResumes.map((resume, index) => {
        const person = resume.parsedData?.personalInfo || {};
        const profession = resume.parsedData?.profession || {};

        return (
          <motion.div
            key={resume._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: index * 0.05,
            }}
            whileHover={{
              y: -5,
            }}
            onClick={() => onSelect(resume._id)}
            className="group relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-black/40"
            style={{
              background:
                "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Glow */}

            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-white/4 to-transparent" />

            {/* Header */}

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white/70"
                  style={{
                    background: "linear-gradient(160deg, #2a2a2a, #131313)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
                  }}
                >
                  <User size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg line-clamp-1 tracking-[-0.01em]">
                    {person.fullName || "Unknown Candidate"}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400 line-clamp-1">
                    {profession.currentDesignation || "No designation"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(resume._id);
                  }}
                  className="p-2 rounded-lg text-zinc-500 hover:bg-red-500/10 hover:text-red-300 transition"
                >
                  <Trash2 size={16} />
                </button>

                <div className="p-2 rounded-lg text-zinc-500 group-hover:text-white/70 transition">
                  <ArrowUpRight
                    size={18}
                    className=""
                  />
                </div>
              </div>
            </div>

            {/* Divider */}

            <div className="my-5 h-px bg-white/8" />

            {/* Info */}

            <div className="relative space-y-3 text-sm">
              <div className="flex items-center gap-3 text-zinc-400">
                <Briefcase size={15} className="text-white/50" />

                <span className="truncate">
                  {profession.targetRole ||
                    profession.currentDesignation ||
                    "No target role"}
                </span>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <Calendar size={15} className="text-white/50" />

                <span>
                  {new Date(resume.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Footer */}

            <div className="relative mt-6 flex items-center justify-between">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                Parsed
              </span>

              <span className="text-sm text-white/70 opacity-0 transition-all group-hover:opacity-100">
                View Resume →
              </span>
            </div>
          </motion.div>
        );
          })}
        </div>
      )}
    </div>
  );
}