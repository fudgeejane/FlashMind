import { useState } from "react";
import toast from "react-hot-toast";
import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedText,
} from "../Theme";
import actionHandler from "../../auth/ActionHandler";

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
    <div className="modal-overlay">
      <ThemedCard as="section" className="w-full max-w-md border border-white/10 p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <ThemedText as="h2" className="text-2xl font-black tracking-tight">
              Forgot password
            </ThemedText>
            <ThemedText variant="secondary" className="mt-2 text-sm leading-6">
              Enter your email and we will send password reset instructions.
            </ThemedText>
          </div>
        
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <ThemedInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <ThemedButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="rounded-xl py-3"
              disabled={isSubmitting}
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
