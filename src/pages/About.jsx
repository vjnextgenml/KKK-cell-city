// @ts-check
import {
  ArrowRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Smartphone,
  Store,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const locations = [
  {
    name: "Main Showroom",
    address:
      "No. 7, 007, Color Lab Ground Floor, Old Bus Stand, Perambalur — 621 212",
    phone: "97512 11787",
    tel: "9751211787",
    verified: true,
    mapQuery:
      "No. 7 007 Color Lab Ground Floor Old Bus Stand Perambalur 621212",
  },
  {
    name: "Nataraja Towers",
    address:
      "Nataraja Towers, NSB Road, Near Vasan Eye Care, Old Bus Stand, Perambalur — 621 212",
    phone: "88700 35459",
    tel: "8870035459",
    verified: true,
    mapQuery:
      "Nataraja Towers NSB Road Near Vasan Eye Care Old Bus Stand Perambalur 621212",
  },
  {
    name: "North Perambalur",
    address: "Sample listing only. Please contact the shop to confirm locations.",
    phone: null,
    tel: null,
    verified: false,
    mapQuery: null,
  },
];

/**
 * @param {{
 *   cartCount: number;
 * }} props
 */
export default function About({ cartCount }) {
  return (
    <div className="light-theme min-h-screen bg-ink text-slate-200">
      <Navbar cartCount={cartCount} />
      <main>
        <section className="relative isolate overflow-hidden border-b border-blue-100">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_34%,rgba(37,99,235,0.14),transparent_38%),linear-gradient(112deg,#eff6ff_10%,#dbeafe_60%,#f8fafc_100%)]" />
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-blue-700">
                <MapPin size={14} /> Local to Perambalur
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                Good tech is great.
                <span className="block bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  Good people make it better.
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                KKK Cell City is a local Perambalur phone shop built around
                useful technology, everyday accessories, friendly practical
                help, and reliable repair support. We’re here to help you find
                the right device and make the most of it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-blue-500"
                >
                  Explore the shop <ArrowRight size={16} />
                </Link>
                <Link
                  to="/repairs"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition hover:border-blue-500/30 hover:bg-slate-800/60"
                >
                  <Wrench size={16} /> Repair support
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-7 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Find us nearby
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Our Perambalur locations
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Visit a verified showroom or call ahead if you need help finding
              us. The North Perambalur listing below is an unverified sample.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {locations.map((location) => (
              <article
                key={location.name}
                className={`flex flex-col rounded-2xl border bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 sm:p-6 ${
                  location.verified
                    ? "border-slate-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-glow"
                    : "border-amber-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                      location.verified
                        ? "border-blue-100 bg-blue-50 text-blue-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    <Store size={20} />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {location.name}
                </h3>
                <p className="mt-2 flex gap-2 text-sm leading-6 text-slate-400">
                  <MapPin size={16} className="mt-1 shrink-0 text-blue-400" />
                  <span>{location.address}</span>
                </p>

                {location.phone && location.tel && (
                  <a
                    href={`tel:${location.tel}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
                  >
                    <Phone size={15} className="text-blue-400" />
                    {location.phone}
                  </a>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {location.verified && location.tel && (
                    <a
                      href={`https://wa.me/91${location.tel}?text=${encodeURIComponent(
                        `Hello KKK Cell City, could you help me with directions to ${location.name}?`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                  )}
                  {location.mapQuery && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(location.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <MapPin size={14} /> Directions
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.09] text-blue-300">
                <Clock3 size={20} />
              </span>
              <div>
                <h2 className="font-semibold text-white">Operational hours</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Illustrative daily hours: 10:00 AM – 9:00 PM
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Please confirm hours with the shop before visiting.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.09] text-blue-300">
                <Smartphone size={20} />
              </span>
              <div>
                <h2 className="font-semibold text-white">A helpful local team</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  From choosing a phone to accessories and repair support,
                  we’re happy to help you find a practical next step.
                </p>
                <Link
                  to="/repairs"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  See repair services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
