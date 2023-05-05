FROM node:18

WORKDIR /app
RUN pwd
COPY . .

RUN cd client && npm install
RUN cd client && npm run build

RUN npm install
RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start" ]