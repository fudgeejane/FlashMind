import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Bot,
  CheckCircle2,
  FileText,
  FileUp,
  Layers3,
  Plus,
  Sparkles,
  Trash2,
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
import ConfirmModal from "../../utils/ConfirmModal";
import GitPreview from "../../utils/DeckPreview";
import ManualCardModal from "../../utils/ManualCardModal";
import { extractTextFromPdf } from "../../hooks/usePdfText";

const tabs = [
  {
    id: "manual",
    label: "Manual Creation",
    description: "Build custom cards",
    icon: Plus,
  },
  {
    id: "ai",
    label: "AI Generated",
    description: "Create from a topic",
    icon: Bot,
  },
  {
    id: "pdf",
    label: "PDF Generation",
    description: "Extract from files",
    icon: FileUp,
  },
];

function DeckCard({ deck, onDelete, onOpen }) {
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
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="rounded-full border border-theme-border bg-theme-surface-muted px-3 py-1 text-xs font-semibold text-theme-text-secondary">
          {deck.source}
        </span>
        <div className="flex items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(deck.id);
            }}
            aria-label={`Delete ${deck.title}`}
            className="grid p-1 cursor-pointer place-items-center rounded-lg border border-theme-border text-theme-text-muted transition-colors hover:border-theme-error hover:text-theme-error"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <ThemedCardHead as="h2" className="min-w-0 flex-1 break-words text-xl">
        {deck.title}
      </ThemedCardHead>

      <ThemedCardParagraph className="mt-2 min-h-12">{deck.description || "No description yet."}</ThemedCardParagraph>

    </ThemedCard>
  );
}

function SkeletonLine({ className }) {
  return <div className={classNames("rounded-full bg-theme-surface-muted", className)} />;
}

function DecksSkeleton() {
  return (
    <div className="space-y-6">
      <ThemedCard className="animate-pulse p-4" aria-hidden="true">
        <div className="grid rounded-xl border border-theme-border p-1 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border border-transparent px-4 py-2"
            >
              <div className="h-8 w-8 shrink-0 rounded-lg bg-theme-surface-muted" />
              <div className="h-4 w-28 rounded-full bg-theme-surface-muted" />
              <div className="ml-auto hidden h-2.5 w-2.5 rounded-full bg-theme-surface-muted sm:block" />
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-4 p-2">
          <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-end">
            <div className="w-full flex-1 space-y-2">
              <SkeletonLine className="h-4 w-24" />
              <div className="h-10 w-full rounded-lg bg-theme-surface-muted" />
            </div>
            <div className="h-10 w-42 rounded-lg bg-theme-surface-muted" />
          </div>
          <div className="space-y-2">
            <SkeletonLine className="h-4 w-24" />
            <div className="h-24 w-full rounded-lg bg-theme-surface-muted" />
          </div>
          <div className="flex justify-end">
            <div className="h-10 w-32 rounded-lg bg-theme-surface-muted" />
          </div>
        </div>
      </ThemedCard>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ThemedCard key={index} className="animate-pulse p-5" aria-hidden="true">
            <div className="mb-4 flex items-center justify-between gap-4">
              <SkeletonLine className="h-7 w-24" />
              <div className="h-7 w-7 rounded-lg bg-theme-surface-muted" />
            </div>
            <div className="space-y-3">
              <SkeletonLine className="h-6 w-3/4" />
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-4/5" />
            </div>
          </ThemedCard>
        ))}
      </div>
    </div>
  );
}

export default function Decks() {
  const { decks, loading, error, createDeck, deleteDeck, generateAiDeck, generatePdfDeck } = useStudyDecks();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("manual");
  const [manualDeck, setManualDeck] = useState({
    title: "",
    description: "",
    cards: [],
  });
  const [aiRequest, setAiRequest] = useState({ topic: "", count: 8 });
  const [pdfRequest, setPdfRequest] = useState({ title: "", extractedText: "", file: null });
  const [saving, setSaving] = useState(false);
  const [extractingPdf, setExtractingPdf] = useState(false);
  const [previewDeck, setPreviewDeck] = useState(null);
  const [previewCardIndex, setPreviewCardIndex] = useState(0);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardDraft, setCardDraft] = useState({ question: "", answer: "" });
  const [manualCardToDelete, setManualCardToDelete] = useState(null);
  const [isManualCardDeleteConfirmOpen, setIsManualCardDeleteConfirmOpen] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const filteredDecks = decks;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  function updateManualCard(index, field, value) {
    setManualDeck((current) => ({
      ...current,
      cards: current.cards.map((card, cardIndex) => (cardIndex === index ? { ...card, [field]: value } : card)),
    }));
  }

  function handleCardDraftChange(field, value) {
    setCardDraft((current) => ({ ...current, [field]: value }));
  }

  function openManualCardModal() {
    setCardDraft({ question: "", answer: "" });
    setIsCardModalOpen(true);
  }

  function closeManualCardModal() {
    setIsCardModalOpen(false);
    setCardDraft({ question: "", answer: "" });
    closeManualCardDeleteConfirm();
  }

  function saveManualCard() {
    const trimmedQuestion = cardDraft.question.trim();
    const trimmedAnswer = cardDraft.answer.trim();

    if (!trimmedQuestion || !trimmedAnswer) {
      return;
    }

    setManualDeck((current) => ({
      ...current,
      cards: [...current.cards, { question: trimmedQuestion, answer: trimmedAnswer }],
    }));

    setCardDraft({ question: "", answer: "" });
  }

  function requestDeleteManualCard(index) {
    setManualCardToDelete(index);
    setIsManualCardDeleteConfirmOpen(true);
  }

  function closeManualCardDeleteConfirm() {
    setManualCardToDelete(null);
    setIsManualCardDeleteConfirmOpen(false);
  }

  function confirmDeleteManualCard() {
    if (manualCardToDelete === null) {
      return;
    }

    setManualDeck((current) => ({
      ...current,
      cards: current.cards.filter((_, cardIndex) => cardIndex !== manualCardToDelete),
    }));

    closeManualCardDeleteConfirm();
  }

  function addManualCard() {
    openManualCardModal();
  }

  async function handleManualSubmit(event) {
    event.preventDefault();
    setSaving(true);
    toast.loading("Saving manual deck to Firebase...", { id: "manual-deck" });

    try {
      await createDeck({
        title: manualDeck.title,
        description: manualDeck.description,
        subject: "Custom",
        source: "Manual",
        tags: [],
        cards: manualDeck.cards.filter((card) => card.question.trim() && card.answer.trim()),
      });
      setManualDeck({ title: "", description: "", cards: [] });
      toast.success("Manual deck saved to Firebase.", { id: "manual-deck" });
    } catch (submitError) {
      toast.error(submitError.message, { id: "manual-deck" });
    } finally {
      setSaving(false);
    }
  }

  async function handleAiSubmit(event) {
    event.preventDefault();
    setSaving(true);
    toast.loading("Generating and saving AI deck...", { id: "ai-deck" });

    try {
      await generateAiDeck(aiRequest);
      setAiRequest({ topic: "", count: 8 });
      toast.success("AI generated deck saved to Firebase.", { id: "ai-deck" });
    } catch (submitError) {
      toast.error(submitError.message, { id: "ai-deck" });
    } finally {
      setSaving(false);
    }
  }

  async function handlePdfSubmit(event) {
    event.preventDefault();
    setSaving(true);
    toast.loading("Uploading PDF and generating deck...", { id: "pdf-deck" });

    try {
      await generatePdfDeck(pdfRequest);
      setPdfRequest({ title: "", extractedText: "", file: null });
      event.currentTarget.reset();
      toast.success("PDF generated deck saved to Firebase.", { id: "pdf-deck" });
    } catch (submitError) {
      toast.error(submitError.message, { id: "pdf-deck" });
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
    toast.loading("Reading PDF text...", { id: "pdf-text" });

    try {
      const extractedText = await extractTextFromPdf(file);
      setPdfRequest((current) => ({
        ...current,
        file,
        title: current.title || file.name.replace(/\.pdf$/i, ""),
        extractedText,
      }));
      toast.success("PDF text extracted. You can review it below, then generate the deck.", { id: "pdf-text" });
    } catch (extractError) {
      setPdfRequest((current) => ({ ...current, file, extractedText: "" }));
      toast.error(extractError.message, { id: "pdf-text" });
    } finally {
      setExtractingPdf(false);
    }
  }

  async function handleDelete(deckId) {
    toast.loading("Deleting deck...", { id: "delete-deck" });

    try {
      await deleteDeck(deckId);
      toast.success("Deck deleted.", { id: "delete-deck" });
    } catch (deleteError) {
      toast.error(deleteError.message, { id: "delete-deck" });
    }
  }

  function requestDeleteDeck(deckId) {
    setDeckToDelete(deckId);
    setIsDeleteConfirmOpen(true);
  }

  function closeDeleteConfirm() {
    setDeckToDelete(null);
    setIsDeleteConfirmOpen(false);
  }

  async function confirmDeleteDeck() {
    if (!deckToDelete) {
      return;
    }

    closeDeleteConfirm();
    await handleDelete(deckToDelete);
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
    <ThemedPage className="space-y-4">
      <section className="space-y-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black text-theme-text-primary sm:text-4xl">Decks</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
              Create or generate decks for study. Use the tabs to build manual decks, generate with AI, or upload a PDF to extract text and generate cards instantly.
            </p>
          </div>
          <div className="rounded-full border border-theme-border bg-theme-surface px-4 py-2 text-sm font-semibold text-theme-text-secondary">
            {filteredDecks.length} deck{filteredDecks.length === 1 ? "" : "s"} available
          </div>
        </div>
      </section>

      <section className="space-y-6">

        <div className="">

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 mb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    "flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition",
                    isActive
                      ? "border-theme-primary bg-theme-primary text-white"
                      : "border-theme-border bg-theme-surface text-theme-text-secondary hover:border-theme-primary cursor-pointer"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

        <ThemedCard className="p-4">

         

          {activeTab === "manual" && (
            <form onSubmit={handleManualSubmit} className="mt-4 space-y-4 p-2">
              <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-end">
                <ThemedInput
                  label="Deck title"
                  value={manualDeck.title}
                  onChange={(event) => setManualDeck({ ...manualDeck, title: event.target.value })}
                  className="flex-1"
                  placeholder="e.g. Biology 101, World War II, Organic Chemistry..."
                />
                <ThemedButton type="button" variant="secondary" onClick={addManualCard} className="w-42 gap-2">
                  <Plus className="h-4 w-4" />
                  Manage Card
                </ThemedButton>
              </div>
              <ThemedInput
                label="Description"
                textarea
                rows={3}
                value={manualDeck.description}
                onChange={(event) => setManualDeck({ ...manualDeck, description: event.target.value })}
                placeholder="Add an optional description for this deck."
              />

              <div className="flex flex-wrap justify-end gap-2">
                <ThemedButton type="submit" disabled={saving} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Save deck
                </ThemedButton>
              </div>
            </form>
          )}

          {activeTab === "ai" && (
            <form onSubmit={handleAiSubmit} className="mt-4 space-y-4 p-2">
              <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-6">
                <ThemedInput
                  label="Topic"
                  value={aiRequest.topic}
                  onChange={(event) => setAiRequest({ ...aiRequest, topic: event.target.value })}
                  className="flex-1"
                  placeholder="e.g. Biology, World War II, Organic Chemistry..."
                />
                <ThemedInput
                  label="Number of flashcards"
                  type="number"
                  min="3"
                  max="40"
                  value={aiRequest.count}
                  onChange={(event) => setAiRequest({ ...aiRequest, count: Number(event.target.value) })}
                  className="w-72"
                />
              </div>
              <div className="space-y-2 rounded-lg border border-theme-border bg-theme-surface-muted p-4 text-sm text-theme-text-secondary">
                {["Exam-focused content", "Important definitions", "Common test questions"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm font-bold text-theme-text-secondary">
                    <Sparkles className="h-4 w-4 text-theme-primary" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                  <ThemedButton type="submit" disabled={saving} className="w-48 gap-2">
                <Bot className="h-4 w-4" />
                {saving ? "Generating deck..." : "Generate deck"}
                </ThemedButton>
              </div>
            </form>
          )}

          {activeTab === "pdf" && (
            <form onSubmit={handlePdfSubmit} className="mt-4 space-y-4 p-2">
              <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-end">
                <ThemedInput
                  label="Deck title"
                  value={pdfRequest.title}
                  onChange={(event) => setPdfRequest({ ...pdfRequest, title: event.target.value })}
                  placeholder="e.g. Biology 101, World War II, Organic Chemistry..."
                  className="flex-1"
                />

                <div>
                  <ThemedButton
                    type="button"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className=""
                  >
                  <FileText className="h-4 w-4 mr-2" />
                  {extractingPdf
                    ? "Extracting text..."
                    : pdfRequest.file?.name || "Choose a PDF"}
                  </ThemedButton>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(event) =>
                  handlePdfFileChange(event.target.files?.[0] || null)
                }
                className="hidden"
              />
              </div>
              </div>

              <div className="space-y-2 rounded-lg border border-theme-border bg-theme-surface-muted p-4 text-sm text-theme-text-secondary">
                {["Browser PDF text extraction", "Gemini card generation", "Firebase deck save"].map((step) => (
                  <p key={step} className="flex items-center gap-2 font-bold">
                    <FileText className="h-4 w-4 text-theme-primary" />
                    {step}
                  </p>
                ))}
              </div>
             <div className="flex flex-wrap gap-2 justify-end">
                 <ThemedButton
                type="submit"
                disabled={saving || extractingPdf || !pdfRequest.extractedText.trim()}
                className="gap-2 w-48"
              >
                <FileUp className="h-4 w-4" />
                {saving ? "Generating PDF..." : "Generate PDF"}
              </ThemedButton>
             </div>
            </form>
          )}
        </ThemedCard>
          </div>

        <section className="space-y-4">
          {loading ? (
            <DecksSkeleton />
          ) : filteredDecks.length ? (
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
              {filteredDecks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} onDelete={requestDeleteDeck} onOpen={openDeckPreview} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center border border-slate-300 dark:border-slate-700 border-dashed rounded-lg">
              <Layers3 className="mx-auto h-10 w-10 text-theme-primary" />
              <ThemedCardHead as="h2" className="mt-4">No decks found</ThemedCardHead>
              <ThemedCardParagraph className="mx-auto mt-2 max-w-lg">
                Create a deck from one of the tabs. Saved decks will appear here from Firestore in real time.
              </ThemedCardParagraph>
            </div>
          )}
        </section>
      </section>

      <ManualCardModal
        isOpen={isCardModalOpen}
        cards={manualDeck.cards}
        draft={cardDraft}
        onClose={closeManualCardModal}
        onChange={handleCardDraftChange}
        onSave={saveManualCard}
        onStartAdd={() => openManualCardModal()}
        onUpdateCard={updateManualCard}
        onDelete={requestDeleteManualCard}
      />

      <ConfirmModal
        isOpen={isManualCardDeleteConfirmOpen}
        title="Delete card"
        message="Are you sure you want to remove this flashcard from the manual deck?"
        onConfirm={confirmDeleteManualCard}
        onCancel={closeManualCardDeleteConfirm}
      />

      <ConfirmModal
        isOpen={isDeleteConfirmOpen}
        title="Delete deck"
        message="Are you sure you want to permanently delete this deck? This action cannot be undone."
        onConfirm={confirmDeleteDeck}
        onCancel={closeDeleteConfirm}
      />

      <GitPreview
        deck={previewDeck}
        cardIndex={previewCardIndex}
        onClose={() => setPreviewDeck(null)}
        onPrevious={showPreviousPreviewCard}
        onNext={showNextPreviewCard}
      />
    </ThemedPage>
  );
}
