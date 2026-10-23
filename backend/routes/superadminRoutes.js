import express from "express";
import auth, { superadminProtect } from "../middleware/authMiddleware.js";
import { createAdmin, getActivity, getOverview, getStats, getUserDetails, getUsers, updateUser } from "../controllers/superadminController.js";

const router = express.Router();
router.use(auth, superadminProtect);
router.get("/users", getUsers);
router.get("/users/:id", getUserDetails);
router.post("/admins", createAdmin);
router.patch("/users/:id", updateUser);
router.get("/stats", getStats);
router.get("/activity", getActivity);
router.get("/overview", getOverview);
export default router;
