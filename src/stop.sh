#!/bin/bash

echo "kill $RTODO_SERVER_PID";
kill $RTODO_SERVER_PID;

echo "kill $RTODO_CLIENT_PID";
kill $RTODO_CLIENT_PID;
