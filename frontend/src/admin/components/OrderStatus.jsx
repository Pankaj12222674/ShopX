
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const statusColors = {
  delivered: "#10B981",
  processing: "#8B5CF6",
  shipping: "#3B82F6",
  cancelled: "#EF4444",
};

function OrderStatus({ orders = [] }) {
  const orderData = Object.entries(
    orders.reduce((counts, order) => {
      const status = order.orderStatus || "processing";
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {}),
  ).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: statusColors[name] || "#F59E0B",
  }));
  const totalOrders = orderData.reduce(
    (total, order) => total + order.value,
    0
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Order Status
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Overview of all order statuses
        </p>
      </div>

      {/* Donut Chart */}
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={orderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              stroke="none"
            >
              {orderData.map((order) => (
                <Cell key={order.name} fill={order.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">Total Orders</span>
          <span className="text-3xl font-extrabold text-gray-800">
            {totalOrders.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Status List */}
      <div className="mt-4 space-y-3">
        {orderData.map((order) => {
          const percentage = (order.value / totalOrders) * 100;

          return (
            <div key={order.name} className="space-y-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: order.color }}
                  />
                  <span className="text-sm text-gray-600">
                    {order.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-800">
                    {order.value}
                  </span>
                  <span className="w-12 text-right text-xs text-gray-500">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: order.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderStatus;
