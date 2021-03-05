#!/bin/bash

SCRIPTPATH=$(cd -- \"$(dirname $0)\" >/dev/null 2>&1 ; pwd -P);

# check if user is root
if [[ $EUID -ne 0 ]]; 
   then
      # user is not root
      :
   else
      # user is root
      echo "This script must not be run as root";
      exit 1;
fi

# add directory to path
add_to_path()
{
    if [[ "$PATH" =~ (^|:)"${1}"(:|$) ]]
    then
        return 0
    fi
    export PATH=${1}:$PATH
}

# install nodejs and npm
install_node()
{
   echo "installing node";
   node_file="nodejs.tar.gz";
   cd ~;
   mkdir bin;
   cd bin;
   rm -f node;
   rm -f npm;
   rm -rf nodejs;

   # check for wget
   if [ -x "$(command -v wget)" ]; then
     #echo "wget found";
     :
   else
     #
     echo "wget not found";
     exit 1;
   fi

   wget -r -nd -l1 --no-parent -e robots=off -A "*linux-x64.tar.gz" https://nodejs.org/dist/latest/;
   mv node*linux-x64.tar.gz $node_file;
   tar -xvf $node_file;
   rm -f ./$node_file;
   mv node*linux-x64 nodejs;
   cp ./nodejs/bin/node ~/bin;
   ln -s ./nodejs/lib/node_modules/npm/bin/npm-cli.js npm;
   add_to_path $(pwd);
   node --version;
   npm --version;
}

echo "Checking for NodeJS";
if [ -x "$(command -v node)" ]; then
  echo "node found";
else
  install_node;
fi

echo "Checking for npm";
if [ -x "$(command -v npm)" ]; then
  echo "npm found";
else
  install_node;
fi

echo "Checking for dig";
if [ -x "$(command -v dig)" ]; then
  echo "dig found";
  :
else
  echo "dig not found";
fi

# client env variables
PUBLIC_IP=$(dig +short myip.opendns.com @resolver1.opendns.com); # public ip address
CLIENT_PORT=3000;
CLIENT_HOST=$PUBLIC_IP; # localhost, domain name, or public or private ipaddress
REACT_APP_SERVER_PORT=8082;
REACT_APP_SERVER_HOST=$PUBLIC_IP;

# change working directory to the directory the script exists in which should be rtodo/src
echo "SCRIPTPATH: $SCRIPTPATH";
cd "$SCRIPTPATH";
echo $(pwd);

touch src/client/.env;
echo "" > src/client/.env;
echo "PORT=${PORT}" >> src/client/.env;
echo "HOST=${HOST}" >> src/client/.env;
echo "REACT_APP_SERVER_HOST=${REACT_APP_SERVER_HOST}" >> src/client/.env;
echo "REACT_APP_SERVER_PORT=${REACT_APP_SERVER_PORT}" >> src/client/.env;
echo "REACT_APP_DEFAULT_USERNAME=${REACT_APP_DEFAULT_USERNAME}" >> src/client/.env;
echo "REACT_APP_DEFAULT_PASSWORD=${REACT_APP_DEFAULT_PASSWORD}" >> src/client/.env;

# server env variables
MYSQL_PASSWORD=
MYSQL_DB=rtodo_db;
MYSQL_USER=$(whoami);
SERVER_DB_HOST=localhost;
if [ -z "$MYSQL_PASSWORD" ]
then
   echo "Type the Mysql password ${MYSQL_USER}, followed by [ENTER]:";
   read MYSQL_PASSWORD;
else
   :
fi

touch src/server/.env;
echo "" > src/server/.env;
echo "MYSQL_PASSWORD=${MYSQL_PASSWORD}" >> src/server/.env;
echo "MYSQL_DB=${MYSQL_DB}" >> src/server/.env;
echo "MYSQL_USER=${MYSQL_USER}" >> src/server/.env;
echo "SERVER_DB_HOST=${SERVER_DB_HOST}" >> src/server/.env;
echo "REACT_APP_DEFAULT_USERNAME=${REACT_APP_DEFAULT_USERNAME}" >> src/server/.env;
echo "REACT_APP_DEFAULT_PASSWORD=${REACT_APP_DEFAULT_PASSWORD}" >> src/server/.env;

# check for mysql
if [ -x "$(command -v mysql)" ]; then
  echo "mysql found";
  :
else
  echo "mysql not found";
  exit 1;
fi

mysql -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DB < src/mysql/"${MYSQL_DB}.sql";

echo "Run ./start.sh to start";
echo "visit ${HOST}:${PORT}";
echo "Run ./stop.sh to stop";
