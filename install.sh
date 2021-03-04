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

#mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB > src/mysql/"${MYSQL_DB}.sql";

mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB <  src/mysql/"${MYSQL_DB}.sql"
