FROM nginx:1.22-alpine

WORKDIR /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/ .
