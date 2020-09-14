# base image
FROM node:alpine as builder

# set working directory
WORKDIR '/app'

# install and cache app dependencies
COPY ./package.json ./
RUN npm install
RUN npm install --save typescript@3.8.3
RUN npm install -g @angular/cli@9.1.0

# add app
COPY . .

RUN ng build --prod

FROM nginx
EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html