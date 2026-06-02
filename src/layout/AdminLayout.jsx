import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ClipboardList,
  FileClock,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  PanelLeftClose,
  UsersRound,
  X,
} from "lucide-react";
import Logo from "../assets/FlashMind.png";
import { useAuth } from "../auth/contexts/useAuthContext";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import ThemeComponents from "../components/Theme/ThemeComponents";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const adminNavItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "User Management", path: "/admin/users", icon: UsersRound },
  { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquareText },
  { label: "Logs", path: "/admin/logs", icon: FileClock },
];

export default function AdminLayout() {
  const styles = ThemeComponents();
  const { user, userInfo } = useAuth();
  const { logout } = useFirebaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("flashmind-admin-sidebar") === "collapsed";
  });

  useEffect(() => {
    localStorage.setItem("flashmind-admin-sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  async function handleLogout() {
    await logout();
    navigate("/loading?next=/", { replace: true });
  }

  const sidebarWidth = collapsed ? "lg:w-20" : "lg:w-72";

  return (
    <div className={classNames(styles.page, "flex flex-col min-h-screen")}>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r text-white shadow-2xl transition duration-300 lg:translate-x-0 lg:shadow-none",
          styles.headerBg,
          styles.border,
          sidebarWidth,
          sidebarOpen ? "translate-x-0" : ""
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="FlashMind" className="h-10 w-10 rounded-xl" />
            {!collapsed && <span className="text-lg font-black">Admin</span>}
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 transition hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="hidden rounded-xl p-2 transition hover:bg-white/10 lg:grid"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-3 py-4">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  classNames(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition",
                    collapsed ? "lg:justify-center lg:gap-0 lg:px-0" : "",
                    isActive
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  )
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="mb-3 rounded-2xl bg-white/5 p-3">
            <p className="truncate text-sm font-bold">
              {collapsed ? "Admin" : userInfo?.firstName || "Admin"}
            </p>
            {!collapsed && <p className="mt-1 truncate text-xs text-slate-400">{user?.email}</p>}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className={classNames(
              "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition hover:bg-red-400/10 hover:text-red-100",
              collapsed ? "lg:justify-center" : "",
              styles.errorText
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className={classNames("flex-1 transition-all duration-300 flex flex-col", collapsed ? "lg:pl-20" : "lg:pl-72")}>
        <header className={classNames("sticky top-0 z-30", styles.header)}>
          <div
            key={location.pathname}
            className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left animate-route-progress bg-cyan-400"
          />
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className={classNames(
                "rounded-xl border p-2 transition hover:border-cyan-300 lg:hidden",
                styles.border
              )}
              aria-label="Open admin menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <p className={classNames("text-xs font-black uppercase tracking-wide", styles.brandText)}>
                FlashMind Control Panel
              </p>
              <h1 className="text-lg font-black sm:text-xl">Admin Workspace</h1>
            </div>

            <div
              className={classNames(
                "hidden items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold sm:flex",
                styles.surface,
                styles.border
              )}
            >
              <ClipboardList className={classNames("h-4 w-4", styles.brandText)} />
              {userInfo?.role || "admin"}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
