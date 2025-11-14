// routes/jobRoutes.js
import express from "express";
import multer from "multer";
import { createJob, getJobs, getJobById, updateJobStatus } from "../controllers/jobController.js";

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);

// Optional: update status (e.g., mark completed)
router.patch("/:id/status", updateJobStatus);

export default router;
