import { useMemo } from "react";
import { flattenCards, getDeckStats, getMasteryScore, getStrongCards, getWeakCards } from "../utils/studyMetrics";

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfDay(date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function getSessionDate(session) {
  if (!session?.studiedAt) {
    return null;
  }

  return new Date(session.studiedAt);
}

function getAllSessions(decks) {
  return decks.flatMap((deck) =>
    (deck.studySessions || []).map((session) => ({
      ...session,
      deckId: deck.id,
      deckTitle: deck.title,
    }))
  );
}

function buildWeeklyStudy(decks) {
  const sessions = getAllSessions(decks);
  const today = startOfDay(new Date());
  const todayDay = today.getDay();
  const mondayOffset = (todayDay + 6) % 7; // Sunday -> 6, Monday -> 0, Tuesday -> 1, ...
  const startOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const daySessions = sessions.filter((session) => {
      const sessionDate = getSessionDate(session);
      return sessionDate && startOfDay(sessionDate).getTime() === date.getTime();
    });
    const accuracySessions = daySessions.filter((session) => typeof session.score === "number");
    const accuracy = accuracySessions.length
      ? Math.round(accuracySessions.reduce((sum, session) => sum + session.score, 0) / accuracySessions.length)
      : 0;

    return {
      day: dayLabels[date.getDay()],
      date: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      cards: daySessions.length,
      accuracy,
    };
  });
}

function buildHeatmap(decks) {
  const sessions = getAllSessions(decks);
  const today = startOfDay(new Date());

  return Array.from({ length: 35 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (34 - index));
    const count = sessions.filter((session) => {
      const sessionDate = getSessionDate(session);
      return sessionDate && startOfDay(sessionDate).getTime() === date.getTime();
    }).length;

    return {
      id: date.toISOString(),
      count,
    };
  });
}

export function useStudyAnalytics(decks) {
  return useMemo(() => {
    const cards = flattenCards(decks);
    const stats = getDeckStats(decks);
    const sessions = getAllSessions(decks);
    const weeklyStudy = buildWeeklyStudy(decks);
    const activityHeatmap = buildHeatmap(decks);
    const recentDecks = [...decks]
      .filter((deck) => deck.lastStudied || deck.updatedAt || deck.createdAt)
      .sort((a, b) => new Date(b.lastStudied || b.updatedAt || b.createdAt) - new Date(a.lastStudied || a.updatedAt || a.createdAt))
      .slice(0, 5);
    const masteredPercent = cards.length ? Math.round((stats.masteredCards / cards.length) * 100) : 0;
    const goodPercent = cards.length
      ? Math.round((cards.filter((card) => getMasteryScore(card) >= 70).length / cards.length) * 100)
      : 0;
    const reviewPercent = cards.length ? Math.round((stats.reviewCards / cards.length) * 100) : 0;

    return {
      cards,
      stats,
      sessions,
      weeklyStudy,
      activityHeatmap,
      recentDecks,
      weakCards: getWeakCards(decks),
      strongCards: getStrongCards(decks),
      masteredPercent,
      goodPercent,
      reviewPercent,
    };
  }, [decks]);
}
