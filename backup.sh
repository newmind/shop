#!/usr/bin/env bash

echo "-----------------------"
echo "|   BACKUP PRODUCTS   |"
echo "-----------------------"

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump --username "postgres" --no-password --verbose --role "admin" --format=c --blobs --data-only --no-owner --no-privileges --no-tablespaces --no-unlogged-table-data --encoding "UTF8" "products" > "/shop/src/product-proxy/backup/dump.bak"


echo "-----------------------"
echo "|   BACKUP IDENTITY   |"
echo "-----------------------"

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_dump --username "postgres" --no-password --verbose --role "admin" --format=c --blobs --data-only --no-owner --no-privileges --no-tablespaces --no-unlogged-table-data --encoding "UTF8" "identity" > "/shop/src/identity-srv/backup/dump.bak"

echo "-------------------------"
echo "|   BACKUP OPERATIONS   |"
echo "-------------------------"

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_dump --username "postgres" --no-password --verbose --role "admin" --format=c --blobs --data-only --no-owner --no-privileges --no-tablespaces --no-unlogged-table-data --encoding "UTF8" "operations" > "/shop/src/operation-proxy/backup/dump.bak"
