"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Volume2, VolumeX } from "lucide-react";
import { WeddingInfo } from "@/lib/types";

interface CoverProps {
  weddingInfo: WeddingInfo;
  onOpen: () => void;
}

export function Cover({ weddingInfo, onOpen }: CoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  const weddingDate = new Date(weddingInfo.wedding_date);
  const day = weddingDate.getDate();
  const month = weddingDate.getMonth() + 1;
  const year = weddingDate.getFullYear();

  const primaryColor = weddingInfo.primary_color || "#8B1A1A";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-700 ${
        isOpening ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ backgroundColor: primaryColor }}
    >
      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main card */}
      <div className="relative mx-4 max-w-sm w-full">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Top decorative border */}
          <div
            className="h-2"
            style={{ backgroundColor: primaryColor }}
          />

          <div className="p-8 text-center">
            {/* Decorative flourish */}
            <div className="flex justify-center mb-4">
              <svg
                className="w-32 h-8"
                viewBox="0 0 120 30"
                fill={primaryColor}
              >
                <path d="M60 15 C40 0, 20 0, 0 15 C20 30, 40 30, 60 15 C80 30, 100 30, 120 15 C100 0, 80 0, 60 15" />
              </svg>
            </div>

            {/* "Save the date" text */}
            <p
              className="text-sm tracking-[0.3em] uppercase mb-4"
              style={{ color: primaryColor }}
            >
              Save The Date
            </p>

            {/* Couple names */}
            <h1
              className="font-serif text-4xl md:text-5xl font-medium mb-2"
              style={{ color: primaryColor }}
            >
              {weddingInfo.groom_name}
            </h1>

            <div className="flex items-center justify-center gap-3 my-3">
              <div
                className="h-px w-12"
                style={{ backgroundColor: primaryColor }}
              />
              <Heart
                className="w-5 h-5"
                style={{ color: primaryColor }}
                fill={primaryColor}
              />
              <div
                className="h-px w-12"
                style={{ backgroundColor: primaryColor }}
              />
            </div>

            <h1
              className="font-serif text-4xl md:text-5xl font-medium mb-6"
              style={{ color: primaryColor }}
            >
              {weddingInfo.bride_name}
            </h1>

            {/* Wedding date */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <span
                    className="block text-3xl font-serif"
                    style={{ color: primaryColor }}
                  >
                    {day.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Ngày
                  </span>
                </div>
                <div
                  className="h-12 w-px"
                  style={{ backgroundColor: primaryColor, opacity: 0.3 }}
                />
                <div className="text-center">
                  <span
                    className="block text-3xl font-serif"
                    style={{ color: primaryColor }}
                  >
                    {month.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Tháng
                  </span>
                </div>
                <div
                  className="h-12 w-px"
                  style={{ backgroundColor: primaryColor, opacity: 0.3 }}
                />
                <div className="text-center">
                  <span
                    className="block text-3xl font-serif"
                    style={{ color: primaryColor }}
                  >
                    {year}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Năm
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative flourish bottom */}
            <div className="flex justify-center mb-6">
              <svg
                className="w-32 h-8 rotate-180"
                viewBox="0 0 120 30"
                fill={primaryColor}
              >
                <path d="M60 15 C40 0, 20 0, 0 15 C20 30, 40 30, 60 15 C80 30, 100 30, 120 15 C100 0, 80 0, 60 15" />
              </svg>
            </div>

            {/* Open button */}
            <button
              onClick={handleOpen}
              className="px-8 py-3 rounded-full text-white font-medium tracking-wider uppercase text-sm transition-all hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              Mở Thiệp
            </button>
          </div>

          {/* Bottom decorative border */}
          <div
            className="h-2"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
      </div>
    </div>
  );
}

interface MusicPlayerProps {
  musicUrl?: string | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export function MusicPlayer({ musicUrl, isPlaying, setIsPlaying }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  if (!musicUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
    </>
  );
}
