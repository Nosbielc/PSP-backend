import * as express from "express";
import {URLs} from "../../util/Values";
import ClientService from "../service/ClientService";

class ClientRest {

    constructor(){}

    public setRoutes(exp: express.Application){
        exp.post(URLs.CLIENT, ClientService.create);
    }

}

export default new ClientRest()
