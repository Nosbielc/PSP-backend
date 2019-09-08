import * as express from "express";
import { Sequelize, Model} from 'sequelize-typescript';
import UtilService from '../util/UtilService';
import Validation from "../util/Validation";

export class Data{
    constructor(
    ){
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
    public contentRange: string; 
    public acceptRange: string;
    private Op : any;
    public query : any;
    private listAnds: Array<any>;
    private listNot: Array<any>;
    private listBetween: Array<any>;
    private listIncludes: Array<any>;
    
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

    public async executeQuery(req:express.Request, res:express.Response, model: any){
        try{
            //Palavras que nâo entrarão no where.
            let notWhere: Array<string> = ["page", "limit", "asc", "desc", "range", "fields", "notin"];
            this.Op = Sequelize.Op;
            let LIMIT_PAGE = 10;
            if(!this.query){
                this.query = {};
            }
            // const SERVICO = Perfil.name.toLowerCase();   
            let asc = req.query.asc && req.query.asc.indexOf(",") > -1 ? req.query.asc.split(',') : req.query.asc;
            let desc = req.query.desc && req.query.desc.indexOf(",") > -1 ? req.query.desc.split(',') : req.query.desc;
            let fields = req.query.fields && req.query.fields.indexOf(",") > -1 ? req.query.fields.split(',') : req.query.fields;
            this.page = req.query.page ? req.query.page : undefined;
            this.limit = (req.query.limit || this.page) ? req.query.limit || LIMIT_PAGE : undefined;
            if(this.page && this.limit){
                this.offset = (this.page -1) * this.limit;
            }
            let orderParams = UtilService.getCriteriosOrdenacao(asc, desc, "id");
            //Percorrendo todos os parâmetros e adicionando no where.
            for(let key in req.query){
                if(req.query[key] && notWhere.indexOf(key) < 0){
                    this.addAND(key, req.query[key]);
                }
            }
            //Verificando se foi passado o parâmetro fields e limitando os campos que serão retornados.
            if(fields){
                fields = [].concat(fields);
                this.setFields(fields);
            }
            if(orderParams){
                this.query["order"] = orderParams;
            }
            if(this.limit){
                this.query["limit"] = typeof this.limit == "string" ? parseInt(this.limit)  : this.limit;
            }
            if(this.limit){
                this.query["offset"] = this.offset;
            }
            if(this.listIncludes && this.listIncludes.length > 0){
                this.query["include"] = this.listIncludes;

            }//Se caso exista os ands
            let where = [];
            if(this.listAnds && this.listAnds.length > 0){
                where.push({[this.Op.and] : this.listAnds});
            }
            if(this.listNot && this.listNot.length){
                where.push({[this.Op.not] : this.listNot});
            }
            // where.push({[this.Op.between] : [{id: [1,3]}]});
            if(where && where.length > 0){
                this.query["where"] = where;
            }
            console.log("-----Query");
            console.log(this.query);
            let result = await model.findAndCountAll(this.query);
            this.qtdTotal = result.count;
            if(this.page && this.limit){//Verificando se está usando paginação e criando os rangeInit e rangeEnd
                this.calcRanges();
            }
            this.list = result.rows;
            //Limpando dados que não precisam está no objeto..
            this.listAnds = undefined; this.Op = undefined; this.query = undefined;
            this.listIncludes = undefined, this.listNot = undefined;
        }catch(error){
            console.log(error);
        }
    }

    private calcRanges(){
        if(this.page > 0 && this.qtdTotal > 0){
            this.totalPages = Math.ceil(this.qtdTotal / this.limit);
        }
        if(this.page < this.totalPages){
            this.rangeEnd = this.page * this.limit;
        } else {
            this.rangeEnd = this.qtdTotal;
            this.page = this.totalPages;
        }
        if(this.page != this.totalPages){
            this.rangeInit = (this.rangeEnd + 1) - this.limit 
        } else{
            this.rangeInit =  ((this.totalPages - 1) * this.limit) + 1;
        }
    }

    private setObjectSearch(field: string, value: any){
        let obj = {};
        if(Validation.isOnlyNumbers(value) || Validation.isDateBrVallid(value)){
            obj[field] = value;
        }else{
            obj[field] = {[this.Op.like]: value};
        }
        return obj;
    }


    public setFields(fields: Array<string>){
        if(!this.query){
            this.query = {};
        }
        this.query["attributes"] = fields;
    }

    public addInclude(model: any, collumn: string, foreignkey: string, atributes: string[]){
        if(!this.listIncludes){
            this.listIncludes = new Array();
        }
        let include = {};
        let where = {};
        include["model"] = model;
        where[collumn] = Sequelize.col(foreignkey);
        include["where"] = where;
        if(atributes && atributes.length > 0){
            include["attributes"] = atributes;
        }
        this.listIncludes.push(include);
    }

    public addAND(field: string, value: any){
        if(value){
            if(!this.listAnds){
                this.listAnds = new Array();
            }
            this.listAnds.push(
                this.setObjectSearch(field, value)
            );
        }
    }

    public addNotIn(field: string, value: Array<any>){
        if(value != undefined){
            let obj = {};
            if(!this.listNot){
                this.listNot = new Array();
            }
            obj[field] =  value;
            this.listNot.push(obj);
        }
    }

    public addNotLike(field: string, value: string){
        if(value != undefined){
            let obj = {};
            if(!this.listAnds){
                this.listAnds = new Array();
            }
            obj[field] = {[this.Op.notLike]: value};
            this.listAnds.push(obj);
        }
    }

    public getUrlPadao(versao: string, urlOriginal: string){
        let urlSemVersao = (urlOriginal.indexOf("?") > -1)
              ? urlOriginal.substring(versao.length + 1, urlOriginal.indexOf("?"))
              : urlOriginal.substring(versao.length + 1);
        let dominio = (urlSemVersao.indexOf("/") > -1) 
              ? urlSemVersao.substring(0, urlSemVersao.indexOf("/"))
              : urlSemVersao;
        let parametros = urlSemVersao.substring(dominio.length+1);
        let partes = parametros.split("/");
        parametros = "";
        if(partes && partes.length > 0){
            let valor = partes[0];
            if(valor && partes.length == 1){
                if(Validation.isOnlyNumbers(valor)){
                    parametros += "/:id"; 
                }else{
                    parametros += "/" + valor; 
                }
            }else{
                partes.forEach((p, index) =>{
                if(index > 0 && (index +1) % 2 == 0){
                    let campo = partes[index-1];
                    parametros +=  "/" + campo + "/:" + campo; 
                }
                });
          }
        }
        return versao + "/" + dominio + parametros;
    }
}