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
import actionHandler from "../actionHandler";

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
    <ThemedPage as="main" className="grid place-items-center px-5 py-12">
      <ThemedCard as="section" className="w-full max-w-md p-8 shadow-xl">
        <ThemedText as="h1" className="text-2xl font-bold">
          Reset password
        </ThemedText>
        <ThemedText variant="secondary" className="mt-3 text-sm leading-6">
          Enter a new password for your FlashMind account.
        </ThemedText>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <ThemedInput
            label="New Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={updateField}
            autoComplete="new-password"
            minLength={8}
            required
          />
          <ThemedInput
            label="Confirm Password"
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
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </ThemedButton>
        </form>

        {!token && (
          <ThemedText variant="error" className="mt-4 text-center text-sm font-semibold">
            Password reset token is missing.
          </ThemedText>
        )}

        <ThemedText variant="secondary" className="mt-6 text-center text-sm">
          Remember your password?{" "}
          <Link to="/signin" className="font-semibold text-cyan-600 dark:text-cyan-300">
            Sign in
          </Link>
        </ThemedText>
      </ThemedCard>
    </ThemedPage>
  );
}
