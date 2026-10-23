import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, ArrowRight, IndianRupee, Package, Plus, ShoppingCart, Users } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import StatCard from "../components/StatCard";
import SalesOverview from "../components/SalesOverview";
import OrderStatus from "../components/OrderStatus";
import RecentOrders from "../components/RecentOrders";
import TopSellingProducts from "../components/TopSellingProducts";
import { fetchAllOrders } from "../../redux/features/orderSlice";
import { fetchAllProduct } from "../../redux/features/productSlice";
import { fetchCustomers } from "../../redux/features/customerSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading: ordersLoading, isError: ordersError } = useSelector((state) => state.order);
  const { products, isLoading: productsLoading, isError: productsError } = useSelector((state) => state.product);
  const { customers } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllProduct());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const revenue = orders.reduce((total, order) => order.orderStatus === "cancelled" ? total : total + Number(order.totalAmount || 0), 0);
  const lowStockProducts = useMemo(() => products.filter((product) => Number(product.stock || 0) < 10).slice(0, 5), [products]);
  const error = ordersError || productsError;

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="mx-auto flex max-w-[1600px]">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <section className="mb-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_265px]">
            <div className="relative min-h-[170px] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-violet-100 to-blue-100 p-6 sm:p-8">
              <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/45 blur-2xl" />
              <div className="relative max-w-lg">
                <p className="text-xs font-semibold text-indigo-800">Welcome back, {user?.name?.split(" ")[0] || "Admin"}! 👋</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">Manage Your Store<br /><span className="text-indigo-600">With Ease</span></h1>
                <p className="mt-2 max-w-md text-xs leading-5 text-slate-600">Add products, manage orders, handle customers and grow your business.</p>
                <Link to="/admin/products" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"><Plus size={15} /> Add new product</Link>
              </div>
              <div className="absolute bottom-3 right-10 hidden text-7xl opacity-70 sm:block">🛍️</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-black text-slate-900">Today&apos;s overview</h2><span className="rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">Live</span></div><div className="mt-5 grid grid-cols-2 gap-4"><div><p className="text-xl font-black text-slate-900">₹{revenue.toLocaleString("en-IN")}</p><p className="text-[11px] text-slate-500">Today&apos;s sales</p></div><div><p className="text-xl font-black text-slate-900">{orders.length}</p><p className="text-[11px] text-slate-500">Total orders</p></div><div><p className="text-xl font-black text-slate-900">{customers.length}</p><p className="text-[11px] text-slate-500">Customers</p></div><div><p className="text-xl font-black text-slate-900">{lowStockProducts.length}</p><p className="text-[11px] text-slate-500">Low stock items</p></div></div></div>
          </section>

          {error && <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"><AlertCircle size={17} />{error}</div>}

          <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
            <StatCard title="Total products" value={products.length.toLocaleString("en-IN")} icon={Package} color="blue" change="Live" />
            <StatCard title="Total orders" value={orders.length.toLocaleString("en-IN")} icon={ShoppingCart} color="orange" change="Live" />
            <StatCard title="Total customers" value={customers.length.toLocaleString("en-IN")} icon={Users} color="purple" change="Live" />
            <StatCard title="Total revenue" value={`₹${revenue.toLocaleString("en-IN")}`} icon={IndianRupee} color="pink" change="Live" />
          </section>

          <section className="mb-5 grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.8fr)]">
            <SalesOverview orders={orders} />
            <OrderStatus orders={orders} />
          </section>

          <section className="mb-5 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.7fr)]">
            <RecentOrders orders={orders} loading={ordersLoading} />
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="font-black text-slate-900">Low stock products</h2><Link to="/admin/products" className="text-xs font-bold text-indigo-600">View all →</Link></div><div className="space-y-3">{lowStockProducts.map((product) => <div key={product._id} className="flex items-center gap-3 rounded-xl bg-rose-50/50 p-2"><div className="h-10 w-10 overflow-hidden rounded-lg bg-slate-100">{product.image && <img src={product.image} alt={product.name} className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-700">{product.name}</p><p className="text-[11px] text-rose-500">Only {product.stock || 0} left</p></div></div>)}{!lowStockProducts.length && <p className="text-sm text-slate-500">Inventory is healthy.</p>}</div></div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
            <TopSellingProducts products={products} orders={orders} loading={productsLoading} />
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><h2 className="font-black text-slate-900">Quick actions</h2><div className="mt-4 grid grid-cols-2 gap-2">{[["Add product", "/admin/products", Package], ["Add category", "/admin/categories", Plus], ["Manage orders", "/admin/orders", ShoppingCart], ["View customers", "/admin/customers", Users]].map(([label, href, Icon]) => <Link key={label} to={href} className="rounded-xl bg-slate-50 p-3 text-center transition hover:bg-indigo-50"><Icon size={18} className="mx-auto text-indigo-600" /><p className="mt-2 text-[10px] font-bold text-slate-600">{label}</p></Link>)}</div><Link to="/admin/settings" className="mt-4 flex items-center justify-center gap-1 text-xs font-bold text-indigo-600">Store settings <ArrowRight size={13} /></Link></div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
