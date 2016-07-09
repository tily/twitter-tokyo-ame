FROM node:latest
RUN apt-get update && apt-get install -y libcairo2-dev libjpeg62-turbo-dev libpango1.0-dev libgif-dev build-essential g++
RUN mkdir /usr/local/app/
WORKDIR /usr/local/app/
ADD index.js /usr/local/app/
ADD package.json /usr/local/app/
RUN npm install
CMD node index.js
