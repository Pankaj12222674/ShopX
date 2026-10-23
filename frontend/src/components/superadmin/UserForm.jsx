import React from "react";
function UserForm({ form, setForm, onSubmit, loading, submitLabel = "Save user" }) {
  return <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <input required value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full rounded-xl border px-4 py-3" />
    <input required type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="w-full rounded-xl border px-4 py-3" />
    <input type="tel" value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full rounded-xl border px-4 py-3" />
    {form.role !== undefined && <label className="block text-sm font-medium text-slate-700">Role
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-2 w-full rounded-xl border px-4 py-3">
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
        <option value="superadmin">Super admin</option>
      </select>
    </label>}
    {form.password !== undefined && <input required minLength="8" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (minimum 8 characters)" className="w-full rounded-xl border px-4 py-3" />}
    <button disabled={loading} className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-60">{loading ? "Saving..." : submitLabel}</button>
  </form>;
}
export default UserForm;
