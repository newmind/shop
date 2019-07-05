#!/usr/bin/env bash

docker cp -a product_proxy:/app/src/product-proxy/files/ /shop/src/product-proxy/

docker-compose up --build -d