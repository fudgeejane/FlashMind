import { useMemo, useState } from "react";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  FileUp,
  Layers3,
  Plus,
  Search,
  Sparkles,
  Tags,
  Trash2,
  X,
} from "lucide-react";
import {
  classNames,
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
  ThemedInput,
  ThemedPage,
} from "../../components/Theme";
import { useStudyDecks } from "../../hooks/useStudyDecks";
import { extractTextFromPdf } from "../../hooks/usePdfText";
import { getMasteryLevel, getMasteryScore } from "../../utils/studyMetrics";

const tabs = [
  { id: "manual", label: "Manual", icon: Plus },
  { id: "ai", label: "AI Generated", icon: Bot },
  { id: "pdf", label: "PDF Gen", icon: FileUp },
];

const emptyCard = {
  question: "",
  answer: "",
};

function getDeckMastery(deck) {
  if (!deck.cards.length) {
    return 0;
  }

  const score = deck.cards.reduce((sum, card) => sum + getMasteryScore(card), 0) / deck.cards.length;
  return Math.round(score);
}

function DeckCard({ deck, onDelete, onOpen }) {
  const mastery = getDeckMastery(deck);

  return (
    <ThemedCard
      className="cursor-pointer p-5"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(deck)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(deck);
        }
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
          <Layers3 className="h-5 w-5" />
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-theme-surface-muted px-3 py-1 text-xs font-black text-theme-text-secondary">
            {deck.source}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(deck.id);
            }}
            aria-label={`Delete ${deck.title}`}
            className="grid h-8 w-8 place-items-center rounded-lg border border-theme-border text-theme-text-muted transition hover:border-theme-error hover:text-theme-error"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ThemedCardHead as="h2" className="text-xl">{deck.title}</ThemedCardHead>
      <ThemedCardParagraph className="mt-2 min-h-12">{deck.description || "No description yet."}</ThemedCardParagraph>
      <div className="mt-4 flex flex-wrap gap-2">
        {deck.tags.map((tag, index) => (
          <span key={`${deck.id}-${tag}-${index}`} className="inline-flex items-center gap-1 rounded-full bg-theme-primary/10 px-3 py-1 text-xs font-bold text-theme-primary">
            <Tags className="h-3 w-3" />
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-theme-surface-muted p-3">
          <p className="text-lg font-black text-theme-text-primary">{deck.cards.length}</p>
          <p className="text-xs font-bold text-theme-text-muted">Cards</p>
        </div>
        <div className="rounded-lg bg-theme-surface-muted p-3">
          <p className="text-lg font-black text-theme-text-primary">{deck.quizScores.at(-1) || 0}%</p>
          <p className="text-xs font-bold text-theme-text-muted">Last quiz</p>
        </div>
        <div className="rounded-lg bg-theme-surface-muted p-3">
          <p className="text-lg font-black text-theme-text-primary">{mastery}%</p>
          <p className="text-xs font-bold text-theme-text-muted">{getMasteryLevel(mastery)}</p>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-theme-surface-muted">
        <div className="h-full rounded-full bg-theme-primary" style={{ width: `${mastery}%` }} />
      </div>
    </ThemedCard>
  );
}

function DeckPreviewModal({ deck, cardIndex, onClose, onPrevious, onNext }) {
  if (!deck) {
    return null;
  }

  const card = deck.cards[cardIndex] || null;

  return (
    <div className="modal-overlay">

      

      <ThemedCard className="max-h-[90vh] w-full max-w-3xl overflow-hidden">
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
              <p className="text-xs font-black uppercase tracking-wide text-theme-primary">Question</p>
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

export default function Decks() {
  const { decks, loading, error, createDeck, deleteDeck, generateAiDeck, generatePdfDeck } = useStudyDecks();
  const [activeTab, setActiveTab] = useState("manual");
  const [search, setSearch] = useState("");
  const [manualDeck, setManualDeck] = useState({
    title: "",
    description: "",
    tags: "",
    cards: [{ ...emptyCard }],
  });
  const [aiRequest, setAiRequest] = useState({ topic: "", subject: "", count: 8 });
  const [pdfRequest, setPdfRequest] = useState({ title: "", subject: "", extractedText: "", file: null });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [extractingPdf, setExtractingPdf] = useState(false);
  const [previewDeck, setPreviewDeck] = useState(null);
  const [previewCardIndex, setPreviewCardIndex] = useState(0);

  const filteredDecks = useMemo(() => {
    return decks.filter((deck) =>
      [deck.title, deck.description, deck.subject, deck.source, ...deck.tags]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [decks, search]);

  function updateManualCard(index, field, value) {
    setManualDeck((current) => ({
      ...current,
      cards: current.cards.map((card, cardIndex) => (cardIndex === index ? { ...card, [field]: value } : card)),
    }));
  }

  function addManualCard() {
    setManualDeck((current) => ({ ...current, cards: [...current.cards, { ...emptyCard }] }));
  }

  async function handleManualSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus("Saving manual deck to Firebase...");

    try {
      await createDeck({
        title: manualDeck.title,
        description: manualDeck.description,
        subject: "Custom",
        source: "Manual",
        tags: manualDeck.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        cards: manualDeck.cards.filter((card) => card.question.trim() && card.answer.trim()),
      });
      setManualDeck({ title: "", description: "", tags: "", cards: [{ ...emptyCard }] });
      setStatus("Manual deck saved to Firebase.");
    } catch (submitError) {
      setStatus(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAiSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus("Generating and saving AI deck...");

    try {
      await generateAiDeck(aiRequest);
      setAiRequest({ topic: "", subject: "", count: 8 });
      setStatus("AI generated deck saved to Firebase.");
    } catch (submitError) {
      setStatus(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePdfSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus("Uploading PDF and generating deck...");

    try {
      await generatePdfDeck(pdfRequest);
      setPdfRequest({ title: "", subject: "", extractedText: "", file: null });
      event.currentTarget.reset();
      setStatus("PDF generated deck saved to Firebase.");
    } catch (submitError) {
      setStatus(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handlePdfFileChange(file) {
    if (!file) {
      setPdfRequest({ ...pdfRequest, file: null, extractedText: "" });
      return;
    }

    setExtractingPdf(true);
    setStatus("Reading PDF text...");

    try {
      const extractedText = await extractTextFromPdf(file);
      setPdfRequest((current) => ({
        ...current,
        file,
        title: current.title || file.name.replace(/\.pdf$/i, ""),
        extractedText,
      }));
      setStatus("PDF text extracted. You can review it below, then generate the deck.");
    } catch (extractError) {
      setPdfRequest((current) => ({ ...current, file, extractedText: "" }));
      setStatus(extractError.message);
    } finally {
      setExtractingPdf(false);
    }
  }

  async function handleDelete(deckId) {
    setStatus("Deleting deck...");

    try {
      await deleteDeck(deckId);
      setStatus("Deck deleted.");
    } catch (deleteError) {
      setStatus(deleteError.message);
    }
  }

  function openDeckPreview(deck) {
    setPreviewDeck(deck);
    setPreviewCardIndex(0);
  }

  function showPreviousPreviewCard() {
    if (!previewDeck?.cards?.length) {
      return;
    }

    setPreviewCardIndex((current) => (current - 1 + previewDeck.cards.length) % previewDeck.cards.length);
  }

  function showNextPreviewCard() {
    if (!previewDeck?.cards?.length) {
      return;
    }

    setPreviewCardIndex((current) => (current + 1) % previewDeck.cards.length);
  }

  return (
    <ThemedPage className="space-y-6">
   
       <section>
          <p className="text-sm font-bold uppercase tracking-wide text-theme-primary">Choose a study deck</p>
          <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Study</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
            Select a Firebase deck first, then start answering in flashcard, quiz, true/false, typing, or exam mode.
          </p>
        </section>
    
      <section className="grid gap-4 xl:grid-cols-[24rem_1fr]">

          <div className="flex items-center flex-col gap-4">
              <div className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    "flex  items-center justify-center gap-2 rounded-xl px-2 py-2 text-xs font-black transition",
                    activeTab === tab.id
                      ? "bg-theme-primary text-white"
                      : "bg-theme-surface-muted text-theme-text-secondary hover:text-theme-text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

        <ThemedCard className="p-3">
        
          {activeTab === "manual" && (
            <form onSubmit={handleManualSubmit} className="mt-4 space-y-4 p-2">
              <ThemedCardHead as="h2" className="text-xl">Manual Deck</ThemedCardHead>
              <ThemedInput label="Deck title" value={manualDeck.title} onChange={(event) => setManualDeck({ ...manualDeck, title: event.target.value })} />
              <ThemedInput label="Description" textarea rows={3} value={manualDeck.description} onChange={(event) => setManualDeck({ ...manualDeck, description: event.target.value })} />
              <ThemedInput label="Tags" placeholder="Biology, Exam, Chapter 1" value={manualDeck.tags} onChange={(event) => setManualDeck({ ...manualDeck, tags: event.target.value })} />
              <div className="space-y-3">
                {manualDeck.cards.map((card, index) => (
                  <div key={index} className="rounded-lg border border-theme-border bg-theme-surface-muted p-3">
                    <ThemedInput label={`Question ${index + 1}`} value={card.question} onChange={(event) => updateManualCard(index, "question", event.target.value)} />
                    <ThemedInput label="Answer" className="mt-3" value={card.answer} onChange={(event) => updateManualCard(index, "answer", event.target.value)} />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <ThemedButton type="button" variant="secondary" onClick={addManualCard} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add card
                </ThemedButton>
                <ThemedButton type="submit" disabled={saving} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Save
                </ThemedButton>
              </div>
            </form>
          )}

          {activeTab === "ai" && (
            <form onSubmit={handleAiSubmit} className="mt-4 space-y-4 p-2">
              <ThemedCardHead as="h2" className="text-xl">AI Generated</ThemedCardHead>
              <ThemedCardParagraph>Gemini creates flashcards and saves them to Firebase.</ThemedCardParagraph>
              <ThemedInput label="Topic" value={aiRequest.topic} onChange={(event) => setAiRequest({ ...aiRequest, topic: event.target.value })} />
              <ThemedInput label="Subject" value={aiRequest.subject} onChange={(event) => setAiRequest({ ...aiRequest, subject: event.target.value })} />
              <ThemedInput label="Number of flashcards" type="number" min="3" max="40" value={aiRequest.count} onChange={(event) => setAiRequest({ ...aiRequest, count: Number(event.target.value) })} />
              <div className="rounded-lg border border-theme-border bg-theme-surface-muted p-4">
                {["Exam-focused content", "Important definitions", "Common test questions"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm font-bold text-theme-text-secondary">
                    <Sparkles className="h-4 w-4 text-theme-primary" />
                    {item}
                  </p>
                ))}
              </div>
              <ThemedButton type="submit" disabled={saving} className="w-full gap-2">
                <Bot className="h-4 w-4" />
                Generate and save
              </ThemedButton>
            </form>
          )}

          {activeTab === "pdf" && (
            <form onSubmit={handlePdfSubmit} className="mt-4 space-y-4 p-2">
              <ThemedCardHead as="h2" className="text-xl">PDF Gen</ThemedCardHead>
              <ThemedCardParagraph>Upload a PDF, extract its text in the browser, then generate with Gemini.</ThemedCardParagraph>
              <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-theme-border bg-theme-surface-muted p-6 text-center transition hover:border-theme-primary">
                <FileUp className="h-9 w-9 text-theme-primary" />
                <span className="mt-3 text-sm font-black text-theme-text-primary">
                  {extractingPdf ? "Extracting text..." : pdfRequest.file?.name || "Choose a PDF"}
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => handlePdfFileChange(event.target.files?.[0] || null)}
                  className="sr-only"
                />
              </label>
              <ThemedInput label="Deck title" value={pdfRequest.title} onChange={(event) => setPdfRequest({ ...pdfRequest, title: event.target.value })} />
              <ThemedInput label="Subject" value={pdfRequest.subject} onChange={(event) => setPdfRequest({ ...pdfRequest, subject: event.target.value })} />
              <ThemedInput
                label="Extracted PDF text"
                textarea
                rows={8}
                placeholder="PDF text will appear here after upload. You can edit it before generating."
                value={pdfRequest.extractedText}
                onChange={(event) => setPdfRequest({ ...pdfRequest, extractedText: event.target.value })}
              />
              <div className="space-y-2 rounded-lg border border-theme-border bg-theme-surface-muted p-4 text-sm text-theme-text-secondary">
                {["Browser PDF text extraction", "Gemini card generation", "Firebase deck save"].map((step) => (
                  <p key={step} className="flex items-center gap-2 font-bold">
                    <FileText className="h-4 w-4 text-theme-primary" />
                    {step}
                  </p>
                ))}
              </div>
              <ThemedButton type="submit" disabled={saving || extractingPdf || !pdfRequest.extractedText.trim()} className="w-full gap-2">
                <FileUp className="h-4 w-4" />
                {saving ? "Generating..." : "Generate PDF deck"}
              </ThemedButton>
            </form>
          )}
        </ThemedCard>
          </div>

        <section className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-text-muted" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Firebase decks..."
              className="w-full rounded-xl border border-theme-border bg-theme-surface px-11 py-3 text-sm text-theme-text-primary outline-none transition focus:border-theme-primary"
            />
          </div>

          {loading ? (
            <ThemedCard className="p-8 text-center">
              <ThemedCardHead>Loading decks...</ThemedCardHead>
            </ThemedCard>
          ) : filteredDecks.length ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredDecks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} onDelete={handleDelete} onOpen={openDeckPreview} />
              ))}
            </div>
          ) : (
            <ThemedCard className="p-8 text-center">
              <Layers3 className="mx-auto h-10 w-10 text-theme-primary" />
              <ThemedCardHead as="h2" className="mt-4">No decks found</ThemedCardHead>
              <ThemedCardParagraph className="mx-auto mt-2 max-w-lg">
                Create a deck from one of the tabs. Saved decks will appear here from Firestore in real time.
              </ThemedCardParagraph>
            </ThemedCard>
          )}
        </section>
      </section>

      <DeckPreviewModal
        deck={previewDeck}
        cardIndex={previewCardIndex}
        onClose={() => setPreviewDeck(null)}
        onPrevious={showPreviousPreviewCard}
        onNext={showNextPreviewCard}
      />
    </ThemedPage>
  );
}
