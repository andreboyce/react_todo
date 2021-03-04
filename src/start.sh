#!/bin/bash

node src/server/app.js &
RTODO_SERVER_PID=$($!)

(cd src/client && exec npm start) &
RTODO_CLIENT_PID=$($!)
