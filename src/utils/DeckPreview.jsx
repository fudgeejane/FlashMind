import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
} from "../components/Theme";

export default function GitPreview({ deck, cardIndex, onClose, onPrevious, onNext }) {
  if (!deck) {
    return null;
  }

  const card = deck.cards[cardIndex] || null;

  return (
    <div className="modal-overlay">
      <ThemedCard className="max-h-[80vh] min-h-[80vh] w-full max-w-3xl overflow-hidden">
        <header className="flex items-start justify-between gap-4 border-b border-theme-border p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-theme-primary">Deck preview</p>
            <ThemedCardHead as="h2" className="mt-1">{deck.title}</ThemedCardHead>
            <ThemedCardParagraph>{deck.cards.length} questions and answers</ThemedCardParagraph>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close deck preview"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-theme-border text-theme-text-secondary transition hover:border-theme-primary hover:text-theme-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {card ? (
          <div className="space-y-5 overflow-y-auto p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-theme-primary/10 px-3 py-1 text-xs font-black text-theme-primary">
                Question {cardIndex + 1} of {deck.cards.length}
              </span>
              <span className="rounded-full bg-theme-surface-muted px-3 py-1 text-xs font-black text-theme-text-secondary">
                {card.difficulty || "Medium"}
              </span>
            </div>

            <section className="rounded-lg border border-theme-border bg-theme-surface-muted p-5">
              <p className="text-xs font-black uppercase tracking-wide text-theme-primary">Question {cardIndex + 1}</p>
              <p className="mt-3 text-xl font-black leading-tight text-theme-text-primary">{card.question}</p>
            </section>

            <section className="rounded-lg border border-theme-border bg-theme-surface-muted p-5">
              <p className="text-xs font-black uppercase tracking-wide text-theme-success">Answer</p>
              <p className="mt-3 text-lg font-bold leading-7 text-theme-text-primary">{card.answer}</p>
            </section>

            {(card.concept || card.explanation) && (
              <section className="rounded-lg border border-theme-border bg-theme-surface-muted p-5">
                <p className="text-xs font-black uppercase tracking-wide text-theme-text-muted">Notes</p>
                {card.concept && <p className="mt-3 text-sm font-black text-theme-text-primary">{card.concept}</p>}
                {card.explanation && <p className="mt-2 text-sm leading-6 text-theme-text-secondary">{card.explanation}</p>}
              </section>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <ThemedCardHead as="h3">No cards in this deck</ThemedCardHead>
          </div>
        )}

        <footer className="flex items-center justify-between gap-3 border-t border-theme-border p-5">
          <ThemedButton type="button" variant="secondary" onClick={onPrevious} disabled={!deck.cards.length} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </ThemedButton>
          <ThemedButton type="button" onClick={onNext} disabled={!deck.cards.length} className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </ThemedButton>
        </footer>
      </ThemedCard>
    </div>
  );
}
