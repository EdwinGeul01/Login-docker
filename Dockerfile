FROM node:19-alpine3.16
WORKDIR /home/app/
COPY . .


RUN yarn set version latest
RUN yarn install 
RUN yarn global add nodemon 