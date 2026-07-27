"use client";
import { useState, useRef } from "react";
import { UploadCloud, FileText, X, AlertCircle } from "lucide-react";
import ProcessingBar from "./ProcessingBar";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function UploadZone({ onParse, status, error, currentStep }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState(null);
  const inputRef = useRef(null);

  const isValidFile = (f) => f && ACCEPTED_TYPES.includes(f.type);

  const MAX_SIZE = 5 * 1024 * 1024;

  const handleFile = (f) => {
    if (!f) return;

    if (!ACCEPTED_TYPES.includes(f.type)) {
      setFile(null);
      setLocalError("Only PDF and DOCX files are supported.");
      return;
    }

    if (f.size > MAX_SIZE) {
      setFile(null);
      setLocalError("File size cannot exceed 5 MB.");
      return;
    }

    setFile(f);
    setLocalError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleInputChange = (e) => handleFile(e.target.files[0]);

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setLocalError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!file || localError) return;

    onParse(file);
  };
  const displayError = localError || error;
  return (
    <div className="flex flex-col">
      {/* Upload Area */}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 p-10 ${
          !file ? "cursor-pointer" : ""
        }`}
        style={
          dragActive
            ? {
                borderColor: "rgba(255,255,255,0.35)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))",
                transform: "scale(1.01)",
              }
            : {
                borderColor: "rgba(255,255,255,0.12)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(0,0,0,0.15))",
              }
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleInputChange}
          className="hidden"
        />

        {file ? (
          <div className="space-y-6">
            <div
              className="flex items-center justify-between rounded-2xl p-5"
              style={{
                background: "linear-gradient(180deg, #1c1c1c, #151515)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(160deg, #2a2a2a, #131313)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
                  }}
                >
                  <FileText size={24} className="text-white/60" />
                </div>

                <div>
                  <h3 className="font-medium text-white">{file.name}</h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                onClick={handleRemoveFile}
                className="rounded-xl p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <StatCard
                title="Format"
                value={file.name.split(".").pop().toUpperCase()}
              />

              <StatCard
                title="Size"
                value={`${(file.size / 1024 / 1024).toFixed(1)} MB`}
              />

              <StatCard title="Status" value="Ready" success />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div
              className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl"
              style={{
                background: "linear-gradient(160deg, #2c2c2c, #141414)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              <UploadCloud size={38} className="text-white/60" />
            </div>

            <h2 className="text-2xl font-semibold text-white tracking-[-0.01em]">
              Drop your resume here
            </h2>

            <p className="mt-3 max-w-sm text-zinc-400 leading-7">
              Drag & drop a PDF or DOCX file here, or click anywhere inside this
              box.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Badge text="PDF" />

              <Badge text="DOCX" />

              <Badge text="Max 5 MB" />

              <Badge text="AI Parsed" />
            </div>
          </div>
        )}
      </div>

      {displayError && (
        <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <div className="flex items-center gap-3">
            <AlertCircle size={18} className="text-red-400" />

            <span className="text-sm text-red-300">{displayError}</span>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="mt-6">
          <ProcessingBar currentStep={currentStep} />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || status === "loading"}
        className="mt-8 w-full rounded-2xl py-4 text-base font-semibold transition-transform duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: "linear-gradient(180deg, #ffffff, #d8d8d8)",
          color: "#000",
          boxShadow:
            "0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {status === "loading" ? "Processing Resume..." : "Parse Resume"}
      </button>
    </div>
  );
}

function Badge({ text }) {
  return (
    <div
      className="rounded-full px-3 py-1.5 text-xs text-zinc-300"
      style={{
        background: "linear-gradient(160deg, #262626, #131313)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      {text}
    </div>
  );
}

function StatCard({ title, value, success }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "linear-gradient(165deg, #1c1c1c, #141414)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
      }}
    >
      <p className="text-xs uppercase tracking-wider text-zinc-500">{title}</p>

      <p
        className={`mt-2 font-semibold ${
          success ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}