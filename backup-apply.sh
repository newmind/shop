#!/usr/bin/env bash

[ -f /shop/src/product-proxy/backup/products.sql ] && docker exec postgre_sql zcat /shop/src/product-proxy/backup/dump.gz | psql products

[ -f /shop/src/identity-srv/backup/identity.sql ] && docker exec postgre_sql zcat /shop/src/identity-srv/backup/dump.gz | psql identity

[ -f /shop/src/operation-proxy/backup/operations.sql ] && docker exec postgre_sql zcat /shop/src/operation-proxy/backup/dump.gz | psql operations