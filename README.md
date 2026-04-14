# NPS UI

Monorepo mẫu cho thư viện UI dùng `Ant Design + Tailwind CSS` và website docs đi kèm.

## Cấu trúc

```bash
apps/docs      # website docs/demo
packages/ui    # thư viện component để publish npm
```

## Chạy local

> Đứng tại thư mục gốc repo: `/Users/lyquocvan/Documents/NamPhuongSo/nps-ui`

```bash
npm install
npm run dev:docs
```

Sau đó mở:

```bash
http://localhost:5173
```

## Tài liệu hướng dẫn

- `DEVELOPMENT_GUIDE.md`: hướng dẫn chạy source, phát triển component và xem sản phẩm local
- `PUBLISH_NPM_GUIDE.md`: hướng dẫn publish package lên npm

## Build

```bash
npm run build
```

## Component mẫu hiện có

- `NpsButton`

> Thư viện hiện được thiết kế để bám theo `Ant Design` của dự án host, không bắt buộc dùng provider riêng từ package.
