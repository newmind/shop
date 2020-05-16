#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI"'
echo '-------------------'

cd ./ui.packages || return
cd ./cart && npx yarn build
cd ../confirm-order && npx yarn build
cd ../dialog && npx yarn build
cd ../hocs && npx yarn build
cd ../notifications && npx yarn build
cd ../table && npx yarn build
cd ../tabs && npx yarn build
cd ../kit && npx yarn build
cd ../yandex-map && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Shop"'
echo '------------------------------------'

cd ../../shop.modules.packages || return
cd ./details-order && npx yarn build
cd ../not-found && npx yarn build
cd ../showcase && npx yarn build
cd ../produce && npx yarn build
cd ../product && npx yarn build
cd ../order && npx yarn build
cd ../about && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Shop.Admin"'
echo '-----------------------------------------'

cd ../../admin.modules.packages || return
cd ./comments && npx yarn build
cd ../attributes && npx yarn build
cd ../not-found && npx yarn build
cd ../orders && npx yarn build
cd ../product-modify && npx yarn build
cd ../products && npx yarn build
cd ../profile && npx yarn build
cd ../sign-in && npx yarn build

exit 0