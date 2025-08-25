FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY src/database/whitelist.json dist/database/whitelist.json
RUN npm run build
EXPOSE 3080
CMD ["node", "dist/server.js"]
