import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ThemedButton,
  ThemedCard,
  ThemedInput,
  ThemedPage,
  ThemedText,
} from "../components/Theme";
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import Logo from "../assets/FlashMind.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useFirebaseAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      navigate("/loading?purpose=signin", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemedPage as="main" className="grid place-items-center px-5 py-12 h-screen">
      <ThemedCard as="section" className="w-full max-w-md p-8 shadow-xl">
        <Link to="/" className="mb-8 mx-auto flex items-center justify-center">
          <img src={Logo} alt="FlashMind" className="h-14 w-14 rounded-xl" />
        </Link>

        <ThemedText as="h1" className="text-2xl font-bold">
          Welcome back
        </ThemedText>
        <ThemedText variant="secondary" className="mt-2 text-sm leading-6">
          Sign in to continue building decks, reviewing quizzes, and studying
          with your AI assistant.
        </ThemedText>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <ThemedInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={updateField}
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
          <ThemedInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={updateField}
            autoComplete="off"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className="ml-auto block text-sm font-semibold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-300"
          >
            Forgot password?
          </button>
          <ThemedButton
            type="submit"
            className="w-full rounded-xl py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </ThemedButton>
        </form>

        <ThemedText variant="secondary" className="mt-6 text-center text-sm">
          New to FlashMind?{" "}
          <Link to="/signup" className="font-semibold text-cyan-600 dark:text-cyan-300">
            Create an account
          </Link>
        </ThemedText>
      </ThemedCard>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </ThemedPage>
  );
}
