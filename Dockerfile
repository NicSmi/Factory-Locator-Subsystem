
FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json 
# AND package-lock.json are copied where available 
COPY package*.json ./


RUN npm install
# If you ar building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8080

#CMD [ "npm",  "start"]

ENTRYPOINT [ "npm", "start" ]
