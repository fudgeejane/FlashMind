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


function MiniBarChart({ data, metric }) {
  const maxValue = Math.max(1, ...data.map((item) => item[metric] || 0));

  return (
    <div className="flex h-48 items-end gap-2">
      {data.map((item) => (
        <div key={`${item.day}-${item.date}-${metric}`} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-36 w-full items-end rounded-md bg-theme-surface-muted">
            <div
              className="w-full rounded-md bg-theme-primary transition-all"
              style={{ height: item[metric] ? `${Math.max(12, (item[metric] / maxValue) * 100)}%` : "0%" }}
            />
          </div>
          <div className="text-center text-xs text-theme-text-muted">
            <div className="font-bold text-theme-text-primary">{item.day}</div>
            <div>{item.date}</div>
          </div>
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

function DashboardSkeleton() {
  return (
    <>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ThemedCard key={index} className="animate-pulse px-6 py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-3">
                <div className="h-4 w-28 rounded-full bg-theme-surface-muted" />
                <div className="h-10 w-28 rounded-2xl bg-theme-surface-muted" />
              </div>
              <div className="h-10 w-10 rounded-2xl bg-theme-surface-muted" />
            </div>
          </ThemedCard>
        ))}
      </section>

      <section className="grid items-start grid-cols-1 gap-4 xl:grid-cols-[1.5fr_0.85fr]">
        <ThemedCard className="animate-pulse p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-5 w-48 rounded-full bg-theme-surface-muted" />
              <div className="h-3 w-64 rounded-full bg-theme-surface-muted" />
            </div>
            <div className="h-5 w-5 rounded-full bg-theme-surface-muted" />
          </div>
          <div className="flex h-48 items-end gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-36 w-full items-end rounded-md bg-theme-surface-muted" />
                <div className="h-3 w-12 rounded-full bg-theme-surface-muted" />
                <div className="h-3 w-10 rounded-full bg-theme-surface-muted" />
              </div>
            ))}
          </div>
        </ThemedCard>

        <ThemedCard className="animate-pulse p-5">
          <div className="space-y-4">
            <div className="h-6 w-40 rounded-full bg-theme-surface-muted" />
            <div className="h-4 w-64 rounded-full bg-theme-surface-muted" />
            <div className="rounded-2xl border border-theme-border bg-theme-surface-muted p-4">
              <div className="space-y-3">
                <div className="h-4 w-36 rounded-full bg-theme-surface-muted" />
                <div className="h-4 w-32 rounded-full bg-theme-surface-muted" />
                <div className="h-4 w-full rounded-full bg-theme-surface-muted" />
              </div>
            </div>
          </div>
        </ThemedCard>
      </section>
    </>
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
  ];

  const performance = [
    { label: "Daily Accuracy", value: `${analytics.weeklyStudy.at(-1)?.accuracy || 0}%`, icon: Activity },
    { label: "Weekly Accuracy", value: `${analytics.stats.averageAccuracy}%`, icon: BarChart3 },
    { label: "Monthly Accuracy", value: `${analytics.stats.averageAccuracy}%`, icon: Award },
  ];

  return (
    <ThemedPage className="space-y-6">

      {loading ? (
        <DashboardSkeleton />
      ) : decks.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <ThemedCard key={stat.label} className="px-6 py-4">
                  <div className=" flex items-start justify-between">
                    <ThemedCardParagraph className="font-bold">{stat.label}</ThemedCardParagraph>
                      <div className=" flex items-center justify-between gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
                          <Icon className="h-4 w-4" />
                       </span>
                    </div>
                  </div>
                  <ThemedCardHead className="text-3xl">{stat.value}</ThemedCardHead>
                </ThemedCard>
              );
            })}
          </section>

          <section className="grid items-start grid-cols-1 gap-4 xl:grid-cols-[1.5fr_0.85fr]">
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

            
             <div className="flex flex-col gap-6">
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
                        <div>
                      <p className="font-black text-theme-text-primary">{deck.title}</p>
                      <p className="mt-1 text-sm text-theme-text-secondary">{deck.description}</p>
                    </div>
                   <div className="mt-4 flex items-center gap-6 border-t border-theme-border pt-4 md:mt-0 md:border-t-0">
                       <div className="flex items-center gap-2 text-sm font-bold text-theme-text-secondary">
                      <Target className="h-4 w-4 text-theme-primary" />
                      {deck.quizScores.at(-1) || 0}% last score
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-theme-text-secondary">
                      <CalendarClock className="h-4 w-4 text-theme-primary" />
                      {deck.lastStudied ? new Date(deck.lastStudied).toLocaleDateString() : "Not studied"}
                    </div>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </ThemedCard>
            
          
             </div>

          </section>


       
        </>
      )}
    </ThemedPage>
  );
}
