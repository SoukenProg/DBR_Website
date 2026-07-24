FROM node:24-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.17.0 --activate

EXPOSE 3000

CMD ["sh", "-c", "pnpm install --frozen-lockfile && pnpm dev"]
