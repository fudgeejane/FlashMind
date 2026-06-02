import { Bot, CheckCircle2, FileText, Layers3, ListChecks, Sparkles } from "lucide-react";

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

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="flex min-h-[100svh] items-center px-5 py-28 sm:py-32 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl" data-reveal-block>
          <p className="text-sm font-black uppercase text-cyan-600 dark:text-cyan-300">
            Features
          </p>
          <h2 data-feature-title className="mt-4 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Everything students need to turn material into memory.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {features.map((feature) => (
            <div key={feature.title} data-feature-card>
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
