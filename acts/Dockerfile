FROM node:alpine
WORKDIR /usr/share/app
COPY package.json /usr/share/app
RUN npm install
COPY . /usr/share/app
CMD ["npm", "run", "start"]