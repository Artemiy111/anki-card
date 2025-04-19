FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY . .
COPY svelte.config.node.js svelte.config.js
RUN rm -rf node_modules
RUN rm bun.lock 
RUN bun i

RUN bun run build


FROM oven/bun:alpine
WORKDIR /app

ENV PORT=80
EXPOSE 80

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
ENV NODE_ENV=production

CMD [ "bun", "./build" ] 