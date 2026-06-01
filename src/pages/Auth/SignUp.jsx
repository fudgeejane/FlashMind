import AuthShell from "./AuthShell";

export default function SignUp() {
  return (
    <AuthShell
      mode="signup"
      title="Create your study workspace"
      subtitle="Start turning notes, PDFs, and tough topics into focused study sessions."
    />
  );
}
