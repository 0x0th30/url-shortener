FROM node:16-alpine

WORKDIR /usr/app

COPY . .

EXPOSE 3000

RUN yarn install --production=true

CMD [ "yarn", "start:prod" ]