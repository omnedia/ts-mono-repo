# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app

# Copy required files
COPY frontend/ ./frontend/
COPY shared/ ./shared/

# Move into frontend folder to run Angular CLI
WORKDIR /app/frontend

RUN npm install
RUN cp src/environments/environment.prod.ts src/environments/environment.ts
RUN npm run build:prod

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
