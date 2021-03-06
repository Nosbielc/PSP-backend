import { Sequelize } from "sequelize-typescript";
import {Transaction} from "../app/model/TransactionModel";
import {Payable} from "../app/model/PayableModel";
import {Client} from "../app/model/ClientModel";

export class FactoryDB{
    
    //Dados conexão Local.
    private host = "172.17.0.3";
    private port = 3306;
    private database = "psp";
    private user  = "psp";
    private password = "psp";
    private dialect = "mysql";
    private typeSync = "alter"; //Acredito que não funciona legal

    private sequelize: Sequelize;

    constructor(){
    }

    createConnection(onConnected: any, onError: any){
        let nodeEnv:string = process.env.NODE_ENV;
        console.log("Node_ENV: " + nodeEnv);
        if(!nodeEnv){
            console.log("---------------Ambiente Local");
        } else if(nodeEnv.indexOf("test") > -1){
            console.log("---------------Ambiente de Teste");
        } else if(nodeEnv.indexOf("development") > -1){
            console.log("---------------Ambiente desenvolvimento!");
        } else if(nodeEnv.indexOf("production") > -1){
            console.log("---------------Ambiente de produção!");
            this.host = "mysql785.umbler.com";
            this.port = 3310;
            this.password = "W[5Jf7?yujD5,"
        }

        let hostDBEnv:string = process.env.PSP_HOST_DB_ENV;
        let portEnv:string = process.env.PSP_PORT_ENV;
        let databaseEnv:string = process.env.PSP_DATABASE_ENV;
        let dialectEnv:string = process.env.PSP_DIALECT_ENV;
        let userNameEnv:string = process.env.PSP_USER_NAME_ENV;
        let passwordEnv:string = process.env.PSP_PASSWORD_ENV;

        console.log("---------------hostDBEnv -> " + hostDBEnv );
        console.log("---------------portEnv -> " + portEnv );
        console.log("---------------databaseEnv -> " + databaseEnv );
        console.log("---------------dialectEnv -> " + dialectEnv );
        console.log("---------------userNameEnv -> " + userNameEnv );
        console.log("---------------passwordEnv -> " + passwordEnv );

        if (hostDBEnv && portEnv && databaseEnv && dialectEnv
            && userNameEnv && passwordEnv) {
            this.host = hostDBEnv;
            this.port = Number(portEnv);
            this.database = databaseEnv;
            this.dialect = dialectEnv;
            this.user = userNameEnv;
            this.password = passwordEnv;
        }

        this.sequelize =  new Sequelize({
            host: this.host,
            port: this.port,
            database: this.database,
            dialect: this.dialect,
            username: this.user,
            password: this.password,
            pool: {
                max: 25,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: true
        });
        //Adicionando os modelos que serão espelhados como tabelas no banco de dados.
        this.sequelize.addModels([
            Transaction,
            Payable,
            Client
        ]);
        
        this.sequelize.authenticate().then(onConnected).catch(onError);

    }

    updateTable(onUpdate: any, onError: any){
        if(this.sequelize){
            this.sequelize.sync({force: false, alter: false , logging : true}).then(onUpdate).catch(onError);
        }
    }

    getSequelize() {
        return this.sequelize;
    }

    closeConnection(onClose: any){
        
    }
}
