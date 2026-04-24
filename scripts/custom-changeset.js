import fs from "fs";
import readline from "readline";

// Cấu hình danh sách gói
const ALL_PACKAGES = ["docs", "@namphuongtechnologi/nps-ui"];
const BUMP_TYPES = ["patch", "minor", "major"];

async function run() {
  console.log("\n🦋  NPS Custom Changeset Assistant\n");

  // 1. Chọn gói (Hiển thị danh sách gộp chung)
  console.log("1. Chọn gói cần cập nhật:");
  console.log("   Enter: Cả hai | 1: docs | 2: @namphuongtechnologi/nps-ui");
  const pkgChoice = await ask("   Lựa chọn: ");

  let selectedPkgs = ALL_PACKAGES;
  if (pkgChoice === "1") selectedPkgs = ["docs"];
  if (pkgChoice === "2") selectedPkgs = ["@namphuongtechnologi/nps-ui"];

  // 2. Chọn loại bump (Chỉ hỏi 1 lần)
  console.log("\n2. Chọn loại version:");
  console.log("   1: patch  (0.0.x)");
  console.log("   2: minor  (0.x.0)");
  console.log("   3: major  (x.0.0)");
  const typeChoice = await ask("   Lựa chọn [1/2/3 - Mặc định: 1]: ");
  const type = BUMP_TYPES[parseInt(typeChoice) - 1 || 0];

  // 3. Nhập Summary
  console.log("\n3. Nhập mô tả thay đổi:");
  const summary = await ask("   Mô tả: ");

  // 4. Tạo file .changeset
  const date = new Date().getTime();
  const filename = `.changeset/nps-${date}.md`;
  const pkgLines = selectedPkgs.map((p) => `"${p}": ${type}`).join("\n");
  const content = `---\n${pkgLines}\n---\n\n${summary || "update"}\n`;

  if (!fs.existsSync(".changeset")) {
    fs.mkdirSync(".changeset", { recursive: true });
  }
  fs.writeFileSync(filename, content);

  console.log(`\n✅  Đã tạo xong file: ${filename}`);
  process.exit(0);
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
