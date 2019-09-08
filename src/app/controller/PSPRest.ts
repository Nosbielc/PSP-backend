import * as express from "express";
import {URLs} from "../../util/Values";
import PSPService from "../service/PSPService";

class PSPRest {

    constructor(){}

    public setRoutes(exp: express.Application){
        exp.get(URLs.LIST_TRANSACOES, PSPService.list);
    }

}

export default new PSPRest()