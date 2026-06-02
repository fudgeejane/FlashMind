import { useState } from "react";
import toast from "react-hot-toast";
import {

  KeyRound,
  Lock,
  Mail,
  Pencil,


  ShieldCheck,

  UserRound,
} from "lucide-react";
import profile1 from "../../assets/profile-1.jpg";
import profile2 from "../../assets/profile-2.jpg";
import profile3 from "../../assets/profile-3.jpg";
import profile4 from "../../assets/profile-4.jpg";
import profile5 from "../../assets/profile-5.jpg";
import profile6 from "../../assets/profile-6.jpg";
import AvatarModal from "../../utils/AvatarModal";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  classNames,
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
  ThemedInput,
  ThemedPage,

} from "../../components/Theme";
import { useAuth } from "../../auth/contexts/useAuthContext";

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "security", label: "Security", icon: ShieldCheck },
];

export default function Settings() {
  const { user, userInfo } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    role: userInfo?.role || "user",
    avatar: userInfo?.avatar || profile1,
  });
  const displayedAvatar = editingProfile ? profileForm.avatar : userInfo?.avatar || profile1;

  function getCurrentProfileForm() {
    return {
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      role: userInfo?.role || "user",
      avatar: userInfo?.avatar || profile1,
    };
  }

  function handleProfileEditStart() {
    setProfileForm(getCurrentProfileForm());
    setEditingProfile(true);
  }

  function handleProfileEditCancel() {
    setProfileForm(getCurrentProfileForm());
    setEditingProfile(false);
  }

  function handleAvatarEditClick() {
    if (!editingProfile) {
      setProfileForm(getCurrentProfileForm());
      setEditingProfile(true);
    }

    setIsAvatarModalOpen(true);
  }

  async function handlePasswordChange(event) {
    event.preventDefault();

    if (!user?.email) {
      toast.error("No signed-in email found.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    toast.loading("Updating password...", { id: "password-update" });

    try {
      const credential = EmailAuthProvider.credential(user.email, passwordForm.currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordForm.newPassword);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated successfully.", { id: "password-update" });
    } catch (error) {
      toast.error(error.code === "auth/invalid-credential" ? "Current password is incorrect." : error.message || "Unable to update password.", { id: "password-update" });
    } finally {
      setSaving(false);
    }
  }

  async function handleProfileSave() {
    if (!profileForm.firstName.trim() || !profileForm.lastName.trim()) {
      toast.error("First name and last name are required.");
      return;
    }

    try {
      setSaving(true);
      toast.loading("Saving profile...", { id: "profile-save" });

      if (!user) throw new Error("Not signed in.");

      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          firstName: profileForm.firstName.trim(),
          lastName: profileForm.lastName.trim(),
          avatar: profileForm.avatar,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setEditingProfile(false);
      toast.success("Profile saved.", { id: "profile-save" });
    } catch (err) {
      toast.error(err.message || "Failed to save profile.", { id: "profile-save" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <ThemedPage className="space-y-6 max-w-5xl mx-auto">
      <section>
        <p className="text-sm font-bold uppercase tracking-wide text-theme-primary">Account center</p>
        <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Settings</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
          Manage your profile details, password security, and study preferences.
        </p>
      </section>

      <section className="grid gap-4 items-start lg:grid-cols-[14rem_1fr]">
        {/* Mobile tabs */}
        <div className="flex gap-2 md:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={classNames("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-black transition", activeTab === tab.id ? "bg-theme-primary text-white" : "bg-theme-surface-muted text-theme-text-secondary hover:text-theme-text-primary")}><Icon className="h-4 w-4" /><span className="hidden sm:inline">{tab.label}</span></button>;
          })}
        </div>

        <div className="sticky top-24 hidden md:block">
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
                      : "bg-theme-surface-muted text-theme-text-secondary hover:text-theme-text-primary cursor-pointer border border-transparent hover:border-theme-border"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "profile" && (
          <ThemedCard className="p-4 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <button
                type="button"
                onClick={handleAvatarEditClick}
                aria-label="Change avatar"
                className="group relative h-16 w-16 shrink-0"
              >
                <span className="block h-16 w-16 overflow-hidden rounded-full bg-theme-primary/15 ring-2 ring-theme-border transition group-hover:ring-theme-primary">
                  {displayedAvatar ? (
                    <img src={displayedAvatar} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-theme-primary text-xl font-bold">{(userInfo?.firstName || user?.email || "").charAt(0).toUpperCase()}</span>
                  )}
                </span>
                <span className="absolute cursor-pointer -bottom-1 -right-1 z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-theme-surface bg-theme-primary text-white shadow-md transition group-hover:scale-105">
                  <Pencil className="h-3.5 w-3.5" />
                </span>
              </button>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <ThemedCardHead as="h2">Profile</ThemedCardHead>
                    <ThemedCardParagraph>Your account information from Firebase.</ThemedCardParagraph>
                  </div>
                  <div className="flex gap-2">
                    {editingProfile ? (
                      <>
                        <ThemedButton variant="secondary" type="button" onClick={handleProfileEditCancel}>
                          Cancel
                        </ThemedButton>
                        <ThemedButton type="button" disabled={saving} onClick={handleProfileSave}>
                          {saving ? "Saving..." : "Save"}
                        </ThemedButton>
                      </>
                    ) : (
                      <ThemedButton variant="ghost" type="button" onClick={handleProfileEditStart}>
                        Edit
                      </ThemedButton>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 ">
              <ThemedInput
                label="First name"
                value={editingProfile ? profileForm.firstName : userInfo?.firstName || ""}
                onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                readOnly={!editingProfile}
              />
              <ThemedInput
                label="Last name"
                value={editingProfile ? profileForm.lastName : userInfo?.lastName || ""}
                onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                readOnly={!editingProfile}
              />
             
              <AvatarModal
                isOpen={isAvatarModalOpen}
                images={[profile1, profile2, profile3, profile4, profile5, profile6]}
                selected={profileForm.avatar}
                onClose={() => setIsAvatarModalOpen(false)}
                onSelect={(src) => {
                  setProfileForm({ ...profileForm, avatar: src });
                  setIsAvatarModalOpen(false);
                }}
              />
              <ThemedInput label="Email" value={user?.email || ""} readOnly  />
             
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

            <div className="grid gap-4">
              <ThemedInput
                label="Current password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
                placeholder="Enter current password to confirm it's you"
              />
              <ThemedInput
                label="New password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
                placeholder="Must be at least 8 characters"
              />
              <ThemedInput
                label="Confirm new password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
                placeholder="Re-enter new password for confirmation"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <ThemedButton
                type="button"
                variant="ghost"
                onClick={() => setIsForgotPasswordOpen(true)}
              >
                Forgot password
              </ThemedButton>
              <ThemedButton type="submit" disabled={saving} className="gap-2">
                <KeyRound className="h-4 w-4" />
                {saving ? "Updating..." : "Change password"}
              </ThemedButton>
            </div>

            <ForgotPasswordModal
              isOpen={isForgotPasswordOpen}
              onClose={() => setIsForgotPasswordOpen(false)}
            />

          </ThemedCard>
        )}

        
      </section>
    </ThemedPage>
  );
}
