"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WeddingInfo, WeddingPhoto } from "@/lib/types";
import {
  Save,
  LogOut,
  User,
  Calendar,
  MapPin,
  CreditCard,
  Image,
  Settings,
  Eye,
  Loader2,
  Check,
  Trash2,
  Plus,
  Upload,
} from "lucide-react";

type TabType = "couple" | "event" | "bank" | "photos" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo | null>(null);
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("couple");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [weddingRes, photosRes] = await Promise.all([
        fetch("/api/admin/wedding"),
        fetch("/api/admin/photos"),
      ]);

      if (weddingRes.ok) {
        const data = await weddingRes.json();
        setWeddingInfo(data);
      }

      if (photosRes.ok) {
        const data = await photosRes.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!weddingInfo) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/wedding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weddingInfo),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Error saving:", error);
    }

    setIsSaving(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const handleAddPhoto = async () => {
    if (!newPhotoUrl.trim()) return;

    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: newPhotoUrl,
          sort_order: photos.length,
        }),
      });

      if (res.ok) {
        const newPhoto = await res.json();
        setPhotos([...photos, newPhoto]);
        setNewPhotoUrl("");
      }
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/photos?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPhotos(photos.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const updateField = (field: keyof WeddingInfo, value: string) => {
    if (!weddingInfo) return;
    setWeddingInfo({ ...weddingInfo, [field]: value });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B1A1A]" />
      </div>
    );
  }

  if (!weddingInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Không tìm thấy dữ liệu</p>
      </div>
    );
  }

  const tabs = [
    { id: "couple" as TabType, label: "Cô dâu & Chú rể", icon: User },
    { id: "event" as TabType, label: "Sự kiện", icon: Calendar },
    { id: "bank" as TabType, label: "Ngân hàng", icon: CreditCard },
    { id: "photos" as TabType, label: "Ảnh cưới", icon: Image },
    { id: "settings" as TabType, label: "Cài đặt", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif text-[#8B1A1A]">Quản trị thiệp cưới</h1>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Xem thiệp</span>
            </a>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[#8B1A1A] text-white rounded-lg hover:bg-[#6B1414] transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : saveSuccess ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {saveSuccess ? "Đã lưu!" : "Lưu"}
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? "bg-[#8B1A1A] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Couple Tab */}
          {activeTab === "couple" && (
            <div className="space-y-8">
              {/* Chú rể */}
              <div>
                <h3 className="font-medium text-lg text-[#8B1A1A] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông tin chú rể
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên gọi (hiển thị trên thiệp)
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_name}
                      onChange={(e) => updateField("groom_name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên đầy đủ
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_full_name || ""}
                      onChange={(e) => updateField("groom_full_name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên bố
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_father || ""}
                      onChange={(e) => updateField("groom_father", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên mẹ
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_mother || ""}
                      onChange={(e) => updateField("groom_mother", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ nhà trai
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_address || ""}
                      onChange={(e) => updateField("groom_address", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                </div>
              </div>

              {/* Cô dâu */}
              <div>
                <h3 className="font-medium text-lg text-[#8B1A1A] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông tin cô dâu
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên gọi (hiển thị trên thiệp)
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_name}
                      onChange={(e) => updateField("bride_name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên đầy đủ
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_full_name || ""}
                      onChange={(e) => updateField("bride_full_name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên bố
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_father || ""}
                      onChange={(e) => updateField("bride_father", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên mẹ
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_mother || ""}
                      onChange={(e) => updateField("bride_mother", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ nhà gái
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_address || ""}
                      onChange={(e) => updateField("bride_address", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Event Tab */}
          {activeTab === "event" && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg text-[#8B1A1A] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Thời gian & Địa điểm
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày cưới
                  </label>
                  <input
                    type="date"
                    value={weddingInfo.wedding_date}
                    onChange={(e) => updateField("wedding_date", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ làm lễ
                  </label>
                  <input
                    type="time"
                    value={weddingInfo.ceremony_time || ""}
                    onChange={(e) => updateField("ceremony_time", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giờ tiệc cưới
                  </label>
                  <input
                    type="time"
                    value={weddingInfo.reception_time || ""}
                    onChange={(e) => updateField("reception_time", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên địa điểm
                  </label>
                  <input
                    type="text"
                    value={weddingInfo.venue_name || ""}
                    onChange={(e) => updateField("venue_name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    placeholder="VD: Tư Gia, Nhà Hàng ABC..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Google Maps
                  </label>
                  <input
                    type="url"
                    value={weddingInfo.map_link || ""}
                    onChange={(e) => updateField("map_link", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    placeholder="https://maps.google.com/..."
                  />{weddingData.googleMap ? (
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(weddingData.googleMap)}&output=embed`}
                      width="100%"
                      height="350"
                      style={{
                        border: 0,
                        borderRadius: "16px",
                        marginTop: "12px",
                      }}
                      loading="lazy"
                    />
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ đầy đủ
                </label>
                <textarea
                  value={weddingInfo.venue_address || ""}
                  onChange={(e) => updateField("venue_address", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50 resize-none"
                />
              </div>
            </div>
          )}

          {/* Bank Tab */}
          {activeTab === "bank" && (
            <div className="space-y-8">
              {/* Chú rể */}
              <div>
                <h3 className="font-medium text-lg text-[#8B1A1A] mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Tài khoản chú rể
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên ngân hàng
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_bank_name || ""}
                      onChange={(e) => updateField("groom_bank_name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                      placeholder="VD: Vietcombank, Techcombank..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số tài khoản
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_bank_account || ""}
                      onChange={(e) => updateField("groom_bank_account", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên chủ tài khoản
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.groom_bank_holder || ""}
                      onChange={(e) => updateField("groom_bank_holder", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                      placeholder="VD: NGUYEN VAN A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link ảnh QR Code
                    </label>
                    <input
                      type="url"
                      value={weddingInfo.groom_qr_url || ""}
                      onChange={(e) => updateField("groom_qr_url", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Cô dâu */}
              <div>
                <h3 className="font-medium text-lg text-[#8B1A1A] mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Tài khoản cô dâu
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên ngân hàng
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_bank_name || ""}
                      onChange={(e) => updateField("bride_bank_name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                      placeholder="VD: Vietcombank, Techcombank..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số tài khoản
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_bank_account || ""}
                      onChange={(e) => updateField("bride_bank_account", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên chủ tài khoản
                    </label>
                    <input
                      type="text"
                      value={weddingInfo.bride_bank_holder || ""}
                      onChange={(e) => updateField("bride_bank_holder", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                      placeholder="VD: TRAN THI B"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link ảnh QR Code
                    </label>
                    <input
                      type="url"
                      value={weddingInfo.bride_qr_url || ""}
                      onChange={(e) => updateField("bride_qr_url", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === "photos" && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg text-[#8B1A1A] mb-4 flex items-center gap-2">
                <Image className="w-5 h-5" />
                Album ảnh cưới
              </h3>

              {/* Add new photo */}
              <div className="flex gap-3">
                <input
                  type="url"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                  placeholder="Dán link ảnh vào đây (https://...)"
                />
                <button
                  onClick={handleAddPhoto}
                  className="flex items-center gap-2 px-4 py-2 bg-[#8B1A1A] text-white rounded-lg hover:bg-[#6B1414] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Thêm ảnh
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Tip: Upload ảnh lên imgur.com hoặc imgbb.com rồi copy link vào đây
              </p>

              {/* Photo grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.image_url}
                      alt={photo.caption || "Ảnh cưới"}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {photos.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Chưa có ảnh nào</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg text-[#8B1A1A] mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Cài đặt
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Màu chủ đạo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={weddingInfo.primary_color || "#8B1A1A"}
                      onChange={(e) => updateField("primary_color", e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={weddingInfo.primary_color || "#8B1A1A"}
                      onChange={(e) => updateField("primary_color", e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link nhạc nền (MP3)
                  </label>
                  <input
                    type="url"
                    value={weddingInfo.background_music_url || ""}
                    onChange={(e) => updateField("background_music_url", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đổi mật khẩu admin
                  </label>
                  <input
                    type="text"
                    value={weddingInfo.admin_password || ""}
                    onChange={(e) => updateField("admin_password", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
              </div>

              {/* Color presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu gợi ý
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "#8B1A1A",
                    "#C41E3A",
                    "#D4A574",
                    "#B8860B",
                    "#2F4F4F",
                    "#4A5568",
                    "#744210",
                    "#553C9A",
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateField("primary_color", color)}
                      className="w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: color,
                        borderColor:
                          weddingInfo.primary_color === color ? "#000" : "transparent",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
