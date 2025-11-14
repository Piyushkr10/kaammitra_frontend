// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true },
    
    category: { type: String },
    subService: { type: String },
    description: { type: String },
    requirement: { type: String },
    image: { type: String },
    price: { type: Number, default: 0 },
    location: { type: String, default: "" },
    status: { type: String, default: "Pending" }, // will be set to Active on create
    date: { type: String }, // human readable date
    time: { type: String }, // human readable time
  },
  { timestamps: true }
);

const Job = mongoose.model("Service", jobSchema);
export default Job;
