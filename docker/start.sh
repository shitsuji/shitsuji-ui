#!/bin/sh
cp /usr/src/docker/proxy.conf /etc/nginx/conf.d/proxy.conf
if [ -n "${API_HOST}" ]; then
  DOCKER_API_URL=$API_HOST
fi
if [ -n "${API_PORT}" ]; then
  DOCKER_API_URL="${DOCKER_API_URL}:${API_PORT}"
fi
sed -i "s~{{DOCKER_API_URL}}~${DOCKER_API_URL}~g;" /var/www/html/app/static/js/main.*.js
nginx -g 'daemon off;'