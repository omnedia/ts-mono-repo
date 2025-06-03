FROM node:20-slim AS build

# Force npm to build binaries for linux/x64
ENV \
  npm_config_platform=linux \
  npm_config_arch=x64 \
  npm_config_build_from_source=true \
  npm_config_unsafe_perm=true

# Install libvips + build tools
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential python3 libvips-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/ ./backend/
COPY shared/ ./shared/

WORKDIR /app/backend

# Install & rebuild sharp
RUN npm install --include=optional \
 && npm rebuild sharp --platform=linux --arch=x64 --build-from-source \
 && npm rebuild bcrypt --platform=linux --arch=x64 --build-from-source

RUN npm run build

FROM node:20-slim AS prod

WORKDIR /app

COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/package*.json ./

RUN npm prune --omit=dev

EXPOSE 3800
CMD ["node", "dist/backend/src/main.js"]
