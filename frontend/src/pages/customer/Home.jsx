import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Heart,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";
import { fetchAllProduct } from "../../redux/features/productSlice";
import { addToCart } from "../../redux/features/cartSlice";
import { fetchMyOrders } from "../../redux/features/orderSlice";
import { logout } from "../../redux/features/authSlice";
import Loader from "../../components/common/Loader";

const navigation = [
  ["Dashboard", "/", Package],
  ["My Orders", "/orders", ShoppingBag],
  ["Wishlist", "/products", Heart],
  ["My Cart", "/cart", ShoppingCart],
  ["Addresses", "/profile", MapPin],
  ["Payment Methods", "/profile", WalletCards],
  ["Notifications", "/notifications", Bell],
  ["Account Settings", "/profile", Plus],
];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const latestOrders = orders.slice(0, 3);
  const recommended = products.slice(0, 4);
  const latestOrder = orders[0];
  const statusSteps = [
    ["Order placed", Check],
    ["Packed", Check],
    ["Shipped", Truck],
    ["Delivered", Package],
  ];
  const statusIndex = {
    processing: 0,
    shipping: 2,
    delivered: 3,
  };
  const currentStatus = latestOrder?.orderStatus;
  const completedStep = statusIndex[currentStatus] ?? -1;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f5f8fc] px-3 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1480px] gap-5 lg:grid-cols-[220px_minmax(0,1fr)_255px]">
        <aside className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm lg:min-h-[780px]">
          <div className="mb-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                {user?.profileImage ? <img src={user.profileImage} alt={user.name} className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white shadow-sm" /> : <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm ring-2 ring-white"><UserRound size={23} /></div>}
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-slate-50 bg-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold tracking-tight text-slate-800">{user?.name || "ShopX member"}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">{user?.email || "Welcome back"}</p>
              </div>
            </div>
            <div className="mt-3 border-t border-slate-200/70 pt-3 text-[10px] font-semibold text-slate-400">Your personal shopping space</div>
          </div>
          <nav className="space-y-1">
            {navigation.map(([label, href, Icon], index) => <Link key={label} to={href} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${index === 0 ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"}`}><Icon size={17} className={index === 0 ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"} />{label}{label === "Notifications" && <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />}</Link>)}
          </nav>
          <button type="button" onClick={handleLogout} className="mt-6 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-rose-500 transition hover:bg-rose-50"><ArrowRight size={17} /> Logout</button>
        </aside>

        <section className="min-w-0 space-y-5">
          <div className="relative min-h-[218px] overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-600 to-fuchsia-500 p-7 text-white shadow-xl shadow-indigo-200 sm:p-9">
            <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute bottom-[-75px] right-20 h-48 w-48 rounded-full bg-fuchsia-300/25 blur-2xl" />
            <div className="relative max-w-md"><p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">Welcome back, {user?.name?.split(" ")[0] || "shopper"} 👋</p><h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Discover something amazing today</h1><p className="mt-2 text-sm text-indigo-100">Top brands · Best prices · Fast delivery</p><Link to="/products" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold shadow-lg shadow-orange-950/20 transition hover:bg-orange-400">Shop now <ArrowRight size={16} /></Link></div>
            <div className="absolute bottom-5 right-8 hidden rotate-[-8deg] rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur sm:block"><ShoppingBag size={76} className="text-white/80" /></div>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[["Total orders", orders.length, Package, "bg-blue-50 text-blue-600"], ["Wishlist items", 0, Heart, "bg-rose-50 text-rose-500"], ["Reward points", orders.length * 50, Star, "bg-amber-50 text-amber-500"], ["Saved addresses", 1, MapPin, "bg-indigo-50 text-indigo-600"]].map(([label, value, Icon, color]) => <div key={label} className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm"><div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full ${color}`}><Icon size={17} /></div><p className="text-xs font-medium text-slate-400">{label}</p><p className="mt-1 text-xl font-black text-slate-800">{value}</p><p className="mt-1 text-[11px] font-semibold text-indigo-600">{label === "Total orders" ? "↑ Recent activity" : "Manage now"} <ChevronRight size={11} className="inline" /></p></div>)}
          </div>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Curated for you</p><h2 className="mt-1 text-xl font-black text-slate-800">Recommended for you</h2></div><Link to="/products" className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800">View all <ArrowRight size={14} /></Link></div>
            {isLoading ? <Loader /> : <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{recommended.map((product) => <article key={product._id} className="group min-w-0"><Link to={`/products/${product._id}`} className="relative block h-36 overflow-hidden rounded-2xl bg-slate-100 sm:h-44"><div className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-sm"><Heart size={14} /></div>{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-xs text-slate-400">No image</div>}</Link><div className="px-1 pt-3"><p className="truncate text-sm font-bold text-slate-700">{product.name}</p><div className="mt-1 flex items-center justify-between"><span className="text-base font-black text-slate-900">₹{Number(product.price || 0).toLocaleString("en-IN")}</span><span className="flex items-center gap-0.5 text-xs font-bold text-amber-500"><Star size={12} fill="currentColor" /> 4.5</span></div><button type="button" onClick={() => dispatch(addToCart({ productId: product._id }))} className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-indigo-50 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white">Add to cart <Plus size={14} /></button></div></article>)}</div>}
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black text-slate-800">Recent orders</h2><Link to="/orders" className="flex items-center gap-1 text-xs font-bold text-indigo-600">View all <ArrowRight size={14} /></Link></div>
            {latestOrders.length ? <div className="divide-y divide-slate-100">{latestOrders.map((order) => <Link to={`/orders/${order._id}`} key={order._id} className="flex items-center justify-between gap-3 py-3 transition hover:bg-slate-50"><div className="flex min-w-0 items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Package size={16} /></div><div><p className="text-sm font-bold text-slate-700">#{order._id.slice(-8).toUpperCase()}</p><p className="text-xs text-slate-400">{order.items?.length || 0} products · {new Date(order.createdAt).toLocaleDateString("en-IN")}</p></div></div><div className="text-right"><p className="text-sm font-black text-slate-800">₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</p><span className="text-[11px] font-bold capitalize text-emerald-600">{order.orderStatus}</span></div></Link>)}</div> : <p className="py-8 text-center text-sm text-slate-500">Your orders will appear here.</p>}
          </section>
        </section>

        <aside className="space-y-5">
          <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-slate-800">My order status</h2>
              <Link to="/orders" className="text-xs font-bold text-indigo-600">View all →</Link>
            </div>
            {!latestOrder ? (
              <div className="py-8 text-center">
                <Package size={30} className="mx-auto text-slate-300" />
                <p className="mt-3 text-sm font-bold text-slate-600">Not ordered yet</p>
                <p className="mt-1 text-xs text-slate-400">Place an order to track its status here.</p>
                <Link to="/products" className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700">Start shopping</Link>
              </div>
            ) : currentStatus === "cancelled" ? (
              <div className="py-8 text-center">
                <XCircle size={30} className="mx-auto text-rose-500" />
                <p className="mt-3 text-sm font-bold text-rose-600">Order cancelled</p>
                <p className="mt-1 text-xs text-slate-400">Order #{latestOrder._id.slice(-8).toUpperCase()}</p>
              </div>
            ) : (
              <div className="relative mt-5 space-y-6 pl-8">
                {statusSteps.map(([label, Icon], index) => {
                  const isCompleted = index <= completedStep;
                  const isCurrent = index === completedStep;
                  return (
                    <div key={label} className="relative">
                      <div className={`absolute -left-8 top-0 flex h-6 w-6 items-center justify-center rounded-full text-white ${isCompleted ? (isCurrent ? "bg-indigo-600" : "bg-emerald-500") : "bg-slate-200"}`}>
                        <Icon size={13} />
                      </div>
                      {index < statusSteps.length - 1 && <span className={`absolute -left-[19px] top-6 h-8 border-l-2 border-dashed ${index < completedStep ? "border-emerald-300" : "border-slate-200"}`} />}
                      <p className={`text-sm font-bold ${isCompleted ? "text-slate-700" : "text-slate-400"}`}>{label}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">{isCurrent ? `Current status: ${currentStatus}` : isCompleted ? "Completed" : "Waiting for update"}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-200 via-pink-200 to-fuchsia-300 p-5 shadow-sm"><div className="relative z-10 max-w-[145px]"><h2 className="text-xl font-black leading-tight text-slate-800">Earn more reward points</h2><p className="mt-2 text-xs leading-5 text-slate-600">Shop more, earn more and unlock exclusive offers.</p><Link to="/products" className="mt-4 inline-flex rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-sm">Explore offers →</Link></div><div className="absolute -bottom-3 -right-3 text-7xl">🎁</div></section>
          <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm"><h2 className="font-black text-slate-800">Quick links</h2><div className="mt-4 grid grid-cols-2 gap-2">{[["Track order", Truck, "/orders"], ["My wallet", WalletCards, "/profile"], ["Help center", Bell, "/help"], ["Settings", Plus, "/profile"]].map(([label, Icon, href]) => <Link key={label} to={href} className="rounded-2xl bg-slate-50 p-3 text-center transition hover:bg-indigo-50"><Icon size={18} className="mx-auto text-indigo-600" /><p className="mt-2 text-[11px] font-bold text-slate-600">{label}</p></Link>)}</div></section>
        </aside>
      </div>
    </main>
  );
}

export default Home;
