# Souken521 / System D.B.R. Website

Souken521 と音楽サークル System D.B.R. の公式Webサイト。
Next.js 16 + Tailwind CSS 4 + microCMS 構成。Docker 同梱。

## 機能

- 作品（work）・イベント（event）・リンク（link）の管理（microCMS）
- プロジェクト別フィルター（System D.B.R. / Souken521）
- ISR による自動キャッシュ更新（5分間隔）
- Google Analytics 4 対応
- Discord 申請フォーム
- パスワード保護付き就活用ポートフォリオページ（`/portfolio`）

## セットアップ

```bash
pnpm install
cp .env.example .env.local
# .env.local を編集して環境変数を設定
pnpm dev
```

## 環境変数

`.env.example` を参照。主要な変数：

| 変数 | 必須 | 説明 |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | ✓ | microCMS のサービスドメイン |
| `MICROCMS_API_KEY` | ✓ | microCMS の API キー |
| `NEXT_PUBLIC_DISCORD_INVITE_URL` | ✓ | Discord 招待リンク |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | — | GA4 測定ID |
| `PORTFOLIO_PASSWORD` | — | ポートフォリオ閲覧パスワード |
| `PORTFOLIO_SESSION_SECRET` | — | ポートフォリオ認証用トークン |
| `NEXT_PUBLIC_PORTFOLIO_NAME` | — | ポートフォリオ表示名（本名） |
| `NEXT_PUBLIC_PORTFOLIO_NAME_EN` | — | ポートフォリオ表示名（英語） |
| `NEXT_PUBLIC_PORTFOLIO_LOCATION` | — | 居住地 |
| `NEXT_PUBLIC_PORTFOLIO_EMAIL` | — | 連絡先メール |

microCMS の認証情報が未設定の場合はモックデータで動作します。

## ポートフォリオページのセットアップ

```bash
cp src/app/portfolio/data.example.ts src/app/portfolio/data.private.ts
# data.private.ts を実際の内容に編集（gitignore 済み）
```

## microCMS スキーマ

- **work**: `project`（テキスト）/ `tags`（複数選択）/ `platforms`（繰り返し: label/url/iconKey）
- **event**: `project`（テキスト）/ `lineup`（繰り返し: work参照 + price/isNew/isLimited/boothUrl/sampleUrl/note/order）
- **link**: SNS・外部リンク

イベント詳細取得時は `?depth=2` で work を展開します。

## Docker

詳細は [README_DOCKER.md](./README_DOCKER.md) を参照。
