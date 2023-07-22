FROM node:18-alpine

WORKDIR /tdo-be

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9999

CMD ["npm", "run", "start"]