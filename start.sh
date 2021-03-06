#!/bin/bash

full_path=$(realpath $0);
dir_path=$(dirname $full_path);

# change working directory to the directory the script exists in which should be rtodo/src
cd $dir_path;
cd "src/server";
node app.js &

cd $dir_path;
cd "src/client";
(npm run start | cat &);

cd $dir_path;
exit 0;
