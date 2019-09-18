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
const Values_1 = require("../../util/Values");
const Data_1 = require("../../util/Data");
const MessageTranslate_1 = require("../../util/MessageTranslate");
const StringMask = require("string-mask");
const TransactionModel_1 = require("../model/TransactionModel");
const dateFns = require("date-fns");
const PayableModel_1 = require("../model/PayableModel");
const crypto = require("crypto");
const ClientModel_1 = require("../model/ClientModel");
class PSPService {
    record(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new Data_1.Data();
            let result = {};
            let bodyRequest = req.body; //Pega informações do body
            try {
                req.assert('vlrTransaction', MessageTranslate_1.msgPSP.erroParamBodyVlrtransactionRequired).notEmpty();
                req.assert('description', MessageTranslate_1.msgPSP.erroParamBodyDescriptionRequired).notEmpty();
                req.assert('typeTransaction', MessageTranslate_1.msgPSP.erroParamBodyTypeTransactionRequired).notEmpty().isNumeric().isInt({ min: 1, max: 2 });
                req.assert('numCard', MessageTranslate_1.msgPSP.erroParamBodyNumCardRequired).notEmpty().isNumeric().len({ min: 14, max: 16 });
                req.assert('bearerName', MessageTranslate_1.msgPSP.erroParamBodyBearerNameRequired).notEmpty();
                req.assert('dtExpiration', MessageTranslate_1.msgPSP.erroParamBodyDtExpirationRequired).notEmpty();
                req.assert('cvv', MessageTranslate_1.msgPSP.erroParamBodyCVVRequired).notEmpty();
                req.assert('clientId', MessageTranslate_1.msgPSP.erroParamBodyClientIdRequired).notEmpty().isNumeric();
                let errors = req.validationErrors();
                //Validando parametros enviados
                if (errors) {
                    data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgPSP.erroProcessRecordPSP, errors);
                    res.status(400).send(data);
                    return;
                }
                // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _
                //Tratamento de data invalida ou expirada
                if (!dateFns.isDate(bodyRequest.dtExpiration) &&
                    dateFns.compareDesc(new Date(), dateFns.parse(bodyRequest.dtExpiration)) !== 1) {
                    data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgPSP.erroProcessRecordPSP, "Cartão Expirado.");
                    res.status(400).send(data);
                    return;
                }
                // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _
                let client = yield ClientModel_1.Client.findById(bodyRequest.clientId);
                if (!client) {
                    data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgPSP.erroProcessRecordPSP, "Cliente desconhecido.");
                    res.status(400).send(data);
                    return;
                }
                // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _
                //Resolvendo questão de segurança do numero
                let numCard = new StringMask('************0000').apply(bodyRequest.numCard);
                // Valor em formato apresentacao
                let vlrApresentacaoFull = (bodyRequest.vlrTransaction).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                //Registrando a transação
                let transactionBase = yield TransactionModel_1.Transaction.create({
                    'vlrTransaction': Number(bodyRequest.vlrTransaction),
                    'description': bodyRequest.description,
                    'typeTransaction': bodyRequest.typeTransaction,
                    'numCard': numCard,
                    'bearerName': bodyRequest.bearerName,
                    'dtExpiration': dateFns.parse(bodyRequest.dtExpiration),
                    'cvv': bodyRequest.cvv
                });
                // validando status
                let statusPayable = bodyRequest.typeTransaction == 1 ? 1 : 2;
                // Resolvendo data de pagamento
                let dtPayment = statusPayable == 1 ? new Date() : dateFns.addDays(new Date(), 30);
                // Resolvendo porcentagem para taxa
                let percentRate = bodyRequest.typeTransaction == 1 ? 3 : 5;
                // Valor da transação
                let vlrBase = Number(bodyRequest.vlrTransaction);
                // Valor total que será usado como taxa administrativa
                let vlrPayablePercent = Number(bodyRequest.vlrTransaction) * (Number(percentRate) / 100);
                // Valor do recebivél final
                let vlrPayable = vlrBase - Number(vlrPayablePercent);
                // Gerando um hash para consultas futuras
                let hashTransaction = crypto.createHash('md5').update(JSON.stringify(transactionBase)).digest("hex");
                // salvando os pagaveis da transação
                let payableBase = yield PayableModel_1.Payable.create({
                    'transactionId': transactionBase.id,
                    'status': statusPayable,
                    'dtPayment': dtPayment,
                    'percentRate': percentRate,
                    'vlrPayable': vlrPayable,
                    'hashTransaction': hashTransaction,
                    'clientId': client.id
                });
                //result.numCard = numCard;//
                //result.vlrApresentacaoFull = vlrApresentacaoFull;
                //result.statusPayable = statusPayable;
                //result.dtPayment = dtPayment;
                //result.percentRate = percentRate;
                //result.vlrBase = vlrBase;
                //result.vlrPayablePercent = vlrPayablePercent;
                //result.vlrPayable = vlrPayable;
                //result.hash = payableBase.hashTransaction;
                result.transaction = transactionBase;
                //result.payable = payableBase;
                data.obj = result;
                data.addMsg(Values_1.tMsg.SUCCESS, "Sucesso.");
                res.status(200).json(data);
            }
            catch (error) {
                console.log(error);
                data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgErro.erroAoRealizarConsulta, "Error ");
                res.status(500).json(data);
            }
        });
    }
}
exports.default = new PSPService();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1BTUFNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy9hcHAvc2VydmljZS9QU1BTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw4Q0FBdUM7QUFDdkMsMENBQXFDO0FBQ3JDLGtFQUE0RDtBQUM1RCwwQ0FBMEM7QUFDMUMsZ0VBQXNEO0FBQ3RELG9DQUFvQztBQUVwQyx3REFBOEM7QUFFOUMsaUNBQWlDO0FBQ2pDLHNEQUE0QztBQUU1QztJQUVpQixNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxNQUFNLEdBQXVCLEVBQUUsQ0FBQztZQUVwQyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsMEJBQTBCO1lBQ3RELElBQUksQ0FBQztnQkFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLHlCQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUseUJBQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5RSxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLHlCQUFNLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUMzSCxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSx5QkFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUs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ZW50IjpbImltcG9ydCB7dE1zZ30gZnJvbSBcIi4uLy4uL3V0aWwvVmFsdWVzXCI7XG5pbXBvcnQge0RhdGF9IGZyb20gXCIuLi8uLi91dGlsL0RhdGFcIjtcbmltcG9ydCB7bXNnRXJybywgbXNnUFNQfSBmcm9tIFwiLi4vLi4vdXRpbC9NZXNzYWdlVHJhbnNsYXRlXCI7XG5pbXBvcnQgKiBhcyBTdHJpbmdNYXNrIGZyb20gJ3N0cmluZy1tYXNrJztcbmltcG9ydCB7VHJhbnNhY3Rpb259IGZyb20gXCIuLi9tb2RlbC9UcmFuc2FjdGlvbk1vZGVsXCI7XG5pbXBvcnQgKiBhcyBkYXRlRm5zIGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBQYXlhYmxlU2VydmljZSBmcm9tIFwiLi9QYXlhYmxlU2VydmljZVwiO1xuaW1wb3J0IHtQYXlhYmxlfSBmcm9tIFwiLi4vbW9kZWwvUGF5YWJsZU1vZGVsXCI7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7IC8vaHR0cHM6Ly9kYXRlLWZucy5vcmcvXG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7Q2xpZW50fSBmcm9tIFwiLi4vbW9kZWwvQ2xpZW50TW9kZWxcIjtcblxuY2xhc3MgUFNQU2VydmljZSB7XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVjb3JkKHJlcSwgcmVzKSB7XG4gICAgICAgIGxldCBkYXRhID0gbmV3IERhdGEoKTtcbiAgICAgICAgbGV0IHJlc3VsdDoge1trOiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgICAgbGV0IGJvZHlSZXF1ZXN0ID0gcmVxLmJvZHk7IC8vUGVnYSBpbmZvcm1hw6fDtWVzIGRvIGJvZHlcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgcmVxLmFzc2VydCgndmxyVHJhbnNhY3Rpb24nLCBtc2dQU1AuZXJyb1BhcmFtQm9keVZscnRyYW5zYWN0aW9uUmVxdWlyZWQpLm5vdEVtcHR5KCk7XG4gICAgICAgICAgICByZXEuYXNzZXJ0KCdkZXNjcmlwdGlvbicsIG1zZ1BTUC5lcnJvUGFyYW1Cb2R5RGVzY3JpcHRpb25SZXF1aXJlZCkubm90RW1wdHkoKTtcbiAgICAgICAgICAgIHJlcS5hc3NlcnQoJ3R5cGVUcmFuc2FjdGlvbicsIG1zZ1BTUC5lcnJvUGFyYW1Cb2R5VHlwZVRyYW5zYWN0aW9uUmVxdWlyZWQpLm5vdEVtcHR5KCkuaXNOdW1lcmljKCkuaXNJbnQoeyBtaW46IDEsIG1heDogMn0pO1xuICAgICAgICAgICAgcmVxLmFzc2VydCgnbnVtQ2FyZCcsIG1zZ1BTUC5lcnJvUGFyYW1Cb2R5TnVtQ2FyZFJlcXVpcmVkKS5ub3RFbXB0eSgpLmlzTnVtZXJpYygpLmxlbih7IG1pbjogMTQsIG1heDogMTZ9KTtcbiAgICAgICAgICAgIHJlcS5hc3NlcnQoJ2JlYXJlck5hbWUnLCBtc2dQU1AuZXJyb1BhcmFtQm9keUJlYXJlck5hbWVSZXF1aXJlZCkubm90RW1wdHkoKTtcbiAgICAgICAgICAgIHJlcS5hc3NlcnQoJ2R0RXhwaXJhdGlvbicsIG1zZ1BTUC5lcnJvUGFyYW1Cb2R5RHRFeHBpcmF0aW9uUmVxdWlyZWQpLm5vdEVtcHR5KCk7XG4gICAgICAgICAgICByZXEuYXNzZXJ0KCdjdnYnLCBtc2dQU1AuZXJyb1BhcmFtQm9keUNWVlJlcXVpcmVkKS5ub3RFbXB0eSgpO1xuICAgICAgICAgICAgcmVxLmFzc2VydCgnY2xpZW50SWQnLCBtc2dQU1AuZXJyb1BhcmFtQm9keUNsaWVudElkUmVxdWlyZWQpLm5vdEVtcHR5KCkuaXNOdW1lcmljKClcblxuICAgICAgICAgICAgIGxldCBlcnJvcnMgPSByZXEudmFsaWRhdGlvbkVycm9ycygpO1xuXG4gICAgICAgICAgICAvL1ZhbGlkYW5kbyBwYXJhbWV0cm9zIGVudmlhZG9zXG4gICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hZGRNc2dFcnJvcih0TXNnLkRBTkdFUiwgbXNnUFNQLmVycm9Qcm9jZXNzUmVjb3JkUFNQLCBlcnJvcnMpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF9cblxuICAgICAgICAgICAgLy9UcmF0YW1lbnRvIGRlIGRhdGEgaW52YWxpZGEgb3UgZXhwaXJhZGFcbiAgICAgICAgICAgIGlmICghZGF0ZUZucy5pc0RhdGUoYm9keVJlcXVlc3QuZHRFeHBpcmF0aW9uKSAmJlxuICAgICAgICAgICAgICAgIGRhdGVGbnMuY29tcGFyZURlc2MoIG5ldyBEYXRlKCksIGRhdGVGbnMucGFyc2UoYm9keVJlcXVlc3QuZHRFeHBpcmF0aW9uKSkgIT09IDEgKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hZGRNc2dFcnJvcih0TXNnLkRBTkdFUiwgbXNnUFNQLmVycm9Qcm9jZXNzUmVjb3JkUFNQLCBcIkNhcnTDo28gRXhwaXJhZG8uXCIpO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF9cblxuICAgICAgICAgICAgbGV0IGNsaWVudCA9IGF3YWl0IENsaWVudC5maW5kQnlJZChib2R5UmVxdWVzdC5jbGllbnRJZCk7XG5cbiAgICAgICAgICAgIGlmICghY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hZGRNc2dFcnJvcih0TXNnLkRBTkdFUiwgbXNnUFNQLmVycm9Qcm9jZXNzUmVjb3JkUFNQLCBcIkNsaWVudGUgZGVzY29uaGVjaWRvLlwiKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF9cblxuICAgICAgICAgICAgLy9SZXNvbHZlbmRvIHF1ZXN0w6NvIGRlIHNlZ3VyYW7Dp2EgZG8gbnVtZXJvXG4gICAgICAgICAgICBsZXQgbnVtQ2FyZCA9IG5ldyBTdHJpbmdNYXNrKCcqKioqKioqKioqKiowMDAwJykuYXBwbHkoYm9keVJlcXVlc3QubnVtQ2FyZCk7XG5cbiAgICAgICAgICAgIC8vIFZhbG9yIGVtIGZvcm1hdG8gYXByZXNlbnRhY2FvXG4gICAgICAgICAgICBsZXQgdmxyQXByZXNlbnRhY2FvRnVsbCA9XG4gICAgICAgICAgICAgICAgKGJvZHlSZXF1ZXN0LnZsclRyYW5zYWN0aW9uKS50b0xvY2FsZVN0cmluZygncHQtQlInLFxuICAgICAgICAgICAgICAgICAgICB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSk7XG5cbiAgICAgICAgICAgIC8vUmVnaXN0cmFuZG8gYSB0cmFuc2HDp8Ojb1xuICAgICAgICAgICAgbGV0IHRyYW5zYWN0aW9uQmFzZSA9IGF3YWl0IFRyYW5zYWN0aW9uLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgJ3ZsclRyYW5zYWN0aW9uJyA6IE51bWJlcihib2R5UmVxdWVzdC52bHJUcmFuc2FjdGlvbiksXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyA6IGJvZHlSZXF1ZXN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICd0eXBlVHJhbnNhY3Rpb24nIDogYm9keVJlcXVlc3QudHlwZVRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICdudW1DYXJkJyA6IG51bUNhcmQsXG4gICAgICAgICAgICAgICAgJ2JlYXJlck5hbWUnIDogYm9keVJlcXVlc3QuYmVhcmVyTmFtZSxcbiAgICAgICAgICAgICAgICAnZHRFeHBpcmF0aW9uJyA6IGRhdGVGbnMucGFyc2UoYm9keVJlcXVlc3QuZHRFeHBpcmF0aW9uKSxcbiAgICAgICAgICAgICAgICAnY3Z2JyA6IGJvZHlSZXF1ZXN0LmN2dlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHZhbGlkYW5kbyBzdGF0dXNcbiAgICAgICAgICAgIGxldCBzdGF0dXNQYXlhYmxlID0gYm9keVJlcXVlc3QudHlwZVRyYW5zYWN0aW9uID09IDEgPyAxIDogMjtcbiAgICAgICAgICAgIC8vIFJlc29sdmVuZG8gZGF0YSBkZSBwYWdhbWVudG9cbiAgICAgICAgICAgIGxldCBkdFBheW1lbnQgPSBzdGF0dXNQYXlhYmxlID09IDEgPyBuZXcgRGF0ZSgpIDogZGF0ZUZucy5hZGREYXlzKG5ldyBEYXRlKCksIDMwKTtcbiAgICAgICAgICAgIC8vIFJlc29sdmVuZG8gcG9yY2VudGFnZW0gcGFyYSB0YXhhXG4gICAgICAgICAgICBsZXQgcGVyY2VudFJhdGUgPSBib2R5UmVxdWVzdC50eXBlVHJhbnNhY3Rpb24gPT0gMSA/IDMgOiA1O1xuICAgICAgICAgICAgLy8gVmFsb3IgZGEgdHJhbnNhw6fDo29cbiAgICAgICAgICAgIGxldCB2bHJCYXNlID0gTnVtYmVyKGJvZHlSZXF1ZXN0LnZsclRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgIC8vIFZhbG9yIHRvdGFsIHF1ZSBzZXLDoSB1c2FkbyBjb21vIHRheGEgYWRtaW5pc3RyYXRpdmFcbiAgICAgICAgICAgIGxldCB2bHJQYXlhYmxlUGVyY2VudCA9IE51bWJlcihib2R5UmVxdWVzdC52bHJUcmFuc2FjdGlvbikgKiAoTnVtYmVyKHBlcmNlbnRSYXRlKSAvIDEwMCk7XG4gICAgICAgICAgICAvLyBWYWxvciBkbyByZWNlYml2w6lsIGZpbmFsXG4gICAgICAgICAgICBsZXQgdmxyUGF5YWJsZSA9IHZsckJhc2UgLSBOdW1iZXIodmxyUGF5YWJsZVBlcmNlbnQpO1xuICAgICAgICAgICAgLy8gR2VyYW5kbyB1bSBoYXNoIHBhcmEgY29uc3VsdGFzIGZ1dHVyYXNcbiAgICAgICAgICAgIGxldCBoYXNoVHJhbnNhY3Rpb24gPSBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1JykudXBkYXRlKEpTT04uc3RyaW5naWZ5KHRyYW5zYWN0aW9uQmFzZSkpLmRpZ2VzdChcImhleFwiKTtcblxuICAgICAgICAgICAgLy8gc2FsdmFuZG8gb3MgcGFnYXZlaXMgZGEgdHJhbnNhw6fDo29cbiAgICAgICAgICAgIGxldCBwYXlhYmxlQmFzZSA9IGF3YWl0IFBheWFibGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAndHJhbnNhY3Rpb25JZCcgOiB0cmFuc2FjdGlvbkJhc2UuaWQsXG4gICAgICAgICAgICAgICAgJ3N0YXR1cyc6IHN0YXR1c1BheWFibGUsXG4gICAgICAgICAgICAgICAgJ2R0UGF5bWVudCc6IGR0UGF5bWVudCxcbiAgICAgICAgICAgICAgICAncGVyY2VudFJhdGUnOiBwZXJjZW50UmF0ZSxcbiAgICAgICAgICAgICAgICAndmxyUGF5YWJsZSc6IHZsclBheWFibGUsXG4gICAgICAgICAgICAgICAgJ2hhc2hUcmFuc2FjdGlvbicgOiBoYXNoVHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgJ2NsaWVudElkJyA6IGNsaWVudC5pZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vcmVzdWx0Lm51bUNhcmQgPSBudW1DYXJkOy8vXG4gICAgICAgICAgICAvL3Jlc3VsdC52bHJBcHJlc2VudGFjYW9GdWxsID0gdmxyQXByZXNlbnRhY2FvRnVsbDtcbiAgICAgICAgICAgIC8vcmVzdWx0LnN0YXR1c1BheWFibGUgPSBzdGF0dXNQYXlhYmxlO1xuICAgICAgICAgICAgLy9yZXN1bHQuZHRQYXltZW50ID0gZHRQYXltZW50O1xuICAgICAgICAgICAgLy9yZXN1bHQucGVyY2VudFJhdGUgPSBwZXJjZW50UmF0ZTtcbiAgICAgICAgICAgIC8vcmVzdWx0LnZsckJhc2UgPSB2bHJCYXNlO1xuICAgICAgICAgICAgLy9yZXN1bHQudmxyUGF5YWJsZVBlcmNlbnQgPSB2bHJQYXlhYmxlUGVyY2VudDtcbiAgICAgICAgICAgIC8vcmVzdWx0LnZsclBheWFibGUgPSB2bHJQYXlhYmxlO1xuICAgICAgICAgICAgLy9yZXN1bHQuaGFzaCA9IHBheWFibGVCYXNlLmhhc2hUcmFuc2FjdGlvbjtcbiAgICAgICAgICAgIHJlc3VsdC50cmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uQmFzZTtcbiAgICAgICAgICAgIC8vcmVzdWx0LnBheWFibGUgPSBwYXlhYmxlQmFzZTtcblxuICAgICAgICAgICAgZGF0YS5vYmogPSByZXN1bHQ7XG4gICAgICAgICAgICBkYXRhLmFkZE1zZyh0TXNnLlNVQ0NFU1MsIFwiU3VjZXNzby5cIik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICAgICAgfSAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICBkYXRhLmFkZE1zZ0Vycm9yKHRNc2cuREFOR0VSLCBtc2dFcnJvLmVycm9Bb1JlYWxpemFyQ29uc3VsdGEsIFwiRXJyb3IgXCIpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUFNQU2VydmljZSgpXG4iXX0=