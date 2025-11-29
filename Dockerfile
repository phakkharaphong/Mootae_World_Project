FROM node:lts-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .
RUN npm run build
FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["npm", "start"]
