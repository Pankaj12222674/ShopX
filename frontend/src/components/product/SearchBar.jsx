import React from "react";
import { Search } from "lucide-react";
function SearchBar({ value, onChange, placeholder = "Search products..." }) { return <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-400 shadow-sm"><Search size={18} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full text-sm text-slate-700 outline-none" /></label>; }
export default SearchBar;
