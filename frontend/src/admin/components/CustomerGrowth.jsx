
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp, Users } from "lucide-react";

const dashboardDate = new Date();

function CustomerGrowth({ orders = [] }) {
  const customerData = Array.from({ length: 6 }, (_, offset) => {
    const date = new Date(dashboardDate);
    date.setMonth(date.getMonth() - (5 - offset), 1);
    const customers = new Set(
      orders
        .filter((order) => {
          const created = new Date(order.createdAt);
          return created.getMonth() === date.getMonth() && created.getFullYear() === date.getFullYear();
        })
        .map((order) => order.userId?._id || order.userId),
    ).size;
    return { month: date.toLocaleDateString("en-US", { month: "short" }), customers };
  });
  const totalGrowth =
    customerData[customerData.length - 1].customers -
    customerData[0].customers;

  const growthPercentage = (
    (totalGrowth / customerData[0].customers) *
    100
  ).toFixed(1);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Customer Growth
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            New customer trend over time
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2">
          <TrendingUp size={18} className="text-green-600" />
          <span className="text-sm font-semibold text-green-700">
            +{growthPercentage}%
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <Users size={22} />
        </div>

        <div>
          <p className="text-sm text-gray-500">Latest monthly count</p>
          <p className="text-2xl font-bold text-gray-900">
            {customerData[customerData.length - 1].customers}
          </p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={customerData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              formatter={(value) => [value, "Customers"]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
              }}
            />

            <Line
              type="monotone"
              dataKey="customers"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#8B5CF6",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CustomerGrowth;
