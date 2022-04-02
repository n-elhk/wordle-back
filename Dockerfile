FROM node:16
WORKDIR /wordle
COPY ./package.json ./wordle
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "node", "dist/main" ]