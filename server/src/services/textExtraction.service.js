import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export const extractFile = async (file) => {
  if (!file) {
    const error = new Error("No file provided.");
    error.statusCode = 400;
    throw error;
  }

  try {
    switch (file.mimetype) {
      case "application/pdf": {
        const parser = new PDFParse(new Uint8Array(file.buffer));

        const result = await parser.getText();

        if (!result.text.trim()) {
          const error = new Error("No text found in the PDF.");
          error.statusCode = 400;
          throw error;
        }

        const text = result.text.trim();

        if (text.length < 100) {
          const error = new Error(
            "The uploaded document contains too little text.",
          );
          error.statusCode = 400;
          throw error;
        }

        return text;
      }

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        const { value } = await mammoth.extractRawText({
          buffer: file.buffer,
        });

        if (!value.trim()) {
          const error = new Error("No text found in the DOCX.");
          error.statusCode = 400;
          throw error;
        }

        const text = value.trim();

        if (text.length < 100) {
          const error = new Error(
            "The uploaded document contains too little text.",
          );
          error.statusCode = 400;
          throw error;
        }

        return text;
      }

      default: {
        const error = new Error("Unsupported file type.");
        error.statusCode = 400;
        throw error;
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    throw err;
  }
};
