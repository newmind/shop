#!/usr/bin/env bash

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump -U postgres products > /shop/src/product-proxy/backup/dump.sql

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_dump -U postgres identity > /shop/src/identity-srv/backup/dump.sql

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_dump -U postgres operations > /shop/src/operation-proxy/backup/dump.sql