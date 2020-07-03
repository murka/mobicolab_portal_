FROM node:alpine
RUN apt-get update -q && apt-get dist-upgrade -y && apt-get clean && apt-get autoclean

WORKDIR /usr/share/app

COPY package.json /usr/share/app
RUN npm install

COPY . /usr/share/app

CMD ["npm", "start:prod"]