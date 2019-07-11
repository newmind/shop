#!/usr/bin/env bash

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump -Fd products -f /shop/src/product-proxy/backup/products.dump

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_dump -Fd identity -f /shop/src/identity-srv/backup/identity.dump

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_dump -Fd operations -f /shop/src/operation-proxy/backup/operations.dump