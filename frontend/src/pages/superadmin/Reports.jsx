import React from "react";
import { useSelector } from "react-redux";
import Shell from "./Shell";
function Reports() { const stats = useSelector((state) => state.stats.data); return <Shell title="Reports"><div className="rounded-2xl border bg-white p-6"><h2 className="text-lg font-bold">Business summary</h2><dl className="mt-5 grid gap-4 sm:grid-cols-2"><div><dt className="text-sm text-slate-500">Total sales</dt><dd className="text-2xl font-bold">₹{Number(stats.sales || 0).toLocaleString("en-IN")}</dd></div><div><dt className="text-sm text-slate-500">Total orders</dt><dd className="text-2xl font-bold">{stats.orders || 0}</dd></div><div><dt className="text-sm text-slate-500">Customers</dt><dd className="text-2xl font-bold">{stats.customers || 0}</dd></div><div><dt className="text-sm text-slate-500">Products</dt><dd className="text-2xl font-bold">{stats.products || 0}</dd></div></dl></div></Shell>; }
export default Reports;
