#!/bin/bash

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

mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB > src/mysql/"${MYSQL_DB}.sql";
