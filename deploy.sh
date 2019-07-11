#!/usr/bin/env bash

[ -d /shop/src/products/backup ] || mkdir /shop/src/products/backup

docker exec postgre_sql pg_dump --column-inserts --data-only  products > /shop/src/products/backup/products.sql

docker-compose up --build -d