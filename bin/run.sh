#!/bin/bash

cd `dirname $0`
cd ../../

if [ -d "node_modules/@aibulat/funtest" ]
then
    echo `pwd`
    cp -fr node_modules/@aibulat/funtest .
    NODE_OPTIONS='--experimental-vm-modules --no-warnings' npx jest --verbose
else
    echo "dev mode"
    NODE_OPTIONS='--experimental-vm-modules --no-warnings' npx jest --verbose
fi
