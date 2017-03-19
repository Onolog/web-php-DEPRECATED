#!/bin/bash

# Pull down new changes from remote master.
echo 'Getting latest master from Github...'
git pull origin master

# Apply any migrations and clear the model cache.
echo 'Applying migrations...'
./bin/cake migrations migrate
rm -f ./tmp/cache/models/*

# Remove node modules and re-install.
echo 'Reinstalling Node modules...'
rm -rf ./node_modules
npm install

# TODO: Why doesn't npm automatically run this after install?
npm run postinstall

# Always deploy to prod.
export NODE_ENV="production"

# Build new static files.
./scripts/build.sh
