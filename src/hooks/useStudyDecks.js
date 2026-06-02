import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../auth/contexts/useAuthContext";
import { generateFlashcardsWithGemini } from "./useGemini";
import { canUploadPdfToCloudinary, uploadPdfToCloudinary } from "../services/pdfUpload";
import { getMasteryScore } from "../utils/studyMetrics";

function makeId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toDateValue(value) {
  if (!value) {
    return null;
  }

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  return new Date(value);
}

function normalizeStats(stats = {}) {
  return {
    timesStudied: Number(stats.timesStudied || 0),
    timesCorrect: Number(stats.timesCorrect || 0),
    timesWrong: Number(stats.timesWrong || 0),
    streak: Number(stats.streak || 0),
    lastReviewed: stats.lastReviewed || null,
    masteryScore: Number(stats.masteryScore || 0),
  };
}

function normalizeCard(card, index) {
  const nextCard = {
    id: card.id || makeId(`card-${index}`),
    question: card.question || "",
    answer: card.answer || "",
    concept: card.concept || card.keyConcept || "General concept",
    difficulty: card.difficulty || "Medium",
    explanation: card.explanation || card.answer || "",
    stats: normalizeStats(card.stats),
  };

  return {
    ...nextCard,
    stats: {
      ...nextCard.stats,
      masteryScore: getMasteryScore(nextCard),
    },
  };
}

function normalizeDeck(deck) {
  const cards = Array.isArray(deck.cards) ? deck.cards.map(normalizeCard) : [];
  const studySessions = Array.isArray(deck.studySessions) ? deck.studySessions : [];

  return {
    id: deck.id,
    title: deck.title || "Untitled Deck",
    description: deck.description || "",
    subject: deck.subject || "Custom",
    source: deck.source || "Manual",
    tags: Array.isArray(deck.tags) ? deck.tags : [],
    cards,
    studySessions,
    quizScores: Array.isArray(deck.quizScores) ? deck.quizScores : [],
    pdfUrl: deck.pdfUrl || "",
    createdAt: toDateValue(deck.createdAt),
    updatedAt: toDateValue(deck.updatedAt),
    lastStudied: deck.lastStudied || null,
  };
}

function makeDeckPayload(deck) {
  return {
    title: deck.title.trim(),
    description: deck.description?.trim() || "",
    subject: deck.subject?.trim() || "Custom",
    source: deck.source,
    tags: deck.tags || [],
    cards: (deck.cards || []).map(normalizeCard),
    quizScores: [],
    studySessions: [],
    lastStudied: null,
    pdfUrl: deck.pdfUrl || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export function useStudyDecks() {
  const { user } = useAuth();
  const uid = user?.uid || "";
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) {
      return undefined;
    }

    const decksQuery = query(collection(db, "users", uid, "decks"), orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(
      decksQuery,
      (snapshot) => {
        setDecks(snapshot.docs.map((deckDoc) => normalizeDeck({ id: deckDoc.id, ...deckDoc.data() })));
        setLoading(false);
        setError("");
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [uid]);

  const createDeck = useCallback(
    async (deck) => {
      if (!uid) {
        throw new Error("Sign in before creating decks.");
      }

      const payload = {
        ...makeDeckPayload(deck),
        createdBy: uid,
      };

      if (!payload.title) {
        throw new Error("Deck title is required.");
      }

      if (!payload.cards.length) {
        throw new Error("Add at least one valid flashcard.");
      }

      await addDoc(collection(db, "users", uid, "decks"), payload);
    },
    [uid]
  );

  const deleteDeck = useCallback(
    async (deckId) => {
      if (!uid) {
        throw new Error("Sign in before deleting decks.");
      }

      await deleteDoc(doc(db, "users", uid, "decks", deckId));
    },
    [uid]
  );

  const generateAiDeck = useCallback(
    async ({ topic, subject, count }) => {
      const cards = await generateFlashcardsWithGemini(
        `Create ${count} exam-focused flashcards for ${subject || "general study"} on ${topic}.
Return JSON only:
{"cards":[{"question":"...","answer":"...","concept":"...","difficulty":"Easy|Medium|Hard","explanation":"..."}]}`
      );

      await createDeck({
        title: `${topic} Deck`,
        description: `AI-generated ${subject || "study"} deck with key concepts and common test questions.`,
        subject,
        source: "AI Generated",
        tags: [subject, topic, "Gemini"].filter(Boolean),
        cards,
      });
    },
    [createDeck]
  );

  const generatePdfDeck = useCallback(
    async ({ file, title, subject, extractedText }) => {
      let pdfUrl = "";
      const pdfText = extractedText?.trim();

      if (!pdfText) {
        throw new Error("Paste extracted PDF text before generating the deck.");
      }

      if (file && canUploadPdfToCloudinary()) {
        const upload = await uploadPdfToCloudinary(file);
        pdfUrl = upload.secure_url || upload.url || "";
      }

      const cards = await generateFlashcardsWithGemini(
        `Use this PDF study text to create mixed exam preparation flashcards for ${subject || "general study"}.
Return JSON only:
{"cards":[{"question":"...","answer":"...","concept":"...","difficulty":"Easy|Medium|Hard","explanation":"..."}]}

PDF text:
${pdfText}`
      );

      await createDeck({
        title: title || file?.name?.replace(/\.pdf$/i, "") || "PDF Generated Deck",
        description: "Generated from uploaded PDF study material.",
        subject,
        source: "PDF Generated",
        tags: [subject, "PDF", "Gemini"].filter(Boolean),
        cards,
        pdfUrl,
      });
    },
    [createDeck]
  );

  const recordCardResult = useCallback(
    async ({ deckId, cardId, correct, mode, score }) => {
      if (!uid) {
        throw new Error("Sign in before saving study progress.");
      }

      const deck = decks.find((item) => item.id === deckId);

      if (!deck) {
        throw new Error("Deck not found.");
      }

      const cards = deck.cards.map((card) => {
        if (card.id !== cardId) {
          return card;
        }

        const stats = normalizeStats(card.stats);
        const updatedCard = {
          ...card,
          stats: {
            ...stats,
            timesStudied: stats.timesStudied + 1,
            timesCorrect: stats.timesCorrect + (correct ? 1 : 0),
            timesWrong: stats.timesWrong + (correct ? 0 : 1),
            streak: correct ? stats.streak + 1 : 0,
            lastReviewed: new Date().toISOString(),
          },
        };

        return {
          ...updatedCard,
          stats: {
            ...updatedCard.stats,
            masteryScore: getMasteryScore(updatedCard),
          },
        };
      });

      const nextScore = typeof score === "number" ? score : correct ? 100 : 0;
      const studySessions = [
        ...(deck.studySessions || []),
        {
          id: makeId("session"),
          mode,
          cardId,
          score: nextScore,
          correct,
          studiedAt: new Date().toISOString(),
        },
      ];

      await updateDoc(doc(db, "users", uid, "decks", deckId), {
        cards,
        studySessions,
        quizScores: [...(deck.quizScores || []), nextScore],
        lastStudied: new Date().toISOString(),
        updatedAt: serverTimestamp(),
      });
    },
    [decks, uid]
  );

  return {
    decks,
    loading: uid ? loading : false,
    error,
    createDeck,
    deleteDeck,
    generateAiDeck,
    generatePdfDeck,
    recordCardResult,
  };
}
