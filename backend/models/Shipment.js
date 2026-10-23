
import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        required: true,
    },

    amountToCollect: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },

    paymentCollected: {
        type: Boolean,
        default: false,
    },

    deliveryStatus: {
        type: String,
        enum: [
            "pending",
            "assigned",
            "out_for_delivery",
            "delivered",
            "cancelled",
        ],
        default: "pending",
    },
},
    { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;