# base image
FROM node as builder

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli

# add app
COPY . .

RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html