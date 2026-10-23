import React from "react";
function AddressForm({ value, onChange }) { return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Shipping address</span><textarea value={value} onChange={(event) => onChange(event.target.value)} rows="4" required placeholder="Enter your full delivery address" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100" /></label>; }
export default AddressForm;
