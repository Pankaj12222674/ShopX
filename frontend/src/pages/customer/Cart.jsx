import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/features/cartSlice";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
function Cart() { const dispatch = useDispatch(); const { items, totalPrice, isLoading } = useSelector((state) => state.cart); useEffect(() => { dispatch(fetchCart()); }, [dispatch]); return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8"><h1 className="text-3xl font-bold text-slate-900">Your cart</h1>{isLoading ? <Loader /> : !items.length ? <div className="mt-6"><EmptyState title="Your cart is empty" message="Add something you like from the products page." /></div> : <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]"><div className="rounded-2xl border border-slate-200 bg-white px-5"><div>{items.map((item) => <CartItem key={item.product?._id} item={item} />)}</div></div><CartSummary total={totalPrice} /></div>}</main>; }
export default Cart;
