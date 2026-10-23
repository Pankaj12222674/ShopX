
import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-purple-100 text-purple-700",
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

function RecentOrders({ orders = [], loading = false }) {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Recent Orders
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track the latest customer orders
          </p>
        </div>

        <Link
          to="/admin/orders"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-gray-50">
            <tr className="text-xs uppercase tracking-wide text-gray-500">
              <th className="px-5 py-4 font-semibold">Order ID</th>
              <th className="px-5 py-4 font-semibold">Customer</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Payment</th>
              <th className="px-5 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr><td colSpan="6" className="px-5 py-8 text-center text-sm text-gray-500">Loading orders...</td></tr>
            )}
            {!loading && recentOrders.length === 0 && (
              <tr><td colSpan="6" className="px-5 py-8 text-center text-sm text-gray-500">No orders yet.</td></tr>
            )}
            {!loading && recentOrders.map((order) => {
              const status = order.orderStatus || "processing";
              const customer = order.userId?.name || "Guest customer";
              return (
              <tr
                key={order._id}
                className="transition hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-purple-600">
                  #{order._id.slice(-8).toUpperCase()}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <ShoppingBag size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {customer}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-800">
                  ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                  {order.paymentMethod}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      statusStyles[status.charAt(0).toUpperCase() + status.slice(1)] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-5 py-3">
        <p className="text-xs text-gray-500">
          Showing {Math.min(recentOrders.length, 5)} recent orders
        </p>
      </div>
    </div>
  );
}

export default RecentOrders;
