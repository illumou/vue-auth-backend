FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

EXPOSE 3001

CMD [ "node" , "dist/index.js"]
