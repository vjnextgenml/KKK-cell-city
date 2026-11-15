import { ChevronDown, Edit2, PackageOpen, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { Accessory, AdminProduct, MobilePhone, ProductAvailability } from "../types";
import { accessoryCategories } from "../types";
import { formatINR } from "../../data/products";

type ProductTableProps = {
  kind: "mobile" | "accessory";
  products: Array<MobilePhone | Accessory>;
  onAdd: () => void;
  onEdit: (product: AdminProduct) => void;
  onDelete: (product: AdminProduct) => void;
};

const availabilityOptions: ProductAvailability[] = [
  "In stock",
  "Out of stock",
  "Pre-order",
  "Unknown",
];

type FilterOption = {
  label: string;
  value: string;
};

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [opensAbove, setOpensAbove] = useState(false);
  const [maxHeight, setMaxHeight] = useState(240);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const selectedIndex = Math.max(
      options.findIndex((option) => option.value === value),
      0,
    );
    optionRefs.current[selectedIndex]?.focus();
  }, [isOpen, options, value]);

  function openMenu() {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const bounds = trigger.getBoundingClientRect();
    const desiredHeight = Math.min(240, options.length * 40);
    const spaceBelow = window.innerHeight - bounds.bottom - 8;
    const spaceAbove = bounds.top - 8;
    const openUp = spaceBelow < desiredHeight && spaceAbove > spaceBelow;

    setOpensAbove(openUp);
    setMaxHeight(Math.max(0, Math.min(desiredHeight, openUp ? spaceAbove : spaceBelow)));
    setIsOpen(true);
  }

  function handleOptionKeyDown(
    index: number,
    event: KeyboardEvent<HTMLButtonElement>,
  ) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + options.length) % options.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = options.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div ref={containerRef} className="relative min-w-0">
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
            event.preventDefault();
            openMenu();
          } else if (isOpen && event.key === "Escape") {
            setIsOpen(false);
          }
        }}
        className="admin-input flex items-center justify-between gap-2 text-left"
      >
        <span className="min-w-0 truncate">{selectedOption?.label ?? ""}</span>
        <ChevronDown size={16} className="shrink-0 text-slate-500" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          style={{ maxHeight }}
          className={`absolute left-0 z-50 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg ${
            opensAbove ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={value === option.value}
              tabIndex={0}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              onKeyDown={(event) => handleOptionKeyDown(index, event)}
              className={`w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                value === option.value
                  ? "bg-blue-50 font-semibold text-blue-800"
                  : "text-slate-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductTable({
  kind,
  products,
  onAdd,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = `${product.name} ${product.brand} ${product.category}`
        .toLowerCase()
        .includes(query);
      return (
        matchesQuery &&
        (kind === "mobile" || !category || product.category === category) &&
        (!availability || product.availability === availability)
      );
    });
  }, [kind, products, search, category, availability]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            {kind === "mobile" ? "Mobile phones" : "Accessories"}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Manage {kind === "mobile" ? "mobile phones" : "accessories"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {products.length} item{products.length === 1 ? "" : "s"} · temporary in-memory data
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          <Plus size={17} /> Add {kind === "mobile" ? "mobile phone" : "accessory"}
        </button>
      </div>

      <div
        className={`grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${
          kind === "mobile"
            ? "md:grid-cols-[minmax(220px,1fr)_180px]"
            : "md:grid-cols-[minmax(220px,1fr)_200px_180px]"
        }`}
      >
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or brand"
            className="admin-input pl-10"
          />
        </label>
        {kind === "accessory" && (
          <FilterDropdown
            label="Filter by category"
            value={category}
            options={[
              { label: "All categories", value: "" },
              ...accessoryCategories.map((item) => ({ label: item, value: item })),
            ]}
            onChange={setCategory}
          />
        )}
        <FilterDropdown
          label="Filter by availability"
          value={availability}
          options={[
            { label: "All availability", value: "" },
            ...availabilityOptions.map((item) => ({ label: item, value: item })),
          ]}
          onChange={setAvailability}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {visibleProducts.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Offer</th>
                    <th className="px-4 py-3 font-semibold">Availability</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleProducts.map((product) => (
                    <tr key={product.id} className="align-middle">
                      <td className="px-4 py-3">
                        <div className="flex min-w-48 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                            {product.images[0] ? (
                              <img src={product.images[0].src} alt="" className="h-full w-full object-contain" />
                            ) : (
                              <PackageOpen size={18} className="text-slate-400" aria-hidden="true" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{product.category}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{formatINR(product.price)}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.offer.enabled ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          {product.offer.enabled ? product.offer.label || "Offer" : "No offer"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{product.availability}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => onEdit(product)}
                            aria-label={`Edit ${product.name}`}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Edit2 size={16} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(product)}
                            aria-label={`Delete ${product.name}`}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              Showing {visibleProducts.length} of {products.length} products
            </p>
          </>
        ) : (
          <div className="px-6 py-14 text-center">
            <PackageOpen size={28} className="mx-auto text-slate-400" aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-slate-900">
              {products.length ? "No products match these filters" : "No products yet"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {products.length ? "Try changing the search or filters." : "Add a product to get started."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
