import Provider from "../models/Provider.js";

export const addProvider = async (req, res) => {
  try {
    console.log("POST /api/providers/add - body:", req.body);
    console.log("POST /api/providers/add - files:", req.files);

    const payload = {
      fullName: req.body.fullName || "",
      phoneNumber: req.body.phoneNumber || "",
      email: req.body.email && req.body.email.trim() !== "" ? req.body.email : undefined,
      serviceCategory: req.body.serviceCategory || "",
      subService: req.body.subService || "",
      experience: req.body.experience ? Number(req.body.experience) : 0,
      serviceArea: req.body.serviceArea || "",
      pinCode: req.body.pinCode || "",
      languageSpoken: req.body.languageSpoken || "",
      profilePhoto: req.files?.profilePhoto?.[0]?.filename || req.body.profilePhoto || "",
      governmentIDProof: req.files?.governmentIDProof?.[0]?.filename || req.body.governmentIDProof || "",
      addressProof: req.files?.addressProof?.[0]?.filename || req.body.addressProof || "",
      skillCertificate: req.files?.skillCertificate?.[0]?.filename || req.body.skillCertificate || "",
      bankAccountNumber: req.body.bankAccountNumber || "",
      ifscCode: req.body.ifscCode || "",
      upiId: req.body.upiId || "",
    };

    // CRITICAL: delete empty/undefined email to avoid duplicate key on sparse index
    if (!payload.email) delete payload.email;
    
    if (!payload.fullName || !payload.phoneNumber) {
      return res.status(400).json({ message: "fullName and phoneNumber are required." });
    }

    const exists = await Provider.findOne({ phoneNumber: payload.phoneNumber });
    if (exists) return res.status(400).json({ message: "Provider already exists." });

    const created = await Provider.create(payload);
    console.log("Provider created:", created._id);
    return res.status(201).json(created);
  } catch (error) {
    console.error("Error in addProvider:", error);
    if (error.code === 11000) {
      console.error("Duplicate key:", error.keyValue);
      return res.status(400).json({ message: "Duplicate entry", keyValue: error.keyValue });
    }
    if (error.name === "ValidationError") {
      const details = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation error", details });
    }
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().sort({ createdAt: -1 });
    return res.json(providers);
  } catch (error) {
    console.error("Error fetching providers:", error);
    return res.status(500).json({ message: "Failed to fetch providers" });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    return res.json(provider);
  } catch (error) {
    console.error("Error fetching provider:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const allowed = [
      "status",
      "serviceCategory",
      "subService",
      "experience",
      "serviceArea",
      "pinCode",
      "languageSpoken",
      "profilePhoto",
      "governmentIDProof",
      "addressProof",
      "skillCertificate",
      "bankAccountNumber",
      "ifscCode",
      "upiId",
    ];
    const filtered = {};
    Object.keys(req.body).forEach((k) => {
      if (allowed.includes(k)) filtered[k] = req.body[k];
    });

    const provider = await Provider.findByIdAndUpdate(req.params.id, filtered, { new: true });
    if (!provider) return res.status(404).json({ message: "Provider not found" });
    return res.json(provider);
  } catch (error) {
    console.error("Error in updateProvider:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
