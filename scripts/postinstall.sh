#!/bin/bash

# Node-Sass doesn't install properly during normal `npm install`
rm -rf ./node_modules/node-sass/
npm install node-sass
