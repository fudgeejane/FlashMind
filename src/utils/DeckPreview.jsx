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
  const hasPrevious = cardIndex > 0;
  const hasNext = cardIndex < deck.cards.length - 1;

  return (
    <div className="modal-overlay">
      <ThemedCard className="max-h-[70vh] min-h-[70vh] w-full max-w-3xl overflow-hidden">
        <header className="flex items-start justify-between gap-4 border-b border-theme-border p-5">
          <div className='fle gap-2'>
            <p className="text-xs font-black uppercase tracking-wide text-theme-primary">Deck preview</p>
            <ThemedCardHead as="h2" className="mt-1">{deck.title}</ThemedCardHead>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close deck preview"
            className="grid p-2 shrink-0 cursor-pointer place-items-center rounded-lg border border-theme-border text-theme-text-secondary transition hover:border-theme-primary hover:text-theme-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {card ? (
          <div className="space-y-5 overflow-y-auto p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                  <span className="rounded-full bg-theme-primary/10 px-3 py-1 text-xs font-black text-theme-primary">
                Question {cardIndex + 1} of {deck.cards.length}
              </span>
             
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={`rounded-full border p-1.5 disabled:cursor-not-allowed disabled:border-theme-border/50 ${
                  hasPrevious
                    ? "border-theme-primary bg-theme-primary/10 text-theme-primary cursor-pointer"
                    : "border-theme-border text-theme-text-secondary"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                className={`rounded-full border p-1.5 disabled:cursor-not-allowed disabled:border-theme-border/50 ${
                  hasNext
                    ? "border-theme-primary bg-theme-primary/10 text-theme-primary cursor-pointer"
                    : "border-theme-border text-theme-text-secondary"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

            <section className="rounded-lg border border-theme-border bg-theme-surface-muted p-5">
              <p className="text-xs font-black uppercase tracking-wide text-theme-primary">Question</p>
              <p className="mt-2  leading-tight text-theme-text-primary">{card.question}</p>
            </section>

            <section className="rounded-lg border border-theme-border bg-theme-surface-muted p-5">
              <p className="text-xs font-black uppercase tracking-wide text-theme-success">Answer</p>
              <p className="mt-2  leading-tight text-theme-text-primary">{card.answer}</p>
            </section>

            {(card.concept || card.explanation) && (
              <section className="rounded-lg border border-theme-border bg-theme-surface-muted p-5">
                <p className="text-xs font-black uppercase tracking-wide text-theme-text-muted">Notes</p>
                {card.explanation && <p className="mt-2 text-sm leading-tight text-theme-text-primary">{card.explanation}</p>}
              </section>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <ThemedCardHead as="h3">No cards in this deck</ThemedCardHead>
          </div>
        )}

       
      </ThemedCard>
    </div>
  );
}
