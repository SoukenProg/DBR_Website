FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.11.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.11.0 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/BUILD_ID ./.next/BUILD_ID
EXPOSE 3000
USER nextjs
CMD ["node","server.js"]

# ---- deps: download packages to a container-local PNPM store (no node_modules yet)
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9.11.0 --activate \
  && pnpm config set store-dir /pnpm/store
WORKDIR /app
COPY pnpm-lock.yaml ./
# Pre-fetch packages into the store so later installs can run offline
RUN pnpm fetch

# ---- builder: install from the pre-fetched store and build Next.js
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9.11.0 --activate \
  && pnpm config set store-dir /pnpm/store
WORKDIR /app

# Copy manifest files first to leverage Docker layer cache
COPY package.json pnpm-lock.yaml ./
# Bring the pre-fetched store from the deps stage
COPY --from=deps /pnpm /pnpm
# Create node_modules by linking from the pre-fetched store (no network)
RUN pnpm install --frozen-lockfile --offline

# Now copy the rest of the source and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runner: use Next.js standalone output
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Public assets and standalone server
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/BUILD_ID ./.next/BUILD_ID

EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]