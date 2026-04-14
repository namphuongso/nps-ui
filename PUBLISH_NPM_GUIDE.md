# Hướng dẫn publish `nps-ui` lên npm

Tài liệu này hướng dẫn chi tiết cách đưa package UI của bạn trong repo này lên npm theo đúng cấu trúc hiện tại.

> Repo hiện tại đang là **monorepo**:
>
> - `packages/ui`: package sẽ publish lên npm
> - `apps/docs`: website docs/demo, **không publish lên npm**

---

## Mục lục

1. [Mục tiêu](#mục-tiêu)
2. [Chuẩn bị trước khi publish](#chuẩn-bị-trước-khi-publish)
3. [Hiểu đúng package nào sẽ được publish](#hiểu-đúng-package-nào-sẽ-được-publish)
4. [Cập nhật `package.json` cho đúng chuẩn npm](#cập-nhật-packagejson-cho-đúng-chuẩn-npm)
5. [Chọn tên package đúng cách](#chọn-tên-package-đúng-cách)
6. [Kiểm tra build trước khi publish](#kiểm-tra-build-trước-khi-publish)
7. [Đăng nhập npm](#đăng-nhập-npm)
8. [Publish package lần đầu](#publish-package-lần-đầu)
9. [Publish các lần cập nhật tiếp theo](#publish-các-lần-cập-nhật-tiếp-theo)
10. [Kiểm tra package sau khi publish](#kiểm-tra-package-sau-khi-publish)
11. [Xử lý các lỗi thường gặp](#xử-lý-các-lỗi-thường-gặp)
12. [Khuyến nghị trước khi public chính thức](#khuyến-nghị-trước-khi-public-chính-thức)
13. [Quy trình nhanh đề xuất](#quy-trình-nhanh-đề-xuất)

---

## Mục tiêu

Sau tài liệu này, bạn sẽ làm được các việc sau:

- chuẩn bị package `nps-ui` đủ thông tin để publish
- build đúng phần thư viện trong `packages/ui`
- đẩy package lên npm ở chế độ **public**
- biết cách tăng version cho các lần release tiếp theo

---

## Chuẩn bị trước khi publish

Bạn cần có sẵn:

### 1. Tài khoản npm

Tạo tại:

- https://www.npmjs.com/signup

### 2. Node.js và npm

Kiểm tra bằng lệnh:

```bash
node -v
npm -v
```

### 3. Đã cài dependency cho repo

Tại root repo:

```bash
cd /Users/lyquocvan/Documents/NamPhuongSo/nps-ui
npm install
```

### 4. Package đã build được

Repo này đã có sẵn lệnh:

```bash
npm run build
```

Lệnh này sẽ:

- build package trong `packages/ui`
- build website docs trong `apps/docs`

---

## Hiểu đúng package nào sẽ được publish

Trong repo này, package npm chính là file:

```bash
packages/ui/package.json
```

Đây mới là package sẽ public lên npm.

**Không publish root repo** và **không publish `apps/docs`**.

---

## Cập nhật `package.json` cho đúng chuẩn npm

Mở file:

```bash
packages/ui/package.json
```

Hiện tại file này đã có nền tảng build/export cơ bản. Trước khi publish thật, bạn nên rà soát và bổ sung các trường sau.

### Ví dụ cấu hình nên có

```json
{
  "name": "nps-ui",
  "version": "0.1.0",
  "description": "Custom UI components built on top of Ant Design and Tailwind CSS.",
  "type": "module",
  "main": "./dist/nps-ui.cjs",
  "module": "./dist/nps-ui.js",
  "types": "./dist/index.d.ts",
  "style": "./dist/style.css",
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/nps-ui.js",
      "require": "./dist/nps-ui.cjs"
    },
    "./style.css": "./dist/style.css"
  },
  "scripts": {
    "build": "vite build"
  },
  "peerDependencies": {
    "antd": "^5.0.0",
    "react": "^18.2.0 || ^19.0.0",
    "react-dom": "^18.2.0 || ^19.0.0"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  },
  "keywords": ["ui", "react", "antd", "tailwind", "component-library"],
  "license": "MIT",
  "author": "Tên của bạn",
  "homepage": "https://github.com/<your-account>/<your-repo>",
  "repository": {
    "type": "git",
    "url": "https://github.com/<your-account>/<your-repo>.git"
  }
}
```

### Ý nghĩa các trường quan trọng

| Trường                      | Ý nghĩa                                                            |
| --------------------------- | ------------------------------------------------------------------ |
| `name`                      | tên package trên npm                                               |
| `version`                   | version hiện tại                                                   |
| `main` / `module` / `types` | entry cho JS/CJS/TypeScript                                        |
| `files`                     | chỉ publish thư mục `dist`                                         |
| `peerDependencies`          | ép project dùng cùng `react`, `react-dom`, `antd` với app consumer |
| `repository`                | liên kết repo GitHub                                               |
| `license`                   | license public                                                     |
| `keywords`                  | hỗ trợ tìm kiếm trên npm                                           |

---

## Chọn tên package đúng cách

Bạn có 2 cách đặt tên phổ biến:

### Cách 1: package thường

```json
"name": "nps-ui"
```

Ưu điểm:

- gọn
- dễ import

Nhược điểm:

- có thể đã bị người khác chiếm tên

---

### Cách 2: package có scope

```json
"name": "@ten-ban/nps-ui"
```

Ví dụ:

```json
"name": "@namphuongso/nps-ui"
```

Ưu điểm:

- dễ tránh trùng tên
- nhìn chuyên nghiệp hơn
- hợp với tổ chức/team

Nếu dùng **scoped package** và muốn public, cần thêm:

```json
"publishConfig": {
  "access": "public"
}
```

> Nếu không thêm `access: public`, npm có thể hiểu là package private hoặc yêu cầu publish khác mong muốn.

---

## Kiểm tra xem tên package đã bị dùng chưa

Bạn có thể kiểm tra bằng cách:

```bash
npm view nps-ui
```

Hoặc nếu dùng scope:

```bash
npm view @namphuongso/nps-ui
```

### Trường hợp kết quả:

- **có thông tin trả về** → tên đã tồn tại
- **404 Not Found** → tên có khả năng còn trống để dùng

---

## Kiểm tra build trước khi publish

Đây là bước bắt buộc.

Tại root repo chạy:

```bash
npm run build
```

Hoặc chỉ build package UI:

```bash
npm run build --workspace nps-ui
```

Sau đó kiểm tra thư mục build:

```bash
ls packages/ui/dist
```

Bạn nên thấy các file tương tự:

- `nps-ui.js`
- `nps-ui.cjs`
- `index.d.ts`
- `style.css`

---

## Kiểm tra nội dung sẽ được publish

Đây là bước rất nên làm trước khi publish thật:

```bash
cd packages/ui
npm pack --dry-run
```

Lệnh này sẽ cho bạn biết npm dự định đóng gói những file nào.

### Mục tiêu mong muốn

Chỉ nên có các file cần thiết như:

- `dist/*`
- `package.json`
- `README.md` nếu có
- `LICENSE` nếu có

Nếu thấy nhiều file thừa, cần rà lại:

- trường `files` trong `package.json`
- `.npmignore` nếu bạn dùng thêm

---

## Đăng nhập npm

Từ terminal, chạy:

```bash
npm login
```

Hệ thống sẽ yêu cầu nhập:

- username
- password
- email / OTP nếu có xác thực 2 bước

Sau khi login xong, kiểm tra:

```bash
npm whoami
```

Nếu trả về username của bạn thì đã đăng nhập thành công.

---

## Publish package lần đầu

### Cách an toàn nhất

Tại root repo:

```bash
npm publish --workspace nps-ui --access public
```

Nếu bạn đứng trực tiếp trong thư mục package:

```bash
cd packages/ui
npm publish --access public
```

### Giải thích

- `--workspace nps-ui`: publish đúng package UI trong monorepo
- `--access public`: đảm bảo public package, đặc biệt quan trọng với scoped package

---

## Publish các lần cập nhật tiếp theo

Sau khi đã publish lần đầu, mỗi lần release mới bạn cần:

### 1. Tăng version

Ví dụ tăng patch:

```bash
cd packages/ui
npm version patch
```

Hoặc tăng minor:

```bash
npm version minor
```

Hoặc tăng major:

```bash
npm version major
```

### Ý nghĩa version

| Kiểu  | Ví dụ             | Dùng khi                      |
| ----- | ----------------- | ----------------------------- |
| patch | `0.1.0` → `0.1.1` | sửa lỗi nhỏ                   |
| minor | `0.1.0` → `0.2.0` | thêm tính năng, không phá API |
| major | `1.0.0` → `2.0.0` | thay đổi breaking             |

### 2. Build lại

```bash
cd /Users/lyquocvan/Documents/NamPhuongSo/nps-ui
npm run build
```

### 3. Publish version mới

```bash
npm publish --workspace nps-ui --access public
```

---

## Kiểm tra package sau khi publish

Sau khi publish xong, bạn kiểm tra bằng các cách sau.

### 1. Xem trên website npm

```bash
https://www.npmjs.com/package/<ten-package>
```

Ví dụ:

```bash
https://www.npmjs.com/package/nps-ui
```

Hoặc:

```bash
https://www.npmjs.com/package/@namphuongso/nps-ui
```

### 2. Kiểm tra metadata từ terminal

```bash
npm view nps-ui
```

### 3. Test cài đặt ở project khác

```bash
npm install nps-ui antd react react-dom
```

Nếu package của bạn dùng scope:

```bash
npm install @namphuongso/nps-ui antd react react-dom
```

---

## Cách dùng package sau khi publish

Ví dụ trong app consumer:

```tsx
import { ConfigProvider } from "antd";
import { NpsButton } from "nps-ui";
import "antd/dist/reset.css";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <NpsButton type="primary">Xin chào</NpsButton>
    </ConfigProvider>
  );
}
```

Nếu package có scope:

```tsx
import { ConfigProvider } from "antd";
import { NpsButton } from "@namphuongso/nps-ui";
import "antd/dist/reset.css";
```

---

## Xử lý các lỗi thường gặp

### 1. Lỗi `403 Forbidden`

Nguyên nhân thường là:

- tên package đã bị người khác dùng
- bạn chưa có quyền publish tên đó
- scoped package chưa set `--access public`

Cách xử lý:

- đổi tên package
- thêm `publishConfig.access = public`
- chạy lại `npm login`

---

### 2. Lỗi `You cannot publish over the previously published versions`

Nguyên nhân:

- bạn đang publish lại cùng một version đã tồn tại

Cách xử lý:

```bash
cd packages/ui
npm version patch
```

Rồi publish lại.

---

### 3. Package publish lên nhưng import bị lỗi

Nguyên nhân có thể là:

- `main`, `module`, `types`, `exports` cấu hình sai
- file `dist` chưa được build ra đúng
- thiếu CSS export

Cách xử lý:

- build lại `npm run build`
- kiểm tra `packages/ui/dist`
- kiểm tra lại `exports` trong `packages/ui/package.json`

---

### 4. Theme hiển thị không đúng như mong muốn ở app consumer

Nguyên nhân:

- app host chưa bọc `ConfigProvider` của Ant
- token theme của project chưa được cấu hình đúng
- version `antd` giữa package và app chưa tương thích

Cách xử lý:

- kiểm tra lại `ConfigProvider` ở dự án host
- xác nhận `colorPrimary`, `borderRadius`, `fontSize`... đang được set đúng
- đồng bộ version `antd` giữa package và app consumer

---

### 5. App consumer báo conflict React / Ant

Nguyên nhân:

- version `react`, `react-dom`, `antd` giữa package và app không tương thích

Cách xử lý:

- giữ `react`, `react-dom`, `antd` trong `peerDependencies`
- đồng bộ version giữa thư viện và app dùng thư viện

---

## Khuyến nghị trước khi public chính thức

Trước khi public bản thật, bạn nên bổ sung thêm:

### 1. `README.md` riêng cho package `packages/ui`

Nên có:

- mô tả thư viện
- cách cài đặt
- cách import CSS
- ví dụ dùng `Button`
- danh sách component hiện có

### 2. File `LICENSE`

Ví dụ: `MIT`

### 3. Thông tin GitHub chuẩn

Thêm vào `repository`, `homepage`, `bugs` trong `package.json`

Ví dụ:

```json
"bugs": {
  "url": "https://github.com/<your-account>/<your-repo>/issues"
}
```

### 4. Tag release theo version

Nếu dùng Git:

```bash
git tag v0.1.0
git push origin v0.1.0
```

### 5. Tạo changelog

Ví dụ file:

```bash
CHANGELOG.md
```

Ghi rõ mỗi version thêm gì, sửa gì.

---

## Quy trình nhanh đề xuất

Đây là quy trình ngắn gọn tôi khuyên bạn dùng mỗi lần release:

### Lần đầu publish

```bash
cd /Users/lyquocvan/Documents/NamPhuongSo/nps-ui
npm install
npm run build
npm login
npm publish --workspace nps-ui --access public
```

### Các lần update sau

```bash
cd /Users/lyquocvan/Documents/NamPhuongSo/nps-ui/packages/ui
npm version patch
cd /Users/lyquocvan/Documents/NamPhuongSo/nps-ui
npm run build
npm publish --workspace nps-ui --access public
```

---

## Gợi ý riêng cho repo này

Với repo hiện tại, tôi khuyên bạn nên làm theo thứ tự sau:

1. chốt tên package cuối cùng, ví dụ:
   - `nps-ui`
   - hoặc `@namphuongso/nps-ui`
2. cập nhật `packages/ui/package.json`
3. bổ sung `README.md` riêng cho package `ui`
4. chạy `npm pack --dry-run`
5. chạy `npm publish --workspace nps-ui --access public`

---

## Kết luận

Bạn **hoàn toàn có thể publish thư viện trong repo này lên npm** mà vẫn giữ website docs ở cùng source.

Điểm quan trọng nhất là:

- chỉ publish package trong `packages/ui`
- build trước khi publish
- tăng version mỗi lần release
- nếu dùng scoped package thì nhớ `--access public`

---

Nếu muốn, bước tiếp theo tôi có thể làm tiếp cho bạn một trong 2 việc sau:

1. **chỉnh luôn `packages/ui/package.json` sang chuẩn sẵn sàng publish**
2. **tạo thêm `README.md` riêng cho package `ui` để đẹp hơn khi lên npm**
