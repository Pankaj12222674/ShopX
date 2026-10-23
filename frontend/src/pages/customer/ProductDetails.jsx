import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/features/productSlice";
import { addToCart } from "../../redux/features/cartSlice";
import Loader from "../../components/common/Loader";
function ProductDetails() { const { id } = useParams(); const dispatch = useDispatch(); const { product, isLoading } = useSelector((state) => state.product); useEffect(() => { dispatch(fetchProductById(id)); }, [dispatch, id]); if (isLoading || !product) return <Loader />; return <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 sm:px-8"><div className="flex min-h-96 items-center justify-center rounded-2xl bg-slate-100">{product.image && <img src={product.image} alt={product.name} className="max-h-96 w-full object-contain" />}</div><div className="py-4"><p className="text-sm text-purple-600">{product.category?.name}</p><h1 className="mt-2 text-4xl font-bold text-slate-900">{product.name}</h1><p className="mt-5 text-3xl font-bold">₹{Number(product.price).toLocaleString("en-IN")}</p><p className="mt-5 leading-7 text-slate-600">{product.description}</p><p className="mt-4 text-sm text-slate-500">{product.stock} available</p><button onClick={() => dispatch(addToCart({ productId: product._id }))} className="mt-8 flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"><ShoppingCart size={18} /> Add to cart</button></div></main>; }
export default ProductDetails;
