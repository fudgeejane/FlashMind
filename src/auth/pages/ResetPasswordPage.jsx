import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedPage,
  ThemedText,
} from "../../components/Theme";
import actionHandler from "../ActionHandler";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token: tokenParam } = useParams();
  const [searchParams] = useSearchParams();
  const token = tokenParam || searchParams.get("oobCode") || searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await actionHandler("RESET_PASSWORD", {
        token,
        password: formData.password,
      });
      toast.success("Password reset successfully. Please sign in.");
      navigate("/signin", { replace: true });
    } catch (error) {
      toast.error(error.message || "Unable to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedPage
      as="main"
      className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_60%)]" />
      <div className="absolute -left-24 bottom-16 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <ThemedCard as="section" className="w-full max-w-lg border border-white/10 p-8 shadow-2xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
          <span className="text-2xl font-black">#</span>
        </div>

        <div className="mt-6 text-center">
          <ThemedText as="h1" className="text-3xl font-black tracking-tight sm:text-4xl">
            Reset your password
          </ThemedText>
          <ThemedText variant="secondary" className="mt-4 text-sm leading-6 sm:text-base">
            Choose a new password for your FlashMind account. After the reset completes, you will be sent back to sign in.
          </ThemedText>
        </div>

        {!token && (
          <div className="mt-6 rounded-2xl border border-red-200/60 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
            Password reset token is missing. Open the link from your email again.
          </div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <ThemedInput
            label="New password"
            name="password"
            type="password"
            value={formData.password}
            onChange={updateField}
            autoComplete="new-password"
            minLength={8}
            required
          />
          <ThemedInput
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={updateField}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <ThemedButton
            type="submit"
            className="w-full rounded-xl py-3"
            disabled={isSubmitting || !token}
          >
            {isSubmitting ? "Resetting..." : "Reset password"}
          </ThemedButton>
        </form>

        <ThemedText variant="secondary" className="mt-6 text-center text-sm">
          Remembered your password?{" "}
          <Link to="/signin" className="font-semibold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-300">
            Sign in
          </Link>
        </ThemedText>
      </ThemedCard>
    </ThemedPage>
  );
}
