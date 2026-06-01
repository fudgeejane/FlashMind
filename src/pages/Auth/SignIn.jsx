import AuthShell from "./AuthShell";

export default function SignIn() {
  return (
    <AuthShell
      mode="signin"
      title="Welcome back"
      subtitle="Sign in to continue building decks, reviewing quizzes, and studying with your AI assistant."
    />
  );
}
