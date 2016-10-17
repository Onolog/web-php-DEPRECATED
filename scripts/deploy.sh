#!/bin/bash

# Pull down new changes from remote master.
echo 'Getting latest master from Github...'
git pull origin master

# Remove node modules and re-install.
echo 'Reinstalling Node modules...'
rm -rf ./node_modules
npm install

# Always deploy to prod.
export NODE_ENV="production"

# Build new static files.
./scripts/build.sh
