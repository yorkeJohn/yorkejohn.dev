FROM oven/bun AS build

WORKDIR /build

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM nginx:alpine

COPY --from=build /build/out /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]