"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Briefcase,
  User,
} from "lucide-react";

export default function ResumeList({ resumes, onSelect }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume, index) => {
        const person = resume.parsedData?.personalInfo || {};
        const profession = resume.parsedData?.profession || {};

        return (
          <motion.button
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
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#171C23]
              p-6
              text-left
              transition-all
              duration-300
              hover:border-[#4A6FA5]/40
              hover:bg-[#1B212A]
              hover:shadow-2xl
              hover:shadow-[#4A6FA5]/10
            "
          >
            {/* Glow */}

            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#4A6FA5]/5 to-transparent" />

            {/* Header */}

            <div className="relative flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4A6FA5]/15 text-[#4A6FA5]">
                  <User size={22} />
                </div>

                <div>

                  <h3 className="font-semibold text-white text-lg line-clamp-1">
                    {person.fullName || "Unknown Candidate"}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400 line-clamp-1">
                    {profession.currentDesignation ||
                      "No designation"}
                  </p>

                </div>

              </div>

              <ArrowUpRight
                size={18}
                className="text-zinc-500 transition group-hover:text-[#4A6FA5] group-hover:translate-x-1 group-hover:-translate-y-1"
              />

            </div>

            {/* Divider */}

            <div className="my-5 h-px bg-white/10" />

            {/* Info */}

            <div className="relative space-y-3 text-sm">

              <div className="flex items-center gap-3 text-zinc-400">

                <Briefcase
                  size={15}
                  className="text-[#4A6FA5]"
                />

                <span className="truncate">
                  {profession.targetRole ||
                    profession.currentDesignation ||
                    "No target role"}
                </span>

              </div>

              <div className="flex items-center gap-3 text-zinc-400">

                <Calendar
                  size={15}
                  className="text-[#4A6FA5]"
                />

                <span>
                  {new Date(
                    resume.createdAt
                  ).toLocaleDateString("en-IN", {
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

              <span className="text-sm text-[#4A6FA5] opacity-0 transition-all group-hover:opacity-100">
                View Resume →
              </span>

            </div>
          </motion.button>
        );
      })}
    </div>
  );
}