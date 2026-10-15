# OnUp
Daily Drill for your kids — web app ôn thi cả năm học cho học sinh lớp 4, lớp 6 và phụ huynh.

Có lịch thi năm học 2026–2027, đề luyện giữa kì và IOE, ngân hàng câu hỏi nhập được, theo dõi tiến độ.

- Mô tả tính năng: [docs/TINH-NANG.md](docs/TINH-NANG.md)
- Kế hoạch phát triển bằng cloud session: [docs/KE-HOACH-CREDIT.md](docs/KE-HOACH-CREDIT.md)
- Hướng dẫn cho Claude khi sửa code: [CLAUDE.md](CLAUDE.md)

## Dùng ngay

**Trên máy tính:** trong thư mục này chạy `python3 -m http.server 8000`, rồi mở http://localhost:8000.

**Đưa lên mạng bằng GitHub Pages (miễn phí):**
1. Vào repo → Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, thư mục `/ (root)` → Save.
2. Sau 1–2 phút sẽ có link `https://dunglnh.github.io/OnUp/`.

Lần đầu mở app: tạo tài khoản quản trị → thêm phụ huynh, học sinh → học sinh chọn tên, nhập PIN là vào ôn.

## Kiểm thử
```bash
python3 -m http.server 8000 &
npm i -D playwright && node tests/e2e.js
```

## Lưu ý
Bản này lưu dữ liệu trong trình duyệt của từng máy. Nhớ vào Quản trị → Dữ liệu để tải file sao lưu định kì.
