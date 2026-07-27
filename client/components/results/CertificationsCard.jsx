"use client";

import { Award } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";

export default function CertificationsCard({
  certifications = [],
  achievements = [],
}) {
  if (!certifications.length && !achievements.length) return null;

  return (
    <FadeInSection>
      <section className="mb-10">
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Certifications Container */}
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
            <div className="flex items-center gap-3 mb-7">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(160deg, #2a2a2a, #131313)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
                }}
              >
                <Award className="text-white/60" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
                  Certifications
                </h2>
                <p className="text-sm text-zinc-400">
                  Professional credentials
                </p>
              </div>
            </div>

            {certifications.length ? (
              <div className="space-y-5">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-5"
                    style={{
                      background: "linear-gradient(165deg, #1c1c1c, #141414)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 className="font-semibold text-white text-lg tracking-[-0.01em]">
                      {cert.name}
                    </h3>

                    {(cert.issuer || cert.issueDate) && (
                      <p className="mt-2 text-sm text-zinc-400 flex items-center gap-2">
                        {cert.issuer}
                        {cert.issuer && cert.issueDate && " • "}
                        {cert.issueDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500">No certifications found.</p>
            )}
          </div>

          {/* Achievements Container */}
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
            <div className="flex items-center gap-3 mb-7">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(160deg, #2a2a2a, #131313)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
                }}
              >
                <Award className="text-white/60" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">
                  Achievements
                </h2>
                <p className="text-sm text-zinc-400">Recognitions & awards</p>
              </div>
            </div>

            {achievements.length ? (
              <div className="space-y-5">
                {achievements.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-5"
                    style={{
                      background: "linear-gradient(165deg, #1c1c1c, #141414)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <h3 className="font-semibold text-white text-lg tracking-[-0.01em]">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500">No achievements found.</p>
            )}
          </div>
          
        </div>
      </section>
    </FadeInSection>
  );
}