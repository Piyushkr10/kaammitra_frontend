import express from "express";
import {
  addProvider,
  getProviders,
  getProviderById,
  updateProvider,
} from "../controllers/providerController.js";

const router = express.Router();

router.post("/add", addProvider);
router.get("/", getProviders);
router.get("/:id", getProviderById);
router.put("/:id", updateProvider);

export default router;
