import React from "react";
import { TrendingUp, BarChart3 } from "lucide-react";

function SalesChart({ orders = [] }) {
  const chartOrders = [...orders].slice(0, 10).reverse();
  const maxAmount = Math.max(...chartOrders.map((order) => Number(order.totalAmount || 0)), 1);
  
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur-xl sm:p-8">
      {/* Decorative Background Glow */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full bg-gradient-to-tl from-indigo-100/40 to-purple-50/40 blur-3xl" aria-hidden="true" />

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
              Recent Sales
            </h2>
            <TrendingUp size={20} className="text-indigo-500" />
          </div>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Order value from the latest transactions
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-600/10">
          <BarChart3 size={14} />
          {chartOrders.length} {chartOrders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {chartOrders.length ? (
        <div className="relative mt-8 h-64 rounded-2xl bg-slate-50/50 px-4 pb-8 pt-6 ring-1 ring-inset ring-slate-100">
          {/* Chart Grid Lines */}
          <div className="pointer-events-none absolute inset-x-4 bottom-8 top-6 flex flex-col justify-between">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="w-full border-t border-dashed border-slate-200/70" />
            ))}
          </div>

          <div className="relative flex h-full items-end justify-around gap-2 sm:gap-4">
            {chartOrders.map((order) => {
              const amount = Number(order.totalAmount || 0);
              const height = Math.max(8, (amount / maxAmount) * 100);
              
              return (
                <div 
                  key={order._id} 
                  className="group relative flex h-full max-w-[3rem] flex-1 flex-col items-center justify-end gap-2"
                >
                  {/* Advanced Custom Tooltip */}
                  <div className="pointer-events-none absolute -top-10 z-10 flex -translate-y-2 scale-95 flex-col items-center opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-4 group-hover:scale-100 group-hover:opacity-100">
                    <span className="whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-slate-900/20">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                    <div className="h-2 w-2 -translate-y-1 rotate-45 bg-slate-900"></div>
                  </div>

                  {/* Gradient Bar with Shadow and Hover Interaction */}
                  <div 
                    className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-purple-500 shadow-md shadow-indigo-500/20 transition-all duration-500 ease-out group-hover:from-indigo-500 group-hover:to-purple-400 sm:rounded-t-xl" 
                    style={{ height: `${height}%` }} 
                  />
                  
                  <span className="max-w-full truncate text-[10px] font-bold text-slate-400 transition-colors group-hover:text-indigo-600">
                    #{order._id.slice(-4).toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Polished Empty State */
        <div className="mt-8 flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/80 bg-slate-50/50 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50/30">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
            <BarChart3 size={24} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No data available</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">Sales activity will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default SalesChart;