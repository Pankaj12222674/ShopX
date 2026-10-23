import React from "react";
import ProductCard from "./ProductCard";
function ProductGrid({ products }) { return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>; }
export default ProductGrid;
