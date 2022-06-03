# Stage 0 - Build Frontend Assets
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN yarn install
COPY src/ ./src
COPY public/ ./public
RUN yarn build
COPY server.js ./

EXPOSE 8080
CMD ["node", "server.js"]