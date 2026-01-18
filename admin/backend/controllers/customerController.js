// backend/controllers/customerController.js
import Customer from "../models/Customer.js";

/**
 * Create a new customer (supports image upload via multer)
 * Emits 'customerAdded' and updates 'customerCount'
 */
export const createCustomer = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { name, phone, email, status, joined, actions, address, city, state } = req.body;
    const normalizedPhone = phone?.toString().replace(/\s+/g, "");

    if (!name || !normalizedPhone) {
      return res.status(400).json({ message: "Name and phone are required." });
    }

    // Check if phone exists and is suspended
    const existing = await Customer.findOne({ phone: normalizedPhone });
    if (existing && existing.status === "Suspended") {
      return res.status(400).json({ message: "This phone number is suspended. Contact admin." });
    }

    // Prevent duplicate registration (optional): If phone already exists and active, reject
    if (existing && existing.status !== "Suspended") {
      return res.status(400).json({ message: "Phone number already registered." });
    }

    const customer = new Customer({
      name,
      phone: normalizedPhone,
      email,
      status: status || "Active",
      joined: joined || new Date().toLocaleDateString(),
      actions: actions ? Number(actions) : 0,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
      address,
      city,
      state,
    });

    await customer.save();

    // emit real-time events
    if (io) {
      io.emit("customerAdded", customer);
      const count = await Customer.countDocuments();
      io.emit("customerCount", { count });
    }

    return res.status(201).json(customer);
  } catch (error) {
    console.error("createCustomer error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    return res.json(customers);
  } catch (error) {
    console.error("getCustomers error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    return res.json(customer);
  } catch (error) {
    console.error("getCustomerById error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const customer = await Customer.findByIdAndUpdate(id, updateData, { new: true });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    if (io) {
      io.emit("customerUpdated", customer);
      const count = await Customer.countDocuments();
      io.emit("customerCount", { count });
    }

    return res.json(customer);
  } catch (error) {
    console.error("updateCustomer error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const io = req.app.get("io");
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    if (io) {
      io.emit("customerDeleted", { id });
      const count = await Customer.countDocuments();
      io.emit("customerCount", { count });
    }

    return res.json({ message: "Customer deleted" });
  } catch (error) {
    console.error("deleteCustomer error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
