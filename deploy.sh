#!/bin/bash

if [ -f Gemfile ]; then
  bundle install --path .gems
fi

npm install
gulp build -r
