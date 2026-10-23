import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart3,
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  UserPlus,
  Users,
} from "lucide-react";
import { logout } from "../../redux/features/authSlice";

const workspaceLinks = [
  ["", "Dashboard", LayoutDashboard],
  ["users", "Users", Users],
  ["admins", "Admins", Shield],
  ["create-admin", "Create admin", UserPlus],
  ["products", "Products", Package],
  ["orders", "Orders", ClipboardList],
  ["reports", "Reports", FileText],
  ["activity", "Activity", BarChart3],
];

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <aside className="relative z-10 flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 p-3 text-slate-100 shadow-xl shadow-slate-900/20 lg:sticky lg:top-0 lg:min-h-[calc(100vh-121px)] lg:w-64 lg:rounded-none lg:rounded-r-2xl lg:p-4">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden="true" />

      <div className="relative mb-4 flex items-center gap-3 border-b border-white/10 px-2 pb-4">
        <div className="relative shrink-0">
          {user?.profileImage ? <img src={user.profileImage} alt={user.name || "Super Admin"} className="h-11 w-11 rounded-2xl object-cover shadow-lg shadow-orange-950/30 ring-2 ring-white/10" /> : <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-xl shadow-lg shadow-orange-950/30">♛</div>}
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-slate-900 bg-emerald-400" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-base font-extrabold tracking-tight text-white">{user?.name || "Super Admin"}</h2>
          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />Full access</p>
        </div>
      </div>

      <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
      <nav className="grid grid-cols-2 gap-1.5 pr-1 sm:grid-cols-3 lg:block lg:flex-1 lg:space-y-1">
        {workspaceLinks.map(([to, label, Icon]) => (
          <NavLink
            end={!to}
            key={label}
            to={`/superadmin/${to}`}
            className={({ isActive }) => `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all lg:text-sm ${isActive ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-950/30" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-300"} />
                <span className="truncate">{label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto hidden lg:block" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 hidden rounded-2xl border border-white/10 bg-white/5 p-4 lg:block">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
            <ShoppingBag size={17} />
          </div>
          <span className="text-sm font-semibold text-white">ShopX Store</span>
        </div>
        <p className="mb-4 text-xs leading-5 text-slate-400">
          Review the customer storefront and platform experience.
        </p>
        <NavLink
          to="/"
          className="flex items-center justify-center rounded-lg border border-slate-700 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
        >
          Visit Store
        </NavLink>
      </div>

      <div className="mt-4 hidden border-t border-white/10 pt-3 lg:block">
        <NavLink to="/superadmin/profile" className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/8 hover:text-white"}`}>
          <Settings size={17} className="text-slate-500 group-hover:text-indigo-300" />
          Profile settings
        </NavLink>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/5 p-2">
          {user?.profileImage ? <img src={user.profileImage} alt={user.name || "Super Admin"} className="h-8 w-8 rounded-full object-cover" /> : <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold">{user?.name?.charAt(0).toUpperCase() || "S"}</div>}
          <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-white">{user?.name || "Super Admin"}</p><p className="truncate text-[10px] text-slate-500">{user?.email || "Full access"}</p></div>
          <button type="button" onClick={handleLogout} aria-label="Logout" className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-500/15 hover:text-rose-300"><LogOut size={15} /></button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
