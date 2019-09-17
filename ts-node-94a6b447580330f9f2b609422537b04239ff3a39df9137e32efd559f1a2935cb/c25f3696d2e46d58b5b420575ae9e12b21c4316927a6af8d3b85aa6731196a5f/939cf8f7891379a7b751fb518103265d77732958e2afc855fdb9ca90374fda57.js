"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const UtilService_1 = require("../util/UtilService");
const Validation_1 = require("../util/Validation");
class Data {
    constructor() {
    }
    getListMsg() {
        if (!this.listMsg) {
            this.listMsg = new Array();
        }
        return this.listMsg;
    }
    addMsg(typeMsg, textMsg) {
        this.getListMsg().push({ type: typeMsg, msg: textMsg });
    }
    addMsgWithDetails(typeMsg, codMsg, textMsg, paramMsg, valueMsg) {
        this.getListMsg().push({ type: typeMsg, cod: codMsg, text: textMsg, param: paramMsg, value: valueMsg });
    }
    addMsgError(typeMsg, codMsg, errorMsg) {
        this.getListMsg().push({ type: typeMsg, cod: codMsg, error: errorMsg });
    }
    addLink(linkParam, relParam) {
        if (!this.links) {
            this.links = new Array();
        }
        this.links.push({ link: linkParam, rel: relParam });
    }
    executeQuery(req, res, model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Palavras que nâo entrarão no where.
                let notWhere = ["page", "limit", "asc", "desc", "range", "fields", "notin"];
                this.Op = sequelize_typescript_1.Sequelize.Op;
                let LIMIT_PAGE = 10;
                if (!this.query) {
                    this.query = {};
                }
                // const SERVICO = Perfil.name.toLowerCase();   
                let asc = req.query.asc && req.query.asc.indexOf(",") > -1 ? req.query.asc.split(',') : req.query.asc;
                let desc = req.query.desc && req.query.desc.indexOf(",") > -1 ? req.query.desc.split(',') : req.query.desc;
                let fields = req.query.fields && req.query.fields.indexOf(",") > -1 ? req.query.fields.split(',') : req.query.fields;
                this.page = req.query.page ? req.query.page : undefined;
                this.limit = (req.query.limit || this.page) ? req.query.limit || LIMIT_PAGE : undefined;
                if (this.page && this.limit) {
                    this.offset = (this.page - 1) * this.limit;
                }
                let orderParams = UtilService_1.default.getCriteriosOrdenacao(asc, desc, "id");
                //Percorrendo todos os parâmetros e adicionando no where.
                for (let key in req.query) {
                    if (req.query[key] && notWhere.indexOf(key) < 0) {
                        this.addAND(key, req.query[key]);
                    }
                }
                //Verificando se foi passado o parâmetro fields e limitando os campos que serão retornados.
                if (fields) {
                    fields = [].concat(fields);
                    this.setFields(fields);
                }
                if (orderParams) {
                    this.query["order"] = orderParams;
                }
                if (this.limit) {
                    this.query["limit"] = typeof this.limit == "string" ? parseInt(this.limit) : this.limit;
                }
                if (this.limit) {
                    this.query["offset"] = this.offset;
                }
                if (this.listIncludes && this.listIncludes.length > 0) {
                    this.query["include"] = this.listIncludes;
                } //Se caso exista os ands
                let where = [];
                if (this.listAnds && this.listAnds.length > 0) {
                    where.push({ [this.Op.and]: this.listAnds });
                }
                if (this.listNot && this.listNot.length) {
                    where.push({ [this.Op.not]: this.listNot });
                }
                // where.push({[this.Op.between] : [{id: [1,3]}]});
                if (where && where.length > 0) {
                    this.query["where"] = where;
                }
                console.log("-----Query");
                console.log(this.query);
                let result = yield model.findAndCountAll(this.query);
                this.qtdTotal = result.count;
                if (this.page && this.limit) {
                    this.calcRanges();
                }
                this.list = result.rows;
                //Limpando dados que não precisam está no objeto..
                this.listAnds = undefined;
                this.Op = undefined;
                this.query = undefined;
                this.listIncludes = undefined, this.listNot = undefined;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    calcRanges() {
        if (this.page > 0 && this.qtdTotal > 0) {
            this.totalPages = Math.ceil(this.qtdTotal / this.limit);
        }
        if (this.page < this.totalPages) {
            this.rangeEnd = this.page * this.limit;
        }
        else {
            this.rangeEnd = this.qtdTotal;
            this.page = this.totalPages;
        }
        if (this.page != this.totalPages) {
            this.rangeInit = (this.rangeEnd + 1) - this.limit;
        }
        else {
            this.rangeInit = ((this.totalPages - 1) * this.limit) + 1;
        }
    }
    setObjectSearch(field, value) {
        let obj = {};
        if (Validation_1.default.isOnlyNumbers(value) || Validation_1.default.isDateBrVallid(value)) {
            obj[field] = value;
        }
        else {
            obj[field] = { [this.Op.like]: value };
        }
        return obj;
    }
    setFields(fields) {
        if (!this.query) {
            this.query = {};
        }
        this.query["attributes"] = fields;
    }
    addInclude(model, collumn, foreignkey, atributes) {
        if (!this.listIncludes) {
            this.listIncludes = new Array();
        }
        let include = {};
        let where = {};
        include["model"] = model;
        where[collumn] = sequelize_typescript_1.Sequelize.col(foreignkey);
        include["where"] = where;
        if (atributes && atributes.length > 0) {
            include["attributes"] = atributes;
        }
        this.listIncludes.push(include);
    }
    addAND(field, value) {
        if (value) {
            if (!this.listAnds) {
                this.listAnds = new Array();
            }
            this.listAnds.push(this.setObjectSearch(field, value));
        }
    }
    addNotIn(field, value) {
        if (value != undefined) {
            let obj = {};
            if (!this.listNot) {
                this.listNot = new Array();
            }
            obj[field] = value;
            this.listNot.push(obj);
        }
    }
    addNotLike(field, value) {
        if (value != undefined) {
            let obj = {};
            if (!this.listAnds) {
                this.listAnds = new Array();
            }
            obj[field] = { [this.Op.notLike]: value };
            this.listAnds.push(obj);
        }
    }
    getUrlPadao(versao, urlOriginal) {
        let urlSemVersao = (urlOriginal.indexOf("?") > -1)
            ? urlOriginal.substring(versao.length + 1, urlOriginal.indexOf("?"))
            : urlOriginal.substring(versao.length + 1);
        let dominio = (urlSemVersao.indexOf("/") > -1)
            ? urlSemVersao.substring(0, urlSemVersao.indexOf("/"))
            : urlSemVersao;
        let parametros = urlSemVersao.substring(dominio.length + 1);
        let partes = parametros.split("/");
        parametros = "";
        if (partes && partes.length > 0) {
            let valor = partes[0];
            if (valor && partes.length == 1) {
                if (Validation_1.default.isOnlyNumbers(valor)) {
                    parametros += "/:id";
                }
                else {
                    parametros += "/" + valor;
                }
            }
            else {
                partes.forEach((p, index) => {
                    if (index > 0 && (index + 1) % 2 == 0) {
                        let campo = partes[index - 1];
                        parametros += "/" + campo + "/:" + campo;
                    }
                });
            }
        }
        return versao + "/" + dominio + parametros;
    }
}
exports.Data = Data;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL3V0aWwvRGF0YS50cyIsInNvdXJjZXMiOlsiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL3V0aWwvRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsK0RBQXVEO0FBQ3ZELHFEQUE4QztBQUM5QyxtREFBNEM7QUFFNUM7SUFDSTtJQUVBLENBQUM7SUF1Qk0sVUFBVTtRQUNiLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBZSxFQUFFLE9BQWU7UUFDMUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLGlCQUFpQixDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsT0FBZSxFQUNyRSxRQUFnQixFQUFFLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTSxXQUFXLENBQUMsT0FBZSxFQUFFLE1BQWMsRUFBRSxRQUFhO1FBQzdELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFD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QUFNLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixVQUFVLElBQUssR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUM5QyxDQUFDO2dCQUNELENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQy9DLENBQUM7Q0FDSjtBQTNPRCxvQkEyT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBTZXF1ZWxpemUsIE1vZGVsfSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCc7XG5pbXBvcnQgVXRpbFNlcnZpY2UgZnJvbSAnLi4vdXRpbC9VdGlsU2VydmljZSc7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi4vdXRpbC9WYWxpZGF0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEYXRhe1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICl7XG4gICAgfVxuICAgIHB1YmxpYyBvYmo6IE9iamVjdDtcbiAgICBwdWJsaWMgbGlzdDogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgbGlzdE1zZzogQXJyYXk8YW55PjsgXG4gICAgcHVibGljIGxpbmtzOiBBcnJheTxhbnk+OyAgXG4gICAgXG4gICAgcHVibGljIHBhZ2U6IG51bWJlcjsgIFxuICAgIHB1YmxpYyB0b3RhbFBhZ2VzOiBudW1iZXI7ICBcbiAgICBwdWJsaWMgbGltaXQ6IG51bWJlcjsgIFxuICAgIHB1YmxpYyByYW5nZUluaXQ6IG51bWJlcjsgIFxuICAgIHB1YmxpYyByYW5nZUVuZDogbnVtYmVyOyAgXG4gICAgcHVibGljIGZpZWxkOiBzdHJpbmc7ICBcbiAgICBwdWJsaWMgcXRkVG90YWw6IG51bWJlcjsgIFxuICAgIHB1YmxpYyBvZmZzZXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgY29udGVudFJhbmdlOiBzdHJpbmc7IFxuICAgIHB1YmxpYyBhY2NlcHRSYW5nZTogc3RyaW5nO1xuICAgIHByaXZhdGUgT3AgOiBhbnk7XG4gICAgcHVibGljIHF1ZXJ5IDogYW55O1xuICAgIHByaXZhdGUgbGlzdEFuZHM6IEFycmF5PGFueT47XG4gICAgcHJpdmF0ZSBsaXN0Tm90OiBBcnJheTxhbnk+O1xuICAgIHByaXZhdGUgbGlzdEJldHdlZW46IEFycmF5PGFueT47XG4gICAgcHJpdmF0ZSBsaXN0SW5jbHVkZXM6IEFycmF5PGFueT47XG4gICAgXG4gICAgcHVibGljIGdldExpc3RNc2coKXtcbiAgICAgICAgaWYoIXRoaXMubGlzdE1zZyl7XG4gICAgICAgICAgICB0aGlzLmxpc3RNc2cgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0TXNnO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRNc2codHlwZU1zZzogc3RyaW5nLCB0ZXh0TXNnOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0TXNnKCkucHVzaCh7dHlwZTogdHlwZU1zZywgbXNnOiB0ZXh0TXNnfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZE1zZ1dpdGhEZXRhaWxzKHR5cGVNc2c6IHN0cmluZywgY29kTXNnOiBzdHJpbmcsIHRleHRNc2c6IHN0cmluZyxcbiAgICAgICAgcGFyYW1Nc2c6IHN0cmluZywgdmFsdWVNc2c6IHN0cmluZykgeyAgICAgICAgXG4gICAgICAgIHRoaXMuZ2V0TGlzdE1zZygpLnB1c2goe3R5cGU6IHR5cGVNc2csIGNvZDogY29kTXNnLCB0ZXh0OiB0ZXh0TXNnLCBwYXJhbTogcGFyYW1Nc2csIHZhbHVlOiB2YWx1ZU1zZ30pOyAgICAgICAgXG4gICAgfVxuXG4gICAgcHVibGljIGFkZE1zZ0Vycm9yKHR5cGVNc2c6IHN0cmluZywgY29kTXNnOiBzdHJpbmcsIGVycm9yTXNnOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0TXNnKCkucHVzaCh7dHlwZTogdHlwZU1zZywgY29kOiBjb2RNc2csIGVycm9yOiBlcnJvck1zZ30pOyAgICAgICAgICAgIFxuICAgIH1cblxuICAgIHB1YmxpYyBhZGRMaW5rKGxpbmtQYXJhbTogc3RyaW5nLCByZWxQYXJhbTogc3RyaW5nKSB7XG4gICAgICAgIGlmKCF0aGlzLmxpbmtzKXtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpbmtzLnB1c2goe2xpbms6IGxpbmtQYXJhbSwgcmVsOiByZWxQYXJhbX0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlUXVlcnkocmVxOmV4cHJlc3MuUmVxdWVzdCwgcmVzOmV4cHJlc3MuUmVzcG9uc2UsIG1vZGVsOiBhbnkpe1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICAvL1BhbGF2cmFzIHF1ZSBuw6JvIGVudHJhcsOjbyBubyB3aGVyZS5cbiAgICAgICAgICAgIGxldCBub3RXaGVyZTogQXJyYXk8c3RyaW5nPiA9IFtcInBhZ2VcIiwgXCJsaW1pdFwiLCBcImFzY1wiLCBcImRlc2NcIiwgXCJyYW5nZVwiLCBcImZpZWxkc1wiLCBcIm5vdGluXCJdO1xuICAgICAgICAgICAgdGhpcy5PcCA9IFNlcXVlbGl6ZS5PcDtcbiAgICAgICAgICAgIGxldCBMSU1JVF9QQUdFID0gMTA7XG4gICAgICAgICAgICBpZighdGhpcy5xdWVyeSl7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc3QgU0VSVklDTyA9IFBlcmZpbC5uYW1lLnRvTG93ZXJDYXNlKCk7ICAgXG4gICAgICAgICAgICBsZXQgYXNjID0gcmVxLnF1ZXJ5LmFzYyAmJiByZXEucXVlcnkuYXNjLmluZGV4T2YoXCIsXCIpID4gLTEgPyByZXEucXVlcnkuYXNjLnNwbGl0KCcsJykgOiByZXEucXVlcnkuYXNjO1xuICAgICAgICAgICAgbGV0IGRlc2MgPSByZXEucXVlcnkuZGVzYyAmJiByZXEucXVlcnkuZGVzYy5pbmRleE9mKFwiLFwiKSA+IC0xID8gcmVxLnF1ZXJ5LmRlc2Muc3BsaXQoJywnKSA6IHJlcS5xdWVyeS5kZXNjO1xuICAgICAgICAgICAgbGV0IGZpZWxkcyA9IHJlcS5xdWVyeS5maWVsZHMgJiYgcmVxLnF1ZXJ5LmZpZWxkcy5pbmRleE9mKFwiLFwiKSA+IC0xID8gcmVxLnF1ZXJ5LmZpZWxkcy5zcGxpdCgnLCcpIDogcmVxLnF1ZXJ5LmZpZWxkcztcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHJlcS5xdWVyeS5wYWdlID8gcmVxLnF1ZXJ5LnBhZ2UgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmxpbWl0ID0gKHJlcS5xdWVyeS5saW1pdCB8fCB0aGlzLnBhZ2UpID8gcmVxLnF1ZXJ5LmxpbWl0IHx8IExJTUlUX1BBR0UgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZih0aGlzLnBhZ2UgJiYgdGhpcy5saW1pdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSAodGhpcy5wYWdlIC0xKSAqIHRoaXMubGltaXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb3JkZXJQYXJhbXMgPSBVdGlsU2VydmljZS5nZXRDcml0ZXJpb3NPcmRlbmFjYW8oYXNjLCBkZXNjLCBcImlkXCIpO1xuICAgICAgICAgICAgLy9QZXJjb3JyZW5kbyB0b2RvcyBvcyBwYXLDom1ldHJvcyBlIGFkaWNpb25hbmRvIG5vIHdoZXJlLlxuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gcmVxLnF1ZXJ5KXtcbiAgICAgICAgICAgICAgICBpZihyZXEucXVlcnlba2V5XSAmJiBub3RXaGVyZS5pbmRleE9mKGtleSkgPCAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBTkQoa2V5LCByZXEucXVlcnlba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9WZXJpZmljYW5kbyBzZSBmb2kgcGFzc2FkbyBvIHBhcsOibWV0cm8gZmllbGRzIGUgbGltaXRhbmRvIG9zIGNhbXBvcyBxdWUgc2Vyw6NvIHJldG9ybmFkb3MuXG4gICAgICAgICAgICBpZihmaWVsZHMpe1xuICAgICAgICAgICAgICAgIGZpZWxkcyA9IFtdLmNvbmNhdChmaWVsZHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzKGZpZWxkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvcmRlclBhcmFtcyl7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeVtcIm9yZGVyXCJdID0gb3JkZXJQYXJhbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmxpbWl0KXtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5W1wibGltaXRcIl0gPSB0eXBlb2YgdGhpcy5saW1pdCA9PSBcInN0cmluZ1wiID8gcGFyc2VJbnQodGhpcy5saW1pdCkgIDogdGhpcy5saW1pdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMubGltaXQpe1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlbXCJvZmZzZXRcIl0gPSB0aGlzLm9mZnNldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMubGlzdEluY2x1ZGVzICYmIHRoaXMubGlzdEluY2x1ZGVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlbXCJpbmNsdWRlXCJdID0gdGhpcy5saXN0SW5jbHVkZXM7XG5cbiAgICAgICAgICAgIH0vL1NlIGNhc28gZXhpc3RhIG9zIGFuZHNcbiAgICAgICAgICAgIGxldCB3aGVyZSA9IFtdO1xuICAgICAgICAgICAgaWYodGhpcy5saXN0QW5kcyAmJiB0aGlzLmxpc3RBbmRzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHdoZXJlLnB1c2goe1t0aGlzLk9wLmFuZF0gOiB0aGlzLmxpc3RBbmRzfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmxpc3ROb3QgJiYgdGhpcy5saXN0Tm90Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgd2hlcmUucHVzaCh7W3RoaXMuT3Aubm90XSA6IHRoaXMubGlzdE5vdH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gd2hlcmUucHVzaCh7W3RoaXMuT3AuYmV0d2Vlbl0gOiBbe2lkOiBbMSwzXX1dfSk7XG4gICAgICAgICAgICBpZih3aGVyZSAmJiB3aGVyZS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5W1wid2hlcmVcIl0gPSB3aGVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS1RdWVyeVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG1vZGVsLmZpbmRBbmRDb3VudEFsbCh0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgIHRoaXMucXRkVG90YWwgPSByZXN1bHQuY291bnQ7XG4gICAgICAgICAgICBpZih0aGlzLnBhZ2UgJiYgdGhpcy5saW1pdCl7Ly9WZXJpZmljYW5kbyBzZSBlc3TDoSB1c2FuZG8gcGFnaW5hw6fDo28gZSBjcmlhbmRvIG9zIHJhbmdlSW5pdCBlIHJhbmdlRW5kXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxjUmFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSByZXN1bHQucm93cztcbiAgICAgICAgICAgIC8vTGltcGFuZG8gZGFkb3MgcXVlIG7Do28gcHJlY2lzYW0gZXN0w6Egbm8gb2JqZXRvLi5cbiAgICAgICAgICAgIHRoaXMubGlzdEFuZHMgPSB1bmRlZmluZWQ7IHRoaXMuT3AgPSB1bmRlZmluZWQ7IHRoaXMucXVlcnkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmxpc3RJbmNsdWRlcyA9IHVuZGVmaW5lZCwgdGhpcy5saXN0Tm90ID0gdW5kZWZpbmVkO1xuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjUmFuZ2VzKCl7XG4gICAgICAgIGlmKHRoaXMucGFnZSA+IDAgJiYgdGhpcy5xdGRUb3RhbCA+IDApe1xuICAgICAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMucXRkVG90YWwgLyB0aGlzLmxpbWl0KTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnBhZ2UgPCB0aGlzLnRvdGFsUGFnZXMpe1xuICAgICAgICAgICAgdGhpcy5yYW5nZUVuZCA9IHRoaXMucGFnZSAqIHRoaXMubGltaXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJhbmdlRW5kID0gdGhpcy5xdGRUb3RhbDtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IHRoaXMudG90YWxQYWdlcztcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnBhZ2UgIT0gdGhpcy50b3RhbFBhZ2VzKXtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VJbml0ID0gKHRoaXMucmFuZ2VFbmQgKyAxKSAtIHRoaXMubGltaXQgXG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VJbml0ID0gICgodGhpcy50b3RhbFBhZ2VzIC0gMSkgKiB0aGlzLmxpbWl0KSArIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE9iamVjdFNlYXJjaChmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KXtcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICBpZihWYWxpZGF0aW9uLmlzT25seU51bWJlcnModmFsdWUpIHx8IFZhbGlkYXRpb24uaXNEYXRlQnJWYWxsaWQodmFsdWUpKXtcbiAgICAgICAgICAgIG9ialtmaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBvYmpbZmllbGRdID0ge1t0aGlzLk9wLmxpa2VdOiB2YWx1ZX07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzZXRGaWVsZHMoZmllbGRzOiBBcnJheTxzdHJpbmc+KXtcbiAgICAgICAgaWYoIXRoaXMucXVlcnkpe1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnlbXCJhdHRyaWJ1dGVzXCJdID0gZmllbGRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRJbmNsdWRlKG1vZGVsOiBhbnksIGNvbGx1bW46IHN0cmluZywgZm9yZWlnbmtleTogc3RyaW5nLCBhdHJpYnV0ZXM6IHN0cmluZ1tdKXtcbiAgICAgICAgaWYoIXRoaXMubGlzdEluY2x1ZGVzKXtcbiAgICAgICAgICAgIHRoaXMubGlzdEluY2x1ZGVzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluY2x1ZGUgPSB7fTtcbiAgICAgICAgbGV0IHdoZXJlID0ge307XG4gICAgICAgIGluY2x1ZGVbXCJtb2RlbFwiXSA9IG1vZGVsO1xuICAgICAgICB3aGVyZVtjb2xsdW1uXSA9IFNlcXVlbGl6ZS5jb2woZm9yZWlnbmtleSk7XG4gICAgICAgIGluY2x1ZGVbXCJ3aGVyZVwiXSA9IHdoZXJlO1xuICAgICAgICBpZihhdHJpYnV0ZXMgJiYgYXRyaWJ1dGVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgaW5jbHVkZVtcImF0dHJpYnV0ZXNcIl0gPSBhdHJpYnV0ZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0SW5jbHVkZXMucHVzaChpbmNsdWRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQU5EKGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBhbnkpe1xuICAgICAgICBpZih2YWx1ZSl7XG4gICAgICAgICAgICBpZighdGhpcy5saXN0QW5kcyl7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0QW5kcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5saXN0QW5kcy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0T2JqZWN0U2VhcmNoKGZpZWxkLCB2YWx1ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkTm90SW4oZmllbGQ6IHN0cmluZywgdmFsdWU6IEFycmF5PGFueT4pe1xuICAgICAgICBpZih2YWx1ZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICAgICAgaWYoIXRoaXMubGlzdE5vdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Tm90ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmpbZmllbGRdID0gIHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5saXN0Tm90LnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGROb3RMaWtlKGZpZWxkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpe1xuICAgICAgICBpZih2YWx1ZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICAgICAgaWYoIXRoaXMubGlzdEFuZHMpe1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEFuZHMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ialtmaWVsZF0gPSB7W3RoaXMuT3Aubm90TGlrZV06IHZhbHVlfTtcbiAgICAgICAgICAgIHRoaXMubGlzdEFuZHMucHVzaChvYmopO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVybFBhZGFvKHZlcnNhbzogc3RyaW5nLCB1cmxPcmlnaW5hbDogc3RyaW5nKXtcbiAgICAgICAgbGV0IHVybFNlbVZlcnNhbyA9ICh1cmxPcmlnaW5hbC5pbmRleE9mKFwiP1wiKSA+IC0xKVxuICAgICAgICAgICAgICA/IHVybE9yaWdpbmFsLnN1YnN0cmluZyh2ZXJzYW8ubGVuZ3RoICsgMSwgdXJsT3JpZ2luYWwuaW5kZXhPZihcIj9cIikpXG4gICAgICAgICAgICAgIDogdXJsT3JpZ2luYWwuc3Vic3RyaW5nKHZlcnNhby5sZW5ndGggKyAxKTtcbiAgICAgICAgbGV0IGRvbWluaW8gPSAodXJsU2VtVmVyc2FvLmluZGV4T2YoXCIvXCIpID4gLTEpIFxuICAgICAgICAgICAgICA/IHVybFNlbVZlcnNhby5zdWJzdHJpbmcoMCwgdXJsU2VtVmVyc2FvLmluZGV4T2YoXCIvXCIpKVxuICAgICAgICAgICAgICA6IHVybFNlbVZlcnNhbztcbiAgICAgICAgbGV0IHBhcmFtZXRyb3MgPSB1cmxTZW1WZXJzYW8uc3Vic3RyaW5nKGRvbWluaW8ubGVuZ3RoKzEpO1xuICAgICAgICBsZXQgcGFydGVzID0gcGFyYW1ldHJvcy5zcGxpdChcIi9cIik7XG4gICAgICAgIHBhcmFtZXRyb3MgPSBcIlwiO1xuICAgICAgICBpZihwYXJ0ZXMgJiYgcGFydGVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgbGV0IHZhbG9yID0gcGFydGVzWzBdO1xuICAgICAgICAgICAgaWYodmFsb3IgJiYgcGFydGVzLmxlbmd0aCA9PSAxKXtcbiAgICAgICAgICAgICAgICBpZihWYWxpZGF0aW9uLmlzT25seU51bWJlcnModmFsb3IpKXtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldHJvcyArPSBcIi86aWRcIjsgXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRyb3MgKz0gXCIvXCIgKyB2YWxvcjsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcGFydGVzLmZvckVhY2goKHAsIGluZGV4KSA9PntcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+IDAgJiYgKGluZGV4ICsxKSAlIDIgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYW1wbyA9IHBhcnRlc1tpbmRleC0xXTtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldHJvcyArPSAgXCIvXCIgKyBjYW1wbyArIFwiLzpcIiArIGNhbXBvOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJzYW8gKyBcIi9cIiArIGRvbWluaW8gKyBwYXJhbWV0cm9zO1xuICAgIH1cbn0iXX0=