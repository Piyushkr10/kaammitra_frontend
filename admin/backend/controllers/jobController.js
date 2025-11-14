// controllers/jobController.js
import Job from "../models/Job.js";

/** CREATE JOB */
export const createJob = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { category, subService, description, requirement, status, price, location } = req.body;

    const jobId = `#tf${Math.floor(1000 + Math.random() * 9000)}`;

    // create date/time strings (India local)
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN");
    const timeStr = now.toLocaleTimeString("en-IN");

    const job = new Job({
      jobId,
      customer: "New Customer",
      provider: "Pending",
      category,
      subService,
      description,
      requirement,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
      price: price ? Number(price) : 0,
      location: location || "",
      status: status || "Active", // newly added services default to Active
      date: dateStr,
      time: timeStr,
    });

    await job.save();

    if (io) io.emit("jobAdded", job); // emit real-time event

    return res.status(201).json(job);
  } catch (error) {
    console.error("createJob error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/** GET ALL JOBS */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("getJobs error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/** GET SINGLE JOB BY ID */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    console.error("getJobById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/** UPDATE JOB STATUS */
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.status = status;
    // update time/date when changed to completed
    const now = new Date();
    job.date = now.toLocaleDateString("en-IN");
    job.time = now.toLocaleTimeString("en-IN");

    await job.save();

    const io = req.app.get("io");
    if (io) io.emit("jobUpdated", job);

    res.json(job);
  } catch (error) {
    console.error("updateJobStatus error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
