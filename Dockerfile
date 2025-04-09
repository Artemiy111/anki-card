FROM oven/bun:slim AS builder

WORKDIR /app

COPY package.json .
COPY bun.lock .

COPY . .

RUN rm -r bun.lock
RUN rm -rf node_modules

RUN bun install 

RUN bun run build

EXPOSE 80

CMD [ "HOST=$HOST", "PORT=80","bun", "--env-file=.env", "run", "preview" ]