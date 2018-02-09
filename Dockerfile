FROM nginx:1.13.8-alpine

RUN rm /etc/nginx/conf.d/*.conf

WORKDIR /usr/src
COPY ./docker ./docker

ENTRYPOINT ["/bin/sh", "docker/start.sh"]

COPY ./build /var/www/hmtl/app

RUN ["ls", "-la", "/var/www/hmtl"]
