import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ThemedButton,
  ThemedCard,
  ThemedPage,
  ThemedText,
} from "../../components/Theme";
import actionHandler from "../ActionHandler";
import { auth } from "../../../firebase/config";

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessingToken, setIsProcessingToken] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const token = searchParams.get("oobCode") || searchParams.get("token");

  useEffect(() => {
    let cancelled = false;

    async function redirectIfVerified() {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return;
      }

      await currentUser.reload();

      if (!cancelled && auth.currentUser?.emailVerified) {
        navigate("/dashboard", { replace: true });
      }
    }

    async function verifyFromLink() {
      if (!token) {
        await redirectIfVerified();
        return;
      }

      setIsProcessingToken(true);

      try {
        await actionHandler("VERIFY_EMAIL", { token });
        if (!cancelled) {
          toast.success("Email verified successfully.");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "Unable to verify email.");
        }
      } finally {
        if (!cancelled) {
          setIsProcessingToken(false);
        }
      }
    }

    verifyFromLink();

    return () => {
      cancelled = true;
    };
  }, [navigate, token]);

  useEffect(() => {
    if (token) {
      return undefined;
    }

    const verificationTimer = window.setInterval(async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return;
      }

      await currentUser.reload();

      if (auth.currentUser?.emailVerified) {
        window.clearInterval(verificationTimer);
        toast.success("Email verified successfully.");
        navigate("/dashboard", { replace: true });
      }
    }, 2500);

    return () => window.clearInterval(verificationTimer);
  }, [navigate, token]);

  async function handleResendVerification() {
    if (isResending) {
      return;
    }

    setIsResending(true);

    try {
      await actionHandler("RESEND_VERIFICATION");
      toast.success("Verification email sent.");
    } catch (error) {
      toast.error(error.message || "Unable to resend verification email.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <ThemedPage
      as="main"
      className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_60%)]" />
      <div className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -right-24 bottom-16 -z-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

      <ThemedCard as="section" className="w-full max-w-lg border border-white/10 p-8 shadow-2xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
          <span className="text-2xl font-black">@</span>
        </div>

        <div className="mt-6 text-center">
          <ThemedText as="h1" className="text-3xl font-black tracking-tight sm:text-4xl">
            Verify your email
          </ThemedText>
          <ThemedText variant="secondary" className="mt-4 text-sm leading-6 sm:text-base">
            {isProcessingToken
              ? "Verifying your email address now..."
              : "Check your inbox for the verification link. Once your email is confirmed, we will send you straight to the dashboard."}
          </ThemedText>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-theme-border bg-theme-surface-muted/60 p-4 text-left">
          <ThemedText as="p" className="text-sm font-semibold">
            Didn’t get the email?
          </ThemedText>
          <ThemedText variant="secondary" className="mt-1 text-sm leading-6">
            Resend a fresh verification link to the same email address you used when signing up.
          </ThemedText>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <ThemedButton
            type="button"
            onClick={handleResendVerification}
            disabled={isResending || isProcessingToken}
            className="w-full rounded-xl py-3"
          >
            {isResending ? "Sending..." : "Resend email"}
          </ThemedButton>
          <ThemedButton
            as={Link}
            to="/signin"
            variant="secondary"
            className="w-full rounded-xl py-3"
          >
            Back to sign in
          </ThemedButton>
        </div>
      </ThemedCard>
    </ThemedPage>
  );
}
