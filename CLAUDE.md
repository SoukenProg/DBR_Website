# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

System D.B.R. (Dual Blade Rhythm) とSouken521の音楽制作活動を統合したWebサイト - 音楽・ビジュアル制作の総合ポートフォリオサイト。Next.jsベースで、microCMSをヘッドレスCMSとして統合し、作品（音楽トラック）、イベント（即売会出展情報）、SNSリンクを管理します。

**2つのプロジェクト:**
- **System D.B.R.**: リズムゲーム向けのダンスミュージック、ビジュアルデザイン、3D/モーショングラフィックスを制作するサークル
- **Souken521**: 個人名義での楽曲制作活動。ジャンルにとらわれない自由な楽曲制作

## よく使うコマンド

### 開発
```bash
pnpm i                    # 依存関係のインストール
pnpm dev                  # 開発サーバー起動（ポート3000）
pnpm build                # Next.js ビルド（ローカル確認用）
pnpm lint                 # ESLint実行
```

### Cloudflare Workers デプロイ（本番）
```bash
pnpm cf:build             # Next.js + OpenNext ビルド → .open-next/ に出力
pnpm cf:preview           # Wrangler でローカルプレビュー（ポート8787）
pnpm cf:deploy            # Cloudflare Workers にデプロイ
```

### Docker（ローカル開発補助）
```bash
# ホットリロード付き開発環境
docker compose -f docker-compose.dev.yml up --build
```

## 環境変数

必須の環境変数（開発時は `.env.local` を作成）:
- `MICROCMS_SERVICE_DOMAIN` - microCMSのサービスドメイン
- `MICROCMS_API_KEY` - microCMSのAPIキー
- `NEXT_PUBLIC_DISCORD_INVITE_URL` - Discord招待リンクURL（例: https://discord.gg/xxxxx）

オプションの環境変数:
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - Google Analytics 4の測定ID（例: G-XXXXXXXXXX）

ポートフォリオ用環境変数（ビルド時に必要・Cloudflare Workers の Variables または Secrets として登録）:
- `NEXT_PUBLIC_PORTFOLIO_NAME` - 氏名（日本語）
- `NEXT_PUBLIC_PORTFOLIO_NAME_EN` - 氏名（英語）
- `NEXT_PUBLIC_PORTFOLIO_LOCATION` - 所在地
- `NEXT_PUBLIC_PORTFOLIO_EMAIL` - メールアドレス

**注意:** `PORTFOLIO_PASSWORD` / `PORTFOLIO_SESSION_SECRET` は旧 Cookie 認証用で不要になった。認証は Cloudflare Access が担当する。

microCMSの認証情報がない場合、`src/lib/cms.ts` で定義されたモックデータにフォールバックします。

## アーキテクチャ

### コンテンツ管理（microCMS連携）

サイトは3つのコンテンツタイプを持つmicroCMSを使用します:

1. **work** - 音楽作品/制作物
   - `project` フィールド: テキスト（"Sしょかystem D.B.R." または "Souken521"）プロジェクト区別用
   - `tags` フィールド: 複数選択（例: "future-bass", "game-ready"）
   - `platforms` フィールド: 繰り返し（`label`, `url`, `iconKey`）配信プラットフォーム（YouTube、BOOTHなど）用

2. **event** - イベント/即売会出展情報
   - `project` フィールド: テキスト（"System D.B.R." または "Souken521"）プロジェクト区別用
   - `lineup` フィールド: 繰り返し（work参照 + イベント固有のメタデータ）
   - 各lineupアイテムには: `price`, `isNew`, `isLimited`, `boothUrl`, `sampleUrl`, `note`, `order`
   - イベント詳細取得時は `?depth=2` クエリパラメータを使用して参照されたworkを展開する

3. **link** - SNS/外部リンク

**プロジェクトフィルタ機能:**
- 作品一覧ページ（`/works`）とイベント一覧ページ（`/events`）は、プロジェクトごとにフィルタリング可能
- `ProjectFilter` コンポーネント（`src/components/ProjectFilter.tsx`）を使用
- フィルタボタンで「すべて」「System D.B.R.」「Souken521」を切り替え可能

すべてのCMS関数は `src/lib/cms.ts` に集約されており:
- 環境変数が不足している場合のモックデータフォールバック機能
- ISR（Incremental Static Regeneration）による5分間隔の再検証（`next: {revalidate: 300}`）
- 型安全なTypeScriptインターフェースを同ファイルからエクスポート

### ルーティング構造

App Router（Next.js 16）でTypeScriptの型付きルートを有効化:

**souken521.com（公開サイト）:**
```
/                           # ホームページ（最新作品、直近イベント表示）
/works                      # 作品一覧
/works/[slug]              # 作品詳細ページ
/events                     # イベント一覧
/events/[slug]             # イベント詳細ページ（?depth=2使用）
/links                      # SNSリンクページ
/about                      # プロフィール/紹介ページ
/discord                    # Discordのお知らせページ
/privacy                    # プライバシーポリシー
/api/revalidate            # コンテンツ更新用Webhookエンドポイント
/api/forms/discord-apply   # Discord申請フォーム送信ハンドラ
```

**portfolio.souken521.com（Cloudflare Access 保護）:**
```
/  →  /portfolio にリライト  # 就活用ポートフォリオ（本名名義）
```
`src/middleware.ts` がホスト名を検知して `/portfolio` へリライトする。

### コンポーネント構成

`src/components/` の主要コンポーネント:
- `Hero.tsx` - ホームページのヒーローセクション（最新作品表示）
- `WorkCard.tsx` - 作品表示カード（プラットフォームリンク、プロジェクト名バッジ付き）
- `EventCard.tsx` - イベント表示カード（プロジェクト名バッジ付き）
- `ProjectFilter.tsx` - プロジェクトフィルタコンポーネント（作品一覧・イベント一覧で使用）
- `PlatformsList.tsx` - プラットフォームリンクをアイコン付きで表示
- `Header.tsx`, `Footer.tsx` - レイアウトコンポーネント
- `SocialLinks.tsx` - SNSリンク一覧

### スタイリング

- Tailwind CSS 4.x（PostCSSプラグインアーキテクチャ）
- カスタムテーマカラー:
  - `accentRed`, `accentBlue`, `accentGreen`（System D.B.R.のRGBグロー美学）
  - `accentPurple`（Souken521のブランドカラー）
- "Dual Blades"ビジュアルモチーフ用のカスタムglowシャドウユーティリティ
- ダークテーマベースライン（黒背景、白テキスト）

### 画像処理

Next.js Imageコンポーネントの設定でmicroCMSアセットを許可:
- リモートパターン: `https://**.microcms-assets.io`
- `next.config.mjs` で設定

### デプロイ

本番環境は **Cloudflare Workers + OpenNext アダプタ** でデプロイする:

```
pnpm cf:build    # Next.js ビルド → OpenNext で .open-next/ に変換
pnpm cf:deploy   # wrangler で Cloudflare Workers にデプロイ
```

**カスタムドメイン設定（Cloudflare ダッシュボード）:**
1. Workers & Pages > dbr-website > Custom Domains で以下を追加:
   - `souken521.com`
   - `portfolio.souken521.com`
2. `portfolio.souken521.com` に Cloudflare Access ポリシーを設定（Zero Trust > Access > Applications）

**環境変数・Secrets の登録:**
- `wrangler secret put <KEY>` で機密値を登録（APIキー等）
- 非機密の変数は `wrangler.toml` の `[vars]` セクション、またはダッシュボードの Variables で管理
- ローカル開発用は `.dev.vars`（gitignore済み）に記載

**ビルド時の注意:**
- `data.private.ts` はビルド時に必要なため、`pnpm cf:build` 前に配置しておくこと
- `NEXT_PUBLIC_PORTFOLIO_*` 環境変数もビルド時に必要（Cloudflare の Build Variables として設定）

**旧 Docker 本番デプロイについて:**
standalone 出力モードは廃止。Docker は `docker-compose.dev.yml` によるローカル開発のみ使用。

### アナリティクス

Google Analytics 4を`@next/third-parties/google`パッケージで導入:
- `src/app/layout.tsx`で`GoogleAnalytics`コンポーネントを使用
- 環境変数`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`が設定されている場合のみ有効化
- 環境変数が未設定の場合、GAスクリプトは読み込まれない（条件付きレンダリング）

**注意:** パッケージ管理には`pnpm`を使用すること。`npm`と混在させると依存関係の競合が発生する。

### ポートフォリオページ（`portfolio.souken521.com`）

就活用・本名名義のポートフォリオページ。`portfolio.souken521.com` として独立したサブドメインで公開。

**認証の仕組み（Cloudflare Access）:**
- `portfolio.souken521.com` 全体を Cloudflare Access（Zero Trust）で保護
- Cloudflare ダッシュボードで許可ユーザーを設定（メールアドレス等）
- アプリ側での Cookie 認証は不要（旧 `proxy.ts` / `/api/portfolio/auth` / `login/page.tsx` は削除済み）

**ホスト名ベースのルーティング:**
- `src/middleware.ts` が `portfolio.souken521.com` を検知して `/portfolio` パスにリライト
- Next.js アプリは1つのWorkerとして動作し、両ドメインを処理する

**ルートグループによるレイアウト分離:**
- `src/app/(site)/` - 音楽サイト（Header/Footer付き）
- `src/app/portfolio/` - ポートフォリオ専用（Header/Footerなし、白背景のクリーンなデザイン）
- `src/app/layout.tsx` は共通のHTMLシェルのみ（html/body）

**プライバシー対策:**
個人情報を2層に分離してGitへの流出を防いでいる。

| 情報    | 管理方法                    |
|-------|-------------------------|
| 個人情報  | 環境変数                    |
| スキル等  | `.gitignore` で除外されたファイル |
| UIコード | `page.tsx`（Gitにコミット済み）  |

**ファイル構成:**
```
src/app/portfolio/
├── page.tsx          # UIのみ（Git管理）
├── data.private.ts   # 実データ（gitignore済み・個人情報含む）
└── data.example.ts   # プレースホルダー（Git管理・新環境セットアップ用）
```

**新しい環境でのセットアップ手順:**
```bash
cp src/app/portfolio/data.example.ts src/app/portfolio/data.private.ts
# data.private.ts を実際の内容に編集
# .dev.vars に NEXT_PUBLIC_PORTFOLIO_NAME 等を追加（ローカル開発用）
# Cloudflare Workers の Build Variables にも同様に設定
```

**コンテンツの編集:**
- `src/app/portfolio/data.private.ts` を直接編集する
- CMSには連携していない（静的データ）
- `EDUCATION` 配列は **入学年が古い順（上が古い）** で記載すること

### オンデマンド再検証

`/api/revalidate` エンドポイントはWebhook経由のキャッシュ無効化を可能にします:
- `?secret=REVALIDATE_SECRET` パラメータが必要
- microCMSのWebhook設定で設定し、コンテンツ変更時に自動更新

## TypeScript設定

- Strictモード有効化
- パスエイリアス: `@/*` は `src/*` にマッピング
- ES2022ターゲット
- JavaScriptファイル不許可（`allowJs: false`）
