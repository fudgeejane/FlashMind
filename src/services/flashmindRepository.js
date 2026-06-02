import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export async function listUserDecks(userId) {
  const decksQuery = query(collection(db, "users", userId, "decks"), orderBy("updatedAt", "desc"));
  const snapshot = await getDocs(decksQuery);

  return snapshot.docs.map((deckDoc) => ({
    id: deckDoc.id,
    ...deckDoc.data(),
  }));
}

export async function createDeck(userId, deck) {
  const deckRef = await addDoc(collection(db, "users", userId, "decks"), {
    ...deck,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return deckRef.id;
}

export async function saveStudyResult(userId, deckId, result) {
  await addDoc(collection(db, "users", userId, "decks", deckId, "studySessions"), {
    ...result,
    createdAt: serverTimestamp(),
  });
}

export async function updateCardStats(userId, deckId, cardId, stats) {
  await updateDoc(doc(db, "users", userId, "decks", deckId, "cards", cardId), {
    stats,
    updatedAt: serverTimestamp(),
  });
}
