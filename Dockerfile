FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./ 

RUN npm install && npm run build && npm prune --production

COPY ./ ./ 

ENV NODE_ENV=production
CMD ["npm", "run", "dev"]
