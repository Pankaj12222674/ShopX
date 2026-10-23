import React, { useEffect, useState } from "react";
import { Layers, Plus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchCategories, resetCategoryStatus } from "../../redux/features/categorySlice";
import AdminSidebar from "../components/AdminSidebar";

function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, isLoading, isError, isSuccess } = useSelector((state) => state.category);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => dispatch(resetCategoryStatus()), 2000);
    return () => clearTimeout(timer);
  }, [dispatch, isSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim()) {
      dispatch(createCategory({ name: name.trim() })).then((result) => {
        if (createCategory.fulfilled.match(result)) setName("");
      });
    }
  };

  const visibleCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Catalog</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Categories</h1>
          <p className="mt-2 text-sm text-slate-500">Create categories that can be assigned to your products.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <form onSubmit={handleSubmit} className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600"><Plus size={20} /></div>
              <div><h2 className="font-bold text-slate-900">New category</h2><p className="text-xs text-slate-500">It will be available in product creation.</p></div>
            </div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="category-name">Category name</label>
            <input id="category-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Electronics" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100" required />
            {isError && <p className="mt-3 text-sm text-red-600">{isError}</p>}
            {isSuccess && <p className="mt-3 text-sm text-emerald-600">Category created successfully.</p>}
            <button disabled={isLoading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60">
              <Plus size={18} /> {isLoading ? "Creating..." : "Create category"}
            </button>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div><h2 className="font-bold text-slate-900">Your categories</h2><p className="text-sm text-slate-500">{categories.length} total categories</p></div>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-slate-400"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="w-32 text-sm text-slate-700 outline-none" /></label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {visibleCategories.map((category) => (
                <div key={category._id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm"><Layers size={19} /></div>
                  <div className="min-w-0"><p className="truncate font-semibold text-slate-800">{category.name}</p><p className="text-xs text-slate-500">Ready for products</p></div>
                </div>
              ))}
              {!isLoading && visibleCategories.length === 0 && <p className="col-span-full py-8 text-center text-sm text-slate-500">No categories found.</p>}
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

export default AdminCategories;
