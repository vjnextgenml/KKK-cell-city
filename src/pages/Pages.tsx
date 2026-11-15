import { type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Headphones, ShieldCheck, Truck, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products, type Product } from "../data/products";

type StoreProps = {
  cartCount: number;
};

const trustItems = [
  { icon: Truck, title: "Easy delivery", detail: "Free delivery or store pickup" },
  { icon: ShieldCheck, title: "Secure payments", detail: "Safe, simple checkout" },
  { icon: Headphones, title: "Here to help", detail: "Friendly, expert support" },
  { icon: CheckCircle2, title: "Local warranty", detail: "Trusted after-sales care" },
];

function StoreShell({ children, cartCount }: StoreProps & { children: ReactNode }) {
  return (
    <div className="light-theme min-h-screen bg-ink text-slate-200">
      <Navbar cartCount={cartCount} />
      {children}
      <Footer />
    </div>
  );
}

function ProductGrid({ items }: {
  items: Product[];
}) {
  if (!items.length) {
    return <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">No phones match your search. Try another name or brand.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export function HomePage(props: StoreProps) {
  const featured = products.slice(0, 4);
  return (
    <StoreShell {...props}>
      <main>
        <section className="dark-hero relative isolate overflow-hidden border-b border-slate-800/80">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(37,99,235,0.2),transparent_38%),radial-gradient(ellipse_at_5%_80%,rgba(14,165,233,0.08),transparent_32%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3 py-1.5 text-xs font-medium text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> Your local tech destination
              </span>
              <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.55rem]">
                KKK Cell City — <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">your trusted tech destination.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                Explore the latest smartphones, everyday accessories, and expert mobile repair support in Perambalur.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500">
                  Shop smartphones <ArrowRight size={17} />
                </Link>
                <Link to="/repairs" className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition hover:border-blue-500/30 hover:bg-slate-800/60">
                  <Wrench size={16} /> Book a repair
                </Link>
              </div>
              <div className="mt-9 flex items-center gap-3 text-xs text-slate-500">
                <div className="flex -space-x-2">
                  {["bg-blue-400", "bg-cyan-400", "bg-violet-400", "bg-emerald-400"].map((color) => (
                    <span key={color} className={`h-7 w-7 rounded-full border-2 border-ink ${color}`} />
                  ))}
                </div>
                <span><strong className="text-slate-300">Local experts.</strong> Here when you need us.</span>
              </div>
            </div>
            <div className="relative mx-auto flex h-[330px] w-full max-w-lg items-center justify-center sm:h-[390px]">
              <div className="absolute h-64 w-64 rounded-full bg-blue-500/20 blur-[90px]" />
              <div className="absolute h-56 w-56 rounded-full border border-blue-400/10 sm:h-72 sm:w-72" />
              <div className="absolute h-72 w-72 rounded-full border border-blue-400/[0.07] sm:h-[22rem] sm:w-[22rem]" />
              <div className="absolute right-[20%] top-[15%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_4px_rgba(103,232,249,0.4)]" />
              <div className="phone-visual relative h-[260px] w-[132px] rotate-[-8deg] rounded-[2.4rem] border-[5px] border-slate-500/40 bg-slate-950 p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.7)] sm:h-[310px] sm:w-[158px]">
                <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-blue-500 via-indigo-700 to-[#09142c]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(125,211,252,0.55),transparent_26%),radial-gradient(ellipse_at_40%_70%,rgba(59,130,246,0.7),transparent_45%)]" />
                  <div className="absolute left-5 top-6 flex h-11 w-11 flex-col gap-1 rounded-2xl border border-slate-700/80 bg-slate-950/70 p-1.5 backdrop-blur">
                    <span className="h-3 w-3 rounded-full border border-slate-300/50 bg-slate-800" />
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-200/80" />
                    <span className="h-3 w-3 rounded-full border border-slate-300/50 bg-slate-800" />
                  </div>
                  <span className="relative mt-12 text-5xl font-light tracking-tight text-white/80">15</span>
                  <span className="absolute bottom-6 text-[8px] uppercase tracking-[0.3em] text-white/50">Pro camera</span>
                </div>
                <div className="absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2 rounded-full bg-slate-900" />
              </div>
              <div className="absolute bottom-10 right-3 rounded-xl border border-slate-700/80 bg-slate-900/85 px-4 py-3 shadow-xl backdrop-blur-md sm:right-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Find your next</p>
                <p className="mt-1 text-sm font-semibold text-white">favorite phone <span className="text-blue-400">↗</span></p>
              </div>
              <div className="absolute left-2 top-14 rounded-xl border border-slate-700/80 bg-slate-900/85 px-3 py-2.5 shadow-xl backdrop-blur-md sm:left-4">
                <p className="text-[10px] text-slate-400">Good tech, good people</p>
                <p className="mt-1 text-xs font-semibold text-amber-300">★★★★★ <span className="text-slate-300">Local love</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-blue-100 bg-blue-50/60">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {trustItems.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/[0.08] text-blue-400"><Icon size={19} /></span>
                <div><p className="text-sm font-semibold text-slate-200">{title}</p><p className="mt-0.5 text-xs text-slate-500">{detail}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Picked for you</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Popular smartphones</h2><p className="mt-2 text-sm text-slate-500">The latest favorites, ready to meet their new owner.</p></div>
            <Link to="/shop" className="hidden items-center gap-1.5 text-sm font-medium text-blue-400 transition hover:text-blue-300 sm:flex">View all <ArrowRight size={15} /></Link>
          </div>
          <ProductGrid items={featured} />
          <Link to="/shop" className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500/40 hover:bg-slate-800/60 sm:hidden">Shop all phones <ArrowRight size={16} /></Link>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-blue-400/15 bg-gradient-to-r from-blue-950 via-[#101a31] to-slate-900 px-6 py-9 sm:px-10 lg:flex lg:items-center lg:justify-between">
            <div className="absolute -right-10 -top-32 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="relative max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">More than a phone shop</p><h2 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">Expert mobile repairs. Great accessories. One friendly local team.</h2><p className="mt-2 text-sm text-slate-400">Get your device back in good hands, or find the little extras that make it yours.</p></div>
            <Link to="/repairs" className="relative mt-6 inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 lg:mt-0">Explore services <ArrowUpRight size={16} /></Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Brands you'll love</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 text-lg font-bold tracking-tight text-slate-500 sm:text-xl">
            {["Apple", "SAMSUNG", "vivo", "OPPO", "Redmi", "realme"].map((brand) => <span key={brand} className="transition hover:text-slate-200">{brand}</span>)}
          </div>
        </section>
      </main>
    </StoreShell>
  );
}

const accessoryCategories = [
  { name: "Chargers & Data Cables" },
  { name: "Headphones & Speakers" },
  { name: "Power Banks" },
  { name: "Cases & Screen Guards" },
  { name: "Smartwatches" },
];

const categoryProductsByName: Record<string, Product[]> = {
  "Chargers & Data Cables": [
    {
      id: "dummy-fast-charger",
      name: "Fast Charger Pro",
      brand: "KKK Accessories",
      price: 1499,
      color: "from-blue-200 to-blue-100",
      initials: "FC",
      productType: "accessory",
      images: ["/images/category-chargers-cables.jpg"],
      category: "Chargers & Data Cables",
      specifications: {
        Type: "USB-C fast charger",
        Output: "20W",
        Compatibility: "Android + iPhone",
      },
    },
    {
      id: "dummy-cable-kit",
      name: "Premium Cable Kit",
      brand: "KKK Cables",
      price: 799,
      color: "from-cyan-200 to-cyan-100",
      initials: "CK",
      productType: "accessory",
      images: ["/images/category-chargers-cables.jpg"],
      category: "Chargers & Data Cables",
      specifications: {
        Type: "USB-C data cable",
        Length: "1.5 meters",
        Compatibility: "Smartphones and tablets",
      },
    },
    {
      id: "dummy-wireless-pad",
      name: "Wireless Charging Pad",
      brand: "KKK Gear",
      price: 1999,
      color: "from-sky-200 to-indigo-100",
      initials: "WP",
      productType: "accessory",
      images: ["/images/category-chargers-cables.jpg"],
      category: "Chargers & Data Cables",
      specifications: {
        Type: "Charging pad",
        Power: "15W",
        Compatibility: "Qi-enabled devices",
      },
    },
  ],
  "Headphones & Speakers": [
    {
      id: "dummy-wireless-headphones",
      name: "SoundBeam Headphones",
      brand: "KKK Audio",
      price: 2499,
      color: "from-violet-200 to-purple-100",
      initials: "SB",
      productType: "accessory",
      images: ["/images/category-headphones.jpg"],
      category: "Headphones & Speakers",
      specifications: {
        Type: "Wireless headphones",
        Battery: "18 hours",
        Connectivity: "Bluetooth 5.3",
      },
    },
    {
      id: "dummy-mini-speaker",
      name: "Mini Pulse Speaker",
      brand: "KKK Audio",
      price: 2199,
      color: "from-pink-200 to-rose-100",
      initials: "MP",
      productType: "accessory",
      images: ["/images/category-bluetooth-speakers.jpg"],
      category: "Headphones & Speakers",
      specifications: {
        Type: "Portable speaker",
        Volume: "Rich bass output",
        Battery: "8 hours playtime",
      },
    },
    {
      id: "dummy-neckband",
      name: "Breeze Neckband",
      brand: "KKK Audio",
      price: 1699,
      color: "from-slate-200 to-slate-100",
      initials: "BN",
      productType: "accessory",
      images: ["/images/category-headphones.jpg"],
      category: "Headphones & Speakers",
      specifications: {
        Type: "Neckband earphones",
        Battery: "12 hours",
        Features: "IPX5 water resistant",
      },
    },
  ],
  "Power Banks": [
    {
      id: "dummy-power-bank-1",
      name: "Power Bank Elite",
      brand: "KKK Power",
      price: 2999,
      color: "from-amber-200 to-yellow-100",
      initials: "PE",
      productType: "accessory",
      images: ["/images/category-power-banks.jpg"],
      category: "Power Banks",
      specifications: {
        Capacity: "10000mAh",
        Output: "22.5W",
        Ports: "USB-C + USB-A",
      },
    },
    {
      id: "dummy-power-bank-2",
      name: "Pocket Charge Mini",
      brand: "KKK Power",
      price: 1799,
      color: "from-yellow-200 to-orange-100",
      initials: "PC",
      productType: "accessory",
      images: ["/images/category-power-banks.jpg"],
      category: "Power Banks",
      specifications: {
        Capacity: "6000mAh",
        Output: "18W",
        Weight: "Lightweight design",
      },
    },
    {
      id: "dummy-power-bank-3",
      name: "UltraCore Bank",
      brand: "KKK Power",
      price: 3999,
      color: "from-orange-200 to-red-100",
      initials: "UC",
      productType: "accessory",
      images: ["/images/category-power-banks.jpg"],
      category: "Power Banks",
      specifications: {
        Capacity: "20000mAh",
        Output: "30W",
        Feature: "Dual charging support",
      },
    },
  ],
  "Cases & Screen Guards": [
    {
      id: "dummy-case-1",
      name: "Armor Shield Case",
      brand: "KKK Protection",
      price: 899,
      color: "from-slate-200 to-slate-100",
      initials: "AS",
      productType: "accessory",
      images: ["/images/category-mobile-phones.jpg"],
      category: "Cases & Screen Guards",
      specifications: {
        Type: "Shockproof case",
        Material: "TPU + polycarbonate",
        Fit: "Premium fit",
      },
    },
    {
      id: "dummy-case-2",
      name: "ClearGuard Screen Film",
      brand: "KKK Protection",
      price: 599,
      color: "from-emerald-200 to-lime-100",
      initials: "CG",
      productType: "accessory",
      images: ["/images/category-mobile-phones.jpg"],
      category: "Cases & Screen Guards",
      specifications: {
        Type: "Tempered glass",
        Protection: "Scratch resistant",
        Finish: "Ultra-clear",
      },
    },
    {
      id: "dummy-case-3",
      name: "MagSafe Sleeve",
      brand: "KKK Protection",
      price: 1299,
      color: "from-rose-200 to-pink-100",
      initials: "MS",
      productType: "accessory",
      images: ["/images/category-mobile-phones.jpg"],
      category: "Cases & Screen Guards",
      specifications: {
        Type: "Leather case",
        MagSafe: "Compatible",
        Finish: "Slim fit",
      },
    },
  ],
  "Smartwatches": [
    {
      id: "dummy-watch-1",
      name: "Pulse Smartwatch",
      brand: "KKK Wear",
      price: 3499,
      color: "from-indigo-200 to-blue-100",
      initials: "PS",
      productType: "accessory",
      images: ["/images/category-smartwatches.jpg"],
      category: "Smartwatches",
      specifications: {
        Display: "AMOLED display",
        Battery: "2-day battery",
        Tracking: "Heart + sleep tracking",
      },
    },
    {
      id: "dummy-watch-2",
      name: "SportFit Watch",
      brand: "KKK Wear",
      price: 2999,
      color: "from-cyan-200 to-teal-100",
      initials: "SF",
      productType: "accessory",
      images: ["/images/category-smartwatches.jpg"],
      category: "Smartwatches",
      specifications: {
        Display: "Bright touchscreen",
        Battery: "48 hours",
        Features: "Workout tracking",
      },
    },
    {
      id: "dummy-watch-3",
      name: "Elite Time Watch",
      brand: "KKK Wear",
      price: 4999,
      color: "from-violet-200 to-fuchsia-100",
      initials: "ET",
      productType: "accessory",
      images: ["/images/category-smartwatches.jpg"],
      category: "Smartwatches",
      specifications: {
        Display: "1.9 inch AMOLED",
        Battery: "3-day battery",
        Features: "GPS + notifications",
      },
    },
  ],
};

export const accessoryProducts = Object.values(categoryProductsByName).flat();

export function CategoriesPage(props: StoreProps) {
  return (
    <StoreShell {...props}>
      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Explore more</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Shop by category</h1>
        <p className="mt-2 text-slate-400">The everyday essentials and little upgrades that make your tech yours.</p>

        <div className="mt-8 space-y-10">
          {accessoryCategories.map((category) => {
            const productsForCategory = categoryProductsByName[category.name] ?? [];

            return (
              <section key={category.name} className="space-y-4">
                <Link
                  to="/shop"
                  className="group inline-flex min-h-10 max-w-[260px] items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-glow"
                >
                  <h2 className="text-sm font-semibold text-slate-900">{category.name}</h2>
                </Link>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {productsForCategory.map((product) => (
                    <ProductCard key={product.id} product={product} reducedVisual />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </StoreShell>
  );
}

export function NotFoundPage(props: StoreProps) {
  return <StoreShell {...props}><main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"><p className="text-sm font-semibold text-blue-400">404 · Page not found</p><h1 className="mt-3 text-3xl font-bold text-white">This page wandered off.</h1><Link to="/" className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">Back to home</Link></main></StoreShell>;
}
