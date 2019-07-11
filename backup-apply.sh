#!/usr/bin/env bash

[ -f /shop/src/product-proxy/backup/products.sql ] && docker exec postgre_sql pg_dump --column-inserts --data-only products < /shop/src/product-proxy/backup/products.sql

[ -f /shop/src/identity-srv/backup/identity.sql ] && docker exec postgre_sql pg_dump --column-inserts --data-only identity < /shop/src/identity-srv/backup/identity.sql

[ -f /shop/src/operation-proxy/backup/operations.sql ] && docker exec postgre_sql pg_dump --column-inserts --data-only operations < /shop/src/operation-proxy/backup/operations.sql