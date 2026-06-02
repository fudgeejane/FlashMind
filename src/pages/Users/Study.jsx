import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Keyboard,
  Layers3,
  ListChecks,
  RotateCcw,
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
import RecentTakesModal from "../../utils/RecentTakesModal";
import { useStudyDecks } from "../../hooks/useStudyDecks";
import { getAccuracy, getMasteryLevel, getMasteryScore } from "../../utils/studyMetrics";

const modes = [
  { id: "mcq", label: "Multiple Choice", icon: ListChecks },
  { id: "truefalse", label: "True or False", icon: Check },
  { id: "typing", label: "Typing Mode", icon: Keyboard },
];

const similarityStopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "by",
  "for",
  "in",
  "inside",
  "is",
  "it",
  "of",
  "on",
  "or",
  "tag",
  "tags",
  "that",
  "the",
  "then",
  "to",
  "use",
  "using",
  "with",
]);

function normalizeConceptText(text) {
  return text
    .toLowerCase()
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<\s*\/?\s*([a-z0-9]+)[^>]*>/g, " tag-$1 ")
    .replace(/\bunordered\s+list\b/g, " tag-ul ")
    .replace(/\bordered\s+list\b/g, " tag-ol ")
    .replace(/\blist\s+items?\b/g, " tag-li ")
    .replace(/\bdocument\s+type\b/g, " tag-doctype ");
}

function normalizeConceptToken(token) {
  if (token.length > 4 && token.endsWith("ing")) {
    return token.slice(0, -3);
  }

  if (token.length > 3 && token.endsWith("s")) {
    return token.slice(0, -1);
  }

  return token;
}

function getConceptTokens(text) {
  return normalizeConceptText(text)
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeConceptToken)
    .filter((token) => !similarityStopWords.has(token));
}

function getSimilarity(input, answer) {
  const inputWords = new Set(getConceptTokens(input));
  const answerWords = Array.from(new Set(getConceptTokens(answer)));

  if (!answerWords.length) {
    return 0;
  }

  const matches = answerWords.filter((word) => inputWords.has(word)).length;
  const answerCoverage = matches / answerWords.length;
  const inputCoverage = inputWords.size ? matches / inputWords.size : 0;
  const balancedScore = (2 * matches) / (answerWords.length + Math.max(1, inputWords.size));

  return Math.round(Math.max(answerCoverage, inputCoverage, balancedScore) * 100);
}

function getKeyIdea(card) {
  const answer = card?.answer || "";
  const firstSentence = answer.split(/(?<=[.!?])\s+/)[0]?.trim();
  const shortAnswer = firstSentence || answer;

  if (shortAnswer.length <= 140) {
    return shortAnswer;
  }

  return `${shortAnswer.slice(0, 137).trim()}...`;
}

function hashString(value) {
  return Array.from(value).reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 2166136261);
}

function seededRandom(seed) {
  let value = seed || 1;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function stableShuffle(items, seedValue) {
  const shuffled = [...items];
  const random = seededRandom(hashString(seedValue));

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function shuffleItems(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function getChoices(card, allCards) {
  const distractors = allCards
    .filter((candidate) => candidate.id !== card.id && candidate.answer)
    .slice(0, 3)
    .map((candidate) => candidate.answer);

  return stableShuffle([card.answer, ...distractors], card.id || card.question);
}

function SkeletonLine({ className }) {
  return <div className={classNames("rounded-full bg-theme-surface-muted", className)} />;
}

function StudySkeleton() {
  return (
    <ThemedPage className="space-y-7">
      <section className="animate-pulse" aria-hidden="true">
        <SkeletonLine className="h-9 w-32" />
        <div className="mt-3 space-y-2">
          <SkeletonLine className="h-4 w-full max-w-xl" />
          <SkeletonLine className="h-4 w-96 max-w-full" />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 2 }).map((_, index) => (
          <ThemedCard key={index} className="min-h-44 animate-pulse overflow-hidden p-0">
            <div className="h-1 w-full bg-theme-primary/20" />
            <div className="flex h-full flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <SkeletonLine className="h-6 w-24 border border-theme-border bg-theme-surface-muted" />
                <SkeletonLine className="h-6 w-16 border border-theme-border bg-theme-surface-muted" />
              </div>

              <div className="mt-4 space-y-3">
                <SkeletonLine className="h-5 w-28 bg-theme-border" />
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-4/5" />
              </div>
            </div>
          </ThemedCard>
        ))}
      </section>
    </ThemedPage>
  );
}

export default function Study() {
  const { decks, loading, error, recordStudySessionResults } = useStudyDecks();
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [mode, setMode] = useState("mcq");
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [typingAnswer, setTypingAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);
  const [studyCards, setStudyCards] = useState([]);
  const [pendingResults, setPendingResults] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [isRecentTakesOpen, setIsRecentTakesOpen] = useState(false);

  const deck = decks.find((item) => item.id === selectedDeckId) || decks[0];
  const allCards = useMemo(() => decks.flatMap((item) => item.cards), [decks]);
  const sessionCards = selectedDeckId ? studyCards : [];
  const card = sessionCards[cardIndex];
  const choices = useMemo(() => (card ? getChoices(card, allCards) : []), [allCards, card]);
  const typingKeyIdea = card ? getKeyIdea(card) : "";
  const typedScore = submitted && card ? getSimilarity(typingAnswer, typingKeyIdea) : 0;
  const typingCorrect = typedScore >= 50;
  const canMoveCards = submitted && !saving;
  const isLastCard = sessionCards.length > 0 && cardIndex === sessionCards.length - 1;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  function resetInteraction() {
    setSelectedAnswer("");
    setTypingAnswer("");
    setSubmitted(false);
  }

  function openRecentTakes() {
    setIsRecentTakesOpen(true);
  }

  function closeRecentTakes() {
    setIsRecentTakesOpen(false);
  }

  function startStudyDeck(nextDeck) {
    setSelectedDeckId(nextDeck.id);
    setStudyCards(shuffleItems(nextDeck.cards || []));
    setPendingResults([]);
    setCardIndex(0);
    setScore(0);
    resetInteraction();
  }

  function nextCard() {
    if (!sessionCards.length) {
      return;
    }

    if (saving) {
      toast.error("Please wait for your answer to save.");
      return;
    }

    if (!submitted) {
      toast.error("Answer the current question first.");
      return;
    }

    if (isLastCard) {
      return;
    }

    setCardIndex((current) => current + 1);
    resetInteraction();
  }

  function stageResult({ correct, resultMode, resultScore, userAnswer }) {
    if (!deck || !card) {
      return;
    }

    const result = {
      deckId: deck.id,
      cardId: card.id,
      question: card.question,
      correctAnswer: card.answer,
      userAnswer,
      correct,
      mode: resultMode,
      score: resultScore,
    };

    setPendingResults((current) => [...current.filter((item) => item.cardId !== card.id), result]);
  }

  async function finishStudy() {
    if (!submitted) {
      toast.error("Answer the current question first.");
      return;
    }

    if (pendingResults.length < sessionCards.length) {
      toast.error("Finish every question before saving.");
      return;
    }

    setSaving(true);
    toast.loading("Saving study session...", { id: "study-session" });

    try {
      await recordStudySessionResults({
        deckId: deck.id,
        results: pendingResults,
      });

      const correctCount = pendingResults.filter((item) => item.correct).length;
      const totalCards = sessionCards.length;
      const scorePercent = totalCards ? Math.round((correctCount / totalCards) * 100) : 0;

      setRecentSessions((current) => [
        {
          deckId: deck.id,
          deckTitle: deck.title,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          score: scorePercent,
          correctCount,
          totalCards,
          results: pendingResults,
        },
        ...current,
      ]);

      toast.success("Study session saved.", { id: "study-session" });
      setSelectedDeckId("");
      setStudyCards([]);
      setPendingResults([]);
      setCardIndex(0);
      resetInteraction();
    } catch (saveError) {
      toast.error(saveError.message, { id: "study-session" });
    } finally {
      setSaving(false);
    }
  }

  async function saveResult({ correct, resultMode, resultScore, userAnswer }) {
    stageResult({ correct, resultMode, resultScore, userAnswer });
  }

  async function chooseAnswer(answer) {
    const correct = answer === card.answer;
    setSelectedAnswer(answer);
    setSubmitted(true);

    if (correct) {
      setScore((current) => current + 1);
    }

    await saveResult({
      correct,
      resultMode: mode,
      resultScore: correct ? 100 : 0,
      userAnswer: answer,
    });
  }

  async function submitTyping() {
    const resultScore = getSimilarity(typingAnswer, typingKeyIdea);
    const correct = resultScore >= 50;
    setSubmitted(true);

    if (correct) {
      setScore((current) => current + 1);
    }

    await saveResult({
      correct,
      resultMode: "typing",
      resultScore,
      userAnswer: typingAnswer.trim(),
    });
  }

  if (loading) {
    return <StudySkeleton />;
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
          <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Study</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
              Select a deck to start studying. Study modes use your  decks, so add a manual, AI generated, or PDF generated deck before starting.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {decks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => startStudyDeck(item)}
              className="group flex min-h-44 cursor-pointer flex-col overflow-hidden rounded-xl border border-theme-border bg-theme-surface text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-theme-primary hover:shadow-lg hover:shadow-theme-primary/10 focus:outline-none focus:ring-2 focus:ring-theme-primary/35"
            >
              <span className="h-1 w-full bg-theme-primary/20 transition-colors group-hover:bg-theme-primary" />
              <span className="flex flex-1 flex-col p-5">

                <div className="flex items-center gap-2 justify-between">
                    <span className='text-[10px] uppercase font-medium px-2 py-1 border border-theme-border rounded-full w-max text-theme-text-secondary'>
                    {item.source || "Deck"}
                </span>

                <span className='text-[10px] uppercase font-medium px-2 py-1 border border-theme-border rounded-full w-max text-theme-text-secondary'>
                    {item.cards.length} Cards
                </span>
                </div>
                
                <span className="mt-2 block min-w-0">
                  <span className="block break-words text-lg font-bold leading-tight text-theme-text-primary">
                    {item.title}
                  </span>
                  <span className="mt-1 block min-h-12 text-sm leading-5 text-theme-text-secondary">
                    {item.description || "No description."}
                  </span>
                </span>

          
              </span>
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
          <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Study</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
              Answer questions based on your Firebase decks. Switch between modes to find what works best for you.
          </p>
        </div>

        
      </section>

      <section className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {modes.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (submitted) {
                  toast.error("You cannot change mode after answering.");
                  return;
                }

                setMode(item.id);
                resetInteraction();
              }}
              aria-disabled={submitted}
              className={classNames(
                "flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition",
                mode === item.id
                  ? "border-theme-primary bg-theme-primary text-white"
                  : "border-theme-border bg-theme-surface text-theme-text-secondary hover:border-theme-primary cursor-pointer",
                submitted && mode !== item.id && "cursor-not-allowed opacity-60"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_20rem] items-start">
        <ThemedCard className="min-h-[24rem] p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <ThemedCardHead as="h2">{deck.title}</ThemedCardHead>
              <ThemedCardParagraph>Card {cardIndex + 1} of {sessionCards.length}</ThemedCardParagraph>
            </div>
           <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                aria-disabled="true"
                aria-label="Previous card"
                className="rounded-full border border-theme-border p-1.5 text-theme-text-secondary opacity-60 disabled:cursor-not-allowed disabled:border-theme-border/50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {isLastCard ? (
                <button
                  type="button"
                  onClick={finishStudy}
                  disabled={saving}
                  aria-disabled={!canMoveCards}
                  className="rounded-full bg-green-500 p-1.5 text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-green-500/50"
                >
                  <Check className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextCard}
                  aria-disabled={!canMoveCards}
                  aria-label="Next card"
                  className={`rounded-full border p-1.5 disabled:cursor-not-allowed disabled:border-theme-border/50 ${
                    cardIndex < sessionCards.length - 1 && canMoveCards
                      ? "cursor-pointer border-theme-primary bg-theme-primary/10 text-theme-primary"
                      : "border-theme-border text-theme-text-secondary"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

     
         

          {mode === "mcq" && (
            <div>
              <h3 className=" text-theme-text-primary">{card.question}</h3>
              <div className="mt-4 grid gap-3">
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
                        "rounded-lg border px-4 py-2.5 text-left   transition border-slate-300 dark:border-slate-700 w-full",
                        submitted && isCorrect && "border-theme-success bg-theme-success/15 text-theme-success",
                        submitted && isSelected && !isCorrect && "border-theme-error bg-theme-error/15 text-theme-error",
                        !submitted && "border-theme-border cursor-pointer bg-theme-surface-muted text-theme-text-primary hover:border-theme-primary"
                      )}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              
            </div>
          )}

          {mode === "truefalse" && (
            <div className="space-y-5">
              <h3 className=" text-theme-text-primary">{card.question}</h3>
              <p className="rounded-lg border border-theme-border bg-theme-surface-muted p-4  text-theme-text-primary">
                {card.answer}
              </p>
              <div className="flex items-center gap-2 justify-end">
               
                <ThemedButton 
                  type="button" 
                  disabled={submitted || saving} 
                  variant="error" 
                  onClick={() => chooseAnswer("False")}
                  className="w-fit font-medium"
                >
                  <X className="mr-2 h-4 w-4" />
                  False
                </ThemedButton>
                 <ThemedButton 
                  type="button" 
                  disabled={submitted || saving} 
                  variant="success" 
                  onClick={() => chooseAnswer(card.answer)}
                  className="w-fit font-medium"
                >
                  <Check className="mr-2 h-4 w-4" />
                  True
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
              <h3 className=" text-theme-text-primary">{card.question}</h3>
              <ThemedInput
                label="Type your answer"
                textarea
                rows={4}
                value={typingAnswer}
                onChange={(event) => setTypingAnswer(event.target.value)}
                disabled={submitted}
                placeholder="Your answer should include the key idea to get partial credit. Don't worry about exact wording!"
              />
              <div className="flex items-center gap-2 justify-end">
                  <ThemedButton type="button" disabled={saving || submitted || !typingAnswer.trim()} onClick={submitTyping} className="gap-2">
                <Keyboard className="h-4 w-4" />
                Check answer similarity
              </ThemedButton>
              </div>
              {submitted && (
                <div
                  className="rounded-lg p-4 border border-theme-border bg-theme-surface-muted text-sm leading-6 "
                >
                  <p className="text-lg font-black">{typingCorrect ? "Correct" : "Wrong"}</p>
                  <p className=" text-xl font-black text-theme-text-primary">{typedScore}% partial credit</p>
                  <p className="mt-1 text-sm leading-6 text-theme-text-secondary">Key idea: {typingKeyIdea}</p>
                </div>
              )}
            </div>
          )}

  
        </ThemedCard>

        <aside className="space-y-4">
          <ThemedCard className="p-5">
            <ThemedCardHead as="h2" className="text-xl">
              Study Stats
            </ThemedCardHead>
            <div className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Accuracy</span><strong>{getAccuracy(card)}%</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Times studied</span><strong>{card.stats.timesStudied}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Correct</span><strong>{card.stats.timesCorrect}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Wrong</span><strong>{card.stats.timesWrong}</strong></div>
              <div className="flex justify-between gap-4"><span className="text-theme-text-secondary">Streak</span><strong>{card.stats.streak}</strong></div>
            </div>
          </ThemedCard>

          <ThemedCard className="p-5">
            <ThemedCardHead as="h2" className="text-xl">Mastery Score</ThemedCardHead>
            <p className="mt-4 text-3xl font-bold text-theme-text-primary">{getMasteryScore(card)}</p>
            <p className="mt-2 text-sm font-bold text-theme-primary">{getMasteryLevel(getMasteryScore(card))}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-theme-surface-muted">
              <div className="h-full rounded-full bg-theme-primary" style={{ width: `${getMasteryScore(card)}%` }} />
            </div>
          
          </ThemedCard>

        </aside>
      </section>

      <RecentTakesModal
        isOpen={isRecentTakesOpen}
        results={recentSessions}
        onClose={closeRecentTakes}
      />
    </ThemedPage>
  );
}
