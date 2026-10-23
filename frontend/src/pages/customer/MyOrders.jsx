import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../../redux/features/orderSlice";
import EmptyState from "../../components/common/EmptyState";
import OrderCard from "../../components/order/OrderCard";
function MyOrders() { const dispatch = useDispatch(); const { orders, isLoading } = useSelector((state) => state.order); useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]); return <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8"><h1 className="text-3xl font-bold text-slate-900">My orders</h1><div className="mt-6 space-y-3">{!isLoading && !orders.length && <EmptyState title="No orders yet" message="Your completed orders will appear here." />}{orders.map((order) => <OrderCard key={order._id} order={order} />)}</div></main>; }
export default MyOrders;
