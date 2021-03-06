# RTodo

A todo list application written in NodeJS using React

## Requirements

Linux server capable of running Mysql and NodeJS concurrently

Linux (or Windows System running docker)

Expose (client) ports 3000 (default)

Optional Expose (server) ports 8082 (default)

Client app ( React Creat App ) is on localhost:3000

Server app ( NodeJS Express API ) is on localhost:8082

Active Mysql Database

## Install

git clone https://github.com/andreboyce/react_todo.git

cd react_todo

./install.sh

start.sh

stop.sh \# when finished

### Commands

./start # start react client and node api server

./stop # stop client and server api

./restart # stop then restart server. will kill all nppm and node processes from the current user

./test.sh # run automated tests

./push.sh # push to github

### Tests

./test.sh

### Assignment Requirements

Create a NodeJs Application with the following:

Sequalize

Mysql

Express

Rest API

Todo API

CRUD - Create Read Update Delete

Postman

Bonus Points JWTN

#### Coding standards

eslint src/server src/client

### Resources

create-react-app docs env variables

https://create-react-app.dev/docs/advanced-configuration/
