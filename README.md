# PSP-backend
Payment Service Provider (PSP) Desenvolvido em Node.JS

### Instruções para ambiente de Desenvolvimento
````
* docker run -it --name PSPBackEnd -p 3000:3000 -v ../../PSP-backend/:/var/www/PSP-backend node:6.14.3 bash
* /# npm install -g nodemon
  /# npm install -g node-inspector
* docker run -d --name mysqlPSPBackEnd -e MYSQL_ROOT_PASSWORD=psp -e MYSQL_DATABASE=psp -e MYSQL_USER=psp -e MYSQL_PASSWORD=psp -p 3310:3306 mysql:5.5

# Runing app in dev
  docker exec -it ID_CONTAINER_NODE bash
  cd /var/www/PSP-backend
  npm i
  npm install @types/lodash@4.14.116 --save-exact
  npm run start
````
### Instruções para ambiente de Produção
````
# Compile App
/var/www/PSP-backend/node_modules/.bin/tsc -p /var/www/PSP-backend/tsconfig.json

````
***_Ainda em desenvolvimento_**



  
