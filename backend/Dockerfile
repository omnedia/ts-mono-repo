FROM node:20-alpine AS build

# Set npm environment for Linux/x64 if needed
ENV \
  npm_config_platform=linux \
  npm_config_arch=x64 \
  npm_config_build_from_source=true \
  npm_config_unsafe_perm=true

# Install build tools and native dependencies
RUN apk add --no-cache build-base python3 vips-dev

WORKDIR /app

COPY backend/ ./backend/
COPY shared/ ./shared/

WORKDIR /app/backend

RUN npm ci --include=optional \
 && npm rebuild sharp --platform=linux --arch=x64 --build-from-source \
 && npm rebuild bcrypt --platform=linux --arch=x64 --build-from-source \
 && npm run build

FROM node:20-alpine AS prod

WORKDIR /app

COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/src/pdf-export/templates ./dist/backend/src/pdf-export/templates
COPY --from=build /app/backend/src/public ./dist/backend/src/public
COPY --from=build /app/backend/package*.json ./
COPY --from=build /app/backend/node_modules ./node_modules

RUN npm prune --omit=dev

EXPOSE 3800
CMD ["node", "dist/backend/src/main.js"]
