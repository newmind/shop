#!/usr/bin/env bash

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump --user=admin --password=1Ctdfcnjgjkm -Fd products -f /shop/src/product-proxy/backup

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_dump --user=admin --password=1Ctdfcnjgjkm -Fd identity -f /shop/src/identity-srv/backup

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_dump --user=admin --password=1Ctdfcnjgjkm -Fd operations -f /shop/src/operation-proxy/backup