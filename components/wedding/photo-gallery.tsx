"use client";

import { useState } from "react";
import { WeddingPhoto } from "@/lib/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PhotoGalleryProps {
  photos: WeddingPhoto[];
  primaryColor?: string;
}

export function PhotoGallery({ photos, primaryColor = "#8B1A1A" }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Chưa có ảnh cưới nào
      </div>
    );
  }

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md"
            onClick={() => openLightbox(index)}
          >
            <img
              src={photo.image_url}
              alt={photo.caption || `Ảnh cưới ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={photos[selectedIndex].image_url}
            alt={photos[selectedIndex].caption || ""}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Caption */}
          {photos[selectedIndex].caption && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
              <p>{photos[selectedIndex].caption}</p>
            </div>
          )}

          {/* Indicators */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-white" : "bg-white/40"
                }`}
                style={index === selectedIndex ? { backgroundColor: primaryColor } : {}}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
