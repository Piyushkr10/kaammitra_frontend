import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    email: { type: String, trim: true, default: "" },

    serviceCategory: { type: String, trim: true, default: "" },
    subService: { type: String, trim: true, default: "" },
    experience: { type: Number, default: 0 },
    serviceArea: { type: String, trim: true, default: "" },
    pinCode: { type: String, trim: true, default: "" },
    languageSpoken: { type: String, trim: true, default: "" },

    profilePhoto: { type: String, default: "" },
    governmentIDProof: { type: String, default: "" },
    addressProof: { type: String, default: "" },
    skillCertificate: { type: String, default: "" },

    bankAccountNumber: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
    upiId: { type: String, default: "" },

    backgroundVerification: { type: String, default: "Pending" },
    status: { type: String, default: "Pending" },
    jobs: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;
