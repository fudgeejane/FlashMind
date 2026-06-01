import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedPage,
  ThemedText,
} from "../components/Theme";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import Logo from "../assets/FlashMind.png";

export default function Register() {
  const { register } = useFirebaseAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      setVerificationEmailSent(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedPage as="main" className="grid place-items-center px-5 py-12">
      <ThemedCard as="section" className="w-full max-w-md p-8 shadow-xl">
        <Link to="/" className="mb-8 mx-auto flex items-center justify-center">
          <img src={Logo} alt="FlashMind" className="h-14 w-14 rounded-xl" />
        </Link>

        <ThemedText as="h1" className="text-2xl font-bold">
          Create your study workspace
        </ThemedText>
        <ThemedText variant="secondary" className="mt-2 text-sm leading-6">
          Start turning notes, PDFs, and tough topics into focused study
          sessions.
        </ThemedText>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ThemedInput
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={updateField}
              autoComplete="given-name"
              required
            />
            <ThemedInput
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={updateField}
              autoComplete="family-name"
              required
            />
          </div>
          <ThemedInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={updateField}
            autoComplete="email"
            required
          />
          <ThemedInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create a password"
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
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={updateField}
            autoComplete="new-password"
            minLength={8}
            required
          />
          <ThemedButton
            type="submit"
            className="w-full rounded-xl py-3"
            disabled={isSubmitting || verificationEmailSent}
          >
            {verificationEmailSent
              ? "Verification email sent"
              : isSubmitting
                ? "Creating account..."
                : "Create Account"}
          </ThemedButton>
        </form>

        {verificationEmailSent && (
          <ThemedText variant="brand" className="mt-5 text-center text-sm font-semibold">
            Verification email sent. Please verify your email before signing in.
          </ThemedText>
        )}

        <ThemedText variant="secondary" className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-cyan-600 dark:text-cyan-300">
            Sign in
          </Link>
        </ThemedText>
      </ThemedCard>
    </ThemedPage>
  );
}
