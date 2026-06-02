import { FileText, ListChecks, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemedButton } from "../../../components/Theme";

const aboutHighlights = [
  {
    title: "Smart Flashcards",
    description: "Auto-generated cards from PDFs and notes.",
    icon: Sparkles,
  },
  {
    title: "Quizzes & Checks",
    description: "Multiple-choice and true/false practice.",
    icon: ListChecks,
  },
  {
    title: "PDF Processing",
    description: "Turn documents into study decks instantly.",
    icon: FileText,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex min-h-[100svh] items-center border-y border-slate-200 bg-white px-5 py-28 dark:border-white/10 dark:bg-slate-900/60 sm:py-32 lg:px-8"
    >
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden">
        <div
          data-about-orb
          className="pointer-events-none absolute -left-8 top-8 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10"
          aria-hidden="true"
        />
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8" data-reveal-block>
            <div>
              <p data-about-badge className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-300">
                About FlashMind
              </p>

              <h2
                data-about-title
                className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl"
              >
                A simpler way to prepare for exams.
              </h2>
            </div>

            <div data-about-copy className="flex flex-col gap-3 text-base leading-8 text-slate-600 dark:text-slate-300">
              <p>
                Upload PDFs, paste study notes, or start from a topic. FlashMind uses Gemini AI to draft
                high-quality study materials that keep review sessions active instead of passive.
              </p>

              <p>
                Students can move between flashcards, quizzes, true or false checks, and chatbot help while
                Firebase Authentication and Firestore keep the workspace secure and persistent.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ThemedButton as={Link} to="/signup" className="px-6 py-3">
                  Get Started
                </ThemedButton>
                <ThemedButton
                  as={Link}
                  to="#features"
                  className="bg-white/50 px-6 py-3 text-slate-900 dark:bg-white/10 dark:text-white"
                >
                  See Features
                </ThemedButton>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-md items-center justify-center" data-reveal-block>
            <div data-about-card className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <p className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-300">Highlights</p>
              <h3 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">What FlashMind helps you do</h3>
              <ul className="mt-5 grid gap-3">
                {aboutHighlights.map((highlight) => {
                  const Icon = highlight.icon;

                  return (
                    <li key={highlight.title} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-white/6 dark:bg-slate-950">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{highlight.title}</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{highlight.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
