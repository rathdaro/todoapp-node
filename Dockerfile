FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# For Production
#RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD [ "npm", "start"]