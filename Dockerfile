FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production --silent 
COPY . .
RUN npm run build
EXPOSE 3000
USER node
CMD ["npm", "start"]
