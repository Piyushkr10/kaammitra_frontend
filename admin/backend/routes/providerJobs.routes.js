import express from "express";
import {
  getProviderJobsByStatus,
  acceptBooking,
  updateBookingStatus,
} from "../controllers/providerJobs.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

/**
 * 🧩 Provider Job Routes
 * Base path → /api/v1/provider
 */

// Get jobs by status → pending, active, completed, cancelled
router.get("/jobs/:status", requireAuth, getProviderJobsByStatus);

// Accept a job
router.put("/jobs/accept/:bookingId", requireAuth, acceptBooking);

// Update job status → in-progress / completed / cancelled
router.put("/jobs/update/:bookingId", requireAuth, updateBookingStatus);

export default router;