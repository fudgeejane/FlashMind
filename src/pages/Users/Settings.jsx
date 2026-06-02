import { useState } from "react";
import {
  Bell,
  KeyRound,
  Lock,
  Mail,
  Palette,
  Save,
  ShieldCheck,
  UserCog,
  UserRound,
} from "lucide-react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import {
  classNames,
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
  ThemedInput,
  ThemedPage,
  ThemeToggle,
} from "../../components/Theme";
import { useAuth } from "../../auth/contexts/useAuthContext";

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "preferences", label: "Preferences", icon: Palette },
];

export default function Settings() {
  const { user, userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function handlePasswordChange(event) {
    event.preventDefault();
    setStatus("");

    if (!user?.email) {
      setStatus("No signed-in email found.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setStatus("New password must be at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setStatus("New password and confirmation do not match.");
      return;
    }

    setSaving(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, passwordForm.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordForm.newPassword);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setStatus("Password updated successfully.");
    } catch (error) {
      setStatus(error.code === "auth/invalid-credential" ? "Current password is incorrect." : error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <ThemedPage className="space-y-6">
      <section>
        <p className="text-sm font-bold uppercase tracking-wide text-theme-primary">Account center</p>
        <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
          Manage your profile details, password security, and study preferences.
        </p>
      </section>

      {status && (
        <div className="rounded-lg border border-theme-primary/30 bg-theme-primary/10 px-4 py-3 text-sm font-bold text-theme-primary">
          {status}
        </div>
      )}

      <section className="grid gap-4 xl:grid-cols-[18rem_1fr]">
        <ThemedCard className="p-3">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-black transition",
                    activeTab === tab.id
                      ? "bg-theme-primary text-white"
                      : "bg-theme-surface-muted text-theme-text-secondary hover:text-theme-text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ThemedCard>

        {activeTab === "profile" && (
          <ThemedCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
                <UserCog className="h-6 w-6" />
              </span>
              <div>
                <ThemedCardHead as="h2">Profile</ThemedCardHead>
                <ThemedCardParagraph>Your account information from Firebase.</ThemedCardParagraph>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ThemedInput label="First name" value={userInfo?.firstName || ""} readOnly />
              <ThemedInput label="Last name" value={userInfo?.lastName || ""} readOnly />
              <ThemedInput label="Email" value={user?.email || ""} readOnly />
              <ThemedInput label="Role" value={userInfo?.role || "user"} readOnly />
            </div>

            <div className="mt-5 rounded-lg border border-theme-border bg-theme-surface-muted p-4">
              <p className="flex items-center gap-2 text-sm font-black text-theme-text-primary">
                <Mail className="h-4 w-4 text-theme-primary" />
                Email verification
              </p>
              <p className="mt-2 text-sm leading-6 text-theme-text-secondary">
                {user?.emailVerified ? "Your email is verified." : "Your email is not verified yet."}
              </p>
            </div>
          </ThemedCard>
        )}

        {activeTab === "security" && (
          <ThemedCard as="form" onSubmit={handlePasswordChange} className="space-y-5 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
                <Lock className="h-6 w-6" />
              </span>
              <div>
                <ThemedCardHead as="h2">Security</ThemedCardHead>
                <ThemedCardParagraph>Change your password after confirming your current password.</ThemedCardParagraph>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ThemedInput
                label="Current password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
              />
              <ThemedInput
                label="New password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
              />
              <ThemedInput
                label="Confirm new password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
              />
            </div>

            <ThemedButton type="submit" disabled={saving} className="gap-2">
              <KeyRound className="h-4 w-4" />
              {saving ? "Updating..." : "Change password"}
            </ThemedButton>
          </ThemedCard>
        )}

        {activeTab === "preferences" && (
          <ThemedCard className="p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
                <Palette className="h-6 w-6" />
              </span>
              <div>
                <ThemedCardHead as="h2">Preferences</ThemedCardHead>
                <ThemedCardParagraph>Personalize your study workspace.</ThemedCardParagraph>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-theme-border bg-theme-surface-muted p-4">
                <div>
                  <p className="font-black text-theme-text-primary">Dark Mode</p>
                  <p className="mt-1 text-sm text-theme-text-secondary">Switch the FlashMind interface theme.</p>
                </div>
                <ThemeToggle />
              </div>

              {["Daily review reminders", "Weak card alerts", "Exam simulation reminders"].map((label) => (
                <label key={label} className="flex items-center justify-between rounded-lg border border-theme-border bg-theme-surface-muted p-4">
                  <span className="flex items-center gap-2 text-sm font-black text-theme-text-primary">
                    <Bell className="h-4 w-4 text-theme-primary" />
                    {label}
                  </span>
                  <input type="checkbox" defaultChecked className="h-5 w-5 accent-cyan-600" />
                </label>
              ))}
            </div>

            <ThemedButton type="button" className="mt-5 gap-2" onClick={() => setStatus("Preferences saved locally for this prototype.")}>
              <Save className="h-4 w-4" />
              Save preferences
            </ThemedButton>
          </ThemedCard>
        )}
      </section>
    </ThemedPage>
  );
}
