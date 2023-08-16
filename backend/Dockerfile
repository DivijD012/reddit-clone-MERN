FROM node:19.6-slim

WORKDIR /app
EXPOSE 8000

COPY package.json .
RUN npm install
COPY . .
CMD node app.js