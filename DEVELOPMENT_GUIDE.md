# NPS UI — Hướng dẫn Phát triển & Vận hành

Chào mừng bạn đến với dự án **NPS UI**. Đây là thư viện UI chuyên nghiệp được xây dựng trên nền tảng Ant Design và Tailwind CSS.

---

## 🏗️ 1. Cấu trúc Project (Monorepo)

```
nps-ui/
├── packages/
│   └── ui/               → Mã nguồn thư viện (@namphuongtechnologi/nps-ui)
├── apps/
│   └── docs/             → Website tài liệu & demo (Vite + React)
├── .github/
│   └── workflows/        → CI/CD tự động (Lint, Test, Deploy Azure)
├── CHANGELOG.md          → Lịch sử thay đổi (tự động cập nhật)
└── package.json          → Root workspace config + các lệnh chung
```

---

## 🚀 2. Bắt đầu nhanh (Getting Started)

```bash
# 1. Cài đặt toàn bộ dependencies
npm install

# 2. Chạy trang tài liệu ở local
npm run dev:docs
```

Sau đó truy cập: **http://localhost:3000**

---

## 💻 3. Quy trình phát triển Component mới

Khi muốn thêm một component mới (ví dụ: `NpsInput`):

### Bước 1 — Tạo source

```
packages/ui/src/components/input/
├── NpsInput.tsx         ← Logic component
└── NpsInput.test.tsx    ← Unit test
```

### Bước 2 — Xây dựng

Sử dụng **Ant Design** làm nền tảng và **Tailwind CSS** để tùy biến style.

### Bước 3 — Export thư viện

Thêm vào `packages/ui/src/index.ts`:

```ts
export { NpsInput } from "./components/input/NpsInput";
export type { NpsInputProps } from "./components/input/NpsInput";
```

### Bước 4 — Viết Test

```bash
# Chạy test xem component có hoạt động đúng không
npm run test
```

### Bước 5 — Viết Docs

1. Tạo trang: `apps/docs/src/pages/components/InputPage.tsx`
2. Đăng ký route trong `apps/docs/src/config/navigation.ts`
3. Đăng ký page trong `apps/docs/src/App.tsx`

> [!TIP]
> Dùng **`ComponentDoc`** template để viết docs nhanh hơn ~70%. Xem `apps/docs/src/components/docs/ComponentDoc.tsx` để biết cách dùng.

---

## 🦋 4. Quy trình Quản lý Phiên bản & Release

Mỗi tính năng hoặc bản sửa lỗi hoàn thành cần được ghi nhận qua **Changesets**. Tuyệt đối **không** tự sửa `version` trong `package.json`.

### Quy tắc tăng version

| Loại | Ý nghĩa | Ví dụ |
| :--- | :--- | :--- |
| `patch` | Sửa lỗi nhỏ, không ảnh hưởng API | `0.1.0` → `0.1.1` |
| `minor` | Thêm tính năng mới, không phá vỡ API cũ | `0.1.0` → `0.2.0` |
| `major` | Thay đổi phá vỡ cấu trúc cũ (breaking change) | `0.1.0` → `1.0.0` |

### Quy trình từng bước

**Bước 1 — Ghi nhận thay đổi (sau khi code xong)**

```bash
npx changeset
```
- Chọn package: `@namphuongtechnologi/nps-ui`
- Chọn loại: `patch`, `minor`, hoặc `major`
- Viết mô tả ngắn gọn về thay đổi

**Bước 2 — Commit lên Git**

```bash
git add .
git commit -m "feat: thêm component NpsInput"
git push origin main
```

**Bước 3 — Release (khi sẵn sàng phát hành)**

```bash
# Cập nhật số version và ghi Changelog tự động
npm run version

# Build + Publish lên NPM
npm run release
```

**Bước 4 — Cập nhật version badge trên website Docs**

Sau khi release thành công, cập nhật file `apps/docs/src/config/versions.ts`:

```ts
export const CURRENT_VERSION: VersionConfig = {
  version: "0.2.0",   // ← Đổi thành version mới
  label: "v0.2.0",    // ← Đổi thành version mới
  date: "2026-05-01", // ← Đổi thành ngày release
};
```

Commit và push lên `main` để Azure tự động deploy website docs mới.

---

## 🧪 5. Tiêu chuẩn chất lượng (Quality Standards)

Trước mỗi lần commit, hãy chắc chắn chạy:

```bash
npm run format   # Định dạng code
npm run lint     # Kiểm tra lỗi logic
npm run test     # Chạy unit tests
```

> [!IMPORTANT]
> **CI/CD tự động**: Mỗi khi tạo Pull Request vào `main`, GitHub Actions sẽ chạy Lint, Build và Test. Nếu bước nào thất bại (đỏ), code **sẽ bị từ chối merge**.

---

## 📦 6. Bảng lệnh hữu ích

| Lệnh | Ý nghĩa |
| :--- | :--- |
| `npm run dev:docs` | Chạy dev server cho trang tài liệu |
| `npm run build` | Build toàn bộ (UI + Docs) để kiểm tra |
| `npm run lint` | Kiểm tra lỗi code |
| `npm run format` | Tự động định dạng code |
| `npm run test` | Chạy toàn bộ unit tests |
| `npx changeset` | Ghi nhận thay đổi để chuẩn bị release |
| `npm run version` | Cập nhật version + viết CHANGELOG tự động |
| `npm run release` | Build & Publish lên NPM |
| `npm run clean` | Xóa toàn bộ `dist` và `node_modules` để làm sạch |

---

_Cập nhật lần cuối: 21/04/2026 — Đội ngũ NPS UI_
