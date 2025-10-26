# Use a small, stable Nginx
FROM nginx:stable-alpine3.21

# Copy site files into Nginx's document root
COPY html/ /usr/share/nginx/html/

# Install a simple Nginx config that serves index.html
RUN printf 'server { \
    listen 80; \
    listen [::]:80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri $uri/ =404; } \
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80