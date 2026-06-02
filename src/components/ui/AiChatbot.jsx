import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, SendHorizontal, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { classNames } from "../Theme";

const initialMessages = [
  {
    role: "assistant",
    text: "Hi, I am FlashMind AI. Ask me about study planning, flashcards, quizzes, or anything you are reviewing.",
  },
];

async function askGemini(messages) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in your environment.");
  }

  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.text }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [
            {
              text:
                "You are FlashMind AI, a concise and friendly study assistant. Help students understand concepts, plan reviews, and create study prompts. Keep answers practical.",
            },
          ],
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("FlashMind AI could not respond right now.");
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  return reply || "I could not generate a response. Try asking that another way.";
}

export default function AiChatbot() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const hiddenOnStudy = location.pathname === "/study" || location.pathname.startsWith("/study/");
  const hiddenOnLanding = location.pathname === "/";
  const hiddenOnAuth = location.pathname === "/signin" || location.pathname === "/signup" || location.pathname.startsWith("/auth/");
  const hiddenOnPage = hiddenOnLanding || hiddenOnStudy || hiddenOnAuth;

  useEffect(() => {
    if (hiddenOnPage) {
      setOpen(false);
    }
  }, [hiddenOnPage]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function handleSubmit(event) {
    event.preventDefault();

    const text = draft.trim();

    if (!text || loading) {
      return;
    }

    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setDraft("");
    setLoading(true);

    try {
      const answer = await askGemini(nextMessages);
      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: error.message || "I cannot connect right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function parseInlineText(text) {
    const tokens = [];
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push(text.slice(lastIndex, match.index));
      }

      const token = match[0];
      const content = token.slice(token.startsWith("**") ? 2 : 1, token.endsWith("**") ? -2 : -1);

      if (token.startsWith("**")) {
        tokens.push(
          <strong key={`strong-${key++}`} className="font-bold">
            {content}
          </strong>
        );
      } else {
        tokens.push(
          <em key={`em-${key++}`} className="italic">
            {content}
          </em>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push(text.slice(lastIndex));
    }

    return tokens;
  }

  function renderMessageText(text) {
    const lines = text.split("\n");
    const blocks = [];
    let listItems = [];

    function flushList(index) {
      if (!listItems.length) {
        return;
      }

      blocks.push(
        <ul key={`list-${index}`} className="ml-5 list-disc space-y-1 text-sm leading-6">
          {listItems.map((item, itemIndex) => (
            <li key={`li-${index}-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("- ")) {
        listItems.push(parseInlineText(trimmed.slice(2)));
      } else {
        flushList(index);
        blocks.push(
          <div key={`line-${index}`} className="text-sm leading-6">
            {parseInlineText(line)}
          </div>
        );
      }
    });

    flushList(lines.length);
    return blocks;
  }

  if (hiddenOnPage) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6">
      {open && (
        <section
          aria-label="FlashMind AI chatbot"
          className="flex h-[min(58vh,32rem)] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden rounded-2xl border border-theme-border bg-theme-surface text-theme-text-primary shadow-2xl shadow-slate-950/20 transition-colors"
        >
          <header className="flex items-center justify-between border-b border-theme-border px-4 py-3 bg-theme-surface">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-theme-secondary/15 text-theme-secondary">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-sm font-black text-theme-text-primary">FlashMind AI</h2>
                <p className="text-xs text-theme-text-secondary">Study assistant</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close FlashMind AI"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-theme-text-secondary transition hover:bg-theme-surface-muted hover:text-theme-text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 min-h-0 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={classNames("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={classNames(
                    "max-w-[86%] whitespace-pre-wrap rounded-xl px-4 border border-theme-border py-2 text-sm leading-6",
                    message.role === "user"
                      ? "bg-theme-primary text-white"
                      : "bg-theme-surface-muted text-theme-text-primary"
                  )}
                >
                  {renderMessageText(message.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <p className="inline-flex items-center gap-2 rounded-xl border border-theme-border bg-theme-surface-muted px-4 py-2 text-sm text-theme-text-secondary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </p>
              </div>
            )}
            <div ref={endRef} />
          </div>

         <form
          onSubmit={handleSubmit}
          className="border-t border-theme-border bg-theme-surface p-4"
        >
          <div className="flex items-end gap-3 rounded-xl border border-theme-border bg-theme-background px-3 py-2 ">
            <label className="sr-only" htmlFor="flashmind-ai-message">
              Message FlashMind AI
            </label>

            <textarea
              id="flashmind-ai-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              rows={1}
              placeholder="Ask FlashMind AI anything..."
              className="
                min-h-[24px]
                max-h-40
                flex-1
                resize-none
                bg-transparent
                py-2
                text-sm
                text-theme-text-primary
                placeholder:text-theme-text-muted
                outline-none
                overflow-y-auto
              "
            />

            <button
              type="submit"
              disabled={!draft.trim() || loading}
              aria-label="Send message"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-theme-primary
                text-white
                transition-all
                hover:bg-theme-primary-hover
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:scale-100
              "
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal className="h-4 w-4" />
              )}
            </button>
          </div>

          <p className="mt-2 text-center text-xs text-theme-text-muted">
            Press Enter to send • Shift + Enter for a new line
          </p>
        </form>
        </section>
      )}

      {!open && (
        <button
          type="button"
          aria-label="Open FlashMind AI"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-theme-primary text-white shadow-xl shadow-theme-primary/30 transition hover:-translate-y-0.5 hover:bg-theme-primary-hover focus:outline-none focus:ring-4 focus:ring-theme-primary/25"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
