FROM node:16 as build

WORKDIR /app
COPY build/ ./build
FROM nginx:1.19
EXPOSE 80
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build/ /usr/share/nginx/html
