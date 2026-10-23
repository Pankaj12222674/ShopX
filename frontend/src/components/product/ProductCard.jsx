import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <Link to={`/products/${product._id}`} className="flex h-56 items-center justify-center bg-slate-100">
      {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <span className="text-sm text-slate-400">No image</span>}
    </Link>
    <div className="p-4"><p className="text-xs text-purple-600">{product.category?.name || "ShopX product"}</p><Link to={`/products/${product._id}`}><h2 className="mt-1 truncate font-semibold text-slate-800">{product.name}</h2></Link><div className="mt-4 flex items-center justify-between gap-3"><span className="text-lg font-bold text-slate-900">₹{Number(product.price).toLocaleString("en-IN")}</span><button type="button" onClick={() => dispatch(addToCart({ productId: product._id }))} className="flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white hover:bg-purple-700"><ShoppingCart size={15} /> Add</button></div></div>
  </article>;
}
export default ProductCard;
