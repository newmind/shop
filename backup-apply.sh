#!/usr/bin/env bash

ll /shop/src/product-proxy/backup

docker exec postgre_sql pg_restore -d products /shop/src/product-proxy/backup/dump.gz

docker exec postgre_sql pg_restore -d identity /shop/src/identity-srv/backup/dump.gz

docker exec postgre_sql pg_restore -d operations /shop/src/operation-proxy/backup/dump.gz
