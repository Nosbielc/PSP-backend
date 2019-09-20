# PSP-backend
Payment Service Provider (PSP) Desenvolvido em Node.JS


### Executanco infra completa - Docker Compose
````
# Executar o comando no diretorio raiz do projeto
docker-compose up
````
## Testando endpoints

##### Cadastrando um Cliente
````
curl -X POST \
http://localhost:3001/api/v1/client \
  -H 'Content-Type: application/json' \
  -d '{
  "name" : "Client teste final de noite 2" 
}'
````

##### Registrando uma transação
````
curl -X POST \
  http://localhost:3001/api/v1/psp \
  -H 'Content-Type: application/json' \
  -d '{
	"vlrTransaction" : 870.99,
	"description" : "PRODUCT IMPORT BY CHINA",
	"typeTransaction" : 2,
	"numCard" : 5274305431780049,
	"bearerName" : "PLACE HOLDER THE CARD",
	"dtExpiration" : "12.01.2020",
	"cvv": 999,
	"clientId" : ID_CLIENTE_CADASTRADO
}'
````

##### Listando todas transações registradas na base
````
curl -X GET \
    http://localhost:3001/api/v1/transaction
````

##### Listando todas transações pagaveis na base
````
curl -X GET \
  http://localhost:3001/api/v1/payable \
  -H 'Accept: */*'
````

##### Listando todas transações pagaveis na base com filtro por cliente
````
curl -X GET \
  http://localhost:3001/api/v1/payable/1 \
  -H 'Accept: */*'
````

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
* A aplicação reeniciará automaticamente a cada alteração.
````
### Instruções para compilar projeto
````
# Compile App
/var/www/PSP-backend/node_modules/.bin/tsc -p /var/www/PSP-backend/tsconfig.json

````


  
