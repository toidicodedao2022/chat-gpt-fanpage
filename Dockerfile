FROM node:16-alpine as build

WORKDIR /var/www/html
COPY . /var/www/html

RUN npm install

CMD ["npm","start"]

EXPOSE 8080
