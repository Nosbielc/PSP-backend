import * as express from "express";
import {URLs} from "../../util/Values";
import PSPService from "../service/PSPService";

class PSPRest {

    constructor(){}

    public setRoutes(exp: express.Application){
        exp.post(URLs.PSP, PSPService.record);
    }

}

export default new PSPRest()
