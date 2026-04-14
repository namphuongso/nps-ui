# NPS UI — Tài liệu Hướng dẫn Phát triển & Vận hành

Chào mừng bạn đến với dự án **NPS UI**. Đây là thư viện UI chuyên nghiệp được xây dựng trên nền tảng Ant Design và Tailwind CSS. Tài liệu này giúp bạn nắm vững quy trình làm việc trong dự án.

---

## 🏗️ 1. Cấu trúc Project (Monorepo)

Dự án được quản lý theo mô hình Monorepo:
-   **`packages/ui`**: Chứa mã nguồn chính của thư viện UI (@namphuongtechnologi/nps-ui).
-   **`apps/docs`**: Website tài liệu và demo, dùng để xem và thử nghiệm component.
-   **Root**: Chứa cấu hình chung cho toàn bộ dự án (Lint, Test, Versioning).

---

## 🚀 2. Bắt đầu nhanh (Getting Started)

1.  **Cài đặt**: Chạy `npm install` tại thư mục gốc.
2.  **Chạy Docs local**: Chạy `npm run dev:docs` để xem giao diện tại `http://localhost:3000`.
3.  **Build kiểm tra**: Chạy `npm run build` để đảm bảo mọi thứ đều ổn định.

---

## 💻 3. Quy trình phát triển Component mới

Khi bạn muốn thêm một component (ví dụ: `NpsInput`):

1.  **Tạo Source**: Tạo thư mục và file tại `packages/ui/src/components/input/NpsInput.tsx`.
2.  **Xây dựng UI**: Sử dụng Ant Design làm nền tảng và Tailwind CSS để tùy biến style.
3.  **Export**: Thêm `export * from "./components/input/NpsInput"` vào file `packages/ui/src/index.ts`.
4.  **Viết Test**: Tạo file `.test.tsx` cùng thư mục để kiểm tra logic cơ bản.
5.  **Viết Docs**: Tạo trang demo trong `apps/docs/src/pages/components/InputPage.tsx` và đăng ký route trong `navigation.ts`.

---

## 🦋 4. Quản lý Phiên bản (The Changeset Workflow)

Chúng ta **KHÔNG** tự ý sửa `version` trong `package.json`. Quy trình chuẩn là:

1.  **Ghi nhận thay đổi**: Sau khi code xong, chạy `npx changeset`.
    - Chọn package (`@namphuongtechnologi/nps-ui`).
    - Chọn loại thay đổi: `patch` (fix bug), `minor` (thêm tính năng), `major` (breaking change).
    - Viết nội dung thay đổi bằng tiếng Việt hoặc tiếng Anh.
2.  **Review**: File changeset sẽ được push lên Git để mọi người cùng biết bạn đã thay đổi gì.
3.  **Phát hành**: Khi đến ngày release, admin sẽ chạy `npm run version` để tool tự động cập nhật version và tạo `CHANGELOG.md`.

---

## 🔄 5. Chiến lược nâng cấp lên Version 2 (V2)

Khi có những thay đổi lớn làm hỏng code cũ (Breaking Changes), chúng ta áp dụng chiến lược sau:

### Quản lý Code & Git:
- **Maintenance**: Tạo nhánh `v1-maintenance` từ bản v1 hiện tại để fix bug cho người dùng cũ.
- **Development**: Tiếp tục phát triển V2 trên nhánh `main`. Khi release, chọn loại thay đổi là `major` trong Changeset.

### Quản lý Tài liệu (Documentation):
- Website chính (`namphuong.tech`) luôn hiển thị bản docs mới nhất (V2).
- Bản docs của V1 sẽ được build và lưu trữ tại subfolder (ví dụ: `namphuong.tech/v1/`).
- Trong giao diện Docs, sử dụng menu chọn phiên bản ở Topbar để chuyển đổi giữa các URL này.

---

## 🧪 6. Tiêu chuẩn chất lượng (Quality Standards)

Trước khi commit code, hãy đảm bảo:
- **Formatting**: Chạy `npm run format` để format code đẹp theo chuẩn.
- **Linting**: Chạy `npm run lint` để đảm bảo không có lỗi logic hay code thừa.
- **Testing**: Chạy `npm run test` để đảm bảo các component cũ không bị hỏng.

> [!IMPORTANT]
> **CI/CD**: Mỗi khi bạn tạo Pull Request, GitHub Actions sẽ tự động chạy các lệnh trên. Nếu có bước nào thất bại (đỏ), code của bạn sẽ không được merge.

---

## 📦 7. Lệnh hữu ích

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `npm run dev:docs` | Chạy dev server cho trang tài liệu |
| `npm run build` | Build toàn bộ monorepo (UI + Docs) |
| `npm run lint` | Kiểm tra lỗi code style & logic |
| `npm run test` | Chạy toàn bộ unit tests |
| `npx changeset` | Tạo mẩu tin ghi nhận thay đổi version |
| `npm run version` | Cập nhật version package & viết Changelog |
| `npm run release` | Publish bản build mới lên NPM |

---

*Tài liệu này được cập nhật lần cuối vào ngày 14/04/2026 bởi Đội ngũ NPS UI.*
