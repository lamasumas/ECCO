FROM node:8-alpine
WORKDIR /app
COPY ./package.json ./app
RUN npm install
COPY . /app
EXPOSE 8081
EXPOSE 27017
CMD ["npm", "start"]

