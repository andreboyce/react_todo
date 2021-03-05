#!/bin/bash

install_node()
{
   echo "install node";
   node_file="nodejs.tar.gz";
   cd ~
   mkdir bin
   cd bin
   rm -f node  
   rm -f npm
   rm -rf nodejs
   wget -r -nd -l1 --no-parent -e robots=off -A "*linux-x64.tar.gz" https://nodejs.org/dist/latest/
   mv node*linux-x64.tar.gz $node_file
   tar -xvf $node_file;
   rm -f ./$node_file;
   mv node*linux-x64 nodejs
   cp ./nodejs/bin/node ~/bin;
   ln -s ./nodejs/lib/node_modules/npm/bin/npm-cli.js npm;
   add_to_path $(pwd);
   node --version;
   npm --version;
}

if [ -x "$(command -v node)" ]; then
  echo "Node found";
else
  install_node;
fi

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
