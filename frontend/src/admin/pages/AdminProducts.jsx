import React, { useEffect, useState } from "react";
import { ImagePlus, Package, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/features/categorySlice";
import { createProduct, fetchAllProduct } from "../../redux/features/productSlice";
import AdminSidebar from "../components/AdminSidebar";

const emptyForm = { name: "", description: "", category: "", price: "", stock: "", image: null };

function AdminProducts() {
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const chooseImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      return;
    }
    setForm((current) => ({ ...current, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setPreview("");
    setShowForm(false);
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    if (!form.image || !form.category) return;
    const productData = new FormData();
    Object.entries(form).forEach(([key, value]) => productData.append(key, value));
    const result = await dispatch(createProduct(productData));
    if (createProduct.fulfilled.match(result)) {
      resetForm();
      dispatch(fetchAllProduct());
    }
  };

  const visibleProducts = products.filter((product) => {
    if (!selectedCategory) return true;
    return (product.category?._id || product.category) === selectedCategory;
  });

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-purple-600">Catalog</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Products</h1><p className="mt-2 text-sm text-slate-500">Add products with a real image upload and category.</p></div>
          <button onClick={() => setShowForm((current) => !current)} className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700"><Plus size={19} /> {showForm ? "Close form" : "Add product"}</button>
        </header>

        {showForm && (
          <form onSubmit={submitProduct} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div><h2 className="text-lg font-bold text-slate-900">Create product</h2><p className="mt-1 text-sm text-slate-500">Upload a JPG, PNG, or WebP image up to 5 MB.</p></div>
            <div className="grid gap-5 md:grid-cols-2">
              <input name="name" value={form.name} onChange={updateField} placeholder="Product name" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100" required />
              <select name="category" value={form.category} onChange={updateField} className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100" required><option value="">Select category</option>{categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}</select>
              <input type="number" name="price" value={form.price} onChange={updateField} min="0.01" step="0.01" placeholder="Price (₹)" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500" required />
              <input type="number" name="stock" value={form.stock} onChange={updateField} min="0" step="1" placeholder="Stock quantity" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500" required />
            </div>
            <textarea name="description" value={form.description} onChange={updateField} rows="3" placeholder="Product description" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500" required />
            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-purple-400 hover:bg-purple-50">
              {preview ? <img src={preview} alt="Product preview" className="h-40 w-full rounded-xl object-contain" /> : <><ImagePlus size={30} className="text-purple-500" /><span className="mt-2 font-semibold text-slate-700">Click to upload product image</span><span className="mt-1 text-xs text-slate-500">PNG, JPG or WebP · max 5 MB</span></>}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} className="hidden" required={!form.image} />
            </label>
            {isError && <p className="text-sm text-red-600">{isError}</p>}
            <div className="flex justify-end gap-3"><button type="button" onClick={resetForm} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button disabled={isLoading || categories.length === 0} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60">{isLoading ? "Saving..." : "Create product"}</button></div>
          </form>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div><h2 className="font-bold text-slate-900">Product inventory</h2><p className="text-sm text-slate-500">{visibleProducts.length} of {products.length} products</p></div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="whitespace-nowrap">Category</span>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100">
                <option value="">All categories</option>
                {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => <article key={product._id} className="overflow-hidden rounded-2xl border border-slate-100"><div className="flex h-44 items-center justify-center bg-slate-100">{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <Package className="text-slate-400" size={35} />}</div><div className="p-4"><h3 className="font-semibold text-slate-800">{product.name}</h3><p className="mt-1 text-sm text-slate-500">{product.category?.name || "Uncategorized"}</p><div className="mt-3 flex justify-between text-sm"><span className="font-bold text-purple-600">₹{Number(product.price).toLocaleString("en-IN")}</span><span className={product.stock ? "text-emerald-600" : "text-red-600"}>{product.stock} in stock</span></div></div></article>)}
            {!isLoading && visibleProducts.length === 0 && <p className="col-span-full py-8 text-center text-sm text-slate-500">No products found.</p>}
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

export default AdminProducts;
