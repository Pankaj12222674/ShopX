
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color = "purple",
  trend = "up",
}) {
  const colors = {
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600",
  };

  const isUp = trend === "up";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            colors[color] || colors.purple
          }`}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {/* Value */}
      <h3 className="mt-4 break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {value}
      </h3>

      {/* Trend */}
      {change !== undefined && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              isUp
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isUp ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {change}
          </span>

          <span className="text-xs text-gray-500">
            vs. previous period
          </span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
