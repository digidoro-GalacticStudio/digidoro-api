FROM node:19

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]

##Run / Stop docker containers
#docker start container: docker run -p 3000:3000 -d --name digidoro-app digidoro-api
#docker stop container: docker stop digidoro-api