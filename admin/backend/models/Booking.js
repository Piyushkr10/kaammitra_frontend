// backend/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // MUST match Client model name
    required: true,
  },

  // Keep service flexible: it may be a string or a populated object
  service: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
  },

  serviceType: { type: String, required: true },

  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },

  date: { type: Date, required: true },
  time: { type: String, required: true },
  remarks: { type: String },

  status: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
    default: "pending",
  },

  price: { type: Number },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
