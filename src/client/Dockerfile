FROM node:latest
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
#CMD ["node", "app.js"]
#EXPOSE 8081
CMD ["npm", "start"]
EXPOSE 3000