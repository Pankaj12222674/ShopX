import SupportTicket from "../models/SupportTicket.js";
import Order from "../models/Order.js";
import Notification from "../models/Notification.js";

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ customerId: req.user.id })
      .populate("orderId", "orderStatus paymentStatus totalAmount")
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ success: true, tickets });
  } catch (error) {
    console.error("Fetch support tickets error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch support tickets" });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { subject, description, priority = "medium", orderId } = req.body;
    if (!subject?.trim() || !description?.trim()) {
      return res.status(400).json({ success: false, message: "Subject and description are required" });
    }
    if (orderId) {
      const order = await Order.findOne({ _id: orderId, userId: req.user.id }).select("_id");
      if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    }
    const ticket = await SupportTicket.create({ customerId: req.user.id, orderId: orderId || null, subject: subject.trim(), description: description.trim(), priority });
    return res.status(201).json({ success: true, ticket });
  } catch (error) {
    console.error("Create support ticket error:", error);
    return res.status(500).json({ success: false, message: "Failed to create support ticket" });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .populate("customerId", "name email profileImage")
      .populate("orderId", "orderStatus paymentStatus totalAmount")
      .populate("handledBy", "name role")
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ success: true, tickets });
  } catch (error) {
    console.error("Fetch all support tickets error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch support tickets" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { status, response } = req.body;
    const validStatuses = ["open", "in_progress", "resolved", "closed"];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid ticket status" });
    }
    if (response !== undefined && !response.trim()) {
      return res.status(400).json({ success: false, message: "Response cannot be empty" });
    }
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(status !== undefined && { status }), ...(response !== undefined && { response: response.trim() }), handledBy: req.user.id } },
      { new: true, runValidators: true },
    ).populate("customerId", "name email").populate("orderId", "orderStatus paymentStatus totalAmount").lean();
    if (!ticket) return res.status(404).json({ success: false, message: "Support ticket not found" });

    await Notification.create({
      recipientId: ticket.customerId._id || ticket.customerId,
      senderId: req.user.id,
      orderId: ticket.orderId?._id || ticket.orderId || null,
      title: "Support request updated",
      message: response?.trim() || `Your support request is now ${status || ticket.status}.`,
      type: "general",
    });
    return res.json({ success: true, ticket });
  } catch (error) {
    console.error("Update support ticket error:", error);
    return res.status(500).json({ success: false, message: "Failed to update support ticket" });
  }
};
