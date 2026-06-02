export function getAccuracy(card) {
  if (!card?.stats?.timesStudied) {
    return 0;
  }

  return Math.round((card.stats.timesCorrect / card.stats.timesStudied) * 100);
}

export function getMasteryScore(card) {
  const accuracyRate = getAccuracy(card);
  const currentStreak = card?.stats?.streak || 0;
  const reviewFrequency = card?.stats?.timesStudied || 0;
  const weightedScore = accuracyRate * 0.6 + currentStreak * 5 + reviewFrequency * 0.2;

  return Math.max(0, Math.min(100, Math.round(weightedScore)));
}

export function getMasteryLevel(score) {
  if (score >= 90) {
    return "Mastered";
  }

  if (score >= 70) {
    return "Good";
  }

  if (score >= 40) {
    return "Learning";
  }

  return "Needs Review";
}

export function flattenCards(decks) {
  return decks.flatMap((deck) =>
    deck.cards.map((card) => ({
      ...card,
      deckTitle: deck.title,
      subject: deck.subject,
      tags: deck.tags,
    }))
  );
}

export function getDeckStats(decks) {
  const cards = flattenCards(decks);
  const totalStudied = cards.reduce((sum, card) => sum + card.stats.timesStudied, 0);
  const totalCorrect = cards.reduce((sum, card) => sum + card.stats.timesCorrect, 0);
  const averageAccuracy = totalStudied ? Math.round((totalCorrect / totalStudied) * 100) : 0;
  const masteredCards = cards.filter((card) => getMasteryScore(card) >= 90).length;
  const reviewCards = cards.filter((card) => getMasteryScore(card) < 40).length;
  const studySessions = decks.reduce((sum, deck) => sum + deck.quizScores.length, 0);

  return {
    totalDecks: decks.length,
    totalCards: cards.length,
    studySessions,
    averageAccuracy,
    masteredCards,
    reviewCards,
  };
}

export function getWeakCards(decks) {
  return flattenCards(decks)
    .filter((card) => card.stats.timesWrong > 0)
    .sort((a, b) => b.stats.timesWrong - a.stats.timesWrong)
    .slice(0, 5);
}

export function getStrongCards(decks) {
  return flattenCards(decks)
    .sort((a, b) => getMasteryScore(b) - getMasteryScore(a))
    .slice(0, 5);
}
