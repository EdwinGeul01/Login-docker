FROM node:19-alpine3.16
RUN yarn install && yarn global add nodemon 

WORKDIR /home/app/

COPY . .