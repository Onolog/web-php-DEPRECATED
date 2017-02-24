#!/bin/bash

# Remove existing assets.
echo 'Cleaning up old assets...'
shopt -s extglob
rm ./webroot/build/*.!(gitignore)

# Rebuild files according to environment.
echo 'Building new assets...'

if [[ "$NODE_ENV" == "production" ]]; then
  config="webpack.prod.config.js"
  watch=""
else
  config="webpack.config.js"
  watch="-w"
fi

./node_modules/.bin/webpack --progress --colors ${watch} --config ${config}
