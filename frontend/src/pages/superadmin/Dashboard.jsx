import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart3,
  ClipboardList,
  IndianRupee,
  Package,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Users,
} from "lucide-react";
import { fetchUsers } from "../../redux/features/userSlice";
import { fetchOverview, fetchStats } from "../../redux/features/statsSlice";
import Shell from "./Shell";
import SalesChart from "../../components/superadmin/SalesChart";

const quickActions = [
  ["Add product", "/admin/products", Package, "bg-violet-50 text-violet-600"],
  ["Add category", "/admin/categories", Plus, "bg-rose-50 text-rose-600"],
  ["Manage users", "/superadmin/users", Users, "bg-blue-50 text-blue-600"],
  ["View orders", "/superadmin/orders", ClipboardList, "bg-emerald-50 text-emerald-600"],
  ["Create admin", "/superadmin/create-admin", ShieldCheck, "bg-orange-50 text-orange-600"],
  ["View reports", "/superadmin/reports", BarChart3, "bg-indigo-50 text-indigo-600"],
];

function Dashboard() {
  const dispatch = useDispatch();
  const { data, orders, isLoading } = useSelector((state) => state.stats);
  const users = useSelector((state) => state.superadminUsers.users);
  const [today] = useState(() => new Date());

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(fetchOverview());
    dispatch(fetchUsers());
  }, [dispatch]);

  const statusCounts = useMemo(() => orders.reduce((result, order) => {
    const status = order.orderStatus || "processing";
    result[status] = (result[status] || 0) + 1;
    return result;
  }, {}), [orders]);

  const statusItems = [
    ["Delivered", "delivered", "bg-emerald-500"],
    ["Shipping", "shipping", "bg-blue-500"],
    ["Processing", "processing", "bg-orange-400"],
    ["Cancelled", "cancelled", "bg-rose-400"],
  ];

  const cards = [
    ["Total users", data.users || 0, Users, "bg-blue-50 text-blue-600"],
    ["Total admins", data.admins || 0, ShieldCheck, "bg-emerald-50 text-emerald-600"],
    ["Total products", data.products || 0, Package, "bg-orange-50 text-orange-600"],
    ["Total orders", data.orders || 0, ShoppingBag, "bg-violet-50 text-violet-600"],
    ["Total revenue", `₹${Number(data.sales || 0).toLocaleString("en-IN")}`, IndianRupee, "bg-rose-50 text-rose-600"],
  ];

  return (
    <Shell title="Dashboard">
      {isLoading && !Object.keys(data).length ? <div className="rounded-3xl bg-white p-16 text-center text-sm font-semibold text-slate-500">Loading platform overview...</div> : (
        <div className="space-y-5 pb-8">
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_265px]">
            <div className="relative min-h-[170px] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-violet-100 to-blue-100 p-6 sm:p-8">
              <div className="absolute -right-8 -top-16 h-52 w-52 rounded-full bg-white/40 blur-2xl" />
              <div className="relative max-w-lg">
                <p className="flex items-center gap-2 text-xs font-semibold text-indigo-800">Welcome back, Super Admin! <span>👑</span></p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">Manage Everything<br /><span className="text-violet-600">in One Place</span></h1>
                <p className="mt-2 max-w-md text-xs leading-5 text-slate-600">Monitor users, products, orders, revenue and platform performance with full control.</p>
              </div>
              <div className="absolute bottom-4 right-8 hidden text-7xl opacity-70 sm:block">🛒</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">{today.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}</p>
              <h2 className="mt-3 text-xl font-black text-slate-900">Good evening!</h2>
              <p className="mt-2 text-sm leading-5 text-slate-500">Here&apos;s what&apos;s happening with your platform today.</p>
              <div className="mt-4 text-3xl">☀️</div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3 xl:grid-cols-5">
            {cards.map(([label, value, Icon, color]) => <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${color}`}><Icon size={18} /></div><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-1 truncate text-xl font-black text-slate-900">{value}</p><p className="mt-1 text-[11px] font-semibold text-emerald-600">↑ Live data</p></div>)}
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)]">
            <SalesChart orders={orders} />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><h2 className="font-black text-slate-900">Order status</h2><Link to="/superadmin/orders" className="text-xs font-bold text-indigo-600">View all →</Link></div>
              <div className="mt-5 flex items-center gap-5">
                <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#10b981 0 ${((statusCounts.delivered || 0) / Math.max(orders.length, 1)) * 100}%, #3b82f6 0 ${(((statusCounts.delivered || 0) + (statusCounts.shipping || 0)) / Math.max(orders.length, 1)) * 100}%, #fb923c 0 ${(((statusCounts.delivered || 0) + (statusCounts.shipping || 0) + (statusCounts.processing || 0)) / Math.max(orders.length, 1)) * 100}%, #fb7185 0 100%)` }}><div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white"><strong className="text-2xl text-slate-900">{orders.length}</strong><span className="text-[10px] text-slate-500">Total orders</span></div></div>
                <div className="min-w-0 flex-1 space-y-3">{statusItems.map(([label, key, color]) => <div key={key} className="flex items-center justify-between gap-2 text-xs"><span className="flex items-center gap-2 text-slate-600"><i className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</span><strong className="text-slate-800">{statusCounts[key] || 0}</strong></div>)}</div>
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.1fr_1.1fr_0.8fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="font-black text-slate-900">Recent users</h2><Link to="/superadmin/users" className="text-xs font-bold text-indigo-600">View all →</Link></div><div className="space-y-3">{users.slice(0, 5).map((user) => <div key={user._id || user.id} className="flex items-center justify-between gap-2 text-xs"><div className="flex min-w-0 items-center gap-2">{user.profileImage ? <img src={user.profileImage} alt="" className="h-7 w-7 rounded-full object-cover" /> : <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">{user.name?.charAt(0)}</span>}<span className="truncate font-semibold text-slate-700">{user.name}</span></div><span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-600">{user.isActive === false ? "Inactive" : "Active"}</span></div>)}</div>{!users.length && <p className="text-sm text-slate-500">No users available.</p>}</div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="font-black text-slate-900">Recent orders</h2><Link to="/superadmin/orders" className="text-xs font-bold text-indigo-600">View all →</Link></div><div className="space-y-3">{orders.slice(0, 5).map((order) => <div key={order._id} className="flex items-center justify-between gap-2 text-xs"><div><p className="font-bold text-slate-700">#{order._id.slice(-8).toUpperCase()}</p><p className="text-slate-400">{order.userId?.name || "Customer"}</p></div><div className="text-right"><p className="font-bold text-slate-800">₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</p><span className="font-semibold capitalize text-indigo-600">{order.orderStatus || "processing"}</span></div></div>)}</div>{!orders.length && <p className="text-sm text-slate-500">No orders available.</p>}</div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-black text-slate-900">Quick actions</h2><div className="mt-4 grid grid-cols-2 gap-2">{quickActions.map(([label, href, Icon, color]) => <Link key={label} to={href} className="rounded-xl bg-slate-50 p-3 text-center transition hover:bg-indigo-50"><span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl ${color}`}><Icon size={17} /></span><p className="mt-2 text-[10px] font-bold text-slate-600">{label}</p></Link>)}</div></div>
          </section>
        </div>
      )}
    </Shell>
  );
}

export default Dashboard;
