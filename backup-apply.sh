#!/usr/bin/env bash

[ -f /shop/src/product-proxy/backup/products.sql ] && docker exec postgre_sql pg_restore -d products /shop/src/product-proxy/backup/products.sql

[ -f /shop/src/identity-srv/backup/identity.sql ] && docker exec postgre_sql pg_restore -d identity /shop/src/identity-srv/backup/identity.sql

[ -f /shop/src/operation-proxy/backup/operations.sql ] && docker exec postgre_sql pg_restore -d operations /shop/src/operation-proxy/backup/operations.sql