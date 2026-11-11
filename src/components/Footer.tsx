import {
  Apple,
  CreditCard,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  WalletCards,
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

const paymentMethods = [
  { name: "VISA", Icon: CreditCard, color: "text-blue-800" },
  { name: "mastercard", Icon: CreditCard, color: "text-red-600" },
  { name: "Apple Pay", Icon: Apple, color: "text-slate-900" },
  { name: "PayPal", Icon: WalletCards, color: "text-blue-700" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
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
            <p className="mt-2 max-w-xs text-sm leading-5 text-slate-600">
              Your trusted destination for the latest tech, friendly advice, and expert mobile care in Perambalur.
            </p>
            <div className="mt-3 flex gap-2">
              <a className="icon-button" href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={17} /></a>
              <a className="icon-button" href="https://www.facebook.com/" aria-label="Facebook"><Facebook size={17} /></a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-1 text-sm font-semibold text-slate-900 sm:mb-2">{group.title}</h3>
              <ul className="space-y-1">
                {group.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-slate-600 transition hover:text-blue-700">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-2 text-sm font-semibold text-slate-900 sm:mb-4">Visit our showroom</h3>
            <div className="flex flex-col gap-1.5">
              <p className="flex gap-2 text-sm leading-5 text-slate-600">
                <MapPin size={17} className="mt-0.5 shrink-0 text-blue-400" />
                Main Showroom: Old Bus Stand, Perambalur
              </p>
              <p className="pl-6 text-sm leading-5 text-slate-600">
                Nataraja Towers, NSB Road, near Vasan Eye Care
              </p>
              <a href="tel:9751211787" className="inline-flex items-center gap-2 text-sm leading-5 text-slate-600 transition hover:text-blue-700">
                <Phone size={15} className="shrink-0 text-blue-400" />
                97512 11787
              </a>
              <a href="tel:8870035459" className="inline-flex items-center gap-2 text-sm leading-5 text-slate-600 transition hover:text-blue-700">
                <Phone size={15} className="shrink-0 text-blue-400" />
                88700 35459
              </a>
            </div>
            <h3 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-slate-600">We accept</h3>
            <div className="flex flex-wrap gap-1.5">
              {paymentMethods.map(({ name, Icon, color }) => (
                <span key={name} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600">
                  <Icon aria-hidden="true" size={13} className={color} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-5">
          <p>© {new Date().getFullYear()} KKK Cell City. All rights reserved.</p>
          <p>Thoughtful tech. Trusted locally.</p>
        </div>
      </div>
    </footer>
  );
}
