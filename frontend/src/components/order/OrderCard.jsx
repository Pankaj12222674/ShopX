import React from "react";
import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
function OrderCard({ order }) {
  return (
    <Link to={`/orders/${order._id}`} className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-purple-600">#{order._id.slice(-8).toUpperCase()}</p>
          <p className="mt-1 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.orderStatus} />
          <strong>₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {order.items?.length > 0 && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
          {order.items.slice(0, 3).map((item, index) => {
            const product = item.productId;
            const itemPrice = Number(item.price ?? product?.price ?? 0);
            return (
              <div key={`${order._id}-${index}`} className="flex items-center gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {product?.image ? <img src={product.image} alt={product.name || "Ordered product"} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[10px] text-slate-400">No image</div>}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{product?.name || "Product unavailable"}</p>
                  <p className="mt-1 text-xs text-slate-500">Quantity: {item.quantity}</p>
                </div>
                <p className="shrink-0 text-sm font-bold text-slate-800">₹{itemPrice.toLocaleString("en-IN")}</p>
              </div>
            );
          })}
          {order.items.length > 3 && <p className="text-xs font-semibold text-purple-600">+{order.items.length - 3} more product{order.items.length - 3 === 1 ? "" : "s"}</p>}
        </div>
      )}
    </Link>
  );
}
export default OrderCard;
