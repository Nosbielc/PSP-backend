#Download base image node 6.14.3
FROM node:6.14.3
#
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# Diretorio de trabalho da aplicação
WORKDIR /home/node/app
#
ADD package.json ./
ADD tsconfig.json ./
ADD nodemon.json ./
#
RUN npm install
RUN npm install -g nodemon
RUN npm install -g node-inspector
RUN npm install @types/lodash@4.14.116 --save-exact
#
ADD --chown=node:node dist ./dist
#
USER node
#
EXPOSE 3000:3000
#
CMD [ "node", "./dist/server.js" ]

#Realizando Build
#docker build -t nosbielc/psp-backend:190920191750 .





