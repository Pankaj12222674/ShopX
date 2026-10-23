import React from "react";
function QuantitySelector({ value, onChange, max }) { return <div className="flex items-center gap-3"><button type="button" onClick={() => onChange(Math.max(1, value - 1))} className="h-8 w-8 rounded-lg border">−</button><span className="w-5 text-center text-sm font-semibold">{value}</span><button type="button" onClick={() => onChange(Math.min(max || value + 1, value + 1))} className="h-8 w-8 rounded-lg border">+</button></div>; }
export default QuantitySelector;
