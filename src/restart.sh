#!/bin/bash

full_path=$(realpath $0);
dir_path=$(dirname $full_path);

echo "$dir_path";
"$dir_path/stop.sh";
"$dir_path/start.sh";
