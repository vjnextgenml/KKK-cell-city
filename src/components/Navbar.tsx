import { useState, type FormEvent } from "react";
import {
  Menu,
  Search,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

type NavbarProps = {
  cartCount: number;
};

const links = [
  { label: "Home", to: "/" },
  { label: "Mobile phones", to: "/shop" },
  { label: "Accessories", to: "/categories" },
  { label: "Repairs", to: "/repairs" },
  { label: "About Us", to: "/about" },
];

export default function Navbar(_props: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(`/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_2px_16px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="KKK Cell City home"
        >
          <span className="flex h-10 w-10 items-center justify-center">
            <img
              src="/images/kkk-cell-city-mark.png"
              alt=""
              className="h-full w-full object-contain"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              KKK Cell City
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Mobile · Accessories · Repairs
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-5">
          <nav className="hidden items-center gap-4 xl:gap-5 lg:flex" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative whitespace-nowrap py-2 text-[13px] font-medium transition hover:text-blue-700 ${
                    isActive ? "text-blue-700 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-blue-600" : "text-slate-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
          <form
            onSubmit={submitSearch}
            className="hidden w-40 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 md:flex xl:w-48"
            role="search"
          >
            <Search size={16} className="shrink-0 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search phones..."
              aria-label="Search phones"
              className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button type="submit" className="sr-only">
              Search
            </button>
          </form>
          <button
            onClick={() => setSearchOpen((open) => !open)}
            className="icon-button md:hidden"
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="icon-button lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-slate-200 px-4 py-3 md:hidden">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-blue-400">
            <Search size={17} className="text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search phones and accessories..."
              aria-label="Search phones and accessories"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button type="submit" aria-label="Submit search" className="text-blue-400">
              <Search size={18} />
            </button>
          </div>
        </form>
      )}

      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
