#!/usr/bin/env bash

docker-compose up --build -d

docker rmi $(docker images -f dangling=true -q) --force