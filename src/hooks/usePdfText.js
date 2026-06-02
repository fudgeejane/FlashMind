import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export async function extractTextFromPdf(file) {
  if (!file) {
    throw new Error("Choose a PDF file first.");
  }

  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => item.str)
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (text) {
      pages.push(text);
    }
  }

  const extractedText = pages.join("\n\n").trim();

  if (!extractedText) {
    throw new Error("No readable text found in this PDF. Try a text-based PDF or paste the text manually.");
  }

  return extractedText;
}
