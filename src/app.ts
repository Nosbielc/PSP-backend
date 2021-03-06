import { Sequelize } from 'sequelize-typescript';
import * as express from "express";
import * as http from "http";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as expressValidator from 'express-validator';
import * as path from "path";
import SocketUtil from "./util/SocketUtil";
import * as cors from "cors";
import { FactoryDB } from "./util/FactoryDB";

// Módulos
import PSPRest from "./app/controller/PSPRest";
import TransactionRest from "./app/controller/TransactionRest";
import PayableRest from "./app/controller/PayableRest";
import ClientRest from "./app/controller/ClientRest";

class App {
    public exp: express.Application;
    public server: http.Server;
    private morgan: morgan.Morgan;
    private bodyParser; 
    private cors;
    private factoryDB: FactoryDB;
    
    constructor(){
        this.exp = express();//Criando servidor do Express
        this.server = SocketUtil.getServerSocketIo(this.exp);
        this.factoryDB = new FactoryDB();
        this.middlewares();
        this.initRoutes();
    }
    
    public createConnection(onConnected: Function, onError: Function){
       this.factoryDB.createConnection(onConnected, onError);
    }

    public updateTable(onUpate: Function, onError: Function){
        this.factoryDB.updateTable(onUpate, onError);
    }
    
    public closeConnection(onClose){
        this.factoryDB.closeConnection(onClose);
    }

    private middlewares(){
        this.exp.use(morgan("dev"));
        //this.exp.use(morgan(':method :url :response-time'));
        this.exp.use(bodyParser.json());
        this.exp.use(bodyParser.urlencoded({extended: true}));
        this.exp.use(expressValidator());
        this.exp.use(express.static(path.join(__dirname, "public")));
        this.exp.use(cors());
    }

    private initRoutes(){
        PSPRest.setRoutes(this.exp);
        TransactionRest.setRoutes(this.exp);
        PayableRest.setRoutes(this.exp);
        ClientRest.setRoutes(this.exp);
    }

    getSequelize() {
        return this.factoryDB.getSequelize();
    }
} 

export default new App();
