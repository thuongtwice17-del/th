"use client";

import { useState } from "react";
import { WeddingInfo, WeddingPhoto, WeddingWish } from "@/lib/types";
import { Cover, MusicPlayer } from "./cover";
import { Countdown } from "./countdown";
import { Calendar } from "./calendar";
import { PhotoGallery } from "./photo-gallery";
import { RsvpForm } from "./rsvp-form";
import { Wishes } from "./wishes";
import { GiftBox } from "./gift-box";
import { Heart, MapPin, Clock, Home } from "lucide-react";

interface WeddingPageProps {
  weddingInfo: WeddingInfo;
  photos: WeddingPhoto[];
  wishes: WeddingWish[];
}

export function WeddingPage({ weddingInfo, photos, wishes }: WeddingPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const primaryColor = weddingInfo.primary_color || "#8B1A1A";

  const weddingDate = new Date(weddingInfo.wedding_date);
  const formattedDate = weddingDate.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover */}
      {!isOpen && <Cover weddingInfo={weddingInfo} onOpen={handleOpen} />}

      {/* Music Player */}
      <MusicPlayer
        musicUrl={weddingInfo.background_music_url}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      {/* Main Content */}
      <main className={`transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
        {/* Hero Section */}
        <section
          className="min-h-screen flex flex-col items-center justify-center text-white py-20 px-4 relative"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative text-center">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
              We are getting married
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-4">
              {weddingInfo.groom_name}
            </h1>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px w-16 bg-white/50" />
              <Heart className="w-6 h-6" fill="currentColor" />
              <div className="h-px w-16 bg-white/50" />
            </div>

            <h1 className="font-serif text-5xl md:text-7xl mb-8">
              {weddingInfo.bride_name}
            </h1>

            <p className="text-lg opacity-90">{formattedDate}</p>
          </div>
        </section>

        {/* Couple Info Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                Trân trọng kính mời
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Heart className="w-4 h-4" style={{ color: primaryColor }} fill={primaryColor} />
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Nhà trai */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl mb-4" style={{ color: primaryColor }}>
                  Nhà Trai
                </h3>
                <p className="text-gray-600 mb-2">{weddingInfo.groom_father}</p>
                <p className="text-gray-600 mb-4">{weddingInfo.groom_mother}</p>
                <p className="font-medium text-lg" style={{ color: primaryColor }}>
                  {weddingInfo.groom_full_name}
                </p>
                <p className="text-sm text-gray-500 mt-2">{weddingInfo.groom_address}</p>
              </div>

              {/* Nhà gái */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl mb-4" style={{ color: primaryColor }}>
                  Nhà Gái
                </h3>
                <p className="text-gray-600 mb-2">{weddingInfo.bride_father}</p>
                <p className="text-gray-600 mb-4">{weddingInfo.bride_mother}</p>
                <p className="font-medium text-lg" style={{ color: primaryColor }}>
                  {weddingInfo.bride_full_name}
                </p>
                <p className="text-sm text-gray-500 mt-2">{weddingInfo.bride_address}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                  Album Ảnh Cưới
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                  <Heart className="w-4 h-4" style={{ color: primaryColor }} fill={primaryColor} />
                  <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                </div>
              </div>

              <PhotoGallery photos={photos} primaryColor={primaryColor} />
            </div>
          </section>
        )}

        {/* Event Details */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                Thời gian & Địa điểm
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Heart className="w-4 h-4" style={{ color: primaryColor }} fill={primaryColor} />
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              </div>
            </div>

            {/* Countdown */}
            <div className="mb-12">
              <Countdown weddingInfo={weddingInfo} />
            </div>

            {/* Calendar */}
            <div className="mb-12">
              <Calendar weddingInfo={weddingInfo} />
            </div>

            {/* Event Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Lễ cưới */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg mb-2" style={{ color: primaryColor }}>
                  Lễ Cưới
                </h3>
                <p className="text-2xl font-medium mb-2">
                  {weddingInfo.ceremony_time?.slice(0, 5) || "09:00"}
                </p>
                <p className="text-gray-600">{formattedDate}</p>
              </div>

              {/* Tiệc cưới */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg mb-2" style={{ color: primaryColor }}>
                  Tiệc Cưới
                </h3>
                <p className="text-2xl font-medium mb-2">
                  {weddingInfo.reception_time?.slice(0, 5) || "11:00"}
                </p>
                <p className="text-gray-600">{formattedDate}</p>
              </div>
            </div>

            {/* Venue */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg mb-2" style={{ color: primaryColor }}>
                Địa điểm
              </h3>
              <p className="font-medium text-lg mb-1">{weddingInfo.venue_name}</p>
              <p className="text-gray-600 mb-4">{weddingInfo.venue_address}</p>

              {weddingInfo.map_link && (
                <a
                  href={weddingInfo.map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                >
                  <MapPin className="w-4 h-4" />
                  Xem bản đồ
                </a>
              )}
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                Xác nhận tham dự
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Heart className="w-4 h-4" style={{ color: primaryColor }} fill={primaryColor} />
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              </div>
              <p className="text-gray-600 mt-4">
                Sự hiện diện của bạn là niềm vinh hạnh cho chúng tôi
              </p>
            </div>

            <RsvpForm weddingInfo={weddingInfo} />
          </div>
        </section>

        {/* Wishes Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                Sổ Lưu Bút
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Heart className="w-4 h-4" style={{ color: primaryColor }} fill={primaryColor} />
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              </div>
            </div>

            <Wishes weddingInfo={weddingInfo} initialWishes={wishes} />
          </div>
        </section>

        {/* Gift Box Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl mb-2" style={{ color: primaryColor }}>
                Hộp Mừng Cưới
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
                <Heart className="w-4 h-4" style={{ color: primaryColor }} fill={primaryColor} />
                <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
              </div>
            </div>

            <GiftBox weddingInfo={weddingInfo} />
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 px-4 text-white text-center"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5" fill="currentColor" />
          </div>
          <h3 className="font-serif text-2xl mb-2">
            {weddingInfo.groom_name} & {weddingInfo.bride_name}
          </h3>
          <p className="opacity-80">{formattedDate}</p>
          <p className="text-sm opacity-60 mt-4">
            Cảm ơn bạn đã ghé thăm thiệp cưới của chúng tôi
          </p>
        </footer>
      </main>
    </div>
  );
}
