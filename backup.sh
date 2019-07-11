#!/usr/bin/env bash

[-d /shop/src/product-proxy/backup] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump --column-inserts --data-only products > /shop/src/product-proxy/backup/products.sql

[-d /shop/src/operation-proxy/backup] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump --column-inserts --data-only products > /shop/src/operation-proxy/backup/products.sql