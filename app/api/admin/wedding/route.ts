import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_WEDDING_ID = "00000000-0000-0000-0000-000000000001";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("wedding_info")
      .select("*")
      .eq("id", DEFAULT_WEDDING_ID)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    // Remove id and timestamps from update
    const { id, created_at, updated_at, ...updateData } = body;

    const { data, error } = await supabase
      .from("wedding_info")
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq("id", DEFAULT_WEDDING_ID)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
