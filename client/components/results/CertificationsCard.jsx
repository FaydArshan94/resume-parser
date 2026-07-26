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
          <div className="rounded-3xl border border-white/10 bg-[#161B22] p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
                <Award className="text-[#4A6FA5]" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Certifications
                </h2>

                <p className="text-sm text-zinc-400">
                  Professional credentials
                </p>
              </div>
            </div>

            {certifications.length ? (
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-[#1C2129] p-4"
                  >
                    <h3 className="font-medium text-white">{cert.name}</h3>

                    {(cert.issuer || cert.issueDate) && (
                      <p className="mt-2 text-sm text-zinc-400">
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

          <div className="rounded-3xl border border-white/10 bg-[#161B22] p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A6FA5]/15">
                <Award className="text-[#4A6FA5]" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Achievements
                </h2>

                <p className="text-sm text-zinc-400">Recognitions & awards</p>
              </div>
            </div>

            {achievements.length ? (
              <div className="space-y-4">
                {achievements.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-[#1C2129] p-4"
                  >
                    <h3 className="font-medium text-white">{item.title}</h3>

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
