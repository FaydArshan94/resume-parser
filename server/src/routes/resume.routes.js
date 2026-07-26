import express from "express";
import { uploadResume } from "../controllers/resume.controller.js";
import multer from "multer";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("resume"), uploadResume);
// router.get("/");
// router.get("/:id");
// router.delete("/:id");

export default router;
