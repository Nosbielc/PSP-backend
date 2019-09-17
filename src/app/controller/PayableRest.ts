import * as express from "express";
import {URLs} from "../../util/Values";
import PayableService from "../service/PayableService";

class PayableRest {

    constructor(){}

    public setRoutes(exp: express.Application){
        exp.get(URLs.PAYABLE, PayableService.payable);
    }

}

export default new PayableRest()
