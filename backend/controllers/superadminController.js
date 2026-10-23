import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  isActive: user.isActive,
  profileImage: user.profileImage,
  createdAt: user.createdAt,
});

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
    res.json({ success: true, users });
  } catch (error) {
    console.error("Super-admin users error:", error);
    res.status(500).json({ success: false, message: "Unable to fetch users" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const [user, orders] = await Promise.all([
      User.findById(req.params.id).select("-password -passwordResetToken -passwordResetExpires").lean(),
      Order.find({ userId: req.params.id })
        .populate("items.productId", "name image category")
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user, orders });
  } catch (error) {
    console.error("Super-admin user details error:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch user details" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone = "" } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 8) {
      return res.status(400).json({ success: false, message: "Name, email and password (8+ characters) are required" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      password: await bcrypt.hash(password, 10),
      role: "admin",
    });
    res.status(201).json({ success: true, message: "Admin created successfully", user: publicUser(user) });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ success: false, message: "Unable to create admin" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updates = {};
    ["name", "phone", "role", "isActive"].forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    if (updates.role && !["customer", "admin", "superadmin"].includes(updates.role)) {
      return res.status(400).json({ success: false, message: "Invalid user role" });
    }
    if (updates.role === "superadmin" && String(req.params.id) !== String(req.user.id)) {
      return res.status(400).json({ success: false, message: "A super-admin cannot be assigned from this screen" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.error("Update super-admin user error:", error);
    res.status(500).json({ success: false, message: "Unable to update user" });
  }
};

export const getStats = async (req, res) => {
  try {
    const [users, admins, customers, products, orders, sales] = await Promise.all([
      User.countDocuments(), User.countDocuments({ role: "admin" }), User.countDocuments({ role: "customer" }),
      Product.countDocuments(), Order.countDocuments(), Order.aggregate([{ $match: { orderStatus: { $ne: "cancelled" } } }, { $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
    ]);
    res.json({ success: true, stats: { users, admins, customers, products, orders, sales: sales[0]?.total || 0 } });
  } catch (error) {
    console.error("Super-admin stats error:", error);
    res.status(500).json({ success: false, message: "Unable to fetch statistics" });
  }
};

export const getActivity = async (req, res) => {
  try {
    const [users, orders] = await Promise.all([
      User.find().select("name role createdAt").sort({ createdAt: -1 }).limit(10).lean(),
      Order.find().select("userId totalAmount orderStatus createdAt").populate("userId", "name").sort({ createdAt: -1 }).limit(10).lean(),
    ]);
    const activity = [
      ...users.map((user) => ({ id: `user-${user._id}`, type: "user", text: `${user.name} joined as ${user.role}`, createdAt: user.createdAt })),
      ...orders.map((order) => ({ id: `order-${order._id}`, type: "order", text: `Order placed for ₹${order.totalAmount} (${order.orderStatus})`, createdAt: order.createdAt })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 15);
    res.json({ success: true, activity });
  } catch (error) {
    console.error("Super-admin activity error:", error);
    res.status(500).json({ success: false, message: "Unable to fetch activity" });
  }
};

export const getOverview = async (req, res) => {
  try {
    const [products, orders] = await Promise.all([
      Product.find().populate("category", "name").sort({ createdAt: -1 }).limit(20).lean(),
      Order.find().populate("userId", "name email").sort({ createdAt: -1 }).limit(20).lean(),
    ]);
    res.json({ success: true, products, orders });
  } catch (error) {
    console.error("Super-admin overview error:", error);
    res.status(500).json({ success: false, message: "Unable to fetch overview" });
  }
};
