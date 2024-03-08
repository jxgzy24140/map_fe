FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "start"]