FROM oven/bun:1
ENV NODE_ENV=production

WORKDIR /srv/app
RUN mkdir db
RUN chown bun:bun db

COPY . .
RUN bun install

USER bun

# run the app
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
