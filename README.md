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
2. [Hướng dẫn Phát triển (Developer Guide)](./DEVELOPMENT.md)
3. [Cấu trúc dự án](#-cấu-trúc-dự-án)

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

Chi tiết về cách thiết lập môi trường, quy chuẩn viết code, quy trình đóng góp và cơ chế phát hành (release) tự động được trình bày chi tiết tại:

👉 **[Hướng dẫn Phát triển & Đóng góp (DEVELOPMENT.md)](./DEVELOPMENT.md)**

---

## 🏗️ Cấu trúc dự án

- **`packages/ui`**: Mã nguồn thư viện chính.
- **`apps/docs`**: Website tài liệu & demo.
- **`.github/workflows`**: Chứa pipeline CI/CD (Lint, Test, Deploy, Release).

---

_Phát triển và vận hành bởi Đội ngũ Công nghệ Nam Phương_
