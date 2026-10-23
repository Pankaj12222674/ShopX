import React, { useEffect } from "react";
import { Bell, CheckCircle, Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationRead } from "../redux/features/notificationSlice";

function Notifications() {
  const dispatch = useDispatch();
  const { notifications, isLoading, error } = useSelector((state) => state.notification);

  useEffect(() => { dispatch(fetchNotifications()); }, [dispatch]);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600"><Bell /></span><div><h1 className="text-3xl font-black text-slate-900">Notifications</h1><p className="text-sm text-slate-500">Updates from ShopX about your account and orders.</p></div></div>
        {error && <p className="mb-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
        {isLoading && <p className="text-sm text-slate-500">Loading notifications...</p>}
        {!isLoading && !notifications.length && <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">You have no notifications yet.</div>}
        <div className="space-y-3">{notifications.map((notification) => <article key={notification._id} className={`rounded-2xl border bg-white p-5 shadow-sm ${notification.readAt ? "border-slate-200" : "border-indigo-200 bg-indigo-50/40"}`}><div className="flex gap-4"><span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">{notification.type === "order" ? <Package size={17} /> : <Bell size={17} />}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><h2 className="font-bold text-slate-800">{notification.title}</h2><time className="text-xs text-slate-400">{new Date(notification.createdAt).toLocaleString("en-IN")}</time></div><p className="mt-1 text-sm leading-6 text-slate-600">{notification.message}</p>{notification.orderId && <p className="mt-2 text-xs font-semibold text-indigo-600">Order status: {notification.orderId.orderStatus}</p>}{!notification.readAt && <button type="button" onClick={() => dispatch(markNotificationRead(notification._id))} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"><CheckCircle size={14} /> Mark as read</button>}</div></div></article>)}</div>
      </div>
    </main>
  );
}

export default Notifications;
