# System D.B.R. Starter (Latest)

Next.js + Tailwind。microCMS（work/event/link）連携、A案(tags: 複数選択)、Platforms、Event lineup(B案) 対応。Docker同梱。

## セットアップ
```bash
pnpm i
cp .env.local.example .env.local
pnpm dev
```

## 環境変数
- MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY
- DISCORD_WEBHOOK_URL（任意）
- REVALIDATE_SECRET

## microCMSのポイント
- work: tags=複数選択、platforms=繰り返し（label/url/iconKey）
- event: lineup=繰り返し（work参照+price/isNew/isLimited/boothUrl/sampleUrl/note/order）
- event詳細取得は `?depth=2`
