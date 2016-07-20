#!/bin/sh

# Remove existing built files.
rm ../webroot/js/build/*.js

# Rebuild files according to environment.
if [[ $NODE_ENV == production ]]; then
  ./node_modules/.bin/webpack --progress --colors --config webpack.prod.config.js
else
  ./node_modules/.bin/webpack -w --progress --colors --config webpack.config.js
fi
