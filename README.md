# NPS UI 💎

[![Build Status](https://github.com/namphuongso/nps-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/namphuongso/nps-ui/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@namphuongtechnologi/nps-ui.svg)](https://www.npmjs.com/package/@namphuongtechnologi/nps-ui)

Thư viện Component chuyên nghiệp dựa trên **Ant Design** và **Tailwind CSS**, thiết kế dành riêng cho hệ sinh thái Nam Phương.

---

## 🔗 Liên kết nhanh

- 📖 **[Trang tài liệu chính thức](https://namphuongso.github.io/nps-ui)**
- 📦 **[NPM Package](https://www.npmjs.com/package/@namphuongtechnologi/nps-ui)**
- 🛠️ **[GitHub Repository](https://github.com/namphuongso/nps-ui)**

---

## 📖 Mục lục

1. [Hướng dẫn cho Người dùng (User Guide)](#-hướng-dẫn-cho-người-dùng)
2. [Hướng dẫn Phát triển (Developer Guide)](#-hướng-dẫn-phát-triển)
3. [Quy trình Release tự động (Automation)](#-quy-trình-release-tự-động)
4. [Cấu trúc dự án](#-cấu trúc-dự-án)

---

## 🚀 Hướng dẫn cho Người dùng

### Cài đặt

```bash
npm install @namphuongtechnologi/nps-ui antd
```

### Sử dụng cơ bản

```tsx
import { NpsButton } from "@namphuongtechnologi/nps-ui";

export default function App() {
  return <NpsButton type="primary">NPS UI Button</NpsButton>;
}
```

---

## 💻 Hướng dẫn Phát triển

### 1. Chuẩn bị môi trường

- **Yêu cầu**: Node.js v20+, npm v9+.
- **Setup**:
  ```bash
  git clone <repo-url>
  npm install
  npm run dev:docs # Khởi chạy website tài liệu tại http://localhost:3000
  ```

### 2. Thêm Component mới

1. **Source**: Tạo tại `packages/ui/src/components/<name>/`.
2. **Export**: Đăng ký tại `packages/ui/src/index.ts`.
3. **Docs**: Tạo thư mục tại `apps/docs/src/pages/components/<name>/`. Bao gồm `index.tsx` (logic) và `locales.ts` (đa ngôn ngữ).
4. **Test**: Mọi component phải có file `.test.tsx` đi kèm.

### 3. Tiêu chuẩn Code Style

- Dùng **Functional Components** + Hooks.
- Mọi logic tùy chỉnh style phải dùng **Tailwind CSS**.
- Trước khi commit, bắt buộc chạy:
  ```bash
  npm run format && npm run lint && npm run test
  ```

---

## 🤖 Quy trình Release tự động

Dự án sử dụng **Changesets** kết hợp với **GitHub Actions** để tự động hóa việc đưa code lên NPM.

### Bước 1: Ghi nhận thay đổi (Dành cho Dev)

Khi bạn hoàn thành 1 tính năng/fix lỗi, hãy chạy:

```bash
npx changeset
```

- Chọn loại version (`patch`/`minor`/`major`).
- Viết mô tả ngắn. Sau đó push code lên GitHub.

### Bước 2: Tự động hóa Pipeline

1. Khi push vào nhánh `main`, GitHub Action sẽ tự động tạo một PR **"Version Packages"**.
2. Khi PR này được **Merge**, GitHub sẽ tự động:
   - Build thư viện.
   - Publish lên NPM với version mới.
   - Tạo GitHub Release & Changelog.

### 🔐 Cấu hình quan trọng (Chỉ làm 1 lần)

Để quy trình tự động hoạt động, chủ sở hữu repo cần:

1. Tạo **NPM Automation Token** tại [npmjs.com](https://www.npmjs.com/settings/quocvan289/tokens).
2. Thêm vào GitHub Secrets của repo (`Settings > Secrets > Actions`) với tên: **`NPM_TOKEN`**.

---

## 🏗️ Cấu trúc dự án

- **`packages/ui`**: Mã nguồn thư viện chính.
- **`apps/docs`**: Website tài liệu & demo.
- **`.github/workflows`**: Chứa pipeline CI/CD (Lint, Test, Deploy, Release).

---

_Phát triển và vận hành bởi Đội ngũ Công nghệ Nam Phương_
