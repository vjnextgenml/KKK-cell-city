import {
  AlertCircle,
  Boxes,
  CheckCircle2,
  LoaderCircle,
  Package,
  Smartphone,
  Tag,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout, { type AdminSection } from "../admin/components/AdminLayout";
import ProductForm from "../admin/components/ProductForm";
import ProductTable from "../admin/components/ProductTable";
import { adminProductService } from "../admin/productService";
import type {
  Accessory,
  AdminProduct,
  MobilePhone,
  ProductDraft,
} from "../admin/types";
import { formatINR } from "../data/products";

type Notice = { kind: "success" | "error"; message: string };

function isMobilePhone(product: AdminProduct): product is MobilePhone {
  return product.productType === "mobile";
}

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [mobilePhones, setMobilePhones] = useState<MobilePhone[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formKind, setFormKind] = useState<"mobile" | "accessory" | null>(null);
  const [editingProduct, setEditingProduct] = useState<AdminProduct>();
  const [notice, setNotice] = useState<Notice>();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const [phones, accessoryItems] = await Promise.all([
        adminProductService.getMobilePhones(),
        adminProductService.getAccessories(),
      ]);
      setMobilePhones(phones);
      setAccessories(accessoryItems);
    } catch {
      setLoadError("Products could not be loaded. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const allProducts = useMemo(
    () => [...mobilePhones, ...accessories],
    [mobilePhones, accessories],
  );
  const offerCount = allProducts.filter((product) => product.offer.enabled).length;
  const recentProducts = [...allProducts]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 5);

  function openForm(kind: "mobile" | "accessory", product?: AdminProduct) {
    setEditingProduct(product);
    setFormKind(kind);
    setNotice(undefined);
  }

  function closeForm() {
    setEditingProduct(undefined);
    setFormKind(null);
  }

  async function saveProduct(draft: ProductDraft) {
    try {
      if (draft.productType === "mobile") {
        const saved = editingProduct
          ? await adminProductService.updateMobilePhone(editingProduct.id, draft)
          : await adminProductService.createMobilePhone(draft);
        if (!saved) throw new Error("Mobile phone no longer exists.");
        setMobilePhones(await adminProductService.getMobilePhones());
      } else {
        const saved = editingProduct
          ? await adminProductService.updateAccessory(editingProduct.id, draft)
          : await adminProductService.createAccessory(draft);
        if (!saved) throw new Error("Accessory no longer exists.");
        setAccessories(await adminProductService.getAccessories());
      }
      setNotice({
        kind: "success",
        message: editingProduct ? "Product updated in this session." : "Product added in this session.",
      });
      closeForm();
    } catch {
      setNotice({ kind: "error", message: "The product could not be saved. Please try again." });
    }
  }

  async function deleteProduct(product: AdminProduct) {
    if (!window.confirm(`Delete “${product.name}” from this session’s product list?`)) return;
    try {
      if (isMobilePhone(product)) {
        await adminProductService.deleteMobilePhone(product.id);
        setMobilePhones(await adminProductService.getMobilePhones());
      } else {
        await adminProductService.deleteAccessory(product.id);
        setAccessories(await adminProductService.getAccessories());
      }
      setNotice({ kind: "success", message: "Product deleted from this session." });
    } catch {
      setNotice({ kind: "error", message: "The product could not be deleted. Please try again." });
    }
  }

  return (
    <AdminLayout activeSection={section} onNavigate={setSection}>
      {notice && (
        <div
          role={notice.kind === "error" ? "alert" : "status"}
          className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
            notice.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {notice.kind === "success" ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
          {notice.message}
          <button type="button" onClick={() => setNotice(undefined)} className="ml-auto font-semibold">Dismiss</button>
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-600" role="status">
          <LoaderCircle size={20} className="animate-spin text-blue-700" />
          Loading product data…
        </div>
      ) : loadError ? (
        <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center">
          <AlertCircle size={26} className="mx-auto text-rose-600" />
          <p className="mt-3 font-semibold text-slate-900">{loadError}</p>
          <button type="button" onClick={() => void loadProducts()} className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
            Retry
          </button>
        </div>
      ) : section === "mobile" ? (
        <ProductTable
          kind="mobile"
          products={mobilePhones}
          onAdd={() => openForm("mobile")}
          onEdit={(product) => openForm("mobile", product)}
          onDelete={(product) => void deleteProduct(product)}
        />
      ) : section === "accessories" ? (
        <ProductTable
          kind="accessory"
          products={accessories}
          onAdd={() => openForm("accessory")}
          onEdit={(product) => openForm("accessory", product)}
          onDelete={(product) => void deleteProduct(product)}
        />
      ) : (
        <section className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Store overview</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Dashboard</h2>
            <p className="mt-1 text-sm text-slate-500">A summary of the current in-memory catalog.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard icon={Smartphone} label="Total Mobile Phones" value={mobilePhones.length} />
            <SummaryCard icon={Boxes} label="Total Accessories" value={accessories.length} />
            <SummaryCard icon={Package} label="Total Products" value={allProducts.length} />
            <SummaryCard icon={Tag} label="Products with Offers" value={offerCount} />
          </div>
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="font-semibold text-slate-900">Recent product activity</h3>
              <p className="mt-1 text-xs text-slate-500">Current catalog entries and temporary session edits.</p>
            </div>
            {recentProducts.length ? (
              <div className="divide-y divide-slate-100">
                {recentProducts.map((product) => (
                  <div key={`${product.productType}-${product.id}`} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                      {product.images[0] ? (
                        <img src={product.images[0].src} alt="" className="h-full w-full object-contain" />
                      ) : (
                        <Package size={17} className="text-slate-400" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.category} · {product.availability}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{formatINR(product.price)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="px-5 py-8 text-center text-sm text-slate-500">No catalog entries to display.</p>
            )}
          </section>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setSection("mobile")} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-blue-200">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Smartphone size={17} className="text-blue-700" /> Manage mobile phones</span>
              <span className="mt-1 block pl-6 text-xs text-slate-500">Add, edit, filter, or remove mobile phone listings.</span>
            </button>
            <button type="button" onClick={() => setSection("accessories")} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-blue-200">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Boxes size={17} className="text-blue-700" /> Manage accessories</span>
              <span className="mt-1 block pl-6 text-xs text-slate-500">Manage listings in existing accessory categories.</span>
            </button>
          </div>
        </section>
      )}

      {formKind && (
        <ProductForm
          key={`${formKind}-${editingProduct?.id ?? "new"}`}
          kind={formKind}
          product={editingProduct}
          onCancel={closeForm}
          onSave={(draft) => void saveProduct(draft)}
        />
      )}
    </AdminLayout>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Smartphone;
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icon size={19} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
