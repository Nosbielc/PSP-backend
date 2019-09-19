import * as express from "express";
import { Sequelize, Model} from 'sequelize-typescript';
import UtilService from '../util/UtilService';
import Validation from "../util/Validation";

export class Data{
    constructor(){
    }

    public obj: Object;
    public list: Array<any>;
    public listMsg: Array<any>; 
    public links: Array<any>;  
    
    public page: number;  
    public totalPages: number;  
    public limit: number;  
    public rangeInit: number;  
    public rangeEnd: number;  
    public field: string;  
    public qtdTotal: number;  
    public offset: number;
    public query : any;

    public getListMsg(){
        if(!this.listMsg){
            this.listMsg = new Array();
        }
        return this.listMsg;
    }

    public addMsg(typeMsg: string, textMsg: string) {
        this.getListMsg().push({type: typeMsg, msg: textMsg});
    }

    public addMsgWithDetails(typeMsg: string, codMsg: string, textMsg: string,
        paramMsg: string, valueMsg: string) {        
        this.getListMsg().push({type: typeMsg, cod: codMsg, text: textMsg, param: paramMsg, value: valueMsg});        
    }

    public addMsgError(typeMsg: string, codMsg: string, errorMsg: any) {
        this.getListMsg().push({type: typeMsg, cod: codMsg, error: errorMsg});            
    }

    public addLink(linkParam: string, relParam: string) {
        if(!this.links){
            this.links = new Array();
        }
        this.links.push({link: linkParam, rel: relParam});
    }
}
