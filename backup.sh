#!/usr/bin/env bash

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump products > /shop/src/product-proxy/backup/products.sql

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_dump identity > /shop/src/identity-srv/backup/identity.sql

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_dump operations > /shop/src/operation-proxy/backup/operations.sql