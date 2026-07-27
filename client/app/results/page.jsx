'use client'

import { useState, useRef } from "react";
import { Upload, FileText, X, Copy, Check, Link2, Sparkles } from "lucide-react";

const MOCK_RESUME = {
  fileName: "Connor-Cafe-CV.pdf",
  size: "2.40Mb",
};

const MOCK_PARSED = {
  name: "Connor Cafe",
  title: "Senior Frontend Engineer",
  email: "connor.cafe@example.com",
  phone: "+1 (555) 019-2837",
  location: "Austin, TX",
  links: {
    github: "github.com/connorcafe",
    portfolio: "connorcafe.dev",
  },
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Next.js"],
  experience: [
    {
      company: "Northlane Studio",
      role: "Senior Frontend Engineer",
      dates: "2022 — Present",
      summary: "Led rebuild of the design system used across 6 product teams.",
    },
    {
      company: "Ferro Labs",
      role: "Frontend Engineer",
      dates: "2019 — 2022",
      summary: "Shipped the core dashboard rewrite, cut load time by 40%.",
    },
  ],
  education: [
    { school: "University of Texas at Austin", degree: "B.S. Computer Science", year: "2019" },
  ],
};

function Field({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-white/[0.06] last:border-0">
      <span className="text-[13px] text-white/40">{label}</span>
      <span className="text-[13px] text-white/85 text-right max-w-[60%]">{value}</span>
    </div>
  );
}

export default function ResumeParser() {
  const [stage, setStage] = useState("upload"); // upload | uploading | parsing | done
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("preview"); // preview | json
  const fileInputRef = useRef(null);

  const startFlow = () => {
    setStage("uploading");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 22 + 10;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setProgress(100);
        setStage("parsing");
        setTimeout(() => setStage("done"), 1400);
      } else {
        setProgress(p);
      }
    }, 220);
  };

  const reset = () => {
    setStage("upload");
    setProgress(0);
    setTab("preview");
  };

  const copyJson = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className="min-h-full w-full flex items-center justify-center p-6"
      style={{
        background:
          "radial-gradient(circle at 50% -10%, #1c1c1e 0%, #0a0a0a 45%, #050505 100%)",
      }}
    >
      <div
        className="w-full max-w-[520px] rounded-[22px] p-[1px]"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.06) 70%, rgba(255,255,255,0.14))",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.85), 0 10px 20px -8px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="rounded-[21px] p-7"
          style={{
            background:
              "linear-gradient(165deg, #171717 0%, #121212 45%, #0e0e0e 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 40px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >

          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(160deg, #2a2a2a, #131313)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              <Sparkles size={16} className="text-white/60" strokeWidth={1.75} />
            </div>
            <button
              onClick={reset}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: "linear-gradient(160deg, #262626, #121212)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.12), 0 3px 6px rgba(0,0,0,0.5)",
              }}
            >
              <X size={14} className="text-white/50" />
            </button>
          </div>

          <h1 className="text-white text-[19px] font-medium mt-4 tracking-[-0.01em]">
            Resume Parser
          </h1>
          <p className="text-white/40 text-[13px] mt-1.5 leading-relaxed">
            Upload a resume and get structured candidate data, instantly.
          </p>

          {/* Upload zone */}
          {stage === "upload" && (
            <>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 border border-dashed rounded-xl py-9 flex flex-col items-center justify-center cursor-pointer transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.25))",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.55)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    background: "linear-gradient(160deg, #2c2c2c, #141414)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  <Upload size={15} className="text-white/50" strokeWidth={1.75} />
                </div>
                <p className="text-[13px] text-white/70">
                  Drag & Drop or <span className="underline underline-offset-2">Choose file</span> to upload
                </p>
                <p className="text-[12px] text-white/30 mt-1">PDF or DOCX · Max 5.0Mb</p>
                <input ref={fileInputRef} type="file" className="hidden" onChange={startFlow} />
              </div>

              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-[12px] text-white/25">or</span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <label className="text-[13px] text-white/60 mb-2 block">Import file from URL</label>
              <div
                className="flex items-center rounded-lg px-3.5 py-2.5"
                style={{
                  background: "linear-gradient(180deg, #1c1c1c, #161616)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
                }}
              >
                <input
                  placeholder="Add file URL here"
                  className="bg-transparent flex-1 text-[13px] text-white/70 placeholder:text-white/25 outline-none"
                />
                <Link2 size={14} className="text-white/30" />
              </div>

              <button
                onClick={startFlow}
                className="w-full mt-7 rounded-xl text-black text-[13px] font-semibold py-3 transition-transform active:scale-[0.99]"
                style={{
                  background: "linear-gradient(180deg, #ffffff, #d8d8d8)",
                  boxShadow:
                    "0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                Parse Resume
              </button>
            </>
          )}

          {/* Uploading / parsing */}
          {(stage === "uploading" || stage === "parsing") && (
            <div className="mt-6">
              <div
                className="rounded-xl px-4 py-3.5"
                style={{
                  background: "linear-gradient(180deg, #1c1c1c, #151515)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(160deg, #2a2a2a, #131313)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
                      }}
                    >
                      <FileText size={13} className="text-white/50" />
                    </div>
                    <span className="text-[13px] text-white/75 truncate">{MOCK_RESUME.fileName}</span>
                  </div>
                  <span className="text-[12px] text-white/30 shrink-0">{MOCK_RESUME.size}</span>
                </div>
                <div className="h-[3px] rounded-full bg-black/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #999, #fff)",
                      boxShadow: "0 0 6px rgba(255,255,255,0.5)",
                    }}
                  />
                </div>
              </div>
              <p className="text-center text-[12px] text-white/30 mt-4">
                {stage === "uploading" ? "Uploading resume…" : "Extracting candidate details…"}
              </p>
            </div>
          )}

          {/* Done: results */}
          {stage === "done" && (
            <div className="mt-6">
              <div
                className="flex items-center gap-1 mb-4 rounded-lg p-1"
                style={{
                  background: "linear-gradient(180deg, #1c1c1c, #141414)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.5)",
                }}
              >
                <button
                  onClick={() => setTab("preview")}
                  className="flex-1 text-[12px] rounded-md py-1.5 transition-colors"
                  style={
                    tab === "preview"
                      ? {
                          background: "linear-gradient(160deg, #333, #1b1b1b)",
                          color: "#fff",
                          boxShadow:
                            "inset 0 1px 1px rgba(255,255,255,0.15), 0 2px 5px rgba(0,0,0,0.4)",
                        }
                      : { color: "rgba(255,255,255,0.4)" }
                  }
                >
                  Preview
                </button>
                <button
                  onClick={() => setTab("json")}
                  className="flex-1 text-[12px] rounded-md py-1.5 transition-colors"
                  style={
                    tab === "json"
                      ? {
                          background: "linear-gradient(160deg, #333, #1b1b1b)",
                          color: "#fff",
                          boxShadow:
                            "inset 0 1px 1px rgba(255,255,255,0.15), 0 2px 5px rgba(0,0,0,0.4)",
                        }
                      : { color: "rgba(255,255,255,0.4)" }
                  }
                >
                  JSON
                </button>
              </div>

              {tab === "preview" && (
                <div
                  className="rounded-xl px-4 py-1"
                  style={{
                    background: "linear-gradient(180deg, #1c1c1c, #151515)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  <Field label="Name" value={MOCK_PARSED.name} />
                  <Field label="Title" value={MOCK_PARSED.title} />
                  <Field label="Email" value={MOCK_PARSED.email} />
                  <Field label="Phone" value={MOCK_PARSED.phone} />
                  <Field label="Location" value={MOCK_PARSED.location} />
                  <Field label="GitHub" value={MOCK_PARSED.links.github} />
                  <Field label="Skills" value={MOCK_PARSED.skills.slice(0, 4).join(", ") + "…"} />
                  <Field label="Latest role" value={`${MOCK_PARSED.experience[0].role}, ${MOCK_PARSED.experience[0].company}`} />
                </div>
              )}

              {tab === "json" && (
                <div
                  className="rounded-xl relative"
                  style={{
                    background: "linear-gradient(180deg, #1c1c1c, #151515)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  <button
                    onClick={copyJson}
                    className="absolute top-3 right-3 w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                    style={{
                      background: "linear-gradient(160deg, #2c2c2c, #151515)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), 0 3px 6px rgba(0,0,0,0.5)",
                    }}
                  >
                    {copied ? (
                      <Check size={12} className="text-white/70" />
                    ) : (
                      <Copy size={12} className="text-white/50" />
                    )}
                  </button>
                  <pre className="text-[11.5px] leading-[1.6] text-white/60 p-4 pt-3.5 overflow-auto max-h-[280px] font-mono">
{JSON.stringify(MOCK_PARSED, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex gap-2.5 mt-5">
                <button
                  onClick={reset}
                  className="flex-1 rounded-xl text-white text-[13px] font-medium py-3 transition-transform active:scale-[0.99]"
                  style={{
                    background: "linear-gradient(160deg, #2c2c2c, #1a1a1a)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.12), 0 4px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  Parse another
                </button>
                <button
                  className="flex-1 rounded-xl text-black text-[13px] font-semibold py-3 transition-transform active:scale-[0.99]"
                  style={{
                    background: "linear-gradient(180deg, #ffffff, #d8d8d8)",
                    boxShadow:
                      "0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  Save candidate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}