import Notification from "../models/Notification.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user.id })
      .populate("orderId", "orderStatus paymentStatus totalAmount")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return res.json({ success: true, notifications, unreadCount: notifications.filter((item) => !item.readAt).length });
  } catch (error) {
    console.error("Fetch notifications error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { recipientId, orderId, title, message, type = "general" } = req.body;
    if (!recipientId || !title?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: "Recipient, title and message are required" });
    }

    const recipient = await User.findOne({ _id: recipientId, role: "customer" }).select("_id");
    if (!recipient) return res.status(404).json({ success: false, message: "Customer not found" });

    if (orderId) {
      const order = await Order.findOne({ _id: orderId, userId: recipientId }).select("_id");
      if (!order) return res.status(404).json({ success: false, message: "Order not found for this customer" });
    }

    const notification = await Notification.create({
      recipientId,
      senderId: req.user.id,
      orderId: orderId || null,
      title: title.trim(),
      message: message.trim(),
      type,
    });
    return res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error("Create notification error:", error);
    return res.status(500).json({ success: false, message: "Failed to send notification" });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipientId: req.user.id },
      { $set: { readAt: new Date() } },
      { new: true },
    );
    if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });
    return res.json({ success: true, notification });
  } catch (error) {
    console.error("Mark notification error:", error);
    return res.status(500).json({ success: false, message: "Failed to update notification" });
  }
};
