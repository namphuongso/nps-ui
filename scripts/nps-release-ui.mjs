import fs from "fs";
import readline from "readline";

// Cấu hình danh sách gói
const ALL_PACKAGES = ["docs", "@namphuongtechnologi/nps-ui"];
const BUMP_TYPES = [
  { label: "🟢 Patch (0.0.x)", value: "patch" },
  { label: "🟡 Minor (0.x.0)", value: "minor" },
  { label: "🔴 Major (x.0.0)", value: "major" },
];

async function start() {
  console.log("\n💎  NPS UI Release Assistant\n");

  // --- BƯỚC 1: CHỌN GÓI ---
  console.log("1. Chọn gói cần cập nhật (Mặc định chọn cả hai):");
  let selectedIndices = [0, 1];
  // Ở đây chúng ta mặc định chọn cả hai để nhanh, nếu bạn muốn chọn riêng có thể gõ 1 hoặc 2
  const pkgChoice = await ask("   [Enter]: Cả hai | [1]: docs | [2]: ui : ");
  if (pkgChoice === "1") selectedIndices = [0];
  if (pkgChoice === "2") selectedIndices = [1];
  const selectedPkgs = selectedIndices.map((i) => ALL_PACKAGES[i]);

  // --- BƯỚC 2: CHỌN LOẠI VERSION ---
  console.log("\n2. Chọn loại version:");
  BUMP_TYPES.forEach((t, i) => console.log(`   ${i + 1}: ${t.label}`));
  const typeChoice = await ask("   Lựa chọn [1/2/3 - Mặc định: 1]: ");
  const type = BUMP_TYPES[parseInt(typeChoice) - 1 || 0].value;

  // --- BƯỚC 3: NHẬP MÔ TẢ ---
  console.log("\n3. Nhập mô tả thay đổi:");
  const summary = await ask("   Mô tả: ");

  // --- TẠO FILE ---
  const date = new Date().getTime();
  const filename = `.changeset/nps-${date}.md`;
  const pkgLines = selectedPkgs.map((p) => `"${p}": ${type}`).join("\n");
  const content = `---\n${pkgLines}\n---\n\n${summary || "update packages"}\n`;

  if (!fs.existsSync(".changeset")) fs.mkdirSync(".changeset");
  fs.writeFileSync(filename, content);

  console.log(`\n✅  Xong! Đã tạo: ${filename}`);
  console.log("🚀  Giờ bạn chỉ cần: git add . && git commit && git push");
  process.exit(0);
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(pkgChoiceColor(question), (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function pkgChoiceColor(text) {
  return `\x1b[36m${text}\x1b[0m`; // Màu Cyan cho câu hỏi
}

start();
