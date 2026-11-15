import { KeyRound, LockKeyhole } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  isAdminLoginConfigured,
  verifyAdminCredentials,
} from "../admin/auth";

type AdminLoginProps = {
  onLoginSuccess: () => void;
};

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isAdminLoginConfigured()) {
      setError(
        "Admin login is not configured. Set VITE_ADMIN_USER_ID and VITE_ADMIN_PASSWORD in your local environment, then restart the app.",
      );
      return;
    }

    if (!verifyAdminCredentials(userId, password)) {
      setError("The User ID or password is incorrect.");
      return;
    }

    setError("");
    onLoginSuccess();
    navigate("/admin", { replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.08)] sm:p-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-xs font-bold text-white">KKK</span>
          KKK Cell City
        </Link>

        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <LockKeyhole size={22} aria-hidden="true" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
          Admin access
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Admin Login
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Sign in to open the KKK Cell City admin dashboard.
        </p>

        <form onSubmit={submitLogin} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            User ID
            <input
              autoComplete="username"
              value={userId}
              onChange={(event) => {
                setUserId(event.target.value);
                setError("");
              }}
              required
              className="admin-input mt-1.5"
              placeholder="Enter your User ID"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              required
              className="admin-input mt-1.5"
              placeholder="Enter your password"
            />
          </label>
          {error && (
            <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline"
          >
            <KeyRound size={17} aria-hidden="true" />
            Login
          </button>
        </form>

        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          Demo frontend login only. Credentials are included in the browser app and do not secure the dashboard. Use server-side authentication before hosting publicly.
        </p>
      </section>
    </main>
  );
}
