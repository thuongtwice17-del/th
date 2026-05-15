"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Mật khẩu không đúng");
      }
    } catch {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#8B1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-serif text-[#8B1A1A]">Quản trị thiệp cưới</h1>
            <p className="text-gray-500 mt-2">Nhập mật khẩu để truy cập</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/50"
                placeholder="Nhập mật khẩu admin"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#8B1A1A] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#6B1414] transition-colors disabled:opacity-50"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Mật khẩu mặc định: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
