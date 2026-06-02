import { X } from "lucide-react";
import { ThemedCard, ThemedCardHead, ThemedCardParagraph } from "../components/Theme";

export default function AvatarModal({ isOpen, images = [], selected, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay p-4">
      <ThemedCard className="w-full max-w-xl overflow-hidden min-h-[50vh]  rounded-3xl">
        <header className="flex items-start justify-between gap-4 border-b border-theme-border p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-theme-primary">Avatar</p>
            <ThemedCardHead as="h2" className="mt-1">Choose your avatar</ThemedCardHead>
            <ThemedCardParagraph className=" text-theme-text-secondary">Select an avatar for your profile.</ThemedCardParagraph>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close avatar chooser"
            className="grid p-2 shrink-0 cursor-pointer place-items-center rounded-lg border border-theme-border text-theme-text-secondary transition hover:border-theme-primary hover:text-theme-text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(src)}
                className={
                  "mx-auto h-24 w-24 overflow-hidden rounded-xl border-4 p-0 transition hover:scale-105 sm:h-32 sm:w-32 " + (selected === src ? "border-theme-primary" : "border-transparent")
                }
              >
                <img src={src} alt={`avatar-${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

       
      </ThemedCard>
    </div>
  );
}
