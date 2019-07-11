#!/usr/bin/env bash

mkdir -p /shop/src/products/backup

docker exec postgre_sql pg_dump --column-inserts --data-only  products > /shop/src/products/backup/products.sql

docker-compose up --build -d