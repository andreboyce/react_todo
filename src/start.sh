#!/bin/bash

# change working directory to the directory the script exists in which should be rtodo/src
cd "$(dirname "$0")";

cd server;
node app.js &
RTODO_SERVER_PID=$!;
echo "RTODO_SERVER_PID: $RTODO_SERVER_PID";

cd "$(dirname "$0")";

(cd src/client && exec npm start) &
RTODO_CLIENT_PID=$!;
echo "RTODO_CLIENT_PID: $RTODO_CLIENT_PID";
cd "$(dirname "$0")";
