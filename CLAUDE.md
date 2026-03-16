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
pnpm build                # 本番用ビルド
pnpm start                # 本番サーバー起動
pnpm lint                 # ESLint実行
```

### Docker
```bash
# ホットリロード付き開発環境
docker compose -f docker-compose.dev.yml up --build

# 本番環境
docker compose up --build -d
```

## 環境変数

必須の環境変数（開発時は `.env.local` を作成）:
- `MICROCMS_SERVICE_DOMAIN` - microCMSのサービスドメイン
- `MICROCMS_API_KEY` - microCMSのAPIキー
- `NEXT_PUBLIC_DISCORD_INVITE_URL` - Discord招待リンクURL（例: https://discord.gg/xxxxx）

オプションの環境変数:
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - Google Analytics 4の測定ID（例: G-XXXXXXXXXX）
- `PORTFOLIO_PASSWORD` - ポートフォリオページの閲覧パスワード（未設定時は認証が機能しない）
- `PORTFOLIO_SESSION_SECRET` - ポートフォリオ認証Cookie用の秘密文字列（openssl rand -hex 32 で生成推奨）

microCMSの認証情報がない場合、`src/lib/cms.ts` で定義されたモックデータにフォールバックします。

## アーキテクチャ

### コンテンツ管理（microCMS連携）

サイトは3つのコンテンツタイプを持つmicroCMSを使用します:

1. **work** - 音楽作品/制作物
   - `project` フィールド: テキスト（"System D.B.R." または "Souken521"）プロジェクト区別用
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
/portfolio                  # 就活用ポートフォリオ（パスワード保護・本名名義）
/portfolio/login            # ポートフォリオのパスワード入力ページ
/api/revalidate            # コンテンツ更新用Webhookエンドポイント
/api/forms/discord-apply   # Discord申請フォーム送信ハンドラ
/api/portfolio/auth        # ポートフォリオ認証API（パスワード検証・Cookie発行）
```

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

本番ビルドはNext.jsのstandalone出力モードを使用:
- 必要なファイルのみを含む最小限のDockerイメージ
- マルチステージビルドでレイヤーキャッシュを最適化
- 非rootユーザー（nextjs:1001）として実行
- ポート3000で公開（docker-composeで4004にマッピング）
- 本番環境変数は `.env.production` を使用

### アナリティクス

Google Analytics 4を`@next/third-parties/google`パッケージで導入:
- `src/app/layout.tsx`で`GoogleAnalytics`コンポーネントを使用
- 環境変数`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`が設定されている場合のみ有効化
- 環境変数が未設定の場合、GAスクリプトは読み込まれない（条件付きレンダリング）

**注意:** パッケージ管理には`pnpm`を使用すること。`npm`と混在させると依存関係の競合が発生する。

### ポートフォリオページ（`/portfolio`）

就活用・本名名義のポートフォリオページ。音楽サイトのブランディングとは独立したクリーンなデザイン。

**パスワード保護の仕組み:**
- `src/proxy.ts`（Next.js 16のProxy機能）で `/portfolio/*` へのアクセスを制御
- 未認証の場合は `/portfolio/login` にリダイレクト
- `/api/portfolio/auth` にパスワードをPOSTすると Cookie（`portfolio_auth`）が発行される
- Cookie値と `PORTFOLIO_SESSION_SECRET` を照合して認証（パスワード自体はCookieに保存しない）
- Cookie有効期限: 7日間

**必要な環境変数:**
- `PORTFOLIO_PASSWORD` - ページ閲覧用パスワード
- `PORTFOLIO_SESSION_SECRET` - Cookie値として使うランダムな秘密文字列（パスワードとは別）

**ルートグループによるレイアウト分離:**
- `src/app/(site)/` - 既存の音楽サイト（Header/Footer付き）
- `src/app/portfolio/` - ポートフォリオ専用（Header/Footerなし、白背景のクリーンなデザイン）
- `src/app/layout.tsx` は共通のHTMLシェルのみ（html/body）

**プライバシー対策:**
個人情報を2層に分離してGitへの流出を防いでいる。

| 情報 | 管理方法 |
|---|---|
| 氏名・住所・メール | 環境変数（`NEXT_PUBLIC_PORTFOLIO_*`） |
| スキル・職歴・学歴・競プロ・自己PR | `data.private.ts`（`.gitignore` で除外） |
| UIコード | `page.tsx`（Gitにコミット済み） |

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
# .env.local に NEXT_PUBLIC_PORTFOLIO_NAME 等を追加
```

**Dockerデプロイ時の注意:**
`data.private.ts` はビルド時に必要なため、`docker build` 前にサーバー上に配置しておくこと。`.dockerignore` には追加不要（gitignoreされているがbuild contextには含まれる）。

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
