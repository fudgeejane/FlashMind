const GEMINI_MODELS = [
  import.meta.env.VITE_GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.0-flash",
].filter(Boolean);

function getGeminiApiKey() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Add a valid VITE_GEMINI_API_KEY to .env, then restart the dev server.");
  }

  return apiKey;
}

function parseGeminiJson(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const jsonStart = cleaned.indexOf("{");
  const jsonEnd = cleaned.lastIndexOf("}");
  const jsonText = jsonStart >= 0 && jsonEnd >= 0 ? cleaned.slice(jsonStart, jsonEnd + 1) : cleaned;

  return JSON.parse(jsonText);
}

async function callGeminiModel({ model, prompt, apiKey }) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || `Gemini request failed with ${response.status}.`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("\n") || "";

  if (!text.trim()) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}

export async function generateFlashcardsWithGemini(prompt) {
  const apiKey = getGeminiApiKey();
  const models = [...new Set(GEMINI_MODELS)];
  let lastError;

  for (const model of models) {
    try {
      const text = await callGeminiModel({ model, prompt, apiKey });
      const parsed = parseGeminiJson(text);

      return Array.isArray(parsed.cards) ? parsed.cards : [];
    } catch (error) {
      lastError = error;

      if (error.status !== 404) {
        break;
      }
    }
  }

  throw new Error(lastError?.message || "Gemini could not generate deck content right now.");
}
