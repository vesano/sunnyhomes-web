#!/bin/bash

cd /var/www

git clone https://github.com/gram7gram/sunnyhomes-web --depth=1 --branch=master

cd /var/www/sunnyhomes-web

cp docker-compose.yml.dist docker-compose.yml

cp api/parameters.js.dist api/parameters.js
cp api/env/Dockerfile.dist api/env/Dockerfile

cp owner/src/parameters.js.dist owner/src/parameters.js
cp owner/env/Dockerfile.dist owner/env/Dockerfile

cp admin/src/parameters.js.dist admin/src/parameters.js
cp admin/env/Dockerfile.dist admin/env/Dockerfile