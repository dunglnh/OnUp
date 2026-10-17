/* Cấu hình đồng bộ đám mây.
   ĐỂ TRỐNG (mặc định) = app lưu dữ liệu trong trình duyệt của máy này như cũ, không tải gì từ mạng.
   Điền hai giá trị dưới đây để bật đồng bộ đám mây bằng Supabase. Hướng dẫn: docs/HUONG-DAN-SUPABASE.md.

   Lấy ở Supabase → Project Settings → API Keys:
   - supabaseUrl: Project URL, ví dụ "https://abcdxyzabcdxyz.supabase.co"
   - supabaseAnonKey: khóa "anon public" (hoặc "publishable", bắt đầu bằng sb_publishable_).
     Khóa này công khai, để ở đây được; quyền truy cập do chính sách RLS trong supabase/schema.sql bảo vệ.
   TUYỆT ĐỐI KHÔNG dán khóa service_role / secret (sb_secret_...) vào file này. */
window.ONTAP_CONFIG = {
  supabaseUrl: "https://yubobtzhrygyjspnyaeq.supabase.co",
  supabaseAnonKey: "sb_publishable_5dUU9YRwnZWFVqSYW3MJzg_FIaZ2yc-",
  // Không bắt buộc: "site key" của Cloudflare Turnstile để chặn máy tự động (xem bước 7 của hướng dẫn).
  // Đây cũng là khóa công khai. Điền khóa này TRƯỚC, rồi mới bật CAPTCHA trong Supabase.
  turnstileSiteKey: ""
};
