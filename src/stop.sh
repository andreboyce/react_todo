#!/bin/bash

ps -ef | grep $USER | grep 'node' | grep -v grep | awk '{print $2}' | xargs -r kill -9
ps -ef | grep $USER | grep 'npm'  | grep -v grep | awk '{print $2}' | xargs -r kill -9
exit 0;
