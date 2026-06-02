import { X } from "lucide-react";
import {
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
} from "../components/Theme";

export default function RecentTakesModal({ isOpen, results, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <ThemedCard className="max-h-[80vh] w-full max-w-3xl overflow-hidden">
        <header className="flex items-start justify-between gap-4 border-b border-theme-border p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-theme-primary">
              Recent takes
            </p>
            <ThemedCardHead as="h2" className="mt-1">
              Session quiz scores
            </ThemedCardHead>
            <ThemedCardParagraph className="mt-2 text-theme-text-secondary">
              Each entry is a completed study session. Typing answers with 50% or higher count as correct.
            </ThemedCardParagraph>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recent takes"
            className="grid p-2 shrink-0 cursor-pointer place-items-center rounded-lg border border-theme-border text-theme-text-secondary transition hover:border-theme-primary hover:text-theme-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="overflow-y-auto p-5">
          {results.length === 0 ? (
            <div className="rounded-3xl border border-theme-border bg-theme-surface p-8 text-center">
              <ThemedCardHead as="h3" className="text-lg">
                No recent sessions yet
              </ThemedCardHead>
              <ThemedCardParagraph className="mt-2 text-theme-text-secondary">
                Complete a study session to see your quiz score history here.
              </ThemedCardParagraph>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((session, index) => (
                <div
                  key={`${session.deckId}-${session.time}-${index}`}
                  className="rounded-3xl border border-theme-border bg-theme-surface p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
                        {session.deckTitle}
                      </p>
                      <p className="mt-1 text-base font-bold text-theme-text-primary">
                        {session.date} · {session.time}
                      </p>
                    </div>
                    <div className="rounded-full border px-3 py-1 text-sm font-semibold text-theme-primary">
                      Score: {session.score}%
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-theme-border bg-theme-surface-muted p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-theme-text-secondary">
                        Correct
                      </p>
                      <p className="mt-2 text-lg font-bold text-theme-text-primary">
                        {session.correctCount}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-theme-border bg-theme-surface-muted p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-theme-text-secondary">
                        Total cards
                      </p>
                      <p className="mt-2 text-lg font-bold text-theme-text-primary">
                        {session.totalCards}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-theme-border bg-theme-surface-muted p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-theme-text-secondary">
                        Status
                      </p>
                      <p className="mt-2 text-lg font-bold text-theme-text-primary">
                        {session.score >= 50 ? "Passed" : "Review"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="border-t border-theme-border p-5 text-right">
          <ThemedButton type="button" variant="secondary" onClick={onClose}>
            Close
          </ThemedButton>
        </footer>
      </ThemedCard>
    </div>
  );
}
