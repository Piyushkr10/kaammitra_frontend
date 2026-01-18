// backend/models/Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true, trim: true },
    email: { type: String, trim: true, unique: true, sparse: true },
    password: { type: String },
    // any other fields you use for clients
  },
  { timestamps: true }
);

// Export model name "Client" (this must match Booking.ref)
export default mongoose.model("Client", clientSchema);
