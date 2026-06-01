import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ThemedButton,
  ThemedCard,
  ThemedPage,
  ThemedText,
} from "../../components/Theme";
import actionHandler from "../actionHandler";
import { auth } from "../../../firebase/config";

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessingToken, setIsProcessingToken] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const token = searchParams.get("oobCode") || searchParams.get("token");

  useEffect(() => {
    let cancelled = false;

    async function verifyFromLink() {
      if (!token) {
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
    }, 3000);

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
    <ThemedPage as="main" className="grid place-items-center px-5 py-12">
      <ThemedCard as="section" className="w-full max-w-md p-8 text-center shadow-xl">
        <ThemedText as="h1" className="text-2xl font-bold">
          Verify your email
        </ThemedText>
        <ThemedText variant="secondary" className="mt-3 text-sm leading-6">
          {isProcessingToken
            ? "Verifying your email address..."
            : "Check your inbox and verify your email before opening your dashboard."}
        </ThemedText>

        <div className="mt-8 grid gap-3">
          <ThemedButton
            type="button"
            onClick={handleResendVerification}
            disabled={isResending || isProcessingToken}
            className="w-full rounded-xl py-3"
          >
            {isResending ? "Sending..." : "Resend verification email"}
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
