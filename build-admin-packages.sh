#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Admin"'
echo '-------------------'

cd ./ui.packages || return

echo '[--- Application ---]'
cd  ./application && npx yarn build
echo '[--- Dialog ---]'
cd ../dialog && npx yarn build
echo '[--- Notifications ---]'
cd ../notifications && npx yarn build
echo '[--- Table ---]'
cd ../table && npx yarn build
echo '[--- Tabs ---]'
cd ../tabs && npx yarn build
echo '[--- Kit ---]'
cd ../kit && npx yarn build
echo '[--- HOC ---]'
cd ../hoc && npx yarn build
echo '[--- Editor ---]'
cd ../editor && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Admin"'
echo '-----------------------------------------'

cd ../../modules || return

echo '[--- Comments ---]'
cd  ./admin-comments && npx yarn build
echo '[--- Types ---]'
cd ../admin-types && npx yarn build
echo '[--- Categories ---]'
cd ../admin-categories && npx yarn build
echo '[--- Units ---]'
cd ../admin-units && npx yarn build
echo '[--- Currencies ---]'
cd ../admin-currencies && npx yarn build
echo '[--- Attributes ---]'
cd ../admin-attributes && npx yarn build
echo '[--- Not Found ---]'
cd ../admin-not-found && npx yarn build
echo '[--- Orders ---]'
cd ../admin-orders && npx yarn build
echo '[--- Product Modify ---]'
cd ../admin-product-modify && npx yarn build
echo '[--- Products ---]'
cd ../admin-products && npx yarn build
echo '[--- Profile ---]'
cd ../admin-settings && npx yarn build
echo '[--- Sign In ---]'
cd ../admin-sign-in && npx yarn build
echo '[--- Customers ---]'
cd ../admin-customers && npx yarn build
echo '[--- Promotions ---]'
cd ../admin-promotions && npx yarn build
echo '[--- Brands ---]'
cd ../admin-brands && npx yarn build
echo '[--- Gallery ---]'
cd ../admin-gallery && npx yarn build

exit 0
