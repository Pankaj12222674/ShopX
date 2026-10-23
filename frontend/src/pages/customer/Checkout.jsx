import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../redux/features/orderSlice";
import AddressForm from "../../components/checkout/AddressForm";
import PaymentMethodSelect from "../../components/checkout/PaymentMethodSelect";
import OrderSummary from "../../components/checkout/OrderSummary";
function Checkout() { const dispatch = useDispatch(); const navigate = useNavigate(); const { items, totalPrice } = useSelector((state) => state.cart); const [address, setAddress] = useState(""); const [payment, setPayment] = useState("COD"); const [error, setError] = useState(""); const submit = async (event) => { event.preventDefault(); const result = await dispatch(placeOrder({ shippingAddress: address, paymentMethod: payment })); if (placeOrder.fulfilled.match(result)) navigate("/order-success"); else setError(result.payload); }; return <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8"><h1 className="text-3xl font-bold text-slate-900">Checkout</h1><form onSubmit={submit} className="mt-6 grid gap-6 lg:grid-cols-2"><div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"><AddressForm value={address} onChange={setAddress} /><PaymentMethodSelect value={payment} onChange={setPayment} />{error && <p className="text-sm text-red-600">{error}</p>}<button className="w-full rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700">Place order</button></div><OrderSummary items={items} total={totalPrice} /></form></main>; }
export default Checkout;
