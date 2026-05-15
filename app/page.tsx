import { createClient } from "@/lib/supabase/server";
import { WeddingPage } from "@/components/wedding/wedding-page";
import { WeddingInfo, WeddingPhoto, WeddingWish } from "@/lib/types";

const DEFAULT_WEDDING_ID = "00000000-0000-0000-0000-000000000001";

export default async function Home() {
  const supabase = await createClient();

  // Fetch wedding info
  const { data: weddingInfo } = await supabase
    .from("wedding_info")
    .select("*")
    .eq("id", DEFAULT_WEDDING_ID)
    .single();

  // Fetch photos
  const { data: photos } = await supabase
    .from("wedding_photos")
    .select("*")
    .eq("wedding_id", DEFAULT_WEDDING_ID)
    .order("sort_order", { ascending: true });

  // Fetch wishes
  const { data: wishes } = await supabase
    .from("wedding_wishes")
    .select("*")
    .eq("wedding_id", DEFAULT_WEDDING_ID)
    .order("created_at", { ascending: false });

  if (!weddingInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy thông tin thiệp cưới</p>
      </div>
    );
  }

  return (
    <WeddingPage
      weddingInfo={weddingInfo as WeddingInfo}
      photos={(photos as WeddingPhoto[]) || []}
      wishes={(wishes as WeddingWish[]) || []}
    />
  );
}
