#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI"'
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

echo ''
echo 'Сборка модулей для приложения "Admin"'
echo '-----------------------------------------'

cd ../../modules || return

echo '[--- Comments ---]'
cd  ./comments && npx yarn build
echo '[--- Types ---]'
cd ../types && npx yarn build
echo '[--- Categories ---]'
cd ../categories && npx yarn build
echo '[--- Colors ---]'
cd ../colors && npx yarn build
echo '[--- Materials ---]'
cd ../materials && npx yarn build
echo '[--- Forms ---]'
cd ../forms && npx yarn build
echo '[--- Units ---]'
cd ../units && npx yarn build
echo '[--- Currencies ---]'
cd ../currencies && npx yarn build
echo '[--- Not Found ---]'
cd ../not-found && npx yarn build
echo '[--- Orders ---]'
cd ../orders && npx yarn build
echo '[--- Product Modify ---]'
cd ../product-modify && npx yarn build
echo '[--- Products ---]'
cd ../products && npx yarn build
echo '[--- Profile ---]'
cd ../profile && npx yarn build
echo '[--- Sign In ---]'
cd ../sign-in && npx yarn build
echo '[--- Users ---]'
cd ../users && npx yarn build

exit 0