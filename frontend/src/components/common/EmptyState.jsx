import React from "react";
function EmptyState({ title = "Nothing here yet.", message }) { return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><h2 className="font-semibold text-slate-800">{title}</h2>{message && <p className="mt-2 text-sm text-slate-500">{message}</p>}</div>; }
export default EmptyState;
