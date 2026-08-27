import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Register({ onSwitchToLogin }) {
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await register(
        formData.name,
        formData.email,
        formData.password
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const passwordLength = formData.password.length;

  const getPasswordStrength = () => {
    if (passwordLength === 0) {
      return {
        label: "",
        width: "w-0",
        text: "",
      };
    }

    if (passwordLength < 8) {
      return {
        label: "Weak password",
        width: "w-1/3",
        text: "text-red-500",
      };
    }

    if (passwordLength < 12) {
      return {
        label: "Good password",
        width: "w-2/3",
        text: "text-amber-500",
      };
    }

    return {
      label: "Strong password",
      width: "w-full",
      text: "text-emerald-500",
    };
  };

  const strength = getPasswordStrength();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[140px]" />

        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      {/* ================= MAIN ================= */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-2">

          {/* ================= LEFT PANEL ================= */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">

            {/* Decorative circles */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5 blur-2xl" />

            {/* Logo */}

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
                Built for productivity
              </span>

              <h2 className="mt-7 max-w-md text-4xl font-black leading-tight text-white xl:text-5xl">
                Organize your work.
                <br />
                <span className="text-white/70">
                  Achieve more.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-white/70">
                Create tasks, stay organized, and keep your
                productivity moving forward with a simple
                workspace designed for you.
              </p>
            </div>

            {/* Features */}

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
                    Simple task management
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Keep everything organized in one place.
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
                    Secure account
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    Your account and tasks stay protected.
                  </p>
                </div>
              </div>
            </div>

            <p className="relative mt-10 text-xs text-white/40">
              © 2026 TaskFlow. Stay focused. Get things done.
            </p>
          </div>

          {/* ================= RIGHT PANEL ================= */}

          <div className="relative bg-white p-7 sm:p-10 lg:p-12 xl:p-14">

            {/* Top gradient */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />

            {/* Header */}

            <div className="mb-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 shadow-sm">
                <Sparkles
                  size={25}
                  className="text-violet-600"
                />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Start managing your tasks smarter and build
                better productivity habits.
              </p>
            </div>

            {/* Error */}

            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                  !
                </span>

                <p className="leading-5">{error}</p>
              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2.5 block text-sm font-bold text-slate-700"
                >
                  Full name
                </label>

                <div className="group relative">
                  <User
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-violet-500"
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

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
                <div className="mb-2.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  {passwordLength > 0 && (
                    <span
                      className={`text-xs font-bold ${strength.text}`}
                    >
                      {strength.label}
                    </span>
                  )}
                </div>

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
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>

                {/* Password strength */}

                {passwordLength > 0 && (
                  <div className="mt-3">
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-500 transition-all duration-300 ${strength.width}`}
                      />
                    </div>
                  </div>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 8 characters for a secure password.
                </p>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-4 font-bold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/30 focus:outline-none focus:ring-4 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {/* Shine */}

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  {loading
                    ? "Creating account..."
                    : "Create Account"}
                </span>

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* LOGIN */}

            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-bold text-violet-600 transition-colors hover:text-violet-700 focus:outline-none focus:underline"
                >
                  Sign in
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

export default Register;