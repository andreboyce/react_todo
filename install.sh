#!/bin/bash

if [[ $EUID -ne 0 ]]; 
   then
      # user is not root
      :
   else
      # user is root
      echo "This script must not be run as root";
      exit 1;
fi

PORT=3000;
HOST=rtodo.anlicor.win;
REACT_APP_SERVER_HOST=rtodo.anlicor.win;
REACT_APP_SERVER_PORT=8082;
MYSQL_USER=$(whoami);
MYSQL_PASSWORD=
MYSQL_DB=rtodo_db;

if [ -z "$MYSQL_PASSWORD" ]
then
   echo "Type the password ${MYSQL_USER}, followed by [ENTER]:";
   read MYSQL_PASSWORD;
else
   :
fi

mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB <  src/mysql/"${MYSQL_DB}.sql";

mv src/server/RENAME_TO.env src/server/.env

mv src/server/RENAME_TO.env src/client/.env

echo "Run ./start.sh to start";
echo "Run ./stop.sh to stop";
echo "visit ${HOST}:${PORT}";
