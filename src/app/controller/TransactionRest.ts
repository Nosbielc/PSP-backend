import * as express from "express";
import {URLs} from "../../util/Values";
import TransactionService from "../service/TransactionService";

class TransactionRest {

    constructor(){}

    public setRoutes(exp: express.Application){
        exp.get(URLs.TRANSACTION, TransactionService.transaction);
    }

}

export default new TransactionRest()
