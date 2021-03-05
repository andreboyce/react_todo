# RTodo

A todo list application written in NodeJS using React

## Requirements

Linux server capable of running Mysql and NodeJS concurrently

Linux or Windows system running docker

Expose ports 3000 (default)

Client app is on localhost:3000

Server app is on localhost:8082

### Assignment Requirements

Create a NodeJs Application with the following:

Sequalize

Mysql

Express

Rest API

Todo API

CRUD - Create Read Update Delete

Postman

Jwtn


## Install

git clone https://github.com/andreboyce/react_todo.git

cd rtodo

./install.sh

src/start.sh

src/stop.sh # when finished

## Components

Database - Mysql

Client - NodeJS React Creat App

Server - NodeJS Express

## Commands

#### start server

src/start.sh

#### start client

src/stop.sh

#### Push changes to guthub

./push.sh

#### Coding standards

eslint src/server src/client

### Directory structure

+-- doc

+-- install.sh

+-- LICENSE

+-- push.sh

+-- README.md

+-- src

|   +-- client

|   |   +-- build

|   |   +-- Dockerfile

|   |   +-- package.json

|   |   +-- package-lock.json

|   |   +-- public

|   |   +-- RENAME_TO.env

|   |   +-- src

|   |   +-- wait-for-it.sh

|   +-- mysql

|   |   +-- Dockerfile

|   |   +-- dump.sh

|   |   +-- rtodo_db.sql

|   +-- server

|   |   +-- app.js

|   |   +-- package.json

|   |   +-- package-lock.json

|   |   +-- RENAME_TO.env

|   +-- start.sh

|   +-- stop.sh

+-- tests

|   +-- coverage

|   +-- unit

### Resources

create-react-app docs env variables

https://create-react-app.dev/docs/advanced-configuration/
