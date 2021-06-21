#!/usr/bin/env bash

echo ''
echo 'Сборка пакетов "UI" для "Client"'
echo '-------------------'

cd ./ui.packages || return

echo '[--- Application ---]'
cd  ./application && npx yarn build
echo '[--- Cart ---]'
cd ../cart && npx yarn build
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
echo '[--- Yandex Map ---]'
cd ../yandex-map && npx yarn build
echo '[--- HOC ---]'
cd ../hoc && npx yarn build
echo '[--- Editor ---]'
cd ../editor && npx yarn build

echo ''
echo 'Сборка модулей для приложения "Client"'
echo '------------------------------------'

cd ../../modules || return

echo '[--- Main ---]'
cd  ./client-main && npx yarn build
echo '[--- Order Details ---]'
cd ../client-order-details && npx yarn build
echo '[--- Not Found ---]'
cd ../client-not-found && npx yarn build
echo '[--- Showcase ---]'
cd ../client-showcase && npx yarn build
echo '[--- Contacts ---]'
cd ../client-contacts && npx yarn build
echo '[--- Product ---]'
cd ../client-product && npx yarn build
echo '[--- Order ---]'
cd ../client-order && npx yarn build
echo '[--- About ---]'
cd ../client-about && npx yarn build
echo '[--- Delivery ---]'
cd ../client-delivery && npx yarn build
echo '[--- Payment ---]'
cd ../client-payment && npx yarn build
echo '[--- Refund ---]'
cd ../client-refund && npx yarn build
echo '[--- Sign Up ---]'
cd ../client-sign-up && npx yarn build

exit 0
