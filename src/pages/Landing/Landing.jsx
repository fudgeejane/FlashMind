import { useState } from "react";
import {
  Bot,
  CheckCircle2,
  FileText,
  Layers3,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  ThemeToggle,
  ThemedButton,
  ThemedInput,
  ThemedPage,
} from "../../components/Theme";
import Logo from "../../assets/FlashMind.png";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    title: "AI Flashcard Generator",
    description:
      "Generate intelligent flashcards automatically from uploaded PDFs, notes, or user-provided content to make studying more efficient.",
    accent: "bg-cyan-500",
    icon: Sparkles,
  },
  {
    title: "Multiple-Choice Quizzes",
    description:
      "Practice and assess knowledge through AI-generated multiple-choice questions tailored to the study material.",
    accent: "bg-emerald-500",
    icon: ListChecks,
  },
  {
    title: "True-or-False Assessments",
    description:
      "Reinforce learning with quick true-or-false questions designed to improve recall and understanding.",
    accent: "bg-amber-500",
    icon: CheckCircle2,
  },
  {
    title: "PDF Study Material Processing",
    description:
      "Upload PDF documents and transform their contents into interactive flashcards, quizzes, and study decks.",
    accent: "bg-rose-500",
    icon: FileText,
  },
  {
    title: "AI Study Assistant",
    description:
      "Interact with an AI chatbot that answers questions, explains concepts, and provides personalized learning support.",
    accent: "bg-indigo-500",
    icon: Bot,
  },
  {
    title: "Manual Deck Creation",
    description:
      "Create and organize custom study decks for any subject, topic, or course material.",
    accent: "bg-orange-500",
    icon: Layers3,
  },
];

function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-100/60 dark:border-white/10 dark:bg-slate-900 dark:hover:border-cyan-400/50 dark:hover:shadow-black/30 xl:p-6">
      <div className="flex items-center justify-between gap-4">
        <span className={`block h-2 w-10 rounded-full ${feature.accent}`} />
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-cyan-700 transition group-hover:bg-cyan-50 group-hover:text-cyan-600 dark:bg-white/10 dark:text-cyan-300 dark:group-hover:bg-cyan-400/10">
          <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
        </span>
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white xl:mt-5 xl:text-lg">
        {feature.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300 xl:mt-3">
        {feature.description}
      </p>
    </article>
  );
}

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ThemedPage>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img src={Logo} alt="FlashMind Logo" className="h-10 w-10 rounded-xl" />
            <span className="text-lg font-bold">FlashMind</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              to="/signin"
              className="rounded-full px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 lg:hidden dark:border-white/10"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden dark:border-white/10 dark:bg-slate-950">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-semibold text-slate-700 dark:text-slate-200"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
                <ThemeToggle />
                <div className="flex gap-2">
                  <Link to="/signin" className="rounded-full px-4 py-2 text-sm font-bold">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white dark:bg-cyan-400 dark:text-slate-950"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-28 sm:py-32 lg:px-8"
        >
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/30 blur-3xl dark:bg-cyan-500/10 sm:h-96 sm:w-96" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
          

            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-950 sm:mt-7 sm:text-6xl lg:text-7xl dark:text-white">
              Study Smarter with AI-Powered Learning
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
              FlashMind helps students transform course material into flashcards,
              multiple-choice quizzes, true or false assessments, and guided AI
              explanations in one focused workspace.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row">
              <ThemedButton
                as={Link}
                to="/signup"
                className="px-7 py-4"
              >
                Get Started
              </ThemedButton>

              <ThemedButton
                as="a"
                variant="secondary"
                href="#about"
                className="px-7 py-4"
              >
                Learn More
              </ThemedButton>
            </div>
          </div>
        </section>

       <section
        id="about"
        className="flex min-h-[100svh] items-center border-y border-slate-200 bg-white px-5 py-28 dark:border-white/10 dark:bg-slate-900/60 sm:py-32 lg:px-8"
      >
        <div className="flex flex-col mx-auto w-full max-w-3xl gap-8">

          <div>
            <p className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-300">
              About FlashMind
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              A simpler way to prepare for exams.
            </h2>
          </div>

          <div className="flex flex-col gap-3 text-base leading-8 text-slate-600 dark:text-slate-300">
            <p>
              Upload PDFs, paste study notes, or start from a topic. FlashMind uses
              Gemini AI to draft high-quality study materials that keep review
              sessions active instead of passive.
            </p>

            <p>
              Students can move between flashcards, quizzes, true or false checks,
              and chatbot help while Firebase Authentication and Firestore keep the
              workspace secure and persistent.
            </p>
          </div>

        </div>
      </section>

        <section
          id="features"
          className="flex min-h-[100svh] items-center px-5 py-28 sm:py-32 lg:px-8"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-300">
                Features
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                Everything students need to turn material into memory.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="flex min-h-[100svh] items-center bg-white px-5 py-28 dark:bg-slate-900/60 sm:py-32 lg:px-8"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-300">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                Questions, feedback, or collaboration ideas?
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                Send a note and the FlashMind team will help you shape a smoother
                study flow.
              </p>
            </div>
            <form className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/60 sm:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <ThemedInput label="Name" name="name" />
                <ThemedInput label="Email" type="email" name="email" />
              </div>
              <ThemedInput label="Subject" name="subject" />
              <ThemedInput label="Message" name="message" rows="5" textarea />
              <ThemedButton type="submit" className="px-7 py-4">
                Send Message
              </ThemedButton>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 px-5 py-10 text-white dark:border-white/10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400 text-sm font-black text-slate-950">
                FM
              </span>
              <span className="text-xl font-black">FlashMind</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              AI-powered study tools for faster, more confident learning.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-cyan-300">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Social Links</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {["GitHub", "Facebook", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#home"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  {social}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Copyright {new Date().getFullYear()} FlashMind. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </ThemedPage>
  );
}
