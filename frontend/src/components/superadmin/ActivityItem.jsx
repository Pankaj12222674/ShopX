import React from "react";
import { ShoppingBag, UserRound } from "lucide-react";
function ActivityItem({ item }) {
  const isOrder = item.type === "order";
  return <div className="group flex gap-4 border-b border-slate-100/80 py-5 last:border-0">
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isOrder ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"}`}>
      {isOrder ? <ShoppingBag size={18} /> : <UserRound size={18} />}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold leading-6 text-slate-700 transition-colors group-hover:text-indigo-700">{item.text}</p>
      <p className="mt-1 text-xs font-medium text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
    </div>
    <span className={`mt-1 hidden h-2 w-2 rounded-full sm:block ${isOrder ? "bg-amber-400" : "bg-indigo-400"}`} />
  </div>;
}
export default ActivityItem;
