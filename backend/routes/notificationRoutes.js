import express from "express";
import auth, { protect } from "../middleware/authMiddleware.js";
import { createNotification, getMyNotifications, markNotificationRead } from "../controllers/notificationController.js";

const router = express.Router();
router.get("/", auth, getMyNotifications);
router.post("/", auth, protect, createNotification);
router.patch("/:id/read", auth, markNotificationRead);
export default router;
