FROM node:lts-buster

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --save --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["npm", "start"]