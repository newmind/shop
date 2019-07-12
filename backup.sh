#!/usr/bin/env bash

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_restore -d products /shop/src/product-proxy/backup/dump.gz

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_restore -d identity /shop/src/identity-srv/backup/dump.gz

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_restore -d operations /shop/src/operation-proxy/backup/dump.gz
