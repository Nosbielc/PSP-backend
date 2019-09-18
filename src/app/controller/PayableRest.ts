import * as express from "express";
import {URLs} from "../../util/Values";
import PayableService from "../service/PayableService";

class PayableRest {

    constructor(){}

    public setRoutes(exp: express.Application){
        exp.get(URLs.PAYABLE, PayableService.payable);

        exp.get(URLs.PAYABLE_CLIENT_ID, PayableService.payableByClient);
    }

}

export default new PayableRest()
