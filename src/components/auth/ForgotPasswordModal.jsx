import { useState } from "react";
import toast from "react-hot-toast";
import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedText,
} from "../Theme";
import actionHandler from "../../auth/actionHandler";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await actionHandler("SEND_RESET_EMAIL", { email });
      toast.success("Password reset email sent.");
      onClose();
      setEmail("");
    } catch (error) {
      toast.error(error.message || "Unable to send reset email.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 px-5 backdrop-blur-sm">
      <ThemedCard as="section" className="w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <ThemedText as="h2" className="text-xl font-bold">
              Forgot password
            </ThemedText>
            <ThemedText variant="secondary" className="mt-2 text-sm leading-6">
              Enter your email and we will send password reset instructions.
            </ThemedText>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-xl leading-none text-theme-text-muted transition hover:bg-theme-surface-muted hover:text-theme-text-primary"
            aria-label="Close forgot password modal"
          >
            x
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <ThemedInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <ThemedButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="rounded-xl py-3"
            >
              Cancel
            </ThemedButton>
            <ThemedButton
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl py-3"
            >
              {isSubmitting ? "Sending..." : "Send Reset Email"}
            </ThemedButton>
          </div>
        </form>
      </ThemedCard>
    </div>
  );
}
