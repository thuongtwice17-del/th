export interface WeddingInfo {
  id: string;
  groom_name: string;
  groom_full_name: string | null;
  bride_name: string;
  bride_full_name: string | null;
  groom_father: string | null;
  groom_mother: string | null;
  groom_address: string | null;
  bride_father: string | null;
  bride_mother: string | null;
  bride_address: string | null;
  wedding_date: string;
  ceremony_time: string | null;
  reception_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  map_link: string | null;
  map_iframe: string | null;
  groom_bank_name: string | null;
  groom_bank_account: string | null;
  groom_bank_holder: string | null;
  groom_qr_url: string | null;
  bride_bank_name: string | null;
  bride_bank_account: string | null;
  bride_bank_holder: string | null;
  bride_qr_url: string | null;
  hero_image_url: string | null;
  couple_image_url: string | null;
  background_music_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  admin_password: string | null;
  created_at: string;
  updated_at: string;
}

export interface WeddingPhoto {
  id: string;
  wedding_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface WeddingRsvp {
  id: string;
  wedding_id: string;
  guest_name: string;
  phone: string | null;
  attending: boolean;
  guest_count: number;
  message: string | null;
  created_at: string;
}

export interface WeddingWish {
  id: string;
  wedding_id: string;
  guest_name: string;
  message: string;
  created_at: string;
}
