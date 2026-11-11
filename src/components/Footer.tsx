import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Quick links",
    links: [
      ["Mobile phones", "/shop"],
      ["About Us", "/about"],
      ["Store locations", "/about"],
      ["Contact us", "/about"],
    ],
  },
  {
    title: "Accessories",
    links: [
      ["Smartphones", "/categories"],
      ["Accessories", "/categories"],
      ["Audio & wearables", "/categories"],
      ["Latest arrivals", "/shop"],
    ],
  },
  {
    title: "Customer care",
    links: [
      ["Repair services", "/repairs"],
      ["Warranty support", "/repairs"],
      ["Store pickup", "/about"],
      ["FAQs", "/about"],
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="newsletter-panel mb-14 flex flex-col justify-between gap-7 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 shadow-[0_12px_36px_rgba(37,99,235,0.07)] sm:p-8 lg:flex-row lg:items-center">
          <div className="max-w-lg">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Stay connected
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Good tech news, straight to your inbox.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Get the latest updates, offers, and new arrivals at KKK Cell City.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex w-full max-w-md gap-2">
            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10">
              <Mail size={17} className="shrink-0 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitted(false);
                }}
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-electric px-4 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {submitted ? <><Check size={16} /> Subscribed</> : <>Join us <ArrowRight size={16} /></>}
            </button>
          </form>
        </section>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center">
                <img
                  src="/images/kkk-cell-city-mark.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-base font-bold text-slate-900">KKK Cell City</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              Your trusted destination for the latest tech, friendly advice, and expert mobile care in Perambalur.
            </p>
            <div className="mt-5 flex gap-2">
              <a className="icon-button" href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={17} /></a>
              <a className="icon-button" href="https://www.facebook.com/" aria-label="Facebook"><Facebook size={17} /></a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-slate-600 transition hover:text-blue-700">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Visit our showroom</h3>
            <p className="flex gap-2 text-sm leading-6 text-slate-600">
              <MapPin size={17} className="mt-0.5 shrink-0 text-blue-400" />
              Main Showroom: Old Bus Stand, Perambalur
            </p>
            <p className="mt-2 pl-6 text-sm leading-6 text-slate-600">
              Nataraja Towers, NSB Road, near Vasan Eye Care
            </p>
            <a href="tel:9751211787" className="mt-3 block text-sm text-slate-600 transition hover:text-blue-700">97512 11787</a>
            <a href="tel:8870035459" className="mt-2 block text-sm text-slate-600 transition hover:text-blue-700">88700 35459</a>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Illustrative hours: 10:00 AM – 9:00 PM. Please confirm before visiting.
            </p>
            <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-slate-600">We accept</h3>
            <div className="flex flex-wrap gap-2">
              {["VISA", "mastercard", "Apple Pay", "PayPal"].map((method) => (
                <span key={method} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KKK Cell City. All rights reserved.</p>
          <p>Thoughtful tech. Trusted locally.</p>
        </div>
      </div>
    </footer>
  );
}
