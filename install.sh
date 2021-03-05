#!/bin/bash

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

mv src/client/RENAME_TO.env src/client/.env

echo "Run ./start.sh to start";
echo "Run ./stop.sh to stop";
echo "visit ${HOST}:${PORT}";
