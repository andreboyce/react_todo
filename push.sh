#!/bin/bash

#rm -rf .git
#git init
#git add -A
#git commit -m "first commit"
#git branch -M main
#git remote set-url origin 'git@github.com:andreboyce/react_todo.git'

MESSAGE=$1

if [ -z "$MESSAGE" ]
then
   MESSAGE="update";
else
   :
fi

git add -A
git commit -m "$MESSAGE"
git push -u origin main
