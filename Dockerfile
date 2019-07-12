FROM node:8-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install && npm run build && npm prune --production

ENV NODE_ENV=production
CMD ["npm", "start"]