#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI"'
echo '-------------------'

cd ./ui.packages || return
cd ./cart && yarn build
cd ../confirm-order && yarn build
cd ../dialog && yarn build
cd ../hocs && yarn build
cd ../notifications && yarn build
cd ../tabs && yarn build
cd ../ui && yarn build
cd ../yandex-map && yarn build

echo ''
echo 'Сборка модулей для приложения "Shop"'
echo '------------------------------------'

cd ../../shop.modules.packages || return
cd ./about && yarn build
cd ../corner && yarn build
cd ../main && yarn build
cd ../not-found && yarn build
cd ../order && yarn build
cd ../produce && yarn build
cd ../product && yarn build
cd ../showcase && yarn build

echo ''
echo 'Сборка модулей для приложения "Shop.Admin"'
echo '-----------------------------------------'

cd ../../admin.modules.packages || return
cd ./categories && yarn build
cd ../currencies && yarn build
cd ../not-found && yarn build
cd ../not-found && yarn build
cd ../orders && yarn build
cd ../product-modify && yarn build
cd ../products && yarn build
cd ../profile && yarn build
cd ../stock && yarn build
cd ../units && yarn build

exit 0