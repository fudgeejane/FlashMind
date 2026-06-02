import {
  Activity,
  Award,
  BarChart3,
  Bot,
  Brain,
  CalendarClock,
  CheckCircle2,
  FileUp,
  Layers3,
  Play,
  Plus,
  Repeat2,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  classNames,
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
  ThemedPage,
} from "../../components/Theme";
import { useStudyAnalytics } from "../../hooks/useStudyAnalytics";
import { useStudyDecks } from "../../hooks/useStudyDecks";

const actionConfig = [
  { label: "Create Deck", to: "/decks", icon: Plus },
  { label: "Upload PDF", to: "/decks", icon: FileUp },
  { label: "Generate AI Deck", to: "/decks", icon: Bot },
  { label: "Continue Studying", to: "/study", icon: Play },
];

function MiniBarChart({ data, metric }) {
  const maxValue = Math.max(1, ...data.map((item) => item[metric] || 0));

  return (
    <div className="flex h-48 items-end gap-2">
      {data.map((item) => (
        <div key={`${item.day}-${metric}`} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-36 w-full items-end rounded-md bg-theme-surface-muted">
            <div
              className="w-full rounded-md bg-theme-primary transition-all"
              style={{ height: item[metric] ? `${Math.max(12, (item[metric] / maxValue) * 100)}%` : "0%" }}
            />
          </div>
          <span className="text-xs font-bold text-theme-text-muted">{item.day}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressPill({ label, value, tone = "primary" }) {
  const toneClass =
    tone === "success" ? "bg-theme-success" : tone === "warning" ? "bg-theme-warning" : "bg-theme-primary";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-bold text-theme-text-primary">{label}</span>
        <span className="font-black text-theme-text-primary">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-theme-surface-muted">
        <div className={classNames("h-full rounded-full", toneClass)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <ThemedCard className="p-8 text-center">
      <Brain className="mx-auto h-10 w-10 text-theme-primary" />
      <ThemedCardHead as="h2" className="mt-4">No Firebase decks yet</ThemedCardHead>
      <ThemedCardParagraph className="mx-auto mt-2 max-w-xl">
        Create a manual deck, generate one with Gemini, or build one from a PDF. Dashboard analytics will populate from your saved Firestore data.
      </ThemedCardParagraph>
      <ThemedButton as={Link} to="/decks" className="mt-5 gap-2">
        <Plus className="h-4 w-4" />
        Create first deck
      </ThemedButton>
    </ThemedCard>
  );
}

function TopicList({ title, icon: Icon, cards, tone }) {
  return (
    <ThemedCard className="p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className={classNames("grid h-10 w-10 place-items-center rounded-lg", tone)}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <ThemedCardHead as="h2" className="text-xl">{title}</ThemedCardHead>
          <ThemedCardParagraph>Based on saved card stats.</ThemedCardParagraph>
        </div>
      </div>
      {cards.length ? (
        <div className="space-y-3">
          {cards.map((card) => (
            <div key={card.id} className="rounded-lg border border-theme-border bg-theme-surface-muted p-4">
              <p className="font-black text-theme-text-primary">{card.concept}</p>
              <p className="mt-1 text-sm text-theme-text-secondary">{card.deckTitle}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-theme-border bg-theme-surface-muted p-4 text-sm font-bold text-theme-text-muted">
          Study cards to generate topic signals.
        </p>
      )}
    </ThemedCard>
  );
}

export default function Dashboard() {
  const { decks, loading, error } = useStudyDecks();
  const analytics = useStudyAnalytics(decks);

  const overviewCards = [
    { label: "Total Decks", value: analytics.stats.totalDecks, icon: Layers3 },
    { label: "Total Flashcards", value: analytics.stats.totalCards, icon: Brain },
    { label: "Study Sessions", value: analytics.stats.studySessions, icon: Repeat2 },
    { label: "Average Accuracy", value: `${analytics.stats.averageAccuracy}%`, icon: Target },
    { label: "Cards Mastered", value: analytics.stats.masteredCards, icon: CheckCircle2 },
    { label: "Needs Review", value: analytics.stats.reviewCards, icon: Activity },
  ];

  const performance = [
    { label: "Daily Accuracy", value: `${analytics.weeklyStudy.at(-1)?.accuracy || 0}%`, icon: Activity },
    { label: "Weekly Accuracy", value: `${analytics.stats.averageAccuracy}%`, icon: BarChart3 },
    { label: "Monthly Accuracy", value: `${analytics.stats.averageAccuracy}%`, icon: Award },
  ];

  return (
    <ThemedPage className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-theme-primary">Exam command center</p>
          <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
            Live Firebase analytics for decks, sessions, accuracy, mastery, weak topics, and study activity.
          </p>
        </div>
        <ThemedButton as={Link} to="/study" className="gap-2">
          <Play className="h-4 w-4" />
          Start review
        </ThemedButton>
      </section>

      {error && (
        <div className="rounded-lg border border-theme-error/30 bg-theme-error/10 px-4 py-3 text-sm font-bold text-theme-error">
          {error}
        </div>
      )}

      {loading ? (
        <ThemedCard className="p-8 text-center">
          <ThemedCardHead>Loading Firebase decks...</ThemedCardHead>
        </ThemedCard>
      ) : decks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
            {overviewCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <ThemedCard key={stat.label} className="p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-bold text-theme-text-muted">Firebase</span>
                  </div>
                  <ThemedCardHead className="text-3xl">{stat.value}</ThemedCardHead>
                  <ThemedCardParagraph className="mt-1 font-bold">{stat.label}</ThemedCardParagraph>
                </ThemedCard>
              );
            })}
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_0.85fr]">
            <ThemedCard className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <ThemedCardHead as="h2">Weekly Study Chart</ThemedCardHead>
                  <ThemedCardParagraph>Cards reviewed from saved study sessions.</ThemedCardParagraph>
                </div>
                <BarChart3 className="h-5 w-5 text-theme-primary" />
              </div>
              <MiniBarChart data={analytics.weeklyStudy} metric="cards" />
            </ThemedCard>

            <ThemedCard className="p-5">
              <ThemedCardHead as="h2">Quick Actions</ThemedCardHead>
              <ThemedCardParagraph className="mb-4">Common study workflows.</ThemedCardParagraph>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {actionConfig.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.label}
                      to={action.to}
                      className="flex items-center gap-3 rounded-lg border border-theme-border bg-theme-surface-muted px-4 py-3 text-sm font-bold text-theme-text-primary transition hover:border-theme-primary hover:bg-theme-primary/10"
                    >
                      <Icon className="h-4 w-4 text-theme-primary" />
                      {action.label}
                    </Link>
                  );
                })}
              </div>
            </ThemedCard>
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <ThemedCard className="p-5 xl:col-span-2">
              <div className="mb-5">
                <ThemedCardHead as="h2">Recent Activity</ThemedCardHead>
                <ThemedCardParagraph>Recently studied decks and latest quiz scores.</ThemedCardParagraph>
              </div>
              <div className="space-y-3">
                {analytics.recentDecks.map((deck) => (
                  <div
                    key={deck.id}
                    className="grid gap-3 rounded-lg border border-theme-border bg-theme-surface-muted p-4 md:grid-cols-[1fr_auto_auto]"
                  >
                    <div>
                      <p className="font-black text-theme-text-primary">{deck.title}</p>
                      <p className="mt-1 text-sm text-theme-text-secondary">{deck.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-theme-text-secondary">
                      <Target className="h-4 w-4 text-theme-primary" />
                      {deck.quizScores.at(-1) || 0}% last score
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-theme-text-secondary">
                      <CalendarClock className="h-4 w-4 text-theme-primary" />
                      {deck.lastStudied ? new Date(deck.lastStudied).toLocaleDateString() : "Not studied"}
                    </div>
                  </div>
                ))}
              </div>
            </ThemedCard>

            <ThemedCard className="p-5">
              <ThemedCardHead as="h2">Mastery Progress</ThemedCardHead>
              <ThemedCardParagraph className="mb-5">Adaptive score bands.</ThemedCardParagraph>
              <div className="space-y-5">
                <ProgressPill label="Mastered" value={analytics.masteredPercent} tone="success" />
                <ProgressPill label="Good or better" value={analytics.goodPercent} />
                <ProgressPill label="Needs review" value={analytics.reviewPercent} tone="warning" />
              </div>
            </ThemedCard>
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <ThemedCard className="p-5">
              <ThemedCardHead as="h2">Accuracy Trend</ThemedCardHead>
              <ThemedCardParagraph className="mb-5">Daily accuracy from study sessions.</ThemedCardParagraph>
              <MiniBarChart data={analytics.weeklyStudy} metric="accuracy" />
            </ThemedCard>

            <ThemedCard className="p-5">
              <ThemedCardHead as="h2">Study Heatmap</ThemedCardHead>
              <ThemedCardParagraph className="mb-5">Activity calendar from Firebase sessions.</ThemedCardParagraph>
              <div className="grid grid-cols-7 gap-2">
                {analytics.activityHeatmap.map((day) => (
                  <span
                    key={day.id}
                    className={classNames(
                      "aspect-square rounded-md border border-theme-border",
                      day.count === 0 && "bg-theme-surface-muted",
                      day.count === 1 && "bg-theme-primary/20",
                      day.count === 2 && "bg-theme-primary/40",
                      day.count >= 3 && day.count < 6 && "bg-theme-primary/70",
                      day.count >= 6 && "bg-theme-primary"
                    )}
                    title={`${day.count} sessions`}
                  />
                ))}
              </div>
            </ThemedCard>
          </section>

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {performance.map((item) => {
              const Icon = item.icon;

              return (
                <ThemedCard key={item.label} className="p-5">
                  <Icon className="mb-4 h-5 w-5 text-theme-primary" />
                  <p className="text-2xl font-black text-theme-text-primary">{item.value}</p>
                  <p className="mt-1 text-xs font-bold text-theme-text-muted">{item.label}</p>
                </ThemedCard>
              );
            })}
          </section>

          <section className="grid gap-4 xl:grid-cols-2">
            <TopicList title="Weak Topics" icon={TrendingDown} cards={analytics.weakCards} tone="bg-theme-warning/15 text-theme-warning" />
            <TopicList title="Strong Topics" icon={TrendingUp} cards={analytics.strongCards} tone="bg-theme-success/15 text-theme-success" />
          </section>
        </>
      )}
    </ThemedPage>
  );
}
