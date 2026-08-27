import { useState } from "react";
import {
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login({ onSwitchToRegister }) {
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(
        formData.email,
        formData.password
      );

      // Login successful.
      // AuthContext updates isAuthenticated,
      // so App.jsx automatically shows the dashboard.
    } catch (error) {
      setError(
        error.message || "Login failed"
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[140px]" />

        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:32px_32px]" />

      </div>

      {/* ================================================= */}
      {/* MAIN CONTAINER */}
      {/* ================================================= */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT BRAND PANEL */}
          {/* ================================================= */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">

            {/* Decorative circles */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

            {/* BRAND */}

            <div className="relative">

              <div className="mb-10 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                  <Sparkles
                    size={22}
                    className="text-white"
                  />
                </div>

                <span className="text-xl font-black tracking-tight text-white">
                  TaskFlow
                </span>

              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-md">
                <Zap size={14} />
                Welcome back
              </span>

              <h2 className="mt-7 max-w-md text-4xl font-black leading-tight text-white xl:text-5xl">
                Your tasks.
                <br />

                <span className="text-white/70">
                  Your productivity.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-white/70">
                Everything you need to stay organized,
                focused, and productive — all in one
                simple workspace.
              </p>

            </div>

            {/* FEATURES */}

            <div className="relative mt-12 space-y-4">

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <CheckCircle2
                    size={20}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="font-bold text-white">
                    Stay organized
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Manage all your tasks effortlessly.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <ShieldCheck
                    size={20}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="font-bold text-white">
                    Secure workspace
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Your account stays protected.
                  </p>
                </div>

              </div>

            </div>

            <p className="relative mt-10 text-xs text-white/40">
              © 2026 TaskFlow. Stay focused. Get things done.
            </p>

          </div>

          {/* ================================================= */}
          {/* LOGIN PANEL */}
          {/* ================================================= */}

          <div className="relative bg-white p-7 sm:p-10 lg:p-12 xl:p-14">

            {/* Top gradient */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="mb-8">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 shadow-sm">

                <Sparkles
                  size={25}
                  className="text-violet-600"
                />

              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Welcome back
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Sign in to your account and continue
                managing your tasks.
              </p>

            </div>

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600"
              >

                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                  !
                </span>

                <p className="leading-5">
                  {error}
                </p>

              </div>
            )}

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2.5 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="group relative">

                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-500"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2.5 block text-sm font-bold text-slate-700"
                >
                  Password
                </label>

                <div className="group relative">

                  <Lock
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-500"
                  />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                </div>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-4 font-bold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/30 focus:outline-none focus:ring-4 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                {/* Shine animation */}

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </span>

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>

            {/* ================================================= */}
            {/* REGISTER */}
            {/* ================================================= */}

            <div className="mt-8 border-t border-slate-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="font-bold text-violet-600 transition-colors hover:text-violet-700 focus:outline-none focus:underline"
                >
                  Create one
                </button>
              </p>

            </div>

            {/* Mobile branding */}

            <div className="mt-7 flex items-center justify-center gap-2 lg:hidden">

              <Sparkles
                size={15}
                className="text-violet-500"
              />

              <span className="text-xs font-bold text-slate-400">
                TaskFlow
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;