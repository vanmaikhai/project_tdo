#!/usr/bin/ bash
docker-compose stop || true;

docker-compose down || true;

docker-compose build;

docker-compose up -d;

docker system prune -a -f