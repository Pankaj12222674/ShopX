
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ShoppingBag,
  ChevronLeft,
  UserRound,
} from "lucide-react";

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Categories", path: "/admin/categories", icon: Layers },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <aside className="sticky top-0 flex min-h-screen w-64 shrink-0 flex-col bg-[#101b31] px-4 py-6 text-white shadow-xl shadow-slate-900/10">
      {/* Brand */}
      <NavLink to="/admin" className="group mb-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3.5 shadow-inner shadow-white/[0.03] transition hover:bg-white/[0.1]">
        <div className="relative shrink-0">
          {user?.profileImage ? <img src={user.profileImage} alt={user.name} className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/10" /> : <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 text-orange-700 ring-2 ring-white/10"><UserRound size={24} strokeWidth={2.2} /></div>}
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#101b31] bg-emerald-400" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-extrabold tracking-tight text-white">{user?.name || "Admin"}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Store Manager</p>
        </div>
        <ChevronLeft size={15} className="ml-auto rotate-180 text-slate-500 transition group-hover:text-slate-300" />
      </NavLink>

      {/* Navigation */}
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Main menu
      </p>

      <nav className="flex-1 space-y-1">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-950/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={19} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom card */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
            <ShoppingBag size={17} />
          </div>
          <span className="text-sm font-semibold">ShopX Store</span>
        </div>

        <p className="mb-4 text-xs leading-5 text-slate-400">
          Manage your products and keep your store running smoothly.
        </p>

        <NavLink
          to="/"
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
        >
          <ChevronLeft size={16} />
          Visit Store
        </NavLink>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
