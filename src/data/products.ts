export type Product = {
  name: string;
  brand: string;
  price: number;
  listPrice?: number;
  color: string;
  initials: string;
  image?: string;
  category?: string;
};

export const products: Product[] = [
  {
    name: "iPhone 15",
    brand: "Apple",
    price: 69900,
    listPrice: 79900,
    color: "from-orange-300/25 via-rose-500/10 to-transparent",
    initials: "15",
    image: "/images/phone-iphone-15.jpg",
    category: "Smartphones",
  },
  {
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    price: 72999,
    listPrice: 79999,
    color: "from-violet-400/25 via-blue-500/10 to-transparent",
    initials: "S24",
    image: "/images/phone-galaxy-s24.jpg",
    category: "Smartphones",
  },
  {
    name: "Vivo V30",
    brand: "Vivo",
    price: 30999,
    listPrice: 33999,
    color: "from-cyan-300/25 via-teal-500/10 to-transparent",
    initials: "V30",
    image: "/images/phone-vivo-v30.jpg",
    category: "Smartphones",
  },
  {
    name: "Oppo Reno 11",
    brand: "OPPO",
    price: 26999,
    listPrice: 29999,
    color: "from-emerald-300/25 via-green-500/10 to-transparent",
    initials: "11",
    image: "/images/phone-oppo-reno-11.jpg",
    category: "Smartphones",
  },
  {
    name: "Redmi Note 13 Pro",
    brand: "Redmi",
    price: 22999,
    color: "from-amber-300/25 via-orange-500/10 to-transparent",
    initials: "13",
    image: "/images/phone-redmi-note-13-pro.jpg",
    category: "Smartphones",
  },
  {
    name: "realme 12 Pro+",
    brand: "realme",
    price: 27999,
    listPrice: 29999,
    color: "from-yellow-300/25 via-amber-500/10 to-transparent",
    initials: "12",
    image: "/images/phone-realme-12-pro-plus.jpg",
    category: "Smartphones",
  },
];

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
