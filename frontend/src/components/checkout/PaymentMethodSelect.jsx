import React from "react";
function PaymentMethodSelect({ value, onChange }) { return <label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Payment method</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"><option value="COD">Cash on delivery</option><option value="ONLINE" disabled>Online payment (not available)</option></select></label>; }
export default PaymentMethodSelect;
