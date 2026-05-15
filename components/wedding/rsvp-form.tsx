"use client";

import { useState } from "react";
import { WeddingInfo } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { UserCheck, Users } from "lucide-react";

interface RsvpFormProps {
  weddingInfo: WeddingInfo;
}

export function RsvpForm({ weddingInfo }: RsvpFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const primaryColor = weddingInfo.primary_color || "#8B1A1A";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("wedding_rsvp").insert({
      wedding_id: weddingInfo.id,
      guest_name: name.trim(),
      phone: phone.trim() || null,
      attending,
      guest_count: attending ? guestCount : 0,
      message: message.trim() || null,
    });

    if (!error) {
      setSubmitted(true);
    }

    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: primaryColor }}
        >
          <UserCheck className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-xl mb-2" style={{ color: primaryColor }}>
          Cảm ơn bạn!
        </h3>
        <p className="text-gray-600">
          {attending
            ? "Chúng tôi rất vui được đón tiếp bạn!"
            : "Cảm ơn bạn đã phản hồi. Chúng tôi sẽ nhớ bạn!"}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto"
    >
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5" style={{ color: primaryColor }} />
        <h3 className="font-serif text-lg" style={{ color: primaryColor }}>
          Xác nhận tham dự
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bạn có tham dự không?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={attending}
                onChange={() => setAttending(true)}
                className="w-4 h-4"
                style={{ accentColor: primaryColor }}
              />
              <span>Có, tôi sẽ đến</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!attending}
                onChange={() => setAttending(false)}
                className="w-4 h-4"
                style={{ accentColor: primaryColor }}
              />
              <span>Xin lỗi, tôi bận</span>
            </label>
          </div>
        </div>

        {attending && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số người tham dự
            </label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} người
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lời nhắn (tùy chọn)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 resize-none"
            placeholder="Lời nhắn cho cô dâu chú rể..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg text-white font-medium transition-opacity disabled:opacity-50"
          style={{ backgroundColor: primaryColor }}
        >
          {isSubmitting ? "Đang gửi..." : "Xác nhận"}
        </button>
      </div>
    </form>
  );
}
