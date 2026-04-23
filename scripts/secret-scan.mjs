import { execSync } from "child_process";
// from https://claudecode-lab.com/blog/claude-code-security-best-practices/
// ステージングされた変更を取得
const diff = execSync("git diff --cached").toString();

const PATTERNS = [
  // microCMS
  {
    name: "microCMS APIキー (env)",
    re: /\b(?:MICROCMS_API_KEY|X_MICROCMS_API_KEY|MICROCMS_MANAGEMENT_API_KEY)\b\s*[:=]\s*['"`]?[A-Za-z0-9_-]{16,}['"`]?/,
  },
  {
    name: "microCMS APIキー (header直書き)",
    re: /\bX-MICROCMS-API-KEY\b\s*['"`]?\s*[:=]\s*['"`][^'"`\n]{16,}['"`]/,
  },

  // Next.jsで秘密にすべき env 名
  {
    name: "NEXT_PUBLIC_ に載せてはいけない秘密値",
    re: /\bNEXT_PUBLIC_(?:MICROCMS_API_KEY|DATABASE_URL|API_SECRET|JWT_SECRET|SESSION_SECRET|AUTH_SECRET)\b\s*[:=]\s*['"`]?[^\s'"`]+['"`]?/,
  },

  // DB / 認証 / セッション
  {
    name: "DATABASE_URL",
    re: /\bDATABASE_URL\b\s*[:=]\s*['"`]?(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|redis):\/\/[^\s'"`]+['"`]?/i,
  },
  {
    name: "認証シークレット",
    re: /\b(?:AUTH_SECRET|NEXTAUTH_SECRET|JWT_SECRET|SESSION_SECRET|COOKIE_SECRET)\b\s*[:=]\s*['"`][^'"`\n]{16,}['"`]/,
  },

  // Vercel / Cloudflare / GitHub など、Next.js運用で混ざりやすいもの
  {
    name: "Vercelトークン",
    re: /\b(?:VERCEL_TOKEN)\b\s*[:=]\s*['"`][^'"`\n]{10,}['"`]/,
  },
  {
    name: "Cloudflareトークン",
    re: /\b(?:CLOUDFLARE_API_TOKEN|CF_API_TOKEN)\b\s*[:=]\s*['"`][^'"`\n]{10,}['"`]/,
  },
  {
    name: "GitHubトークン",
    re: /\b(?:GITHUB_TOKEN|GH_TOKEN)\b\s*[:=]\s*['"`][^'"`\n]{10,}['"`]/,
  },

  // よくある生トークン形式
  {
    name: "OpenAI APIキー",
    re: /sk-[A-Za-z0-9_-]{20,}/,
  },
  {
    name: "Anthropic APIキー",
    re: /sk-ant-[A-Za-z0-9_-]{20,}/,
  },
  {
    name: "Slackトークン",
    re: /xox[baprs]-[0-9A-Za-z-]{10,}/,
  },
  {
    name: "AWSアクセスキー",
    re: /AKIA[0-9A-Z]{16}/,
  },
  {
    name: "GitHub personal access token",
    re: /\b(?:ghp|github_pat)_[A-Za-z0-9_]{20,}\b/,
  },

  // 汎用: secret/token/key の直書き
  {
    name: "Generic secret assignment",
    re: /\b(?:api[_-]?key|secret|token|access[_-]?token|client[_-]?secret)\b\s*[:=]\s*['"`][^'"`\n]{10,}['"`]/i,
  },

  // 鍵ファイル / service account
  {
    name: "秘密鍵 PEM",
    re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |)PRIVATE KEY-----/,
  },
  {
    name: "service account JSON",
    re: /"private_key"\s*:\s*"-----BEGIN PRIVATE KEY-----/,
  },
];

const found = PATTERNS.filter(({ re }) => re.test(diff));

if (found.length > 0) {
  console.error("🚨 シークレット検出! コミットを中止します:");
  found.forEach(({ name }) => console.error(`  - ${name}`));
  console.error("\n対処法: git reset HEAD <file> で unstage してください");
  process.exit(1);  // 終了コード1 → Hookがコマンドをブロック
}

console.log("✓ シークレットスキャン: 問題なし");
process.exit(0);
