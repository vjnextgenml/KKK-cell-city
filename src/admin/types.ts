export type ProductAvailability =
  | "In stock"
  | "Out of stock"
  | "Pre-order"
  | "Unknown";

export type ProductSpecification = {
  id: string;
  name: string;
  value: string;
  isDefault?: boolean;
};

export type ProductImage = {
  src: string;
  fileName?: string;
  contentType?: string;
};

export type ProductOffer = {
  enabled: boolean;
  originalPrice?: number;
  label: string;
};

type AdminProductBase = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  offer: ProductOffer;
  availability: ProductAvailability;
  description: string;
  specifications: ProductSpecification[];
  images: Array<ProductImage | null>;
  updatedAt: string;
};

export type MobilePhone = AdminProductBase & {
  productType: "mobile";
  model: string;
  category: "Smartphones";
  images: [ProductImage | null, ProductImage | null, ProductImage | null];
};

export type Accessory = AdminProductBase & {
  productType: "accessory";
  accessoryType: AccessoryType;
  images: [ProductImage | null];
};

export type AdminProduct = MobilePhone | Accessory;

export type MobilePhoneDraft = Omit<MobilePhone, "id" | "updatedAt">;
export type AccessoryDraft = Omit<Accessory, "id" | "updatedAt">;
export type ProductDraft = MobilePhoneDraft | AccessoryDraft;

export const accessoryCategories = [
  "Chargers & Data Cables",
  "Headphones & Speakers",
  "Power Banks",
  "Cases & Screen Guards",
  "Smartwatches",
] as const;

export type AccessoryCategory = (typeof accessoryCategories)[number];

export type AccessoryType =
  | "Charger"
  | "Data Cable"
  | "Wireless Charger"
  | "Headphones"
  | "Neckband"
  | "Bluetooth Speaker"
  | "Power Bank"
  | "Mobile Case"
  | "Screen Guard"
  | "Smartwatch";

export type AccessoryTypeOption = {
  type: AccessoryType;
  templateProductId: string;
};
