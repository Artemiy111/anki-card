FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN rm -rf node_modules
RUN rm package-lock.json
RUN npm i
RUN npm run build
RUN npm prune --production

FROM node:22-alpine
ENV PORT=80
WORKDIR /app
COPY --from=builder /app/.svelte-kit/output build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 80
ENV NODE_ENV=production
CMD [ "node", "build/server" ]