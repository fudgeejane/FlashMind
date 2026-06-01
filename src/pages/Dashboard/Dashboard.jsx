import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">
          FlashMind
        </Link>
        <h1 className="mt-6 text-4xl font-bold">Dashboard</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Your authenticated FlashMind dashboard route is ready.
        </p>
      </div>
    </main>
  );
}
