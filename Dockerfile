FROM node:10-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm run build && npm prune --production

ENV NODE_ENV=production
CMD ["npm", "start"]
