FROM node:18-slim AS base
RUN apt-get update
RUN apt-get install -y openssl
RUN yarn global add turbo
WORKDIR /app
COPY turbo.json turbo.json
COPY .gitignore .gitignore

FROM base AS pruner
COPY . .
RUN turbo prune --scope=@homecontrol/home --docker

FROM base AS dependencies
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install

FROM base AS builder
COPY --from=dependencies /app/ .
COPY --from=pruner /app/out/full/ .
RUN cd /app/microservices/home && yarn prisma generate
RUN yarn turbo run build --scope=@homecontrol/home --include-dependencies --no-deps

FROM base AS runner
COPY --from=dependencies /app/ .
COPY --from=builder /app/ .

WORKDIR /app/microservices/home/dist
CMD ["node", "main"]
