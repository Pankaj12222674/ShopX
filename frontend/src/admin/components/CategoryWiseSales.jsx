
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const colors = ["#8B5CF6", "#3B82F6", "#F59E0B", "#EC4899", "#10B981"];

function CategoryWiseSales({ orders = [], products = [] }) {
  const categoryNames = Object.fromEntries(
    products.map((product) => [product._id, product.category?.name || "Other"]),
  );
  const totals = orders.flatMap((order) => order.items || []).reduce((result, item) => {
    const name = categoryNames[item.productId?._id || item.productId] || "Other";
    result[name] = (result[name] || 0) + Number(item.price || 0) * Number(item.quantity || 0);
    return result;
  }, {});
  const salesData = Object.entries(totals).map(([name, value], index) => ({
    name,
    value,
    color: colors[index % colors.length],
  }));
  const totalSales = salesData.reduce(
    (total, category) => total + category.value,
    0
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">
          Category-wise Sales
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Sales distribution by category
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              stroke="none"
            >
              {salesData.map((category) => (
                <Cell
                  key={category.name}
                  fill={category.color}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `${((value / totalSales) * 100).toFixed(1)}%`,
                name,
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm text-gray-500">Total Sales</span>
          <span className="text-2xl font-extrabold text-gray-800">
            {totalSales}%
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-3">
        {salesData.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-gray-600">
                {category.name}
              </span>
            </div>

            <span className="text-sm font-semibold text-gray-800">
              {((category.value / totalSales) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryWiseSales;
