# Souken521 / System D.B.R. Website

Souken521 と音楽サークル System D.B.R. の公式Webサイト。
Next.js 16 + Tailwind CSS 4 + microCMS 構成。Cloudflare Workers でデプロイ。

## 機能

- 作品（work）・イベント（event）・リンク（link）の管理（microCMS）
- プロジェクト別フィルター（System D.B.R. / Souken521）
- ISR による自動キャッシュ更新（5分間隔）
- Google Analytics 4 対応
- Discord 申請フォーム

## セットアップ

```bash
pnpm install
cp .env.example .env.local
# .env.local を編集して環境変数を設定
pnpm dev
```

## 環境変数

| 変数 | 必須 | 説明 |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | ✓ | microCMS のサービスドメイン |
| `MICROCMS_API_KEY` | ✓ | microCMS の API キー |
| `NEXT_PUBLIC_DISCORD_INVITE_URL` | ✓ | Discord 招待リンク |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | — | GA4 測定ID |

microCMS の認証情報が未設定の場合はモックデータで動作します。

## microCMS スキーマ

- **work**: `project`（テキスト）/ `tags`（複数選択）/ `platforms`（繰り返し: label/url/iconKey）
- **event**: `project`（テキスト）/ `lineup`（繰り返し: work参照 + price/isNew/isLimited/boothUrl/sampleUrl/note/order）
- **link**: SNS・外部リンク

イベント詳細取得時は `?depth=2` で work を展開します。

## デプロイ

Cloudflare Workers + OpenNext を使用。

```bash
pnpm cf:build    # ビルド
pnpm cf:deploy   # デプロイ
```

Docker はローカル開発補助用のみ。詳細は [README_DOCKER.md](./README_DOCKER.md) を参照。
