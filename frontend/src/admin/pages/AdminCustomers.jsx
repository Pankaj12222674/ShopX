import React, { useEffect, useMemo, useState } from "react";
import { Mail, MessageSquare, Phone, Search, UserRound, Users, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";
import { fetchCustomers } from "../../redux/features/customerSlice";
import { sendNotification } from "../../redux/features/notificationSlice";

function AdminCustomers() {
  const dispatch = useDispatch();
  const { customers, isLoading, isError } = useSelector((state) => state.customer);
  const [search, setSearch] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [form, setForm] = useState({ title: "", message: "" });
  const [sendState, setSendState] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;

    return customers.filter((customer) =>
      [customer.name, customer.email, customer.phone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [customers, search]);

  const handleSend = async (event) => {
    event.preventDefault();
    const result = await dispatch(sendNotification({ recipientId: recipient._id, ...form }));
    if (sendNotification.fulfilled.match(result)) {
      setSendState("Message sent successfully.");
      setForm({ title: "", message: "" });
    } else setSendState(result.payload || "Unable to send message.");
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <header>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">People</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Customers</h1>
            <p className="mt-2 text-sm text-slate-500">Search and review the customer accounts in your store.</p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Users size={21} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{filteredCustomers.length} customers found</p>
                  <p className="text-sm text-slate-500">Search by name, email, or phone number</p>
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
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Contact</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Joined</th>
                    <th className="px-5 py-4 font-semibold">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading && <tr><td colSpan="5" className="px-5 py-12 text-center text-sm text-slate-500">Loading customers...</td></tr>}
                  {!isLoading && filteredCustomers.length === 0 && <tr><td colSpan="5" className="px-5 py-12 text-center text-sm text-slate-500">No matching customers found.</td></tr>}
                  {!isLoading && filteredCustomers.map((customer) => (
                    <tr key={customer._id} className="transition hover:bg-slate-50">
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          {customer.profileImage ? <img src={customer.profileImage} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600"><UserRound size={18} /></div>}
                          <div><p className="font-semibold text-slate-800">{customer.name}</p><p className="text-xs text-slate-400">Customer account</p></div>
                        </div>
                      </td>
                      <td className="space-y-1 px-5 py-5 text-sm text-slate-600">
                        <p className="flex items-center gap-2"><Mail size={15} className="text-slate-400" />{customer.email}</p>
                        <p className="flex items-center gap-2"><Phone size={15} className="text-slate-400" />{customer.phone || "Phone not provided"}</p>
                      </td>
                      <td className="px-5 py-5"><span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${customer.isActive === false ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>{customer.isActive === false ? "Inactive" : "Active"}</span></td>
                      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-500">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString("en-IN") : "—"}</td>
                      <td className="px-5 py-5"><button type="button" onClick={() => { setRecipient(customer); setSendState(""); }} className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-100"><MessageSquare size={14} /> Send message</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {recipient && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4"><form onSubmit={handleSend} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">Message customer</h2><p className="text-xs text-slate-500">{recipient.name} · {recipient.email}</p></div><button type="button" onClick={() => setRecipient(null)} aria-label="Close"><X size={20} /></button></div><label className="mt-5 block text-sm font-semibold text-slate-700">Title<input required maxLength="120" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500" /></label><label className="mt-4 block text-sm font-semibold text-slate-700">Message<textarea required maxLength="500" rows="4" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500" /></label>{sendState && <p className="mt-3 text-sm text-emerald-600">{sendState}</p>}<button className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white hover:bg-purple-700">Send notification</button></form></div>}
        </div>
      </main>
    </div>
  );
}

export default AdminCustomers;
