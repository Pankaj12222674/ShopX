import React from "react";
function StatCard({ label, value, icon: Icon }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600"><Icon size={20} /></div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-900">{value}</p>
  </div>;
}
export default StatCard;
