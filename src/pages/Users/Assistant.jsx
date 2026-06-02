import { useState } from "react";
import { Bot, Brain, Lightbulb, Loader2, MessageSquare, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
  ThemedInput,
  ThemedPage,
} from "../../components/Theme";
import { useStudyDecks } from "../../hooks/useStudyDecks";

const prompts = [
  "Generate mnemonics for confusing concepts.",
  "Summarize this deck into key ideas.",
  "Create a practice exam based on this deck.",
  "Explain the concepts in this deck like I'm a beginner.",
];

async function askGemini(prompt, deck) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    throw new Error("Add VITE_GEMINI_API_KEY to .env before using the AI assistant.");
  }

  const deckContext = deck.cards
    .map((card) => `Q: ${card.question}\nA: ${card.answer}\nConcept: ${card.concept}`)
    .join("\n\n");
  const formattingGuide = [
    "Format the answer for a study app UI.",
    "Start with a short plain-language summary.",
    "Then use concise bullet points or numbered steps.",
    "Do not use markdown bold markers, code fences, or long paragraphs.",
    "When explaining code terms, keep angle-bracket examples short.",
  ].join(" ");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are FlashMind AI. ${formattingGuide}\n\nUse this current deck context:\n${deckContext}\n\nStudent request: ${prompt}`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("FlashMind AI could not respond right now.");
  }

  const data = await response.json();

  return data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("\n").trim() || "No response generated.";
}

function cleanLine(line) {
  return line
    .replace(/\*\*/g, "")
    .replace(/^[-*]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .trim();
}

function AssistantResponse({ text }) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return <p className="text-sm leading-6 text-theme-text-secondary">{cleanLine(text)}</p>;
  }

  const intro = [];
  const points = [];

  lines.forEach((line) => {
    if (/^(\d+\.|[-*]\s+)/.test(line)) {
      points.push(cleanLine(line));
      return;
    }

    if (points.length) {
      points.push(cleanLine(line));
    } else {
      intro.push(cleanLine(line));
    }
  });

  return (
    <div className="space-y-4">
      {intro.length > 0 && (
        <div className="space-y-2">
          {intro.map((line, index) => (
            <p key={`${line}-${index}`} className="text-sm leading-6 text-theme-text-secondary">
              {line}
            </p>
          ))}
        </div>
      )}

      {points.length > 0 && (
        <div className="space-y-2">
          {points.map((point, index) => (
            <div key={`${point}-${index}`} className="rounded-lg border border-theme-border bg-theme-surface px-4 py-3">
              <div className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-theme-primary/15 text-xs font-black text-theme-primary">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-theme-text-secondary">{point}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Assistant() {
  const { decks, loading: decksLoading } = useStudyDecks();
  const [deckId, setDeckId] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Choose a deck and ask for explanations, summaries, practice exams, mnemonics, or study advice.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const deck = decks.find((item) => item.id === deckId) || decks[0];

  async function submitPrompt(prompt) {
    const text = prompt.trim();

    if (!text || loading || !deck) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text }]);
    setDraft("");
    setLoading(true);

    try {
      const response = await askGemini(text, deck);
      setMessages((current) => [...current, { role: "assistant", text: response }]);
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", text: error.message }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedPage className="space-y-6">
    

      {!decksLoading && !decks.length && (
        <ThemedCard className="p-8 text-center">
          <ThemedCardHead as="h2">Create a deck first</ThemedCardHead>
          <ThemedCardParagraph className="mx-auto mt-2 max-w-xl">
            The AI assistant uses your Firebase deck content as context.
          </ThemedCardParagraph>
          <ThemedButton as={Link} to="/decks" className="mt-5">Go to Decks</ThemedButton>
        </ThemedCard>
      )}

      {decks.length > 0 && (
      <section className="grid min-h-0 gap-4 xl:grid-cols-[1fr_22rem]">
        <ThemedCard className="flex h-[calc(100vh-15rem)] min-h-[32rem] flex-col overflow-hidden">
          <header className="border-b border-theme-border p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <ThemedCardHead as="h2" className="text-xl">FlashMind AI</ThemedCardHead>
                <ThemedCardParagraph>Explain, summarize, generate, and tutor.</ThemedCardParagraph>
              </div>
            </div>
          </header>

          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                {message.role === "user" ? (
                  <p className="max-w-[80%] rounded-lg bg-theme-primary px-4 py-3 text-sm font-bold leading-6 text-white">
                    {message.text}
                  </p>
                ) : (
                  <div className="max-w-[88%] rounded-lg bg-theme-surface-muted px-4 py-3">
                    <AssistantResponse text={message.text} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <p className="inline-flex items-center gap-2 rounded-lg bg-theme-surface-muted px-4 py-3 text-sm font-bold text-theme-text-secondary">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitPrompt(draft);
            }}
            className="border-t border-theme-border p-4"
          >
            <div className="flex gap-2">
              <ThemedInput
                aria-label="Ask FlashMind AI"
                placeholder="Ask about this deck..."
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="flex-1"
              />
              <ThemedButton type="submit" disabled={loading || !draft.trim() || !deck} className="mt-7 h-12 w-12 px-0" aria-label="Send message">
                <Send className="h-4 w-4" />
              </ThemedButton>
            </div>
          </form>
        </ThemedCard>

        <aside className="min-h-0 max-h-[calc(100vh-15rem)] space-y-4 o pr-1">

          <label className="block min-w-64">
          <span className="text-sm font-bold text-theme-text-primary">Current deck</span>
          <select
            value={deck?.id || ""}
            onChange={(event) => setDeckId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-sm font-bold text-theme-text-primary outline-none focus:border-theme-primary"
          >
            {decks.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select>
        </label>

          <ThemedCard className="p-5">
            <ThemedCardHead as="h2" className="text-xl">Capabilities</ThemedCardHead>
            <div className="mt-4 space-y-3">
              {[
                ["Explain flashcards", Brain],
                ["Create practice exams", MessageSquare],
                ["Generate mnemonics", Lightbulb],
                ["Provide study tips", Sparkles],
              ].map(([label, Icon]) => (
                <p key={label} className="flex items-center gap-2 text-sm font-bold text-theme-text-secondary">
                  <Icon className="h-4 w-4 text-theme-primary" />
                  {label}
                </p>
              ))}
            </div>
          </ThemedCard>

          <ThemedCard className="p-5">
            <ThemedCardHead as="h2" className="text-xl">Prompt Starters</ThemedCardHead>
            <div className="mt-4 grid gap-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitPrompt(prompt)}
                  className="rounded-lg cursor-pointer border border-theme-border bg-theme-surface-muted px-4 py-3 text-left text-sm font-bold text-theme-text-primary transition hover:border-theme-primary"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </ThemedCard>
        </aside>
      </section>
      )}
    </ThemedPage>
  );
}
