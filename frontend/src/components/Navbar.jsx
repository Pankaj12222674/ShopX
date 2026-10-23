import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown,
  Bell,
  Heart,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { fetchCart, selectCartCount } from "../redux/features/cartSlice";
import { logout } from "../redux/features/authSlice";
import { fetchNotifications } from "../redux/features/notificationSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector(selectCartCount);
  const unreadNotifications = useSelector((state) => state.notification.unreadCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const isAdmin = user?.role === "admin";
  const isSuperAdmin = user?.role === "superadmin";
  const isCustomer = user?.role === "customer";

  const roleLinks = isSuperAdmin
    ? [
        ["Dashboard", "/superadmin"],
        ["Users", "/superadmin/users"],
        ["Admins", "/superadmin/admins"],
        ["Products", "/superadmin/products"],
        ["Orders", "/superadmin/orders"],
        ["Reports", "/superadmin/reports"],
        ["Activity", "/superadmin/activity"],
        ["Support", "/superadmin/support"],
      ]
    : isAdmin
      ? [
          ["Dashboard", "/admin"],
          ["Products", "/admin/products"],
          ["Categories", "/admin/categories"],
          ["Orders", "/admin/orders"],
          ["Customers", "/admin/customers"],
          ["Settings", "/admin/settings"],
          ["Support", "/admin/support"],
        ]
      : [
          ["Home", "/"],
          ["Categories", "/products"],
          ["Deals", "/products"],
          ["Orders", "/orders"],
          ["Help", "/help"],
        ];

  useEffect(() => {
    if (isCustomer) dispatch(fetchCart());
    if (isCustomer) dispatch(fetchNotifications());
  }, [dispatch, isCustomer]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f9fc] font-sans text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-[0_2px_18px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-5 px-4 sm:px-7 lg:px-10">
          <Link to={isSuperAdmin ? "/superadmin" : isAdmin ? "/admin" : "/"} className="group flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-slate-800 text-slate-800 transition group-hover:border-indigo-600 group-hover:text-indigo-600">
              <ShoppingBag size={21} strokeWidth={2.3} />
            </span>
            <span className="text-[21px] font-extrabold tracking-tight text-slate-900">Shop<span className="text-orange-500">X</span></span>
          </Link>

          {isCustomer && <form onSubmit={handleSearch} className="hidden min-w-0 max-w-[420px] flex-1 md:block">
            <label className="flex h-10 items-center gap-2 rounded-xl bg-slate-100 px-3.5 text-slate-400 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <Search size={17} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for products, brands and more..." className="w-full bg-transparent text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400" />
            </label>
          </form>}

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-1 lg:flex">
              {roleLinks.map(([label, href]) => <Link key={label} to={href} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600">{label}</Link>)}
            </div>

            {isCustomer && <Link to="/products" aria-label="Search products" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-50 md:hidden"><Search size={18} /></Link>}
            {isCustomer && <Link to="/products" aria-label="Wishlist" className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-50 sm:flex"><Heart size={19} /></Link>}
            {isCustomer && <Link to="/notifications" aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-50"><Bell size={18} />{unreadNotifications > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white ring-2 ring-white">{unreadNotifications > 99 ? "99+" : unreadNotifications}</span>}</Link>}
            {isCustomer && <Link to="/cart" aria-label={`Cart${cartCount ? `, ${cartCount} items` : ""}`} className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-50"><ShoppingCart size={19} />{cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">{cartCount > 99 ? "99+" : cartCount}</span>}</Link>}

            {isAdmin && <Link to="/admin" aria-label="Admin panel" className="hidden h-9 w-9 items-center justify-center rounded-lg text-indigo-600 hover:bg-indigo-50 sm:flex"><LayoutDashboard size={18} /></Link>}
            {isSuperAdmin && <Link to="/superadmin" aria-label="Super admin panel" className="hidden h-9 w-9 items-center justify-center rounded-lg text-indigo-600 hover:bg-indigo-50 sm:flex"><ShieldCheck size={18} /></Link>}

            {user ? <div className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-2 sm:ml-2 sm:pl-3">
              <Link to="/profile" className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition hover:bg-slate-50">
                {user.profileImage ? <img src={user.profileImage} alt={user.name} className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600"><UserRound size={18} /></span>}
                <span className="hidden max-w-24 truncate text-xs font-semibold text-slate-700 xl:block">{user.name}</span>
                <ChevronDown size={13} className="hidden text-slate-400 sm:block" />
              </Link>
              <button type="button" onClick={handleLogout} aria-label="Logout" className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 sm:flex"><LogOut size={17} /></button>
            </div> : <Link to="/auth/login" className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-600">Login</Link>}
          </div>
        </nav>
      </header>
      <main className="w-full"><Outlet /></main>
    </div>
  );
}

export default Navbar;
