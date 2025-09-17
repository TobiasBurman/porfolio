import React, { useEffect } from "react";
import { X } from "lucide-react";

interface JourneySection {
  title: string;
  content: string;
  keys: string[];
}

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: JourneySection | null;
  noteKey: string;
}

export const JourneyModal: React.FC<JourneyModalProps> = ({
  isOpen,
  onClose,
  section,
  noteKey,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !section) return null;

  const isBlackKey = noteKey.includes("#");
  const keyBinding = noteKey === "C" ? "a" : noteKey === "C#" ? "w" : noteKey === "D" ? "s" : noteKey === "D#" ? "e" : "d";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 modal-overlay"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl mx-4 bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header with Close Button */}
        <div className="flex justify-between items-start p-8 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-pink-400 mb-2">
              {section.title}
            </h2>
            <div className="w-16 h-1 bg-pink-400 rounded-full"></div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-4">
          <p className="text-white text-lg leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        </div>

        {/* Footer with Piano Key Info */}
        <div className="px-8 py-6 border-t border-slate-600 bg-slate-700/50">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Piano Key:</span>
            <div className="bg-pink-400 text-white px-3 py-1 rounded font-bold text-sm">
              {noteKey}
            </div>
            <span className="text-gray-400 text-sm">
              Press "{keyBinding}" to play
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};