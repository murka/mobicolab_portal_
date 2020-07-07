FROM node
RUN apt-get update -q && apt-get dist-upgrade -y && apt-get clean && apt-get autoclean

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install

COPY . /usr/app

CMD ["npm", "run" "start"]