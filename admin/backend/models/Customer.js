// backend/models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    email: { type: String },
    status: { type: String, enum: ["Active", "Suspended", "Pending"], default: "Active" },
    joined: { type: String },
    actions: { type: Number, default: 0 },
    image: { type: String }, // path like '/uploads/12345-filename.jpg'
    address: { type: String },
    city: { type: String },
    state: { type: String },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
