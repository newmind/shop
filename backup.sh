#!/usr/bin/env bash

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump -U admin -W 1Ctdfcnjgjkm -f /shop/src/product-proxy/backup/products.sql products

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_dump -U admin -W 1Ctdfcnjgjkm -f /shop/src/identity-srv/backup/identity.sql identity

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_dump -U admin -W 1Ctdfcnjgjkm -f /shop/src/operation-proxy/backup/operations.sql operations