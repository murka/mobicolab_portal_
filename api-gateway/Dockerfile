FROM node:alpine
WORKDIR /usr/app
COPY package.json /usr/app
RUN yarn install
COPY . /usr/share/app
CMD ["yarn", "start"]