# Stage 1: Build Angular app
FROM node:20-alpine AS build
WORKDIR /app/frontend

# Copy only package files first to leverage Docker cache for npm ci
COPY frontend/package*.json ./
RUN npm ci

# Copy the rest of the code
COPY frontend/ ./
COPY shared/ ../shared/

RUN cp src/environments/environment.prod.ts src/environments/environment.ts
RUN npm run build:prod

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
