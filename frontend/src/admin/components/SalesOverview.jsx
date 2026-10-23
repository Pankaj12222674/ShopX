import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { IndianRupee, TrendingUp } from "lucide-react";

const dashboardDate = new Date();

function SalesOverview({ orders = [] }) {
  const [period, setPeriod] = useState("Weekly");
  const data = useMemo(() => {
    const labels = period === "Weekly"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : period === "Monthly"
        ? ["Week 1", "Week 2", "Week 3", "Week 4"]
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const totals = labels.map((label) => ({ label, sales: 0 }));
    const now = dashboardDate;

    orders.forEach((order) => {
      if (order.orderStatus === "cancelled") return;
      const date = new Date(order.createdAt);
      const difference = Math.floor((now - date) / 86400000);
      let index = -1;

      if (period === "Weekly" && difference >= 0 && difference < 7) {
        index = (date.getDay() + 6) % 7;
      } else if (period === "Monthly" && date.getMonth() === now.getMonth()) {
        index = Math.min(3, Math.floor((date.getDate() - 1) / 7));
      } else if (period === "Yearly" && date.getFullYear() === now.getFullYear()) {
        index = date.getMonth();
      }

      if (index >= 0) totals[index].sales += Number(order.totalAmount || 0);
    });
    return totals;
  }, [orders, period]);

  const totalSales = data.reduce((total, item) => total + item.sales, 0);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Sales Overview</h2>
          <p className="mt-1 text-sm text-gray-500">Revenue from completed store orders</p>
        </div>
        <select value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-purple-500">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Revenue in selected period</p>
          <div className="mt-1 flex items-center gap-1">
            <IndianRupee size={22} className="text-gray-800" />
            <span className="text-3xl font-extrabold tracking-tight text-gray-900">{totalSales.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
          <TrendingUp size={18} /> Live data
        </div>
      </div>
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} tickFormatter={(value) => `₹${Math.round(value / 1000)}k`} width={55} />
            <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Sales"]} />
            <Bar dataKey="sales" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={42} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesOverview;
