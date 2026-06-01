import { Link } from "react-router-dom";

export default function AuthShell({ title, subtitle, mode }) {
  const isSignIn = mode === "signin";

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 py-12 text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">
        <Link to="/" className="mb-8 inline-flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500 text-sm font-black text-white">
            FM
          </span>
          <span className="text-xl font-bold">FlashMind</span>
        </Link>

        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>

        <form className="mt-8 space-y-4">
          {!isSignIn && (
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950" />
            </label>
          )}
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-slate-950"
            />
          </label>
          <button className="w-full rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          {isSignIn ? "New to FlashMind?" : "Already have an account?"}{" "}
          <Link
            to={isSignIn ? "/signup" : "/signin"}
            className="font-semibold text-cyan-600 dark:text-cyan-300"
          >
            {isSignIn ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </section>
    </main>
  );
}
