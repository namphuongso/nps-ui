# Hướng dẫn Đóng góp (Contributing Guide)

Chào mừng bạn đến với dự án **NPS UI**! Tài liệu này hướng dẫn quy trình đóng góp code, tiêu chuẩn chất lượng và cách phối hợp làm việc trong team.

---

## 🛠️ Chuẩn bị môi trường

**Yêu cầu:**
- Node.js phiên bản **20** trở lên
- npm phiên bản **9** trở lên

**Extensions VS Code khuyên dùng:**
- `ESLint` — hiển thị lỗi lint trực tiếp trong editor
- `Prettier` — tự động format khi save
- `Tailwind CSS IntelliSense` — gợi ý class Tailwind

**Cài đặt project:**
```bash
git clone <url-repo>
cd nps-ui
npm install
npm run dev:docs   # Xem tại http://localhost:3000
```

---

## 💻 Quy trình làm việc

Dự án sử dụng **một nhánh `main` duy nhất**. Không có nhánh tính năng hay nhánh release riêng biệt.

### Bước 1 — Phát triển tính năng / Fix lỗi

Code trực tiếp hoặc tạo nhánh tính năng ngắn hạn từ `main`:
```bash
git checkout -b fix/ten-loi       # Hoặc feature/ten-tinh-nang
```

### Bước 2 — Kiểm tra chất lượng

Trước khi commit, bắt buộc chạy:
```bash
npm run format   # Tự động định dạng code
npm run lint     # Kiểm tra lỗi logic
npm run test     # Chạy unit tests
```

### Bước 3 — Ghi nhận thay đổi (Changeset)

```bash
npx changeset
```
- Chọn loại: `patch` (fix lỗi) / `minor` (thêm tính năng) / `major` (breaking change)
- Viết mô tả ngắn về thay đổi

### Bước 4 — Commit & Push

```bash
git add .
git commit -m "feat: mô tả ngắn về thay đổi"
git push origin main   # Hoặc push nhánh và tạo PR
```

> [!IMPORTANT]
> GitHub Actions sẽ tự động chạy **Lint + Test + Build** trên mỗi PR. Nếu có bước nào thất bại, code cần được sửa trước khi merge.

---

## 🎨 Tiêu chuẩn Code Style

| Quy tắc | Chi tiết |
| :--- | :--- |
| **Component** | Dùng Functional Component + Hooks, đặt tên PascalCase: `NpsButton` |
| **Props** | Khai báo rõ ràng kiểu TypeScript, export cả Props type |
| **Style** | Dùng **Tailwind CSS** để tùy chỉnh, không dùng inline style thô |
| **Test** | Mọi component phải có file `.test.tsx` cùng thư mục |
| **Docs** | Mọi component phải có trang docs trong `apps/docs/src/pages/` |

---

## 📝 Cách viết tài liệu Component (Docs)

Dùng template `ComponentDoc` để viết nhanh, không cần tự dựng layout:

```tsx
// apps/docs/src/pages/components/InputPage.tsx
import { ComponentDoc, generateAnchors } from "../../components/docs/ComponentDoc";

const examples = [
  {
    id: "ex-basic",
    title: "Basic",
    desc: "Mô tả ví dụ",
    preview: <NpsInput />,
    code: `<NpsInput />`,
  },
];

export const inputAnchorItems = generateAnchors(examples);

export function InputPage() {
  return (
    <ComponentDoc
      title="Input"
      version="0.2.0"
      description={<>Mô tả component.</>}
      importSnippet={`import { NpsInput } from "@namphuongso/nps-ui";`}
      whenToUse={["Khi cần nhập liệu văn bản."]}
      examples={examples}
      antdDocLink="https://ant.design/components/input#api"
    />
  );
}
```

---

_Cảm ơn bạn đã đồng hành cùng NPS UI!_
