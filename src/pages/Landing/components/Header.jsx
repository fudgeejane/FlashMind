import { Link } from "react-router-dom";
import { ThemeToggle } from "../../../components/Theme";
import Logo from "../../../assets/FlashMind.png";

export default function Header({ headerRef, mobileOpen, navItems, setMobileOpen }) {
  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img src={Logo} alt="FlashMind Logo" className="h-10 w-10 rounded-xl" />
          <span className="text-lg font-bold">FlashMind</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            to="/signin"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setMobileOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 lg:hidden dark:border-white/10"
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden dark:border-white/10 dark:bg-slate-950">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-semibold text-slate-700 dark:text-slate-200"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
              <ThemeToggle />
              <div className="flex gap-2">
                <Link to="/signin" className="rounded-full px-4 py-2 text-sm font-bold">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white dark:bg-cyan-400 dark:text-slate-950"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
