import React from "react";
import { Mail, Phone, CalendarDays, MapPin, CreditCard, Package, ShoppingBag } from "lucide-react";
import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";

function UserDetails({ user }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-indigo-100/40 backdrop-blur-xl sm:p-8">
      {/* Decorative Background Blob */}
      <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 blur-3xl" aria-hidden="true" />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Avatar with advanced glow and rings */}
        <div className="relative shrink-0">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-500 opacity-30 blur sm:rounded-[2rem]"></div>
          {user.profileImage ? (
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="relative h-24 w-24 rounded-2xl object-cover ring-4 ring-white sm:h-28 sm:w-28 sm:rounded-[1.75rem]" 
            />
          ) : (
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 ring-4 ring-white sm:h-28 sm:w-28 sm:rounded-[1.75rem]">
              <span className="text-4xl font-black text-white drop-shadow-md">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
            {user.name}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <RoleBadge role={user.role} />
            <StatusBadge active={user.isActive} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 border-t border-slate-200/60 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group flex items-center gap-3 rounded-2xl bg-slate-50/50 p-3 transition-colors hover:bg-indigo-50/50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50 group-hover:ring-indigo-200">
            <Mail size={18} className="text-indigo-500 transition-transform group-hover:scale-110" />
          </div>
          <p className="truncate text-sm font-medium text-slate-700">{user.email}</p>
        </div>
        
        <div className="group flex items-center gap-3 rounded-2xl bg-slate-50/50 p-3 transition-colors hover:bg-purple-50/50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50 group-hover:ring-purple-200">
            <Phone size={18} className="text-purple-500 transition-transform group-hover:scale-110" />
          </div>
          <p className="truncate text-sm font-medium text-slate-700">{user.phone || "No phone number"}</p>
        </div>

        <div className="group flex items-center gap-3 rounded-2xl bg-slate-50/50 p-3 transition-colors hover:bg-cyan-50/50 sm:col-span-2 lg:col-span-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50 group-hover:ring-cyan-200">
            <CalendarDays size={18} className="text-cyan-500 transition-transform group-hover:scale-110" />
          </div>
          <p className="truncate text-sm font-medium text-slate-700">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export function OrderHistory({ orders }) {
  return (
    <section className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Order History</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-600/10">
          <ShoppingBag size={14} />
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {orders.length ? (
        <div className="space-y-5">
          {orders.map((order) => (
            <article 
              key={order._id} 
              className="group relative overflow-hidden rounded-3xl border border-slate-200/75 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-200/75"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-4 backdrop-blur-sm">
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Status badge styling could also be extracted if you have a custom component for it */}
                  <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 shadow-sm ring-1 ring-inset ring-amber-600/20">
                    {order.orderStatus}
                  </span>
                  <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-lg font-black text-transparent">
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px]">
                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div key={`${order._id}-${index}`} className="group/item flex items-center gap-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100 transition-transform group-hover/item:scale-105">
                        {item.productId?.image ? (
                          <img src={item.productId.image} alt={item.productId.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-slate-100">
                            <Package size={20} className="text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800 group-hover/item:text-indigo-600 transition-colors">
                          {item.productId?.name || "Product unavailable"}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Qty: <span className="text-slate-700">{item.quantity}</span> 
                          <span className="mx-2 text-slate-300">&bull;</span> 
                          <span className="text-slate-700">₹{Number(item.price || 0).toLocaleString("en-IN")}</span> each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-5 text-sm text-slate-600 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-purple-50 p-1.5 text-purple-600">
                      <MapPin size={16} />
                    </div>
                    <p className="font-medium leading-relaxed">{order.shippingAddress}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-indigo-50 p-1.5 text-indigo-600">
                      <CreditCard size={16} />
                    </div>
                    <p className="font-medium">
                      {order.paymentMethod} <span className="mx-1 text-slate-300">&bull;</span> {order.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Advanced Empty State */
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-16 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50/30">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
            <Package size={28} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 sm:text-base">No orders yet</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">This user hasn't placed any orders.</p>
        </div>
      )}
    </section>
  );
}

export default UserDetails;