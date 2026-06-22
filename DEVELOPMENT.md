# NPS UI Development Guide 💻

Tài liệu này hướng dẫn chi tiết cách phát triển, kiểm thử và đóng góp mã nguồn cho thư viện component **NPS UI** dành cho lập trình viên mới.

---

## 🛠️ Yêu cầu & Thiết lập nhanh

- **Môi trường yêu cầu**: Node.js `v20.12.0+` (hoặc `v22+`), npm `v9+`.
- **Thiết lập nhanh**:

  ```bash
  # 1. Cài đặt các dependencies ở thư mục gốc (monorepo)
  npm install

  # 2. Khởi chạy website tài liệu tại http://localhost:3000 để hiển thị demo & test trực tiếp
  npm run dev:docs
  ```

> [!TIP]
> **Không cần build lại thư viện khi phát triển**: Nhờ cấu hình alias thông minh trong [apps/docs/vite.config.ts](file:///Users/lyquocvan/Documents/NamPhuongSo/nps-ui/apps/docs/vite.config.ts), website tài liệu sẽ liên kết trực tiếp tới file TypeScript gốc trong `packages/ui/src`. Mọi chỉnh sửa mã nguồn của bạn ở UI package sẽ lập tức phản ánh lên giao diện mà không cần chạy lệnh `npm run build:ui`.

---

## 🧩 Quy trình phát triển Component mới

Để đơn giản hóa quy trình phát triển, dự án hỗ trợ một script tự động tạo nhanh cấu trúc chuẩn (scaffold) cho component mới và tự động đăng ký nó vào hệ thống thư viện cũng như website tài liệu:

```bash
# Cách 1: Chạy tương tác (nhập tên component khi được hỏi)
npm run create-component

# Cách 2: Chạy trực tiếp truyền tên component (hỗ trợ PascalCase hoặc kebab-case)
npm run create-component Rating
# hoặc:
npm run create-component rating-bar
```

Script này sẽ tự động thực hiện các công việc sau:

1. Tạo thư mục chuẩn tại `packages/ui/src/components/<tên-component>/` chứa các tệp mã nguồn cơ bản (`types.ts`, `Nps<TênComponent>.tsx`, `Nps<TênComponent>.test.tsx`, `index.ts`).
2. Tạo thư mục tài liệu & tệp ngôn ngữ tương ứng tại `apps/docs/src/pages/components/<tên-component>/` (`index.tsx`, `locales.ts`).
3. Đăng ký export component trong tệp chính của thư viện `packages/ui/src/index.ts`.
4. Cấu hình điều hướng (routes) trang tài liệu trong `apps/docs/src/App.tsx`.
5. Đăng ký dịch thuật (i18n) cho trang tài liệu trong `apps/docs/src/i18n/index.ts`.
6. Cấu hình hiển thị liên kết trên thanh Menu tài liệu trong `apps/docs/src/config/navigation.ts`.

Sau khi chạy xong, bạn chỉ cần tập trung phát triển logic component và chỉnh sửa trang tài liệu mà không cần bận tâm đến việc cấu hình các liên kết liên quan.

---

### 🔍 Quy trình chi tiết từng bước (Thủ công)

Khi thêm một component mới, nếu bạn muốn thực hiện thủ công hoặc cần hiểu rõ các liên kết hoạt động như thế nào, hãy làm theo các bước dưới đây:

### Bước 1: Phát triển mã nguồn Component

1. Tạo thư mục mới tại `packages/ui/src/components/table/`.
2. Tạo các tệp cần thiết:
   - `types.ts`: Định nghĩa các TypeScript interfaces (kế thừa các props mặc định từ Ant Design nếu cần).
   - `Table.tsx`: Viết code logic cho React component (sử dụng Tailwind classes để định kiểu dáng bổ sung).
   - `Table.test.tsx`: Viết unit tests kiểm thử các sự kiện click, hiển thị, trạng thái disabled...
   - `index.ts`: Export component và các kiểu dữ liệu của nó:
     ```typescript
     export * from "./Table";
     export * from "./types";
     ```

### Bước 2: Đăng ký Export trong thư viện

Khai báo dòng export component mới trong tệp chính [packages/ui/src/index.ts](file:///Users/lyquocvan/Documents/NamPhuongSo/nps-ui/packages/ui/src/index.ts) để các dự án bên ngoài có thể import được:

```typescript
export * from "./components/table";
```

### Bước 3: Viết tài liệu hướng dẫn sử dụng (Docs)

1. Tạo thư mục demo tại `apps/docs/src/pages/components/table/`.
2. Tạo các tệp:
   - `locales.ts`: Định nghĩa nội dung mô tả tiếng Anh (`en`) và tiếng Việt (`vi`) cho component.
   - `index.tsx`: Thiết kế trang tài liệu hướng dẫn, bao gồm ví dụ thực tế sử dụng component và API table.
3. Đăng ký trang mới này vào hệ thống Router tĩnh trong [apps/docs/src/App.tsx](file:///Users/lyquocvan/Documents/NamPhuongSo/nps-ui/apps/docs/src/App.tsx).

### Bước 4: Đăng ký dịch đa ngôn ngữ (i18n)

Nhập và khai báo tệp dịch locales của component vào tệp cấu hình i18n chính [apps/docs/src/i18n/index.ts](file:///Users/lyquocvan/Documents/NamPhuongSo/nps-ui/apps/docs/src/i18n/index.ts) để trang tài liệu hiển thị được ngôn ngữ đã chọn:

```typescript
import { tableLocales } from "../pages/components/table/locales";

// Trong cấu hình resources.en
en: {
  // ...
  table: tableLocales.en,
}

// Trong cấu hình resources.vi
vi: {
  // ...
  table: tableLocales.vi,
}
```

### Bước 5: Kiểm tra trước khi commit

Trước khi tạo Pull Request, bắt buộc chạy chuỗi lệnh sau để đảm bảo chất lượng code và tránh lỗi build trên CI/CD:

```bash
npm run format && npm run lint && npm run test
```

---

## 🎨 Tiêu chuẩn Coding & Styling

- **Tailwind CSS**: Tất cả mã styling tùy biến phải sử dụng Tailwind classes. Đảm bảo các component con kế thừa `className` và kết hợp thông qua `twMerge`.
- **Ant Design Tokens**: Tận dụng tối đa `NpsConfigProvider` và hệ thống token từ Ant Design. Tránh hardcode mã màu hoặc kích thước.
- **Tách biệt Logic & Giao diện**: Giữ component tinh gọn bằng cách tách hook hoặc helpers nếu logic phức tạp.

---

## 🚀 Quy trình Phát hành (Release Process)

Dự án sử dụng **Changesets** kết hợp **GitHub Actions** để tự động phát hành lên NPM.

### 1. Ghi nhận Thay đổi (Local)

Khi hoàn thành tính năng, hãy tạo changeset file bằng cách chạy:

```bash
# Sử dụng script trợ lý tiếng Việt
npm run change
```

Lựa chọn loại cập nhật (`patch`/`minor`/`major`) và viết một câu mô tả ngắn gọn. Lưu ý commit file `.changeset/*.md` này lên cùng với code của bạn.

### 2. Pipeline tự động trên GitHub

- Khi code được merge vào nhánh `main`, hệ thống sẽ chạy kiểm thử và tự động sinh ra một PR mang tên **"Version Packages"**.
- Khi Admin merge PR **"Version Packages"** này:
  1. Thư viện sẽ tự động chạy lệnh build.
  2. Code mới tự động phát hành lên NPM.
  3. GitHub Release & Changelog tự động được cập nhật.
