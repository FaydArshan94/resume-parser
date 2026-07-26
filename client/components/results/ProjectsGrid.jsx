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
        <div className="rounded-3xl border border-white/10 bg-[#161B22] p-7 shadow-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
              <FolderGit2 size={22} className="text-[#4A6FA5]" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">Projects</h2>

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
                className=" group rounded-2xl border  border-white/10 bg-[#1C2129] p-6 transition-all duration-300  hover:border-[#4A6FA5]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4A6FA5]/10
              "
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-white leading-snug">
                    {project.title}
                  </h3>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                      rounded-lg
                      p-2
                      text-zinc-400
                      transition
                      hover:bg-[#4A6FA5]/10
                      hover:text-[#4A6FA5]
                    "
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                {project.organization && (
                  <p className="mt-2 text-sm text-[#4A6FA5]">
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
                      <Wrench size={16} className="text-[#4A6FA5]" />

                      <span className="text-xs uppercase tracking-wider text-zinc-500">
                        Tech Stack
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="
                          rounded-lg
                          border
                          border-white/10
                          bg-[#252C36]
                          px-3
                          py-1
                          text-xs
                          text-zinc-300
                          transition
                          group-hover:border-[#4A6FA5]/30
                        "
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
