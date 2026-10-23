import express from "express";
import auth, { protect } from "../middleware/authMiddleware.js";
import { createTicket, getAllTickets, getMyTickets, updateTicket } from "../controllers/supportController.js";

const router = express.Router();
router.get("/", auth, (req, res, next) => req.user.role === "customer" ? getMyTickets(req, res, next) : getAllTickets(req, res, next));
router.post("/", auth, createTicket);
router.patch("/:id", auth, protect, updateTicket);
export default router;
