import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    parsedData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ResumeSchema.index({ createdAt: -1 });

export const Resume = mongoose.model("Resume", ResumeSchema);
