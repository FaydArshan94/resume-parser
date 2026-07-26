import express from "express";
import { uploadResume, getAllResumes, getResumeById } from "../controllers/resume.controller.js";
import multer from "multer";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("resume"), uploadResume);
router.get("/", getAllResumes);
router.get("/:id", getResumeById);
// router.delete("/:id");

export default router;
