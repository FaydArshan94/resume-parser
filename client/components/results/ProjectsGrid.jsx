"use client";

import { FolderGit2, ExternalLink, Wrench } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";
import { motion } from "framer-motion";

export default function ProjectsGrid({ projects = [] }) {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  if (!projects.length) return null;

  return (
    <FadeInSection>
      {" "}
      <section className="mb-10">
        <div
          className="rounded-3xl p-7"
          style={{
            background:
              "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 20px 40px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(160deg, #2a2a2a, #131313)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
              }}
            >
              <FolderGit2 size={22} className="text-white/60" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">Projects</h2>

              <p className="text-sm text-zinc-400">
                {projects.length} project{projects.length > 1 && "s"} extracted
              </p>
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {projects.map((project, index) => (
              <motion.div
                variants={item}
                key={index}
                className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                style={{
                  background: "linear-gradient(165deg, #1c1c1c, #141414)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white leading-snug tracking-[-0.01em]">
                    {project.title}
                  </h3>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                {project.organization && (
                  <p className="mt-2 text-sm text-white/50">
                    {project.organization}
                  </p>
                )}

                {project.description && (
                  <p className="mt-5 text-sm leading-7 text-zinc-300 line-clamp-6">
                    {project.description}
                  </p>
                )}

                {project.technologies?.length > 0 && (
                  <>
                    <div className="mt-6 mb-3 flex items-center gap-2">
                      <Wrench size={16} className="text-white/50" />

                      <span className="text-xs uppercase tracking-wider text-zinc-500">
                        Tech Stack
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-lg px-3 py-1 text-xs text-zinc-300 transition"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
}