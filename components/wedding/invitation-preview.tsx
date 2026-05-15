"use client";

import { Heart, Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface InvitationData {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  weddingTime: string;
  venue: string;
  venueAddress: string;
  message: string;
  template: "classic" | "modern" | "floral";
}

interface InvitationPreviewProps {
  data: InvitationData;
}

export function InvitationPreview({ data }: InvitationPreviewProps) {
  const templateStyles = {
    classic: {
      bg: "bg-gradient-to-b from-amber-50 to-orange-50",
      border: "border-amber-200",
      accent: "text-amber-700",
      heartColor: "text-amber-600",
    },
    modern: {
      bg: "bg-gradient-to-br from-rose-50 via-white to-pink-50",
      border: "border-rose-200",
      accent: "text-rose-600",
      heartColor: "text-rose-500",
    },
    floral: {
      bg: "bg-gradient-to-b from-emerald-50 to-teal-50",
      border: "border-emerald-200",
      accent: "text-emerald-700",
      heartColor: "text-emerald-600",
    },
  };

  const style = templateStyles[data.template];

  return (
    <div
      className={`relative w-full max-w-md mx-auto ${style.bg} rounded-2xl border-2 ${style.border} p-8 shadow-xl overflow-hidden`}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-current opacity-20 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-current opacity-20 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-current opacity-20 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-current opacity-20 rounded-br-2xl" />

      {/* Header */}
      <div className="text-center mb-8">
        <p className={`text-sm tracking-[0.3em] uppercase ${style.accent} mb-2`}>
          Trân trọng kính mời
        </p>
        <div className="w-24 h-0.5 bg-current opacity-30 mx-auto" />
      </div>

      {/* Couple Names */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-4xl md:text-5xl text-foreground tracking-wide">
          {data.groomName || "Chú Rể"}
        </h2>
        <div className="flex items-center justify-center my-4">
          <div className="w-12 h-px bg-current opacity-30" />
          <Heart
            className={`w-6 h-6 mx-4 ${style.heartColor} fill-current`}
          />
          <div className="w-12 h-px bg-current opacity-30" />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground tracking-wide">
          {data.brideName || "Cô Dâu"}
        </h2>
      </div>

      {/* Message */}
      {data.message && (
        <p className="text-center text-muted-foreground italic text-sm mb-8 px-4">
          {`"${data.message}"`}
        </p>
      )}

      {/* Event Details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-center gap-3">
          <Calendar className={`w-5 h-5 ${style.accent}`} />
          <span className="text-foreground font-medium">
            {data.weddingDate
              ? format(data.weddingDate, "EEEE, dd MMMM yyyy", { locale: vi })
              : "Chọn ngày cưới"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Clock className={`w-5 h-5 ${style.accent}`} />
          <span className="text-foreground font-medium">
            {data.weddingTime || "Chọn giờ"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <MapPin className={`w-5 h-5 ${style.accent}`} />
          <div className="text-center">
            <p className="text-foreground font-medium">
              {data.venue || "Tên địa điểm"}
            </p>
            <p className="text-muted-foreground text-sm">
              {data.venueAddress || "Địa chỉ"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className={`text-xs tracking-[0.2em] uppercase ${style.accent}`}>
          Sự hiện diện của quý khách là niềm vinh hạnh cho chúng tôi
        </p>
      </div>
    </div>
  );
}
