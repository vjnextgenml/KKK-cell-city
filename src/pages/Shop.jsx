// @ts-check
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownUp,
  Search,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { formatINR, products } from "../data/products";

/**
 * @param {{
 *   cartCount: number;
 * }} props
 */
export default function Shop({
  cartCount,
}) {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sort, setSort] = useState("popular");
  const [activeProduct, setActiveProduct] = useState(
    /** @type {import("../data/products").Product | null} */ (null),
  );

  useEffect(() => {
    setSearch(searchParams.get("q") ?? "");
  }, [searchParams]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = `${product.name} ${product.brand} ${product.category ?? ""}`
        .toLowerCase()
        .includes(query);
      return matchesQuery && (!selectedBrand || product.brand === selectedBrand);
    });

    if (sort === "price-low") return filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") return filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [search, selectedBrand, sort]);

  const brands = [...new Set(products.map((product) => product.brand))];

  function clearSearch() {
    setSearch("");
    setSelectedBrand("");
  }

  const productGrid = visibleProducts.length ? (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
      {visibleProducts.map((product) => (
        <ProductCard
          key={product.name}
          product={product}
          onViewDetails={() => setActiveProduct(product)}
          reducedVisual
        />
      ))}
    </div>
  ) : (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 px-6 py-14 text-center backdrop-blur-md">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">
        <Search size={20} />
      </span>
      <h2 className="mt-4 font-semibold text-slate-900">No products found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        Try another search to see more products.
      </p>
      <button
        onClick={clearSearch}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        Clear search <X size={15} />
      </button>
    </div>
  );

  return (
    <div className="light-theme min-h-screen bg-ink text-slate-200">
      <Navbar cartCount={cartCount} />
      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            KKK Cell City catalog
          </p>
          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Find your next favorite.
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Explore our phones and discover your next everyday essential.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 md:flex-row">
          <label className="flex flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10">
            <Search size={18} className="shrink-0 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search phones or brands..."
              aria-label="Search products"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-slate-500 transition hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm">
            <ArrowDownUp size={17} className="shrink-0 text-slate-500" />
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full cursor-pointer appearance-none bg-transparent text-sm text-slate-700 outline-none sm:w-44"
            >
              <option value="popular" className="bg-white text-slate-900">
                Popularity
              </option>
              <option value="price-low" className="bg-white text-slate-900">
                Price: Low to High
              </option>
              <option value="price-high" className="bg-white text-slate-900">
                Price: High to Low
              </option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by phone brand">
          <button
            type="button"
            onClick={() => setSelectedBrand("")}
            aria-pressed={!selectedBrand}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              !selectedBrand
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            All brands
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setSelectedBrand(brand)}
              aria-pressed={selectedBrand === brand}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedBrand === brand
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">
                  {visibleProducts.length}
                </span>{" "}
                {visibleProducts.length === 1 ? "product" : "products"}
              </p>
              {search && (
                <p className="max-w-[60%] truncate text-xs text-slate-500">
                  Results for “{search}”
                </p>
              )}
            </div>
            {productGrid}
        </div>
      </main>
      <Footer />

      {activeProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveProduct(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActiveProduct(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-dialog-title"
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setActiveProduct(null)}
              aria-label="Close product details"
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2
              id="product-dialog-title"
              className="text-2xl font-bold text-white"
            >
              {activeProduct.name}
            </h2>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">
                {formatINR(activeProduct.price)}
              </span>
              {activeProduct.listPrice && (
                <span className="text-sm text-slate-500 line-through">
                  {formatINR(activeProduct.listPrice)}
                </span>
              )}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Find this smartphone at KKK Cell City.
              Visit our Perambalur showroom or contact our team for availability.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
