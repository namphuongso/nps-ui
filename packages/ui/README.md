<div align="center">
  <h1>NPS UI</h1>
  <p>Thư viện UI Component React xây dựng trên nền tảng Ant Design và Tailwind CSS bởi NP Technology.</p>

  <p>
    <a href="https://www.npmjs.com/package/@namphuongso/nps-ui"><img src="https://img.shields.io/npm/v/@namphuongso/nps-ui.svg?style=flat-square" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/@namphuongso/nps-ui"><img src="https://img.shields.io/npm/dm/@namphuongso/nps-ui.svg?style=flat-square" alt="Downloads" /></a>
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square" alt="TypeScript" />
  </p>
</div>

## ✨ Điểm nổi bật

- **Ant Design Compatible**: Kế thừa toàn bộ hệ sinh thái, props, và token từ Ant Design.
- **Tailwind CSS**: Hỗ trợ override style an toàn thông qua `className` và `tailwind-merge`.
- **TypeScript First**: Định nghĩa kiểu dữ liệu chặt chẽ và an toàn, kế thừa native types.
- **Lightweight**: Wrapper mỏng, không nhồi nhét phụ thuộc không cần thiết.

## 📦 Cài đặt

Sử dụng npm, yarn hoặc pnpm:

```bash
npm install @namphuongso/nps-ui antd
# hoặc
yarn add @namphuongso/nps-ui antd
# hoặc
pnpm add @namphuongso/nps-ui antd
```

_(Lưu ý: `nps-ui` yêu cầu `react`, `react-dom` và `antd` làm peer dependencies)._

## 🚀 Hướng dẫn sử dụng

Để bắt đầu, bạn cần render component bên trong `ConfigProvider` của Ant Design để token/theme màu sắc hoạt động chính xác.

```tsx
import React from "react";
import { ConfigProvider } from "antd";
import { NpsButton } from "@namphuongso/nps-ui";
import "antd/dist/reset.css"; // Quan trọng: Reset CSS của Ant Design

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#003a78", // Brand Color của NP Technology
          borderRadius: 8,
        },
      }}
    >
      <div style={{ padding: 24 }}>
        <h2>Ví dụ sử dụng NPS Button</h2>

        <NpsButton type="primary">Hành động chính</NpsButton>
        <NpsButton rounded="full" style={{ marginLeft: 8 }}>
          Bo tròn hoàn toàn
        </NpsButton>
        <NpsButton type="dashed" danger style={{ marginLeft: 8 }}>
          Hành động nguy hiểm
        </NpsButton>
      </div>
    </ConfigProvider>
  );
}
```

## 📚 Tài liệu chi tiết

Để xem toàn bộ API, hướng dẫn, và sandbox tương tác, vui lòng truy cập trang tài liệu chính thức:

👉 **[NPS UI Documentation](https://namphuongso.github.io/nps-ui)**

## 🤝 Đóng góp

Mọi đóng góp, báo cáo lỗi, hay yêu cầu tính năng xin vui lòng tạo issue tại [GitHub Repository](https://github.com/namphuongso/nps-ui/issues).

## 📄 Giấy phép

Được phát hành dưới [MIT License](./LICENSE). Copyright (c) NP Technology.
