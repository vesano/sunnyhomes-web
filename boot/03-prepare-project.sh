#!/bin/bash

# Create containers
docker-compose build

# Boot containers
docker-compose up -d

# Install dependencies
cd ./owner && ./npm i --silent

cd ./api && ./npm i --silent

cd ./admin && ./npm i --silent

# Prepare production app
cd ./owner && ./npm run build:prod

cd ./admin && ./npm run build:prod
