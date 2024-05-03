FROM node:lts-alpine3.19
WORKDIR /app
COPY . /app
RUN corepack enable pnpm
RUN pnpm install
RUN pnpm build:prod
CMD ["pnpm", "serve:prod"]