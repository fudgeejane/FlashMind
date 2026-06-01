import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  Layers3,
  LogOut,
  Menu,
  UserRound,
  X,
  UserCog
} from "lucide-react";
import Logo from "../assets/FlashMind.png";
import { useAuth } from "../auth/contexts/useAuthContext";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { classNames, ThemeComponents, ThemeToggle, ThemedPage } from "../components/Theme";

const userNavItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Decks", path: "/decks", icon: Layers3 },
  { label: "Study", path: "/study", icon: BookOpen },
  { label: "Profile", path: "/profile", icon: UserCog },
];

export default function UserLayout() {
  const { user, userInfo } = useAuth();
  const { logout } = useFirebaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const styles = ThemeComponents();

  async function handleLogout() {
    await logout();
    navigate("/signin", { replace: true });
  }

  return (
    <ThemedPage>
      <header className={classNames("sticky top-0 z-40", styles.header)}>
        <div key={location.pathname} className={styles.routeProgress} />

        <nav className={styles.layoutNav}>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className={classNames(styles.iconButton, "lg:hidden")}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={Logo} alt="FlashMind" className="h-10 w-10 rounded-xl" />
            <span className="hidden text-lg font-black sm:inline">FlashMind</span>
          </Link>

          <div className="flex items-center gap-2">
           
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className={styles.profileButton}
              >
                <span className={styles.avatar}>
                  <UserRound className="h-4 w-4" />
                </span>
                <span className="hidden max-w-32 truncate lg:inline">
                  {userInfo?.firstName || user?.email || "Profile"}
                </span>
                <ChevronDown className="hidden h-4 w-4 lg:block" />
              </button>
              

              {profileOpen && (
                <div className={styles.dropdown}>
                  <div className="p-4 text-center">
                    <p className="truncate text-sm font-bold">
                      {userInfo?.firstName || "Anonymous"} {userInfo?.lastName || "User"}
                    </p>
                    <p className={classNames("truncate text-xs", styles.mutedText)}>{user?.email}</p>
                  </div>

                   <div className={classNames(styles.dropdownSection, "flex items-center justify-between")}>
                      <p className={classNames("text-sm font-medium", styles.secondaryText)}>Dark Mode:</p>
                      <ThemeToggle />
                  </div>
                   
                   
                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className={classNames("border-t border-theme-border", styles.dropdownItem)}
                  >
                     <UserCog className="h-4 w-4" />
                     Profile
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={classNames("border-t border-theme-border", styles.dropdownItem)}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className={styles.overlay}
        />
      )}

      <aside
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        className={classNames(
          styles.sidebar,
          sidebarExpanded ? "lg:w-72" : "lg:w-20",
          sidebarOpen && "translate-x-0"
        )}
      >
   

        <div className="flex items-center justify-between px-4 pb-4 lg:hidden">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="FlashMind" className="h-10 w-10 rounded-xl" />
            <span className="text-lg font-black">FlashMind</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className={styles.iconButtonGhost}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2.5 px-4 py-4">
          {userNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  classNames(
                    styles.sidebarItemBase,
                    "w-full",
                    sidebarExpanded ? "lg:justify-start lg:px-4" : "lg:justify-center lg:gap-0 lg:px-0",
                    isActive ? styles.sidebarItemActive : styles.sidebarItem
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span
                  className={`whitespace-nowrap transition lg:overflow-hidden ${
                    sidebarExpanded ? "lg:max-w-40 lg:opacity-100" : "lg:max-w-0 lg:opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-theme-border p-3">
          <button
            type="button"
            onClick={handleLogout}
            className={classNames(
              styles.sidebarItemBase,
              styles.sidebarItem,
              "w-full cursor-pointer text-left",
              sidebarExpanded ? "lg:justify-start lg:px-4" : "lg:justify-center lg:gap-0 lg:px-0"
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span
              className={`whitespace-nowrap text-sm transition lg:overflow-hidden ${
                sidebarExpanded ? "lg:max-w-40 lg:opacity-100" : "lg:max-w-0 lg:opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      <div className={`transition-all duration-300 ${sidebarExpanded ? "lg:pl-72" : "lg:pl-20"}`}>
        <main className={styles.layoutContainer}>
          <Outlet />
        </main>
      </div>
    </ThemedPage>
  );
}
