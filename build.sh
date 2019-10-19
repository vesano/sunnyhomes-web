#!/usr/bin/env bash

docker-compose exec owner npm run build:prod

docker-compose exec admin npm run build:prod

git add owner/build admin/build

git commit -m '#master build'