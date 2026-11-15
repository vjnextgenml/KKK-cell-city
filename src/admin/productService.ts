import { accessoryProducts } from "../pages/Pages";
import { products, type AccessoryProduct, type MobileProduct } from "../data/products";
import type {
  Accessory,
  AdminProduct,
  MobilePhone,
  ProductAvailability,
  ProductImage,
  ProductSpecification,
} from "./types";
import {
  getAccessoryTemplateType,
  getDefaultSpecifications,
} from "./specificationDefaults";

const now = () => new Date().toISOString();
const newId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const toSpecifications = (specifications: Record<string, string>) =>
  Object.entries(specifications).map(([name, value], index) => ({
    id: `${name}-${index}`,
    name,
    value,
  }));

const toImage = (src: string | null): ProductImage | null =>
  src ? { src } : null;

function mapPhone(product: MobileProduct): MobilePhone {
  const specifications = toSpecifications(product.specifications);
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    model: product.name,
    category: "Smartphones",
    price: product.price,
    offer: {
      enabled: Boolean(product.listPrice && product.listPrice > product.price),
      originalPrice: product.listPrice,
      label: "",
    },
    availability: (product.availability as ProductAvailability | undefined) ?? "Unknown",
    description: "",
    specifications: getDefaultSpecifications(
      "mobile",
      "Smartphones",
      undefined,
      [
        ...specifications,
        ...(product.storageOptions?.length
          ? [{ id: "storage-options", name: "Storage (GB)", value: product.storageOptions.join(", ") }]
          : []),
        ...(product.availableColours?.length
          ? [{ id: "available-colours", name: "Colours", value: product.availableColours.join(", ") }]
          : []),
      ],
    ),
    images: product.images.map(toImage) as MobilePhone["images"],
    productType: "mobile",
    updatedAt: now(),
  };
}

function mapAccessory(product: AccessoryProduct): Accessory {
  const accessoryType = getAccessoryTemplateType(product.id) ?? "Charger";
  const specifications = toSpecifications(product.specifications).map(
    (specification) => ({ ...specification, isDefault: true }),
  );
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category ?? "Chargers & Data Cables",
    accessoryType,
    price: product.price,
    offer: {
      enabled: Boolean(product.listPrice && product.listPrice > product.price),
      originalPrice: product.listPrice,
      label: "",
    },
    availability: (product.availability as ProductAvailability | undefined) ?? "Unknown",
    description: "",
    specifications,
    images: product.images.map(toImage) as Accessory["images"],
    productType: "accessory",
    updatedAt: now(),
  };
}

const initialPhones = products
  .filter((product): product is MobileProduct => product.productType === "mobile")
  .map(mapPhone);
const initialAccessories = accessoryProducts
  .filter((product): product is AccessoryProduct => product.productType === "accessory")
  .map(mapAccessory);

let mobilePhones = initialPhones;
let accessories = initialAccessories;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

function copyProduct<T extends AdminProduct>(product: T): T {
  return {
    ...product,
    offer: { ...product.offer },
    images: product.images.map((image) => image && { ...image }),
    specifications: product.specifications.map((specification) => ({ ...specification })),
  } as T;
}

function copyProducts<T extends AdminProduct>(items: T[]) {
  return items.map(copyProduct);
}

function findById<T extends AdminProduct>(items: T[], id: string) {
  const product = items.find((item) => item.id === id);
  return product ? copyProduct(product) : null;
}

function create<T extends AdminProduct>(
  items: T[],
  data: Omit<T, "id" | "updatedAt">,
): T {
  const product = {
    ...data,
    id: newId(),
    updatedAt: now(),
  } as T;
  items.unshift(product);
  return copyProduct(product);
}

function update<T extends AdminProduct>(
  items: T[],
  id: string,
  data: Omit<T, "id" | "updatedAt">,
): T | null {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;

  const product = {
    ...data,
    id,
    updatedAt: now(),
  } as T;
  items[index] = product;
  return copyProduct(product);
}

function remove<T extends AdminProduct>(items: T[], id: string) {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return false;
  items.splice(index, 1);
  return true;
}

export const adminProductService = {
  async getMobilePhones() {
    return copyProducts(mobilePhones);
  },
  async getMobilePhoneById(id: string) {
    return findById(mobilePhones, id);
  },
  async createMobilePhone(data: Omit<MobilePhone, "id" | "updatedAt">) {
    return create(mobilePhones, data);
  },
  async updateMobilePhone(id: string, data: Omit<MobilePhone, "id" | "updatedAt">) {
    return update(mobilePhones, id, data);
  },
  async deleteMobilePhone(id: string) {
    return remove(mobilePhones, id);
  },
  async getAccessories() {
    return copyProducts(accessories);
  },
  async getAccessoryById(id: string) {
    return findById(accessories, id);
  },
  async createAccessory(data: Omit<Accessory, "id" | "updatedAt">) {
    return create(accessories, data);
  },
  async updateAccessory(id: string, data: Omit<Accessory, "id" | "updatedAt">) {
    return update(accessories, id, data);
  },
  async deleteAccessory(id: string) {
    return remove(accessories, id);
  },
};

export function newSpecification(): ProductSpecification {
  return {
    id: newId(),
    name: "",
    value: "",
    isDefault: false,
  };
}

export function resetAdminProductData() {
  mobilePhones = copyProducts(initialPhones);
  accessories = copyProducts(initialAccessories);
}
