// @ts-check
import { useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Cable,
  CheckCircle2,
  ChevronRight,
  Headphones,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Speaker,
  Store,
  Watch,
  Wrench,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { formatINR, products } from "../data/products";

const categories = [
  { name: "Mobile Phones", icon: Smartphone, query: "Smartphones", images: [{ src: "/images/category-mobile-phones.jpg", alt: "Assorted modern smartphones" }] },
  {
    name: "Chargers & Data Cables",
    icon: Cable,
    query: "Chargers & data cables",
    images: [
      { src: "/images/category-chargers.jpg", alt: "Phone chargers" },
      { src: "/images/category-chargers-cables.jpg", alt: "Phone charging cables" },
    ],
  },
  { name: "Earphones & Headphones", icon: Headphones, query: "Earphones & headphones", images: [{ src: "/images/category-headphones.jpg", alt: "Wireless headphones" }] },
  { name: "Bluetooth Speakers", icon: Speaker, query: "Bluetooth speakers", images: [{ src: "/images/category-bluetooth-speakers.jpg", alt: "Portable Bluetooth speaker" }] },
  { name: "Power Banks", icon: BatteryCharging, query: "Power banks", images: [{ src: "/images/category-power-banks.jpg", alt: "Portable power banks" }] },
  { name: "Cases & Screen Guards", icon: ShieldCheck, query: "Mobile cases & screen guards" },
  { name: "Smartwatches", icon: Watch, query: "Smart watches", images: [{ src: "/images/category-smartwatches.jpg", alt: "Smart watches" }] },
];

const accessories = [
  {
    name: "Fast chargers & cables",
    detail: "Reliable everyday charging essentials for your devices.",
    image: "/images/category-chargers-cables.jpg",
    imageAlt: "Phone chargers and charging cables",
  },
  {
    name: "Power banks",
    detail: "Stay powered through commutes, trips, and busy days.",
    image: "/images/category-power-banks.jpg",
    imageAlt: "Portable power banks",
  },
  {
    name: "Cases & screen protection",
    detail: "Help protect your phone from daily bumps and scratches.",
    image: "/images/category-mobile-phones.jpg",
    imageAlt: "Smartphones protected for everyday use",
  },
  {
    name: "Audio accessories",
    detail: "Explore earphones, headphones, and portable speakers.",
    image: "/images/category-headphones.jpg",
    imageAlt: "Wireless headphones",
  },
];

const repairServices = [
  "Display replacement",
  "Battery replacement",
  "Charging port repair",
  "Software support",
  "Water damage care",
];

const reasons = [
  {
    title: "Local to Perambalur",
    detail: "Visit us near Old Bus Stand or at Nataraja Towers on NSB Road.",
    image: "/images/why-local-perambalur.jpg",
  },
  {
    title: "Experienced repair support",
    detail: "Get practical help and a device assessment before repair work.",
    image: "/images/why-experienced-repair.jpg",
  },
  {
    title: "Clear, upfront guidance",
    detail: "We explain availability, repair options, and estimates before proceeding.",
    image: "/images/why-clear-guidance.jpg",
  },
  {
    title: "Convenient local service",
    detail: "Talk to our team in person, by phone, or over WhatsApp.",
    image: "/images/why-convenient-local-service.jpg",
  },
];

/**
 * @param {{
 *   cartCount: number;
 * }} props
 */
export default function Home({ cartCount }) {
  const [activeProduct, setActiveProduct] = useState(
    /** @type {import("../data/products").Product | null} */ (null),
  );
  const featuredProducts = [
    "iPhone 15",
    "Galaxy S24",
    "V30",
    "Redmi Note 13 Pro",
    "Reno 11",
  ]
    .map((name) => products.find((product) => product.name === name))
    .filter((product) => product !== undefined);

  return (
    <div className="light-theme min-h-screen bg-ink text-slate-200">
      <Navbar cartCount={cartCount} />
      <main>
        <section className="dark-hero relative isolate overflow-hidden border-b border-slate-800/80 bg-ink">
          <img
            src="/images/kkk-cell-city-neon-showcase.png"
            alt="Modern smartphones and mobile accessories displayed in a blue-lit showcase"
            className="absolute inset-0 z-0 h-full w-full object-cover object-[68%_center] md:object-center"
          />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,10,20,0.93)_0%,rgba(5,10,20,0.82)_38%,rgba(5,10,20,0.3)_72%,rgba(5,10,20,0.16)_100%),linear-gradient(0deg,rgba(5,10,20,0.48),transparent_60%)]" />
          <div className="relative z-20 mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 md:min-h-[520px] md:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                Your local tech destination
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.55rem]">
                KKK Cell City —{" "}
                <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Perambalur’s trusted tech destination.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Discover the latest mobile phones, everyday accessories, and
                expert repair support from a friendly local team in Perambalur,
                Tamil Nadu.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Explore Phones <ArrowRight size={17} />
                </Link>
                <Link
                  to="/repairs#repair-inquiry"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/45 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-blue-300/40 hover:bg-blue-950/60"
                >
                  <Wrench size={16} /> Book Repair
                </Link>
              </div>
            </div>
            <div aria-hidden="true" className="hidden min-h-[300px] md:block" />
          </div>
        </section>

        <section
          aria-labelledby="categories-heading"
          className="border-b border-blue-100 bg-blue-50/60"
        >
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
            <div className="mb-7 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Find what you need
                </p>
                <h2 id="categories-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Shop by category
                </h2>
              <Link
                to="/categories"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                All categories <ArrowRight size={15} />
              </Link>
            </div>
            <div className="category-strip flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 lg:overflow-visible">
              {categories.map(({ name, icon: Icon, query, images }) => (
                <Link
                  key={name}
                  to={query === "Smartphones" ? "/shop" : "/categories"}
                  className="group flex min-h-40 w-[152px] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-glow sm:w-[168px] sm:p-4 lg:w-0 lg:flex-1"
                >
                  {images ? (
                    <span className="flex h-[76px] w-full items-center justify-center gap-1 overflow-hidden rounded-xl bg-white sm:h-[84px]">
                      {images.map((image) => (
                        <img
                          key={image.src}
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className={`h-full min-w-0 ${images.length > 1 ? "w-1/2" : "w-full"} object-contain transition duration-300 group-hover:scale-105`}
                        />
                      ))}
                    </span>
                  ) : (
                    <span className="flex h-[76px] w-full items-center justify-center rounded-xl bg-blue-50 text-blue-700 sm:h-[84px]">
                      <Icon size={28} strokeWidth={1.7} />
                    </span>
                  )}
                  <span className="mt-3 flex w-full items-center justify-between gap-1 text-sm font-semibold leading-5 text-slate-700 transition group-hover:text-blue-800">
                    {name}
                    <ChevronRight size={15} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="popular-smartphones"
          aria-labelledby="smartphones-heading"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Customer favorites
              </p>
              <h2 id="smartphones-heading" className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Popular Smartphones
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Explore popular models, competitive prices, and local support.
              </p>
            </div>
            <Link
              to="/shop"
              aria-label="View all phones in the shop"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
            >
              <span className="hidden sm:inline">More phones</span> <ArrowRight size={16} />
            </Link>
          </div>
          <div className="category-strip flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                onViewDetails={() => setActiveProduct(product)}
                compact
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="accessories-heading"
          className="border-y border-blue-100 bg-blue-50/50"
        >
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Everyday essentials
                </p>
                <h2 id="accessories-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Essential Accessories
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Useful add-ons to power, protect, and personalize your phone.
                </p>
              </div>
              <Link
                to="/categories"
                className="hidden items-center gap-1.5 text-sm font-medium text-blue-400 transition hover:text-blue-300 sm:flex"
              >
                Browse accessories <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {accessories.map(({ name, detail, image, imageAlt }) => (
                <Link
                  key={name}
                  to="/categories"
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-glow sm:rounded-2xl"
                >
                  <img
                    src={image}
                    alt={imageAlt}
                    loading="lazy"
                    className="h-12 w-full bg-slate-50 object-contain p-1 transition duration-500 sm:h-24 sm:p-2"
                  />
                  <div className="flex flex-1 flex-col p-2 sm:p-4">
                    <h3 className="text-[10px] font-semibold leading-tight text-white sm:text-sm">{name}</h3>
                    <p className="mt-2 hidden flex-1 text-sm leading-6 text-slate-400 sm:block">{detail}</p>
                    <span className="mt-2 inline-flex items-center gap-0.5 text-[9px] font-semibold text-blue-400 sm:mt-4 sm:gap-1 sm:text-xs">
                      <span className="sm:hidden">Explore</span>
                      <span className="hidden sm:inline">Explore category</span>
                      <ArrowRight size={12} className="transition group-hover:translate-x-1 sm:h-[14px] sm:w-[14px]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="repairs-heading"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16"
        >
          <div className="mb-7 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Local repair expertise
            </p>
            <h2 id="repairs-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Professional Mobile Repairs
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Tell us what’s going on. Our Perambalur team can assess your device
              and guide you through the next steps.
            </p>
          </div>
          <div className="grid overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-xl backdrop-blur-md md:grid-cols-2">
            <div className="relative min-h-72 overflow-hidden sm:min-h-96">
              <img
                src="/images/focused-smartphone-repair-workshop.png"
                alt="Mobile repair technician carefully working on a smartphone"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/65 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
                <Wrench size={14} className="text-blue-300" />
                Practical, local device care
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Help for the problems that interrupt your day.
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Repair availability and estimates depend on your device. We’ll
                inspect it and discuss options before any work begins.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {repairServices.map((service) => (
                  <li key={service} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="shrink-0 text-blue-400" />
                    {service}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/repairs#repair-inquiry"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Book Repair <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/919751211787?text=Hello%20KKK%20Cell%20City%2C%20I%27d%20like%20to%20inquire%20about%20a%20mobile%20repair."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/60 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-500/30 hover:text-white"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="why-us-heading"
          className="border-y border-blue-100 bg-blue-50/60"
        >
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Local people. Helpful service.
              </p>
              <h2 id="why-us-heading" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Why Choose KKK Cell City?
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map(({ title, detail, image }) => (
                <article
                  key={title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-36 w-full object-cover sm:h-40"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-5 grid gap-3 rounded-2xl border border-blue-500/20 bg-blue-600/[0.08] p-5 sm:grid-cols-2">
              <p className="flex gap-2.5 text-sm leading-6 text-slate-300">
                <Store size={17} className="mt-0.5 shrink-0 text-blue-400" />
                <span><strong className="text-white">Main Showroom:</strong> Old Bus Stand, Perambalur — 621 212</span>
              </p>
              <p className="flex gap-2.5 text-sm leading-6 text-slate-300">
                <MapPin size={17} className="mt-0.5 shrink-0 text-blue-400" />
                <span><strong className="text-white">Nataraja Towers:</strong> NSB Road, near Vasan Eye Care, Perambalur</span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {activeProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          onClick={() => setActiveProduct(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActiveProduct(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="featured-product-title"
            className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProduct(null)}
              aria-label="Close product details"
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 id="featured-product-title" className="mt-2 text-2xl font-bold text-white">
              {activeProduct.name}
            </h2>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{formatINR(activeProduct.price)}</span>
              {activeProduct.listPrice && (
                <span className="text-sm text-slate-500 line-through">{formatINR(activeProduct.listPrice)}</span>
              )}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Find this phone at KKK Cell City. Contact our
              Perambalur team for current availability.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
