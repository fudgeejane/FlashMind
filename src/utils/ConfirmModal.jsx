import { ThemedButton, ThemedCardHead, ThemedCardParagraph } from "../components/Theme";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="w-full max-w-md rounded-3xl bg-theme-surface p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <ThemedCardHead as="h2" className="text-xl">
              {title}
            </ThemedCardHead>
            <ThemedCardParagraph className="mt-2 text-theme-text-secondary">
              {message}
            </ThemedCardParagraph>
          </div>
        
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <ThemedButton type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </ThemedButton>
          <ThemedButton type="button" className="gap-2" onClick={onConfirm}>
            Delete
          </ThemedButton>
        </div>
      </div>
    </div>
  );
}
