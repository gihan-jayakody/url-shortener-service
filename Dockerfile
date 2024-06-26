FROM node:18-alpine

COPY . /usr/src/server

# Create server directory
WORKDIR /usr/src/server

RUN npm install

EXPOSE 3001

ENV NODE_ENV production

CMD ["npm", "run", "start"]