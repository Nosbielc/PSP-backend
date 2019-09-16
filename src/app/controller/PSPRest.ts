import * as express from "express";
import {URLs} from "../../util/Values";
import PSPService from "../service/PSPService";
import TransactionService from "../service/TransactionService";
import PayableService from "../service/PayableService";

class PSPRest {

    constructor(){}

    public setRoutes(exp: express.Application){
        exp.post(URLs.PSP, PSPService.record);
        exp.get(URLs.TRANSACTION, TransactionService.transaction);
        exp.get(URLs.PAYABLE, PayableService.payable);
    }

}

export default new PSPRest()
