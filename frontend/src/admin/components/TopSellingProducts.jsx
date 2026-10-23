
import React from "react";
import { ArrowRight, Package, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

function TopSellingProducts({ products = [], orders = [], loading = false }) {
  const soldByProduct = orders.flatMap((order) => order.items || []).reduce((totals, item) => {
    const id = item.productId?._id || item.productId;
    totals[id] = (totals[id] || 0) + Number(item.quantity || 0);
    return totals;
  }, {});
  const topProducts = [...products]
    .map((product) => ({ ...product, sold: soldByProduct[product._id] || 0 }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Top Selling Products
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your most popular products
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
          <TrendingUp size={22} />
        </div>
      </div>

      {/* Product List */}
      <div className="mt-5 divide-y divide-gray-100">
        {loading && <p className="py-6 text-center text-sm text-gray-500">Loading products...</p>}
        {!loading && topProducts.length === 0 && <p className="py-6 text-center text-sm text-gray-500">No products yet.</p>}
        {!loading && topProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-3 py-4 first:pt-0 last:pb-0 sm:gap-4"
          >
            {/* Rank */}
            <span className="w-5 shrink-0 text-sm font-bold text-gray-400">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Image */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package size={24} className="text-gray-400" />
              )}
            </div>

            {/* Details */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {product.category?.name || "Uncategorized"}
              </p>

              <p className="mt-1 text-xs font-medium text-purple-600">
                {product.sold} sold
              </p>
            </div>

            {/* Price and Stock */}
            <div className="shrink-0 text-right">
              <p className="text-sm font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                  product.stock === 0
                    ? "bg-red-50 text-red-600"
                    : product.stock < 15
                      ? "bg-amber-50 text-amber-600"
                      : "bg-green-50 text-green-600"
                }`}
              >
                {product.stock === 0
                  ? "Out of stock"
                  : product.stock < 15
                    ? "Low stock"
                    : "In stock"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Link
        to="/admin/products"
        className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-purple-600 transition hover:border-purple-200 hover:bg-purple-50"
      >
        View All Products
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}

export default TopSellingProducts;
