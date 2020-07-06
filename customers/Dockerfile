FROM node
RUN apt-get update -q && apt-get dist-upgrade -y && apt-get clean && apt-get autoclean

RUN mkdir -p /usr/share/app
WORKDIR /usr/share/app

COPY package.json /usr/share/app
RUN npm install

COPY . /usr/share/app

CMD ["npm", "run" "start:prod"]