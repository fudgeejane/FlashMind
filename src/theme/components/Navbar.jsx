import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ClipboardList, LogOut, Menu, UserCog, UserRound } from "lucide-react";
import Logo from "../../assets/FlashMind.png";
import { ThemeToggle } from "../../components/Theme";
import { classNames, useThemeTokens } from "../tokens";
import Button from "./Button";

export default function Navbar({
  variant = "user",
  user,
  userInfo,
  profileOpen = false,
  onToggleProfile,
  onCloseProfile,
  onLogout,
  onOpenSidebar,
}) {
  const tokens = useThemeTokens();
  const location = useLocation();
  const isAdmin = variant === "admin";

  return (
    <header className={classNames(tokens.layout.navbar, tokens.header)}>
      <div key={location.pathname} className={tokens.routeProgress} />

      <nav className={classNames(tokens.layout.navInner, isAdmin && "h-16 py-0")}>
        {isAdmin ? (
          <button
            type="button"
            onClick={onOpenSidebar}
            className={classNames(tokens.iconButton, tokens.border, "lg:hidden")}
            aria-label="Open admin menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : (
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={Logo} alt="FlashMind" className="h-10 w-10 rounded-xl" />
            <span className="hidden text-lg font-black sm:inline">FlashMind</span>
          </Link>
        )}

        {isAdmin ? (
          <>
            <div>
              <p className={classNames("text-xs font-black uppercase tracking-wide", tokens.brandText)}>
                FlashMind Control Panel
              </p>
              <h1 className="text-lg font-black sm:text-xl">Admin Workspace</h1>
            </div>

            <div
              className={classNames(
                "hidden items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold sm:flex",
                tokens.surface
              )}
            >
              <ClipboardList className={classNames("h-4 w-4", tokens.brandText)} />
              {userInfo?.role || "admin"}
            </div>
          </>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={onToggleProfile}
              className={classNames(
                "flex items-center gap-2 rounded-full border px-2 py-2 text-sm font-semibold transition hover:border-cyan-300",
                tokens.surface
              )}
            >
              <span className={tokens.avatar}>
                <UserRound className="h-4 w-4" />
              </span>
              <span className="hidden max-w-32 truncate lg:inline">
                {userInfo?.firstName || user?.email || "Profile"}
              </span>
              <ChevronDown className="hidden h-4 w-4 lg:block" />
            </button>

            {profileOpen && (
              <div className={classNames("absolute right-0 mt-2 w-56 rounded-2xl border shadow-xl", tokens.surface)}>
                <div className="p-4 text-center">
                  <p className="truncate text-sm font-bold">
                    {userInfo?.firstName || "Anonymous"} {userInfo?.lastName || "User"}
                  </p>
                  <p className={classNames("truncate text-xs", tokens.textMuted)}>{user?.email}</p>
                </div>

                <div className={classNames("flex items-center justify-between border-t p-2", tokens.border)}>
                  <p className={classNames("text-sm font-medium", tokens.textSecondary)}>Dark Mode:</p>
                  <ThemeToggle />
                </div>

                <NavLink
                  to="/profile"
                  onClick={onCloseProfile}
                  className={classNames(
                    "inline-flex w-full cursor-pointer items-center gap-2 border-t px-3 py-2 text-sm font-semibold transition",
                    tokens.border,
                    tokens.textSecondary,
                    tokens.hover
                  )}
                >
                  <UserCog className="h-4 w-4" />
                  Profile
                </NavLink>

                <Button
                  type="button"
                  variant="danger"
                  onClick={onLogout}
                  className={classNames("w-full justify-start rounded-b-2xl rounded-t-none border-t px-3", tokens.border)}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
