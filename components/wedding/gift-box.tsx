"use client";

import { useState } from "react";
import { WeddingInfo } from "@/lib/types";
import { Gift, Copy, Check, QrCode } from "lucide-react";

interface GiftBoxProps {
  weddingInfo: WeddingInfo;
}

export function GiftBox({ weddingInfo }: GiftBoxProps) {
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [showQr, setShowQr] = useState<"groom" | "bride" | null>(null);

  const primaryColor = weddingInfo.primary_color || "#8B1A1A";

  const copyToClipboard = async (text: string, type: "groom" | "bride") => {
    await navigator.clipboard.writeText(text);
    if (type === "groom") {
      setCopiedGroom(true);
      setTimeout(() => setCopiedGroom(false), 2000);
    } else {
      setCopiedBride(true);
      setTimeout(() => setCopiedBride(false), 2000);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Gift className="w-6 h-6" style={{ color: primaryColor }} />
        <h3 className="font-serif text-xl" style={{ color: primaryColor }}>
          Hộp mừng cưới
        </h3>
      </div>

      <p className="text-center text-gray-600 mb-6">
        Thay cho việc tặng quà, các bạn có thể gửi lời chúc mừng đến vợ chồng
        mình qua tài khoản ngân hàng nhé!
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Chú rể */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h4
            className="font-medium text-center mb-4"
            style={{ color: primaryColor }}
          >
            Mừng cưới chú rể
          </h4>

          <div className="text-center space-y-2 mb-4">
            <p className="text-sm text-gray-500">
              {weddingInfo.groom_bank_name || "Ngân hàng"}
            </p>
            <p className="font-mono text-lg">
              {weddingInfo.groom_bank_account || "Chưa cập nhật"}
            </p>
            <p className="text-sm font-medium">
              {weddingInfo.groom_bank_holder || weddingInfo.groom_full_name}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                weddingInfo.groom_bank_account &&
                copyToClipboard(weddingInfo.groom_bank_account, "groom")
              }
              className="flex-1 py-2 rounded-lg border flex items-center justify-center gap-2 text-sm transition-colors hover:bg-gray-50"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {copiedGroom ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copiedGroom ? "Đã sao chép" : "Sao chép STK"}
            </button>

            {weddingInfo.groom_qr_url && (
              <button
                onClick={() => setShowQr(showQr === "groom" ? null : "groom")}
                className="py-2 px-3 rounded-lg border flex items-center justify-center transition-colors hover:bg-gray-50"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <QrCode className="w-4 h-4" />
              </button>
            )}
          </div>

          {showQr === "groom" && weddingInfo.groom_qr_url && (
            <div className="mt-4 flex justify-center">
              <img
                src={weddingInfo.groom_qr_url}
                alt="QR Code chú rể"
                className="w-40 h-40 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Cô dâu */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <h4
            className="font-medium text-center mb-4"
            style={{ color: primaryColor }}
          >
            Mừng cưới cô dâu
          </h4>

          <div className="text-center space-y-2 mb-4">
            <p className="text-sm text-gray-500">
              {weddingInfo.bride_bank_name || "Ngân hàng"}
            </p>
            <p className="font-mono text-lg">
              {weddingInfo.bride_bank_account || "Chưa cập nhật"}
            </p>
            <p className="text-sm font-medium">
              {weddingInfo.bride_bank_holder || weddingInfo.bride_full_name}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                weddingInfo.bride_bank_account &&
                copyToClipboard(weddingInfo.bride_bank_account, "bride")
              }
              className="flex-1 py-2 rounded-lg border flex items-center justify-center gap-2 text-sm transition-colors hover:bg-gray-50"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {copiedBride ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copiedBride ? "Đã sao chép" : "Sao chép STK"}
            </button>

            {weddingInfo.bride_qr_url && (
              <button
                onClick={() => setShowQr(showQr === "bride" ? null : "bride")}
                className="py-2 px-3 rounded-lg border flex items-center justify-center transition-colors hover:bg-gray-50"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <QrCode className="w-4 h-4" />
              </button>
            )}
          </div>

          {showQr === "bride" && weddingInfo.bride_qr_url && (
            <div className="mt-4 flex justify-center">
              <img
                src={weddingInfo.bride_qr_url}
                alt="QR Code cô dâu"
                className="w-40 h-40 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
