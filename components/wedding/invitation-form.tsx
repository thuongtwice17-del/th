"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateSelector } from "./template-selector";
import { InvitationPreview } from "./invitation-preview";
import { Heart, Share2, Download, Sparkles } from "lucide-react";

type TemplateType = "classic" | "modern" | "floral";

interface InvitationData {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  weddingTime: string;
  venue: string;
  venueAddress: string;
  message: string;
  template: TemplateType;
}

export function InvitationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InvitationData>({
    groomName: "",
    brideName: "",
    weddingDate: new Date(),
    weddingTime: "18:00",
    venue: "",
    venueAddress: "",
    message: "Xin hãy đến và chia sẻ niềm vui cùng chúng tôi",
    template: "modern",
  });

  const updateData = (field: keyof InvitationData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Thiệp cưới ${data.groomName} & ${data.brideName}`,
          text: `Trân trọng kính mời bạn đến dự lễ cưới của ${data.groomName} và ${data.brideName}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép link thiệp cưới!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-serif text-xl text-foreground">Thiệp Cưới Online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Bước {step}/3
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 3 ? "flex-1 max-w-32" : ""}`}
              >
                <button
                  onClick={() => setStep(s)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Thông tin cặp đôi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tên chú rể
                      </label>
                      <Input
                        placeholder="VD: Minh Anh"
                        value={data.groomName}
                        onChange={(e) => updateData("groomName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tên cô dâu
                      </label>
                      <Input
                        placeholder="VD: Thúy Hằng"
                        value={data.brideName}
                        onChange={(e) => updateData("brideName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Lời nhắn
                      </label>
                      <textarea
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground resize-none"
                        rows={3}
                        placeholder="Lời chúc hoặc thông điệp của bạn..."
                        value={data.message}
                        onChange={(e) => updateData("message", e.target.value)}
                      />
                    </div>
                    <Button onClick={() => setStep(2)} className="w-full">
                      Tiếp tục
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Chi tiết sự kiện
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Ngày cưới
                        </label>
                        <Input
                          type="date"
                          value={data.weddingDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            updateData("weddingDate", new Date(e.target.value))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Giờ
                        </label>
                        <Input
                          type="time"
                          value={data.weddingTime}
                          onChange={(e) =>
                            updateData("weddingTime", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tên địa điểm
                      </label>
                      <Input
                        placeholder="VD: Trung tâm Tiệc cưới White Palace"
                        value={data.venue}
                        onChange={(e) => updateData("venue", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Địa chỉ
                      </label>
                      <Input
                        placeholder="VD: 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP.HCM"
                        value={data.venueAddress}
                        onChange={(e) =>
                          updateData("venueAddress", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Quay lại
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1">
                        Tiếp tục
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Chọn mẫu thiệp
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <TemplateSelector
                        selected={data.template}
                        onSelect={(template) => updateData("template", template)}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="flex-1"
                        >
                          Quay lại
                        </Button>
                        <Button onClick={handleShare} className="flex-1 gap-2">
                          <Share2 className="w-4 h-4" />
                          Chia sẻ
                        </Button>
                      </div>
                      <Button
                        variant="secondary"
                        className="w-full mt-3 gap-2"
                        onClick={() => window.print()}
                      >
                        <Download className="w-4 h-4" />
                        Tải xuống
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Xem trước thiệp cưới</p>
              </div>
              <InvitationPreview data={data} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-muted-foreground">
              Tạo thiệp cưới online miễn phí
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Chúc các cặp đôi trăm năm hạnh phúc
          </p>
        </div>
      </footer>
    </div>
  );
}
