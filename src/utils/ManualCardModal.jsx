import { Trash2, X } from "lucide-react";
import {
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
  ThemedInput,
} from "../components/Theme";

export default function ManualCardModal({
  isOpen,
  cards,
  draft,
  onClose,
  onChange,
  onSave,
  onStartAdd,
  onUpdateCard,
  onDelete,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <ThemedCard className="flex min-h-[80vh] max-h-[80vh] w-full max-w-5xl flex-col overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-theme-border p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div>
            <ThemedCardHead as="h2" className="text-2xl font-black tracking-tight">
              Manage flashcards
            </ThemedCardHead>
            <ThemedCardParagraph className="text-sm leading-6 text-theme-text-secondary">
              Add cards above. Edit saved questions and answers directly in the list.
            </ThemedCardParagraph>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close card manager"
              className="grid cursor-pointer place-items-center rounded-lg border border-theme-border p-2 text-theme-text-secondary transition hover:border-theme-primary hover:text-theme-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-b border-theme-border bg-theme-surface p-4 sm:p-6">
          <div className="rounded-lg border border-theme-border bg-theme-surface-muted p-4">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                onSave();
              }}
            >
              <p className="text-xs font-black uppercase tracking-wide text-theme-primary">
                New flashcard
              </p>
              <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
                <ThemedInput
                  label="Question"
                  value={draft.question}
                  onChange={(event) => onChange("question", event.target.value)}
                  placeholder="Enter a new question."
                />
                <ThemedInput
                  label="Answer"
                  value={draft.answer}
                  onChange={(event) => onChange("answer", event.target.value)}
                  placeholder="Enter the answer."
                />
                <ThemedButton
                  type="button"
                  variant="secondary"
                  onClick={onStartAdd}
                  className="h-11 rounded-lg px-5"
                >
                  Clear
                </ThemedButton>
              </div>
              <div className="flex justify-end">
                <ThemedButton
                  type="submit"
                  disabled={!draft.question.trim() || !draft.answer.trim()}
                  className="h-11 min-w-36 rounded-lg px-5"
                >
                  Add card
                </ThemedButton>
              </div>
            </form>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-theme-bg/40 p-5 sm:p-6">
          {cards.length ? (
            <div className="space-y-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-theme-border bg-theme-surface p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-theme-text-primary">Question {index + 1}</p>
                    </div>
                    <ThemedButton type="button" variant="secondary" onClick={() => onDelete(index)} className="p-2">
                      <Trash2 className="h-4 w-4" />
                    </ThemedButton>
                  </div>
                  <div className="mt-2 grid gap-3 lg:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-black uppercase tracking-wide text-theme-text-muted">Question</span>
                      <input
                        value={card.question}
                        onChange={(event) => onUpdateCard(index, "question", event.target.value)}
                        className="mt-2 w-full rounded-lg border border-theme-border bg-theme-surface px-4 py-3 text-sm font-semibold text-theme-text-primary outline-none transition focus:border-theme-primary focus:ring-4 focus:ring-theme-primary/15"
                        placeholder="Question"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-black uppercase tracking-wide text-theme-text-muted">Answer</span>
                      <textarea
                        value={card.answer}
                        onChange={(event) => onUpdateCard(index, "answer", event.target.value)}
                        rows={1}
                        className="mt-2 w-full resize-none rounded-lg border border-theme-border bg-theme-surface px-4 py-3 text-sm font-semibold text-theme-text-primary outline-none transition focus:border-theme-primary focus:ring-4 focus:ring-theme-primary/15"
                        placeholder="Answer"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-theme-border bg-theme-surface-muted p-6 text-sm text-theme-text-secondary">
              No cards yet. Use the button above to add your first flashcard.
            </div>
          )}
        </div>
      </ThemedCard>
    </div>
  );
}
