import React from "react";
import { Link } from "react-router-dom";
function CartSummary({ total }) { return <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold text-slate-900">Order summary</h2><div className="mt-5 flex justify-between text-lg font-bold"><span>Total</span><span>₹{Number(total).toLocaleString("en-IN")}</span></div><Link to="/checkout" className="mt-5 block rounded-xl bg-purple-600 px-4 py-3 text-center font-semibold text-white hover:bg-purple-700">Continue to checkout</Link></aside>; }
export default CartSummary;
