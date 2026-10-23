import React, { useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Package, Search, ShoppingCart, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";
import { fetchAllOrders, updateOrderStatus } from "../../redux/features/orderSlice";

const statusStyles = {
  delivered: "bg-emerald-100 text-emerald-700",
  processing: "bg-purple-100 text-purple-700",
  shipping: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const formatStatus = (status = "processing") =>
  status.charAt(0).toUpperCase() + status.slice(1);

function AdminOrders() {
  const dispatch = useDispatch();
  const { orders, isLoading, isError } = useSelector((state) => state.order);
  const [search, setSearch] = useState("");
  const [savingOrderId, setSavingOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) => {
      const searchableText = [
        order._id,
        order.userId?.name,
        order.userId?.email,
        order.userId?.phone,
        order.shippingAddress,
        order.paymentMethod,
        order.orderStatus,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [orders, search]);

  const changeStatus = async (order, field, value) => {
    setSavingOrderId(order._id);
    await dispatch(updateOrderStatus({ id: order._id, [field]: value }));
    setSavingOrderId(null);
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <header>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Sales</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">All orders</h1>
            <p className="mt-2 text-sm text-slate-500">Find orders and view the customer details attached to each purchase.</p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <ShoppingCart size={21} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{filteredOrders.length} orders found</p>
                  <p className="text-sm text-slate-500">Search by name, email, order ID, or address</p>
                </div>
              </div>
              <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-slate-400 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100 md:max-w-md">
                <Search size={18} />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customer email..."
                  className="w-full text-sm text-slate-700 outline-none"
                />
              </label>
            </div>
          </section>

          {isError && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{isError}</p>}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Order</th>
                    <th className="px-5 py-4 font-semibold">Customer details</th>
                    <th className="px-5 py-4 font-semibold">Items</th>
                    <th className="px-5 py-4 font-semibold">Amount</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading && <tr><td colSpan="6" className="px-5 py-12 text-center text-sm text-slate-500">Loading orders...</td></tr>}
                  {!isLoading && filteredOrders.length === 0 && <tr><td colSpan="6" className="px-5 py-12 text-center text-sm text-slate-500">No matching orders found.</td></tr>}
                  {!isLoading && filteredOrders.map((order) => {
                    const status = order.orderStatus || "processing";
                    const paymentStatus = order.paymentStatus || "pending";
                    return (
                      <tr key={order._id} className="align-top transition hover:bg-slate-50">
                        <td className="whitespace-nowrap px-5 py-5">
                          <p className="font-semibold text-purple-600">#{order._id.slice(-8).toUpperCase()}</p>
                          <p className="mt-1 text-xs text-slate-400">{order.paymentMethod || "—"}</p>
                        </td>
                        <td className="min-w-[260px] px-5 py-5">
                          <div className="flex gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600"><UserRound size={17} /></div>
                            <div className="space-y-1 text-sm">
                              <p className="font-semibold text-slate-800">{order.userId?.name || "Customer unavailable"}</p>
                              <p className="flex items-center gap-1.5 text-slate-500"><Mail size={14} />{order.userId?.email || "Email unavailable"}</p>
                              <p className="flex items-start gap-1.5 text-xs text-slate-400"><MapPin size={14} className="mt-0.5 shrink-0" />{order.shippingAddress || "Address unavailable"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm text-slate-600"><span className="flex items-center gap-2"><Package size={16} />{order.items?.reduce((total, item) => total + Number(item.quantity || 0), 0) || 0} items</span></td>
                        <td className="whitespace-nowrap px-5 py-5 font-semibold text-slate-800">₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</td>
                        <td className="space-y-2 whitespace-nowrap px-5 py-5">
                          <select value={status} disabled={savingOrderId === order._id} onChange={(event) => changeStatus(order, "orderStatus", event.target.value)} className={`rounded-lg border-0 px-3 py-1.5 text-xs font-semibold outline-none ${statusStyles[status] || "bg-slate-100 text-slate-700"}`} aria-label="Order status">
                            {["processing", "shipping", "delivered", "cancelled"].map((value) => <option key={value} value={value}>{formatStatus(value)}</option>)}
                          </select>
                          <select value={paymentStatus} disabled={savingOrderId === order._id} onChange={(event) => changeStatus(order, "paymentStatus", event.target.value)} className="block rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 outline-none" aria-label="Payment status">
                            {["pending", "paid", "failed"].map((value) => <option key={value} value={value}>Payment: {formatStatus(value)}</option>)}
                          </select>
                        </td>
                        <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminOrders;
