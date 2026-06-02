import { useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Keyboard,
  Layers3,
  ListChecks,
  RotateCcw,
  Shuffle,
  Timer,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
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
import { getAccuracy, getMasteryLevel, getMasteryScore } from "../../utils/studyMetrics";

const modes = [
  { id: "flashcards", label: "Flashcard Mode", icon: Layers3 },
  { id: "mcq", label: "Multiple Choice", icon: ListChecks },
  { id: "truefalse", label: "True or False", icon: Check },
  { id: "typing", label: "Typing Mode", icon: Keyboard },
  { id: "exam", label: "Exam Simulation", icon: Timer },
];

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
}

function getSimilarity(input, answer) {
  const inputWords = new Set(normalize(input));
  const answerWords = normalize(answer);

  if (!answerWords.length) {
    return 0;
  }

  const matches = answerWords.filter((word) => inputWords.has(word)).length;
  return Math.round((matches / answerWords.length) * 100);
}

function getChoices(card, allCards) {
  const distractors = allCards
    .filter((candidate) => candidate.id !== card.id && candidate.answer)
    .slice(0, 3)
    .map((candidate) => candidate.answer);

  return [card.answer, ...distractors].sort(() => Math.random() - 0.5);
}

export default function Study() {
  const { decks, loading, error, recordCardResult } = useStudyDecks();
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [mode, setMode] = useState("flashcards");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [typingAnswer, setTypingAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const deck = decks.find((item) => item.id === selectedDeckId) || decks[0];
  const allCards = useMemo(() => decks.flatMap((item) => item.cards), [decks]);
  const card = deck?.cards?.[cardIndex % Math.max(1, deck?.cards?.length || 1)];
  const progress = deck?.cards?.length ? Math.round(((cardIndex + 1) / deck.cards.length) * 100) : 0;
  const choices = useMemo(() => (card ? getChoices(card, allCards) : []), [allCards, card]);
  const typedScore = submitted && card ? getSimilarity(typingAnswer, card.answer) : 0;
  const examQuestions = deck?.cards?.slice(0, 12) || [];

  function resetInteraction() {
    setFlipped(false);
    setSelectedAnswer("");
    setTypingAnswer("");
    setSubmitted(false);
    setStatus("");
  }

  function nextCard() {
    if (!deck?.cards?.length) {
      return;
    }

    setCardIndex((current) => (current + 1) % deck.cards.length);
    resetInteraction();
  }

  function previousCard() {
    if (!deck?.cards?.length) {
      return;
    }

    setCardIndex((current) => (current - 1 + deck.cards.length) % deck.cards.length);
    resetInteraction();
  }

  async function saveResult({ correct, resultMode, resultScore }) {
    if (!deck || !card) {
      return;
    }

    setSaving(true);

    try {
      await recordCardResult({
        deckId: deck.id,
        cardId: card.id,
        correct,
        mode: resultMode,
        score: resultScore,
      });
      setStatus("Progress saved to Firebase.");
    } catch (saveError) {
      setStatus(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  async function chooseAnswer(answer) {
    const correct = answer === card.answer;
    setSelectedAnswer(answer);
    setSubmitted(true);

    if (correct) {
      setScore((current) => current + 1);
    }

    await saveResult({ correct, resultMode: mode, resultScore: correct ? 100 : 0 });
  }

  async function markFlashcard(difficulty) {
    const correct = difficulty !== "Hard";
    if (correct) {
      setScore((current) => current + 1);
    }
    await saveResult({ correct, resultMode: "flashcards", resultScore: difficulty === "Easy" ? 100 : difficulty === "Medium" ? 75 : 30 });
    nextCard();
  }

  async function submitTyping() {
    const resultScore = getSimilarity(typingAnswer, card.answer);
    const correct = resultScore >= 70;
    setSubmitted(true);

    if (correct) {
      setScore((current) => current + 1);
    }

    await saveResult({ correct, resultMode: "typing", resultScore });
  }

  function shuffleCards() {
    if (!deck?.cards?.length) {
      return;
    }

    setCardIndex(Math.floor(Math.random() * deck.cards.length));
    resetInteraction();
  }

  if (loading) {
    return (
      <ThemedPage>
        <ThemedCard className="p-8 text-center">
          <ThemedCardHead>Loading Firebase decks...</ThemedCardHead>
        </ThemedCard>
      </ThemedPage>
    );
  }

  if (!decks.length) {
    return (
      <ThemedPage>
        <ThemedCard className="p-8 text-center">
          <Layers3 className="mx-auto h-10 w-10 text-theme-primary" />
          <ThemedCardHead as="h1" className="mt-4">Create a deck first</ThemedCardHead>
          <ThemedCardParagraph className="mx-auto mt-2 max-w-xl">
            Study modes use your Firebase decks. Add a manual, AI generated, or PDF generated deck before starting.
          </ThemedCardParagraph>
          <ThemedButton as={Link} to="/decks" className="mt-5">Go to Decks</ThemedButton>
        </ThemedCard>
      </ThemedPage>
    );
  }

  if (!selectedDeckId) {
    return (
      <ThemedPage className="space-y-6">
        <section>
          <p className="text-sm font-bold uppercase tracking-wide text-theme-primary">Choose a study deck</p>
          <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Study</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
            Select a Firebase deck first, then start answering in flashcard, quiz, true/false, typing, or exam mode.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {decks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedDeckId(item.id);
                setCardIndex(0);
                resetInteraction();
              }}
              className="rounded-2xl border border-theme-border bg-theme-surface p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-theme-primary"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
                <Layers3 className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-black text-theme-text-primary">{item.title}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-theme-text-secondary">{item.description || "No description yet."}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                <span className="rounded-lg bg-theme-surface-muted p-3">
                  <strong className="block text-lg text-theme-text-primary">{item.cards.length}</strong>
                  <span className="text-xs font-bold text-theme-text-muted">Cards</span>
                </span>
                <span className="rounded-lg bg-theme-surface-muted p-3">
                  <strong className="block text-lg text-theme-text-primary">{item.source}</strong>
                  <span className="text-xs font-bold text-theme-text-muted">Source</span>
                </span>
              </div>
            </button>
          ))}
        </section>
      </ThemedPage>
    );
  }

  if (!card) {
    return (
      <ThemedPage>
        <ThemedCard className="p-8 text-center">
          <ThemedCardHead>This deck has no cards</ThemedCardHead>
          <ThemedButton as={Link} to="/decks" className="mt-5">Add cards</ThemedButton>
        </ThemedCard>
      </ThemedPage>
    );
  }

  return (
    <ThemedPage className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-theme-primary">Active recall workspace</p>
          <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Study</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
            Study results update Firestore card stats, sessions, mastery, and dashboard analytics.
          </p>
        </div>
        <label className="block min-w-64">
          <span className="text-sm font-bold text-theme-text-primary">Deck</span>
          <select
            value={deck.id}
            onChange={(event) => {
              setSelectedDeckId(event.target.value);
              setCardIndex(0);
              resetInteraction();
            }}
            className="mt-2 w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-sm font-bold text-theme-text-primary outline-none focus:border-theme-primary"
          >
            {decks.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select>
        </label>
      </section>

      {(status || error) && (
        <div className="rounded-lg border border-theme-primary/30 bg-theme-primary/10 px-4 py-3 text-sm font-bold text-theme-primary">
          {status || error}
        </div>
      )}

      <section className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        {modes.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMode(item.id);
                resetInteraction();
              }}
              className={classNames(
                "flex min-h-14 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-black transition",
                mode === item.id
                  ? "border-theme-primary bg-theme-primary text-white"
                  : "border-theme-border bg-theme-surface text-theme-text-secondary hover:border-theme-primary"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_20rem]">
        <ThemedCard className="min-h-[32rem] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <ThemedCardHead as="h2">{deck.title}</ThemedCardHead>
              <ThemedCardParagraph>Card {cardIndex + 1} of {deck.cards.length}</ThemedCardParagraph>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={previousCard} aria-label="Previous card" className="grid h-10 w-10 place-items-center rounded-lg border border-theme-border hover:border-theme-primary">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={shuffleCards} aria-label="Shuffle cards" className="grid h-10 w-10 place-items-center rounded-lg border border-theme-border hover:border-theme-primary">
                <Shuffle className="h-4 w-4" />
              </button>
              <button type="button" onClick={nextCard} aria-label="Next card" className="grid h-10 w-10 place-items-center rounded-lg border border-theme-border hover:border-theme-primary">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-theme-surface-muted">
            <div className="h-full rounded-full bg-theme-primary" style={{ width: `${progress}%` }} />
          </div>

          {mode === "flashcards" && (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setFlipped((current) => !current)}
                className="flex min-h-72 w-full items-center justify-center rounded-lg border border-theme-border bg-theme-surface-muted p-6 text-center transition hover:border-theme-primary"
              >
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-wide text-theme-primary">
                    {flipped ? "Answer" : "Question"}
                  </p>
                  <p className="text-2xl font-black leading-tight text-theme-text-primary">
                    {flipped ? card.answer : card.question}
                  </p>
                  <p className="mt-5 text-sm font-bold text-theme-text-muted">Click to flip</p>
                </div>
              </button>
              <div className="grid gap-2 sm:grid-cols-3">
                {["Easy", "Medium", "Hard"].map((difficulty) => (
                  <ThemedButton key={difficulty} type="button" disabled={saving} variant={difficulty === "Easy" ? "success" : difficulty === "Hard" ? "warning" : "secondary"} onClick={() => markFlashcard(difficulty)}>
                    Mark {difficulty}
                  </ThemedButton>
                ))}
              </div>
            </div>
          )}

          {mode === "mcq" && (
            <div>
              <h3 className="text-2xl font-black text-theme-text-primary">{card.question}</h3>
              <div className="mt-6 grid gap-3">
                {choices.map((choice) => {
                  const isCorrect = choice === card.answer;
                  const isSelected = selectedAnswer === choice;

                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => chooseAnswer(choice)}
                      disabled={submitted || saving}
                      className={classNames(
                        "rounded-lg border px-4 py-4 text-left text-sm font-bold transition",
                        submitted && isCorrect && "border-theme-success bg-theme-success/15 text-theme-success",
                        submitted && isSelected && !isCorrect && "border-theme-error bg-theme-error/15 text-theme-error",
                        !submitted && "border-theme-border bg-theme-surface-muted text-theme-text-primary hover:border-theme-primary"
                      )}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-5 rounded-lg border border-theme-border bg-theme-surface-muted p-4">
                  <p className="font-black text-theme-text-primary">{selectedAnswer === card.answer ? "Correct" : "Not quite"}</p>
                  <p className="mt-2 text-sm leading-6 text-theme-text-secondary">{card.explanation || card.answer}</p>
                </div>
              )}
            </div>
          )}

          {mode === "truefalse" && (
            <div className="space-y-5">
              <h3 className="text-2xl font-black text-theme-text-primary">{card.question}</h3>
              <p className="rounded-lg border border-theme-border bg-theme-surface-muted p-4 text-lg font-bold text-theme-text-primary">
                Statement: {card.answer}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <ThemedButton type="button" disabled={submitted || saving} variant="success" onClick={() => chooseAnswer(card.answer)}>
                  <Check className="mr-2 h-4 w-4" />
                  True
                </ThemedButton>
                <ThemedButton type="button" disabled={submitted || saving} variant="error" onClick={() => chooseAnswer("False")}>
                  <X className="mr-2 h-4 w-4" />
                  False
                </ThemedButton>
              </div>
              {submitted && (
                <p className="rounded-lg border border-theme-border bg-theme-surface-muted p-4 text-sm leading-6 text-theme-text-secondary">
                  {selectedAnswer === card.answer ? "Correct. " : "Review this one. "}
                  {card.explanation || card.answer}
                </p>
              )}
            </div>
          )}

          {mode === "typing" && (
            <div className="space-y-5">
              <h3 className="text-2xl font-black text-theme-text-primary">{card.question}</h3>
              <ThemedInput
                label="Type your answer"
                textarea
                rows={5}
                value={typingAnswer}
                onChange={(event) => setTypingAnswer(event.target.value)}
              />
              <ThemedButton type="button" disabled={saving || submitted || !typingAnswer.trim()} onClick={submitTyping} className="gap-2">
                <Keyboard className="h-4 w-4" />
                Check answer similarity
              </ThemedButton>
              {submitted && (
                <div className="rounded-lg border border-theme-border bg-theme-surface-muted p-4">
                  <p className="text-2xl font-black text-theme-text-primary">{typedScore}% partial credit</p>
                  <p className="mt-2 text-sm leading-6 text-theme-text-secondary">Expected: {card.answer}</p>
                  <p className="mt-2 text-sm leading-6 text-theme-text-secondary">{card.explanation || card.answer}</p>
                </div>
              )}
            </div>
          )}

          {mode === "exam" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-lg border border-theme-border bg-theme-surface-muted p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-theme-primary" />
                  <div>
                    <p className="font-black text-theme-text-primary">Mixed Exam Simulation</p>
                    <p className="text-sm text-theme-text-secondary">Uses the current Firebase deck.</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-theme-text-primary">{examStarted ? "15:00" : "Ready"}</span>
              </div>
              {!examStarted ? (
                <ThemedButton type="button" onClick={() => setExamStarted(true)} className="gap-2">
                  <Timer className="h-4 w-4" />
                  Start exam
                </ThemedButton>
              ) : (
                <div className="space-y-3">
                  {examQuestions.map((question, index) => (
                    <div key={question.id} className="rounded-lg border border-theme-border bg-theme-surface-muted p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-theme-primary">
                        {index % 3 === 0 ? "Multiple Choice" : index % 3 === 1 ? "True or False" : "Typing"}
                      </p>
                      <p className="mt-2 font-black text-theme-text-primary">{index + 1}. {question.question}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ThemedCard>

        <aside className="space-y-4">
          <ThemedCard className="p-5">
            <ThemedCardHead as="h2" className="text-xl">Adaptive Engine</ThemedCardHead>
            <ThemedCardParagraph className="mt-2">Per-card Firebase tracking.</ThemedCardParagraph>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Accuracy</span><strong>{getAccuracy(card)}%</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Times studied</span><strong>{card.stats.timesStudied}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Correct</span><strong>{card.stats.timesCorrect}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Wrong</span><strong>{card.stats.timesWrong}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Streak</span><strong>{card.stats.streak}</strong></div>
            </div>
          </ThemedCard>

          <ThemedCard className="p-5">
            <ThemedCardHead as="h2" className="text-xl">Mastery Score</ThemedCardHead>
            <p className="mt-4 text-5xl font-black text-theme-text-primary">{getMasteryScore(card)}</p>
            <p className="mt-2 text-sm font-bold text-theme-primary">{getMasteryLevel(getMasteryScore(card))}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-theme-surface-muted">
              <div className="h-full rounded-full bg-theme-primary" style={{ width: `${getMasteryScore(card)}%` }} />
            </div>
            <p className="mt-4 text-xs leading-5 text-theme-text-muted">
              Formula: accuracy rate x 0.6 + current streak x 5 + review frequency x 0.2, limited to 0-100.
            </p>
          </ThemedCard>

          <ThemedCard className="p-5">
            <ThemedCardHead as="h2" className="text-xl">Session Score</ThemedCardHead>
            <p className="mt-4 text-4xl font-black text-theme-text-primary">{score}</p>
            <ThemedButton type="button" variant="secondary" onClick={() => setScore(0)} className="mt-4 gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset score
            </ThemedButton>
          </ThemedCard>
        </aside>
      </section>
    </ThemedPage>
  );
}
