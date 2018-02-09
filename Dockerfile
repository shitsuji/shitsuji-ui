FROM nginx:1.13.8-alpine

RUN rm /etc/nginx/conf.d/*.conf

WORKDIR /usr/src
COPY ./docker ./docker
COPY ./build /var/www/html/app

ENTRYPOINT ["/bin/sh", "docker/start.sh"]