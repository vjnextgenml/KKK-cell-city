import { X } from "lucide-react";
import { useState, type FormEvent } from "react";
import ImageUpload from "./ImageUpload";
import SpecificationEditor from "./SpecificationEditor";
import { validateProduct } from "../validation";
import {
  getAccessoryTypes,
  getAdditionalSpecifications,
  getDefaultSpecifications,
  switchAccessorySpecifications,
} from "../specificationDefaults";
import {
  accessoryCategories,
  type AccessoryDraft,
  type AccessoryType,
  type AdminProduct,
  type ProductAvailability,
  type ProductDraft,
  type ProductImage,
  type ProductSpecification,
} from "../types";

type ProductFormProps = {
  kind: "mobile" | "accessory";
  product?: AdminProduct;
  onCancel: () => void;
  onSave: (draft: ProductDraft) => void;
};

function createDraft(kind: ProductFormProps["kind"]): ProductDraft {
  const common = {
    name: "",
    brand: "",
    price: 0,
    offer: { enabled: false, label: "" },
    availability: "Unknown" as ProductAvailability,
    description: "",
  };
  if (kind === "mobile") {
    const specifications = getDefaultSpecifications("mobile", "Smartphones");
    return {
      ...common,
      productType: "mobile",
      model: "",
      category: "Smartphones",
      specifications,
      images: [null, null, null],
    };
  }
  const category = accessoryCategories[0];
  const accessoryType = getAccessoryTypes(category)[0];
  return {
    ...common,
    productType: "accessory",
    category,
    accessoryType,
    specifications: getDefaultSpecifications("accessory", category, accessoryType),
    images: [null],
  };
}

function initializeDraft(
  kind: ProductFormProps["kind"],
  product?: AdminProduct,
): ProductDraft {
  if (!product) return createDraft(kind);
  const clone = structuredClone(product);
  const existingDefaultSpecifications = clone.specifications.filter(
    (specification) => specification.isDefault === true,
  );
  const defaultSpecifications = existingDefaultSpecifications.length
    ? existingDefaultSpecifications
    : getDefaultSpecifications(
        clone.productType,
        clone.category,
        clone.productType === "accessory" ? clone.accessoryType : undefined,
        clone.specifications,
      );
  const defaultNames = new Set(defaultSpecifications.map(({ name }) => name));
  const additionalSpecifications = clone.specifications.filter(
    (specification) =>
      specification.isDefault === false ||
      (specification.isDefault !== true && !defaultNames.has(specification.name)),
  );
  return {
    ...clone,
    specifications: [
      ...defaultSpecifications.map((specification) => ({
        ...specification,
        isDefault: true,
      })),
      ...additionalSpecifications.map((specification) => ({
        ...specification,
        isDefault: false,
      })),
    ],
  };
}

const inputClass = "admin-input";

export default function ProductForm({
  kind,
  product,
  onCancel,
  onSave,
}: ProductFormProps) {
  const [draft, setDraft] = useState<ProductDraft>(() => initializeDraft(kind, product));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isMobile = draft.productType === "mobile";
  const defaultSpecifications = draft.specifications.filter(
    (specification) => specification.isDefault === true,
  );
  const additionalSpecifications = getAdditionalSpecifications(
    draft.specifications,
    draft.productType,
    draft.category,
    draft.productType === "accessory" ? draft.accessoryType : undefined,
  );

  function updateField<K extends keyof ProductDraft>(field: K, value: ProductDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }) as ProductDraft);
  }

  function updateImage(index: number, image: ProductImage | null) {
    setDraft((current) => {
      if (current.productType === "mobile") {
        const images = [...current.images] as typeof current.images;
        images[index] = image;
        return { ...current, images };
      }
      return { ...current, images: [image] };
    });
  }

  function updateSpecifications(
    defaults: ProductSpecification[],
    additional: ProductSpecification[],
  ) {
    setDraft((current) => ({
      ...current,
      specifications: [...defaults, ...additional],
    }) as ProductDraft);
  }

  function changeAccessorySelection(
    category: AccessoryDraft["category"],
    accessoryType: AccessoryType,
  ) {
    setDraft((current) => {
      if (current.productType !== "accessory") return current;
      const specifications = switchAccessorySpecifications(
        current.specifications,
        current.category,
        current.accessoryType,
        category,
        accessoryType,
      );
      return {
        ...current,
        category,
        accessoryType,
        specifications,
      };
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateProduct(draft);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    onSave(draft);
  }

  const productTitle = isMobile ? "mobile phone" : "accessory";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
        className="flex max-h-[96dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              {product ? "Edit product" : "New product"}
            </p>
            <h2 id="product-form-title" className="mt-1 text-xl font-bold text-slate-900">
              {product ? "Update" : "Add"} {productTitle}
            </h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <X size={19} />
          </button>
        </header>

        <form onSubmit={submit} className="min-h-0 overflow-y-auto">
          <div className="space-y-7 px-5 py-5 sm:px-7">
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Basic information</h3>
                <p className="mt-1 text-xs text-slate-500">Product edits are temporary and will reset when this app is refreshed.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Product name
                  <input
                    value={draft.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className={`${inputClass} mt-1.5`}
                  />
                  {errors.name && <span className="mt-1 block text-xs text-rose-600">{errors.name}</span>}
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Brand
                  <input
                    value={draft.brand}
                    onChange={(event) => updateField("brand", event.target.value)}
                    className={`${inputClass} mt-1.5`}
                  />
                  {errors.brand && <span className="mt-1 block text-xs text-rose-600">{errors.brand}</span>}
                </label>
                {isMobile && (
                  <label className="block text-sm font-medium text-slate-700">
                    Model
                    <input
                      value={draft.model}
                      onChange={(event) =>
                        setDraft((current) =>
                          current.productType === "mobile"
                            ? { ...current, model: event.target.value }
                            : current,
                        )
                      }
                      className={`${inputClass} mt-1.5`}
                    />
                  </label>
                )}
                {!isMobile && (
                  <label className="block text-sm font-medium text-slate-700">
                    Category
                    <select
                      value={draft.category}
                      onChange={(event) =>
                        changeAccessorySelection(
                          event.target.value as AccessoryDraft["category"],
                          getAccessoryTypes(event.target.value)[0],
                        )
                      }
                      className={`${inputClass} mt-1.5`}
                    >
                      {accessoryCategories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                    {errors.category && <span className="mt-1 block text-xs text-rose-600">{errors.category}</span>}
                  </label>
                )}
                {!isMobile && draft.productType === "accessory" && (
                  <label className="block text-sm font-medium text-slate-700">
                    Product type
                    <select
                      value={draft.accessoryType}
                      onChange={(event) =>
                        changeAccessorySelection(
                          draft.category,
                          event.target.value as AccessoryType,
                        )
                      }
                      className={`${inputClass} mt-1.5`}
                    >
                      {getAccessoryTypes(draft.category).map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                )}
                <label className="block text-sm font-medium text-slate-700">
                  {draft.offer.enabled ? "Offer price" : "Price"}
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={Number.isFinite(draft.price) ? draft.price : ""}
                    onChange={(event) => updateField("price", Number(event.target.value))}
                    className={`${inputClass} mt-1.5`}
                  />
                  {errors.price && <span className="mt-1 block text-xs text-rose-600">{errors.price}</span>}
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Availability
                  <select
                    value={draft.availability}
                    onChange={(event) => updateField("availability", event.target.value as ProductAvailability)}
                    className={`${inputClass} mt-1.5`}
                  >
                    {(["In stock", "Out of stock", "Pre-order", "Unknown"] as const).map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                Description
                <textarea
                  value={draft.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  rows={3}
                  className={`${inputClass} mt-1.5 resize-y`}
                  placeholder="Optional product description"
                />
              </label>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Offer</h3>
                  <p className="mt-1 text-xs text-slate-500">The price above becomes the offer price when enabled.</p>
                </div>
                <label className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={draft.offer.enabled}
                    onChange={(event) =>
                      updateField("offer", { ...draft.offer, enabled: event.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                  />
                  Enabled
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Original price
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={draft.offer.originalPrice ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      updateField("offer", {
                        ...draft.offer,
                        originalPrice: value === "" ? undefined : Number(value),
                      });
                    }}
                    className={`${inputClass} mt-1.5`}
                  />
                  {errors.originalPrice && <span className="mt-1 block text-xs text-rose-600">{errors.originalPrice}</span>}
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Offer label
                  <input
                    value={draft.offer.label}
                    onChange={(event) =>
                      updateField("offer", { ...draft.offer, label: event.target.value })
                    }
                    className={`${inputClass} mt-1.5`}
                    placeholder="Optional, e.g. Festive offer"
                  />
                </label>
              </div>
            </section>

            <section className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Product images</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {isMobile ? "Select up to three separate images." : "Select one primary image."} Files are previewed locally, not uploaded.
                </p>
              </div>
              {draft.images.map((image, index) => (
                <ImageUpload
                  key={index}
                  label={isMobile ? `Image ${index + 1}` : "Primary image"}
                  value={image}
                  onChange={(value) => updateImage(index, value)}
                />
              ))}
            </section>

            <SpecificationEditor
              defaultSpecifications={defaultSpecifications}
              additionalSpecifications={additionalSpecifications}
              onChange={updateSpecifications}
            />
          </div>
          <footer className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button type="button" onClick={onCancel} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
              {product ? "Save changes" : "Add product"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
