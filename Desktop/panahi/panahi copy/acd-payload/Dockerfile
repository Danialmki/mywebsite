# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Uncomment if you have a build step:
# RUN pnpm build

# ---- production stage ----
FROM node:20-alpine
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production
COPY --from=build /app /app
# Let the platform decide the port (via process.env.PORT):
EXPOSE 4000
CMD ["pnpm", "start"]
