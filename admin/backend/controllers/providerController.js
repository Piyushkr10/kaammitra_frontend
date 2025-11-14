import Provider from "../models/Provider.js";

// Add provider
export const addProvider = async (req, res) => {
  try {
    const payload = {
      fullName: req.body.fullName || req.body.name || "",
      phoneNumber: req.body.phoneNumber || req.body.phone || req.body.mobile || "",
      email: req.body.email || "",
      serviceCategory: req.body.serviceCategory || "",
      subService: req.body.subService || "",
      experience: req.body.experience ? Number(req.body.experience) : 0,
      serviceArea: req.body.serviceArea || "",
      pinCode: req.body.pinCode || "",
      languageSpoken: req.body.languageSpoken || "",
      profilePhoto: req.files?.profilePhoto?.[0]?.filename || "",
      governmentIDProof: req.files?.governmentIDProof?.[0]?.filename || "",
      addressProof: req.files?.addressProof?.[0]?.filename || "",
      skillCertificate: req.files?.skillCertificate?.[0]?.filename || "",
      bankAccountNumber: req.body.bankAccountNumber || "",
      ifscCode: req.body.ifscCode || "",
      upiId: req.body.upiId || "",
    };

    if (!payload.fullName || !payload.phoneNumber) {
      return res.status(400).json({ message: "fullName and phoneNumber are required." });
    }

    const exists = await Provider.findOne({ phoneNumber: payload.phoneNumber });
    if (exists) return res.status(400).json({ message: "Provider already exists." });

    const created = await Provider.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    console.error("Error in addProvider:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all providers
export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().sort({ createdAt: -1 });
    return res.json(providers);
  } catch (error) {
    console.error("Error fetching providers:", error);
    return res.status(500).json({ message: "Failed to fetch providers" });
  }
};

// Get provider by id
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

// Update provider (status or other fields)
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
