// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true },
    category: { type: String, default: "" },
    subService: { type: String, default: "" },
    description: { type: String, default: "" },
    requirement: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    price: { type: Number, default: 0 },
    // new: support multiple cities
    cities: { type: [String], default: [] },
    // keep single city for backward-compatibility
    city: { type: String, default: "" },
    status: { type: String, default: "pending" }, // lowercase for consistency
    date: { type: String, default: "" },
    time: { type: String, default: "" },
  },
  { timestamps: true }
);

// keep existing export behavior
const Job = mongoose.models.Job || mongoose.model("Service", jobSchema);
export default Job;
