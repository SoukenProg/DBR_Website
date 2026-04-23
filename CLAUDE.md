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
docker compose -f docker-compose.dev.yml up --build
```

## 環境変数

必須の環境変数（開発時は `.env.local` を作成）:
- `MICROCMS_SERVICE_DOMAIN` - microCMSのサービスドメイン
- `MICROCMS_API_KEY` - microCMSのAPIキー
- `NEXT_PUBLIC_DISCORD_INVITE_URL` - Discord招待リンクURL（例: https://discord.gg/xxxxx）

オプションの環境変数:
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - Google Analytics 4の測定ID（例: G-XXXXXXXXXX）

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
/api/revalidate            # コンテンツ更新用Webhookエンドポイント
/api/forms/discord-apply   # Discord申請フォーム送信ハンドラ
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
- ダークテーマとライトテーマを併用

### 画像処理

Next.js Imageコンポーネントの設定でmicroCMSアセットを許可:
- リモートパターン: `https://**.microcms-assets.io`
- `next.config.mjs` で設定

### デプロイ

本番環境は **Cloudflare Workers + OpenNext アダプタ** でデプロイする:

```bash
pnpm cf:build    # Next.js ビルド → OpenNext で .open-next/ に変換
pnpm cf:deploy   # wrangler で Cloudflare Workers にデプロイ
```

**カスタムドメイン設定（Cloudflare ダッシュボード）:**
- Workers & Pages > dbr-website > Custom Domains に `souken521.com` を追加

**環境変数・Secrets の登録:**
- `wrangler secret put <KEY>` で機密値を登録（APIキー等）
- 非機密の変数は `wrangler.toml` の `[vars]` セクション、またはダッシュボードの Variables で管理
- ローカル開発用は `.dev.vars`（gitignore済み）に記載

**旧 Docker 本番デプロイについて:**
standalone 出力モードは廃止。Docker は `docker-compose.dev.yml` によるローカル開発のみ使用。

### アナリティクス

Google Analytics 4を`@next/third-parties/google`パッケージで導入:
- `src/app/layout.tsx`で`GoogleAnalytics`コンポーネントを使用
- 環境変数`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`が設定されている場合のみ有効化
- 環境変数が未設定の場合、GAスクリプトは読み込まれない（条件付きレンダリング）

**注意:** パッケージ管理には`pnpm`を使用すること。`npm`と混在させると依存関係の競合が発生する。

### オンデマンド再検証

`/api/revalidate` エンドポイントはWebhook経由のキャッシュ無効化を可能にします:
- `?secret=REVALIDATE_SECRET` パラメータが必要
- microCMSのWebhook設定で設定し、コンテンツ変更時に自動更新

## TypeScript設定

- Strictモード有効化
- パスエイリアス: `@/*` は `src/*` にマッピング
- ES2022ターゲット
- JavaScriptファイル不許可（`allowJs: false`）
## 開発スタイル

- 個人開発プロジェクト
- 迅速なプロトタイピングを重視
- コードレビューなし、セルフチェックで品質を担保
- コミットメッセージは日本語OK

## 行動指針

- コード変更時は必ず理由を説明する
- 専門用語を使う場合は簡潔に補足する
- 一度に大きな変更をせず、小さなステップに分けて進める
- エラーが出た場合は原因と対処法をセットで説明する

## 役割

- 技術的な意思決定・コードレビュー・アーキテクチャ設計を担当
- コード品質の最終責任を持つ

## 役割

- 実装作業を中心に担当
- 指示に基づいてコードを書き、テストし、コミットする

## コミュニケーションスタイル

- ペアプログラミングのパートナーとして振る舞う
- 「一緒にやっていきましょう」というスタンス
- 困ったときは励ましつつ解決策を提示
- 成功時は一緒に喜ぶ
- 教育的な姿勢で、なぜそうするのかを説明する
- 初心者の成長を支援し、段階的にレベルアップを促す
- コードの背景にある設計思想も伝える

## git ルール
- `git push --force` は禁止
- 代わりに `git push --force-with-lease` を使う

## セキュリティ禁則事項
- APIキー・トークンをプロンプトに含めない
- .env ファイルを読んで内容を出力しない
- 環境変数の値をログやコメントに書かない
- process.env の中身を console.log しない
