#!/bin/sh

# Pull down new changes from remote master.
git pull origin master

# Remove node modules and re-install.
rm -rf ./node_modules
npm install

# Always deploy to prod.
export NODE_ENV=production

# Build new static files.
./build.sh
