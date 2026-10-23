import React from "react";
function Pagination({ page, totalPages, onChange }) { if (totalPages <= 1) return null; return <div className="mt-8 flex justify-center gap-2">{Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => <button key={item} onClick={() => onChange(item)} className={`h-9 w-9 rounded-lg text-sm font-semibold ${item === page ? "bg-purple-600 text-white" : "border bg-white text-slate-600"}`}>{item}</button>)}</div>; }
export default Pagination;
