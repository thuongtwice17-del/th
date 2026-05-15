"use client";

import { useState } from "react";
import { WeddingInfo, WeddingWish } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { Send, MessageCircle } from "lucide-react";

interface WishesProps {
  weddingInfo: WeddingInfo;
  initialWishes: WeddingWish[];
}

export function Wishes({ weddingInfo, initialWishes }: WishesProps) {
  const [wishes, setWishes] = useState<WeddingWish[]>(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryColor = weddingInfo.primary_color || "#8B1A1A";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("wedding_wishes")
      .insert({
        wedding_id: weddingInfo.id,
        guest_name: name.trim(),
        message: message.trim(),
      })
      .select()
      .single();

    if (!error && data) {
      setWishes([data, ...wishes]);
      setName("");
      setMessage("");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Form gửi lời chúc */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5" style={{ color: primaryColor }} />
          <h3 className="font-serif text-lg" style={{ color: primaryColor }}>
            Gửi lời chúc
          </h3>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{ 
              // @ts-expect-error CSS custom property
              "--tw-ring-color": primaryColor 
            }}
            required
          />

          <textarea
            placeholder="Lời chúc của bạn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
          </button>
        </div>
      </form>

      {/* Danh sách lời chúc */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {wishes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Hãy là người đầu tiên gửi lời chúc!
          </p>
        ) : (
          wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-white rounded-lg shadow-sm p-4 border-l-4"
              style={{ borderLeftColor: primaryColor }}
            >
              <p className="text-gray-700 mb-2">{wish.message}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium">{wish.guest_name}</span>
                <span>
                  {new Date(wish.created_at).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
