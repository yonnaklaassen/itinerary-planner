FROM node:21-alpine AS builder
WORKDIR /app

WORKDIR /app/shared
COPY shared/package*.json ./
RUN npm ci
COPY shared/tsconfig.json ./tsconfig.json
COPY shared/src ./src
RUN npm run build   # outputs /app/shared/dist

WORKDIR /app/back-end
COPY back-end/package*.json ./
RUN npm ci
COPY back-end/tsconfig*.json ./
COPY back-end/src ./src
COPY back-end/src/database/whitelist.json ./src/database/whitelist.json

RUN npm run build


FROM node:21-alpine AS runner
WORKDIR /app

COPY back-end/package*.json ./back-end/
WORKDIR /app/back-end
RUN npm ci --omit=dev

COPY --from=builder /app/back-end/dist ./dist
COPY --from=builder /app/back-end/src/database/whitelist.json ./dist/database/whitelist.json

EXPOSE 3080
CMD ["node", "dist/server.js"]
