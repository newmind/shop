#!/usr/bin/env bash

echo "-----------------------"
echo "|   BACKUP PRODUCTS   |"
echo "-----------------------"

docker exec -i postgre_sql psql -Fc -U postgres -d products < /shop/src/product-proxy/backup/dump.bak

echo "-----------------------"
echo "|   BACKUP IDENTITY   |"
echo "-----------------------"

docker exec -i postgre_sql psql -Fc -U postgres -d identity < /shop/src/identity-srv/backup/dump.bak

echo "-------------------------"
echo "|   BACKUP OPERATIONS   |"
echo "-------------------------"

docker exec -i postgre_sql psql -Fc -U postgres -d operations < /shop/src/operation-proxy/backup/dump.bak
