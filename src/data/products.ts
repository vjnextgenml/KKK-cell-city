type ProductBase = {
  id: string;
  name: string;
  brand: string;
  price: number;
  listPrice?: number;
  color: string;
  initials: string;
  category?: string;
  specifications: Record<string, string>;
  availability?: string;
  storageOptions?: string[];
  availableColours?: string[];
};

export type MobileProduct = ProductBase & {
  productType: "mobile";
  images: [string | null, string | null, string | null];
};

export type AccessoryProduct = ProductBase & {
  productType: "accessory";
  images: [string | null];
};

export type Product = MobileProduct | AccessoryProduct;

export const products: Product[] = [
  {
    id: "iphone-15",
    name: "iPhone 15",
    brand: "Apple",
    price: 69900,
    listPrice: 79900,
    color: "from-orange-300/25 via-rose-500/10 to-transparent",
    initials: "15",
    productType: "mobile",
    images: ["/images/phone-iphone-15.jpg", null, null],
    category: "Smartphones",
    specifications: {},
  },
  {
    id: "samsung-galaxy-s24",
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    price: 72999,
    listPrice: 79999,
    color: "from-violet-400/25 via-blue-500/10 to-transparent",
    initials: "S24",
    productType: "mobile",
    images: ["/images/phone-galaxy-s24.jpg", null, null],
    category: "Smartphones",
    specifications: {},
  },
  {
    id: "vivo-v30",
    name: "Vivo V30",
    brand: "Vivo",
    price: 30999,
    listPrice: 33999,
    color: "from-cyan-300/25 via-teal-500/10 to-transparent",
    initials: "V30",
    productType: "mobile",
    images: ["/images/phone-vivo-v30.jpg", null, null],
    category: "Smartphones",
    specifications: {},
  },
  {
    id: "oppo-reno-11",
    name: "Oppo Reno 11",
    brand: "OPPO",
    price: 26999,
    listPrice: 29999,
    color: "from-emerald-300/25 via-green-500/10 to-transparent",
    initials: "11",
    productType: "mobile",
    images: ["/images/phone-oppo-reno-11.jpg", null, null],
    category: "Smartphones",
    specifications: {},
  },
  {
    id: "redmi-note-13-pro",
    name: "Redmi Note 13 Pro",
    brand: "Redmi",
    price: 22999,
    color: "from-amber-300/25 via-orange-500/10 to-transparent",
    initials: "13",
    productType: "mobile",
    images: ["/images/phone-redmi-note-13-pro.jpg", null, null],
    category: "Smartphones",
    specifications: {},
  },
  {
    id: "realme-12-pro-plus",
    name: "realme 12 Pro+",
    brand: "realme",
    price: 27999,
    listPrice: 29999,
    color: "from-yellow-300/25 via-amber-500/10 to-transparent",
    initials: "12",
    productType: "mobile",
    images: ["/images/phone-realme-12-pro-plus.jpg", null, null],
    category: "Smartphones",
    specifications: {},
  },
];

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
