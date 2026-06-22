# Docker での起動方法

## 開発環境（ホットリロードあり）

`.env.local` を用意してから起動します。

```bash
cp .env.example .env.local
# .env.local を編集
docker compose -f docker-compose.dev.yml up --build
```

ポート `4004` でアクセスできます: http://localhost:4004

## 本番環境

`.env.production` を用意してから起動します。

```bash
cp .env.example .env.production
# .env.production を編集
docker compose up --build -d
```

ポート `4004` でアクセスできます。

## ポート構成

| ホスト | コンテナ |
|---|---|
| 4004 | 3000 |