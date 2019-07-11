#!/usr/bin/env bash

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup

[ -f /shop/src/product-proxy/backup/products.sql ] && docker exec postgre_sql pg_dump --column-inserts --data-only  products > /shop/src/product-proxy/backup/products.sql

docker-compose up --build -d

[ -f /shop/src/product-proxy/backup/products.sql ] && docker exec postgre_sql pg_dump products < /shop/src/product-proxy/backup/products.sql