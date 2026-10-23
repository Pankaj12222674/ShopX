import React from "react";
function ProductFilters({ categories, categoryValue, onCategoryChange, priceValue, onPriceChange }) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 sm:w-fit">
        <span className="whitespace-nowrap">Category</span>
        <select
          value={categoryValue}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="min-w-40 bg-transparent text-slate-700 outline-none"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 sm:w-fit">
        <span className="whitespace-nowrap">Price</span>
        <select
          value={priceValue}
          onChange={(event) => onPriceChange(event.target.value)}
          className="min-w-40 bg-transparent text-slate-700 outline-none"
        >
          <option value="">Any price</option>
          <option value="under-1000">Under ₹1,000</option>
          <option value="1000-10000">₹1,000 - ₹10,000</option>
          <option value="10000-50000">₹10,000 - ₹50,000</option>
          <option value="over-50000">Above ₹50,000</option>
        </select>
      </label>
    </div>
  );
}
export default ProductFilters;
