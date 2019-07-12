#!/usr/bin/env bash

ll /shop/src/product-proxy/backup

docker exec -i postgre_sql psql -U postgres -d products < /shop/src/product-proxy/backup/dump.gz

docker exec -i postgre_sql psql -U postgres -d identity < /shop/src/identity-srv/backup/dump.gz

docker exec -i postgre_sql psql -U postgres -d operations < /shop/src/operation-proxy/backup/dump.gz
