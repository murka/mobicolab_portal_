FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
COPY ./proto /proto
CMD ["npm", "run", "start"]