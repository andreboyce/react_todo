#!/bin/bash

full_path=$(realpath $0);
dir_path=$(dirname $full_path);
cd $dir_path;

cd tests/api/postman;
npm list newman || npm install newman;
newman run collection.json -e env_live.json;

cd $dir_path;
