import React from "react";
import { Link } from "react-router-dom";
function OrderSuccess() { return <main className="mx-auto max-w-xl px-4 py-20 text-center"><div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10"><h1 className="text-3xl font-bold text-emerald-800">Order placed successfully</h1><p className="mt-3 text-emerald-700">Thanks for shopping with ShopX.</p><Link to="/orders" className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">View my orders</Link></div></main>; }
export default OrderSuccess;
