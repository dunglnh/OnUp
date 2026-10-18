/* Cấu hình đồng bộ đám mây.
   ĐỂ TRỐNG (mặc định) = app lưu dữ liệu trong trình duyệt của máy này như cũ, không tải gì từ mạng.
   Điền hai giá trị đầu dưới đây để bật đồng bộ đám mây bằng Supabase. Hướng dẫn: docs/HUONG-DAN-SUPABASE.md.

   Lấy ở Supabase → Project Settings → API Keys:
   - supabaseUrl: Project URL, ví dụ "https://abcdxyzabcdxyz.supabase.co"
   - supabaseAnonKey: khóa "anon public" (hoặc "publishable", bắt đầu bằng sb_publishable_).
     Khóa này công khai, để ở đây được; quyền truy cập do chính sách RLS trong supabase/schema.sql bảo vệ.
   TUYỆT ĐỐI KHÔNG dán khóa service_role / secret (sb_secret_...) vào file này. */
window.ONTAP_CONFIG = {
  supabaseUrl: "https://yubobtzhrygyjspnyaeq.supabase.co",
  supabaseAnonKey: "sb_publishable_5dUU9YRwnZWFVqSYW3MJzg_FIaZ2yc-",
  // Không bắt buộc: "site key" của Cloudflare Turnstile để chặn máy tự động (xem bước 8 của hướng dẫn).
  // Đây cũng là khóa công khai. Điền khóa này TRƯỚC, rồi mới bật CAPTCHA trong Supabase.
  turnstileSiteKey: "",
  // Dòng "Quên mật khẩu?" dưới ô đăng nhập (và khi tài khoản bị khóa): chữ hiện ra và đường liên hệ người cấp tài khoản.
  // contactUrl nhận https://… (ví dụ https://zalo.me/0912345678), tel:…, sms:…, mailto:…; để trống thì chỉ hiện chữ.
  contactText: "Liên hệ người cấp tài khoản.",
  contactUrl: "",
  // Không bắt buộc: thẻ “Chưa có tài khoản?” dưới ô đăng nhập (trang chỉ dành cho gia đình được mời, không tự đăng ký):
  // chữ và đường liên hệ để xin tài khoản, ví dụ "Nhắn Zalo cho cô Lan để được mời". Để trống thì dùng contactText, contactUrl ở trên.
  signupText: "Nhắn Telegram để được mời dùng thử miễn phí",
  signupUrl: "https://t.me/dunglnh"
};
