import express from "express";

import multer from "multer";
import {
  addProvider,
  getProviders,
  getActiveProviders,
  getProviderById,
  updateProvider,
  getProviderByPhone,
} from "../controllers/providerController.js";

const router = express.Router();

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });

// POST with file upload fields
router.post(
  "/add",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "governmentIDProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "skillCertificate", maxCount: 1 },
  ]),
  addProvider
);

router.get("/", getProviders);
router.get("/active", getActiveProviders);
router.get("/phone/:phoneNumber", getProviderByPhone);
router.get("/:id", getProviderById);
router.put("/:id", updateProvider);

export default router;
