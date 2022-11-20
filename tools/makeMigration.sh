#!/bin/bash

# naive attempt that did not work
# npx knex migrate:make $1 --knexfile ./dist/db/knexfile.js --migrations-directory src/db/migrations

# build knexfile.js
npx esbuild src/db/knexfile.ts > src/db/knexfile.js

# go to the folder with db stuff
cd src/db

# create the migration, use TS as the language
npx knex migrate:make $1 -x ts
