import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_WEDDING_ID = "00000000-0000-0000-0000-000000000001";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const supabase = await createClient();

    // Check password from database
    const { data: weddingInfo } = await supabase
      .from("wedding_info")
      .select("admin_password")
      .eq("id", DEFAULT_WEDDING_ID)
      .single();

    if (!weddingInfo) {
      return NextResponse.json(
        { error: "Không tìm thấy thông tin" },
        { status: 404 }
      );
    }

    const correctPassword = weddingInfo.admin_password || "admin123";

    if (password !== correctPassword) {
      return NextResponse.json(
        { error: "Mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra" },
      { status: 500 }
    );
  }
}
