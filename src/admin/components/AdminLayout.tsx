import {
  ArrowLeft,
  LayoutDashboard,
  Smartphone,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export type AdminSection = "dashboard" | "mobile";

type AdminLayoutProps = {
  activeSection: AdminSection;
  onNavigate: (section: AdminSection) => void;
  children: ReactNode;
};

const navigation: Array<{
  id: AdminSection;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "mobile", label: "Manage Mobile Phones", icon: Smartphone },
];

export default function AdminLayout({
  activeSection,
  onNavigate,
  children,
}: AdminLayoutProps) {
  return (
    <div className="admin-app min-h-screen bg-slate-50 text-slate-800">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <Link to="/" className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-sm font-bold text-white">KKK</span>
          <span>
            <span className="block text-sm font-bold text-slate-900">Cell City</span>
            <span className="block text-xs text-slate-500">Admin workspace</span>
          </span>
        </Link>
        <nav aria-label="Admin navigation" className="flex-1 space-y-1 px-3 py-5">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={activeSection === id ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                activeSection === id
                  ? "bg-blue-50 text-blue-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
        <Link
          to="/"
          className="m-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          <Store size={17} aria-hidden="true" />
          Back to Website
        </Link>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">KKK Cell City</p>
                <h1 className="mt-1 text-lg font-bold text-slate-900">
                  {navigation.find((item) => item.id === activeSection)?.label}
                </h1>
              </div>
              <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 lg:hidden">
                <ArrowLeft size={15} /> Website
              </Link>
            </div>
            <nav aria-label="Admin navigation" className="flex gap-2 overflow-x-auto lg:hidden">
              {navigation.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                    activeSection === id ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon size={15} aria-hidden="true" /> {label}
                </button>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
            <p className="text-sm leading-6">
              Admin preview only: product edits and image previews reset on refresh. The frontend demo login is not security; its credentials are included in browser code and can be bypassed. Do not expose this route publicly until server-side authentication and authorization are implemented.
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
