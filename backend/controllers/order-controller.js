import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Shipment from "../models/Shipment.js";
import Notification from "../models/Notification.js";

export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const userId = req.user.id;
        const { shippingAddress, paymentMethod } = req.body;

        if (!shippingAddress?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required",
            });
        }

        if (!["COD", "ONLINE"].includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method",
            });
        }

        // Online checkout must be connected to a verified
        // payment-provider flow before allowing order creation.
        if (paymentMethod === "ONLINE") {
            return res.status(400).json({
                success: false,
                message: "Online payment is not integrated yet. Use COD for now.",
            });
        }

        let createdOrder;

        await session.withTransaction(async () => {
            const cartItems = await Cart.find({ userId })
                .populate("productId")
                .session(session);

            if (cartItems.length === 0) {
                throw new Error("Your cart is empty");
            }

            const items = [];
            let totalAmount = 0;

            for (const cartItem of cartItems) {
                const product = cartItem.productId;

                if (!product) {
                    throw new Error("A product in your cart no longer exists");
                }

                if (product.stock < cartItem.quantity) {
                    throw new Error(`${product.name} has insufficient stock`);
                }

                items.push({
                    productId: product._id,
                    quantity: cartItem.quantity,
                    price: product.price,
                });

                totalAmount += product.price * cartItem.quantity;
            }

            const [order] = await Order.create(
                [
                    {
                        userId,
                        items,
                        totalAmount,
                        shippingAddress,
                        paymentMethod: "COD",
                        paymentStatus: "pending",
                        orderStatus: "processing",
                    },
                ],
                { session }
            );

            const shipments = items.map((item) => ({
                orderId: order._id,
                userId,
                productId: item.productId,
                quantity: item.quantity,
                shippingAddress,
                paymentMethod: "COD",
                amountToCollect: item.price * item.quantity,
                paymentCollected: false,
                deliveryStatus: "pending",
            }));

            await Shipment.insertMany(shipments, { session });

            for (const item of items) {
                const result = await Product.updateOne(
                    {
                        _id: item.productId,
                        stock: { $gte: item.quantity },
                    },
                    { $inc: { stock: -item.quantity } },
                    { session }
                );

                if (result.modifiedCount !== 1) {
                    throw new Error("Stock changed. Please try again.");
                }
            }

            await Cart.deleteMany({ userId }).session(session);

            createdOrder = order;
            await Notification.create({
                recipientId: userId,
                senderId: userId,
                orderId: order._id,
                title: "Order placed successfully",
                message: "Your order has been received and is now being processed.",
                type: "order",
            });
        });

        return res.status(201).json({
            success: true,
            message: "Order and shipments created successfully",
            order: createdOrder,
        });
    } catch (error) {
        console.error("Create order error:", error);

        const knownErrors = [
            "Your cart is empty",
            "A product in your cart no longer exists",
            "has insufficient stock",
            "Stock changed. Please try again.",
        ];

        const isKnownError = knownErrors.some((message) =>
            error.message.includes(message)
        );

        return res.status(isKnownError ? 400 : 500).json({
            success: false,
            message: isKnownError
                ? error.message
                : "Failed to create order",
        });
    } finally {
        await session.endSession();
    }
};

export const getAllOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const allOrder = await Order.find({ userId })
      .populate("items.productId", "name image price")
      .sort({ createdAt: -1 })
      .lean();

    const orderIds = allOrder.map((order) => order._id);

    const shipments = await Shipment.find({
      userId,
      orderId: { $in: orderIds },
    })
      .populate("productId", "name image price")
      .populate("deliveryPartner", "name email")
      .lean();

    const ordersWithShipments = allOrder.map((order) => ({
      ...order,
      shipments: shipments.filter(
        (shipment) => shipment.orderId.toString() === order._id.toString()
      ),
    }));

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      allOrder: ordersWithShipments,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name image")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Fetch admin orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const validOrderStatuses = ["processing", "shipping", "delivered", "cancelled"];
    const validPaymentStatuses = ["pending", "paid", "failed"];

    if (orderStatus !== undefined && !validOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({ success: false, message: "Invalid order status" });
    }
    if (paymentStatus !== undefined && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: "Invalid payment status" });
    }
    if (orderStatus === undefined && paymentStatus === undefined) {
      return res.status(400).json({ success: false, message: "At least one status is required" });
    }

    const updates = {};
    if (orderStatus !== undefined) updates.orderStatus = orderStatus;
    if (paymentStatus !== undefined) updates.paymentStatus = paymentStatus;

    const previousOrder = await Order.findById(req.params.id).select("orderStatus paymentStatus").lean();
    if (!previousOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate("userId", "name email")
      .populate("items.productId", "name image")
      .lean();

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const changes = [];
    if (orderStatus && orderStatus !== previousOrder.orderStatus) changes.push(`Your order is now ${orderStatus}.`);
    if (paymentStatus && paymentStatus !== previousOrder.paymentStatus) changes.push(`Payment status: ${paymentStatus}.`);
    if (changes.length) {
      await Notification.create({
        recipientId: order.userId._id || order.userId,
        senderId: req.user.id,
        orderId: order._id,
        title: "Order update",
        message: changes.join(" "),
        type: "order",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    })
      .populate("items.productId", "name image")
      .lean();

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Fetch order details error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};