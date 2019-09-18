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
                    'hashTransaction': hashTransaction
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1BTUFNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy9hcHAvc2VydmljZS9QU1BTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw4Q0FBdUM7QUFDdkMsMENBQXFDO0FBQ3JDLGtFQUE0RDtBQUM1RCwwQ0FBMEM7QUFDMUMsZ0VBQXNEO0FBQ3RELG9DQUFvQztBQUVwQyx3REFBOEM7QUFFOUMsaUNBQWlDO0FBRWpDO0lBRWlCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRzs7WUFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLE1BQU0sR0FBdUIsRUFBRSxDQUFDO1lBRXBDLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQywwQkFBMEI7WUFDdEQsSUFBSSxDQUFDO2dCQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUseUJBQU0sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwRixHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSx5QkFBTSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzlFLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUseUJBQU0sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7Z0JBQzNILEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLHlCQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFB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QUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFBRSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBSSxDQUFDLE1BQU0sRUFBRSwwQkFBTyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM5QixDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUFFRCxrQkFBZSxJQUFJLFVBQVUsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0TXNnfSBmcm9tIFwiLi4vLi4vdXRpbC9WYWx1ZXNcIjtcbmltcG9ydCB7RGF0YX0gZnJvbSBcIi4uLy4uL3V0aWwvRGF0YVwiO1xuaW1wb3J0IHttc2dFcnJvLCBtc2dQU1B9IGZyb20gXCIuLi8uLi91dGlsL01lc3NhZ2VUcmFuc2xhdGVcIjtcbmltcG9ydCAqIGFzIFN0cmluZ01hc2sgZnJvbSAnc3RyaW5nLW1hc2snO1xuaW1wb3J0IHtUcmFuc2FjdGlvbn0gZnJvbSBcIi4uL21vZGVsL1RyYW5zYWN0aW9uTW9kZWxcIjtcbmltcG9ydCAqIGFzIGRhdGVGbnMgZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IFBheWFibGVTZXJ2aWNlIGZyb20gXCIuL1BheWFibGVTZXJ2aWNlXCI7XG5pbXBvcnQge1BheWFibGV9IGZyb20gXCIuLi9tb2RlbC9QYXlhYmxlTW9kZWxcIjtcbmltcG9ydCB7Q29sdW1ufSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjsgLy9odHRwczovL2RhdGUtZm5zLm9yZy9cbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nO1xuXG5jbGFzcyBQU1BTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBhc3luYyByZWNvcmQocmVxLCByZXMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0YSgpO1xuICAgICAgICBsZXQgcmVzdWx0OiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcblxuICAgICAgICBsZXQgYm9keVJlcXVlc3QgPSByZXEuYm9keTsgLy9QZWdhIGluZm9ybWHDp8O1ZXMgZG8gYm9keVxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICByZXEuYXNzZXJ0KCd2bHJUcmFuc2FjdGlvbicsIG1zZ1BTUC5lcnJvUGFyYW1Cb2R5VmxydHJhbnNhY3Rpb25SZXF1aXJlZCkubm90RW1wdHkoKTtcbiAgICAgICAgICAgIHJlcS5hc3NlcnQoJ2Rlc2NyaXB0aW9uJywgbXNnUFNQLmVycm9QYXJhbUJvZHlEZXNjcmlwdGlvblJlcXVpcmVkKS5ub3RFbXB0eSgpO1xuICAgICAgICAgICAgcmVxLmFzc2VydCgndHlwZVRyYW5zYWN0aW9uJywgbXNnUFNQLmVycm9QYXJhbUJvZHlUeXBlVHJhbnNhY3Rpb25SZXF1aXJlZCkubm90RW1wdHkoKS5pc051bWVyaWMoKS5pc0ludCh7IG1pbjogMSwgbWF4OiAyfSk7XG4gICAgICAgICAgICByZXEuYXNzZXJ0KCdudW1DYXJkJywgbXNnUFNQLmVycm9QYXJhbUJvZHlOdW1DYXJkUmVxdWlyZWQpLm5vdEVtcHR5KCkuaXNOdW1lcmljKCkubGVuKHsgbWluOiAxNCwgbWF4OiAxNn0pO1xuICAgICAgICAgICAgcmVxLmFzc2VydCgnYmVhcmVyTmFtZScsIG1zZ1BTUC5lcnJvUGFyYW1Cb2R5QmVhcmVyTmFtZVJlcXVpcmVkKS5ub3RFbXB0eSgpO1xuICAgICAgICAgICAgcmVxLmFzc2VydCgnZHRFeHBpcmF0aW9uJywgbXNnUFNQLmVycm9QYXJhbUJvZHlEdEV4cGlyYXRpb25SZXF1aXJlZCkubm90RW1wdHkoKTtcbiAgICAgICAgICAgIHJlcS5hc3NlcnQoJ2N2dicsIG1zZ1BTUC5lcnJvUGFyYW1Cb2R5Q1ZWUmVxdWlyZWQpLm5vdEVtcHR5KCk7XG5cbiAgICAgICAgICAgICBsZXQgZXJyb3JzID0gcmVxLnZhbGlkYXRpb25FcnJvcnMoKTtcblxuICAgICAgICAgICAgLy9WYWxpZGFuZG8gcGFyYW1ldHJvcyBlbnZpYWRvc1xuICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIGRhdGEuYWRkTXNnRXJyb3IodE1zZy5EQU5HRVIsIG1zZ1BTUC5lcnJvUHJvY2Vzc1JlY29yZFBTUCwgZXJyb3JzKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfXG5cbiAgICAgICAgICAgIC8vVHJhdGFtZW50byBkZSBkYXRhIGludmFsaWRhIG91IGV4cGlyYWRhXG4gICAgICAgICAgICBpZiAoIWRhdGVGbnMuaXNEYXRlKGJvZHlSZXF1ZXN0LmR0RXhwaXJhdGlvbikgJiZcbiAgICAgICAgICAgICAgICBkYXRlRm5zLmNvbXBhcmVEZXNjKCBuZXcgRGF0ZSgpLCBkYXRlRm5zLnBhcnNlKGJvZHlSZXF1ZXN0LmR0RXhwaXJhdGlvbikpICE9PSAxICkge1xuICAgICAgICAgICAgICAgIGRhdGEuYWRkTXNnRXJyb3IodE1zZy5EQU5HRVIsIG1zZ1BTUC5lcnJvUHJvY2Vzc1JlY29yZFBTUCwgXCJDYXJ0w6NvIEV4cGlyYWRvLlwiKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfXG5cbiAgICAgICAgICAgIC8vUmVzb2x2ZW5kbyBxdWVzdMOjbyBkZSBzZWd1cmFuw6dhIGRvIG51bWVyb1xuICAgICAgICAgICAgbGV0IG51bUNhcmQgPSBuZXcgU3RyaW5nTWFzaygnKioqKioqKioqKioqMDAwMCcpLmFwcGx5KGJvZHlSZXF1ZXN0Lm51bUNhcmQpO1xuXG4gICAgICAgICAgICAvLyBWYWxvciBlbSBmb3JtYXRvIGFwcmVzZW50YWNhb1xuICAgICAgICAgICAgbGV0IHZsckFwcmVzZW50YWNhb0Z1bGwgPVxuICAgICAgICAgICAgICAgIChib2R5UmVxdWVzdC52bHJUcmFuc2FjdGlvbikudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJyxcbiAgICAgICAgICAgICAgICAgICAgeyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdCUkwnIH0pO1xuXG4gICAgICAgICAgICAvL1JlZ2lzdHJhbmRvIGEgdHJhbnNhw6fDo29cbiAgICAgICAgICAgIGxldCB0cmFuc2FjdGlvbkJhc2UgPSBhd2FpdCBUcmFuc2FjdGlvbi5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICd2bHJUcmFuc2FjdGlvbicgOiBOdW1iZXIoYm9keVJlcXVlc3QudmxyVHJhbnNhY3Rpb24pLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicgOiBib2R5UmVxdWVzdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAndHlwZVRyYW5zYWN0aW9uJyA6IGJvZHlSZXF1ZXN0LnR5cGVUcmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAnbnVtQ2FyZCcgOiBudW1DYXJkLFxuICAgICAgICAgICAgICAgICdiZWFyZXJOYW1lJyA6IGJvZHlSZXF1ZXN0LmJlYXJlck5hbWUsXG4gICAgICAgICAgICAgICAgJ2R0RXhwaXJhdGlvbicgOiBkYXRlRm5zLnBhcnNlKGJvZHlSZXF1ZXN0LmR0RXhwaXJhdGlvbiksXG4gICAgICAgICAgICAgICAgJ2N2dicgOiBib2R5UmVxdWVzdC5jdnZcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB2YWxpZGFuZG8gc3RhdHVzXG4gICAgICAgICAgICBsZXQgc3RhdHVzUGF5YWJsZSA9IGJvZHlSZXF1ZXN0LnR5cGVUcmFuc2FjdGlvbiA9PSAxID8gMSA6IDI7XG4gICAgICAgICAgICAvLyBSZXNvbHZlbmRvIGRhdGEgZGUgcGFnYW1lbnRvXG4gICAgICAgICAgICBsZXQgZHRQYXltZW50ID0gc3RhdHVzUGF5YWJsZSA9PSAxID8gbmV3IERhdGUoKSA6IGRhdGVGbnMuYWRkRGF5cyhuZXcgRGF0ZSgpLCAzMCk7XG4gICAgICAgICAgICAvLyBSZXNvbHZlbmRvIHBvcmNlbnRhZ2VtIHBhcmEgdGF4YVxuICAgICAgICAgICAgbGV0IHBlcmNlbnRSYXRlID0gYm9keVJlcXVlc3QudHlwZVRyYW5zYWN0aW9uID09IDEgPyAzIDogNTtcbiAgICAgICAgICAgIC8vIFZhbG9yIGRhIHRyYW5zYcOnw6NvXG4gICAgICAgICAgICBsZXQgdmxyQmFzZSA9IE51bWJlcihib2R5UmVxdWVzdC52bHJUcmFuc2FjdGlvbik7XG4gICAgICAgICAgICAvLyBWYWxvciB0b3RhbCBxdWUgc2Vyw6EgdXNhZG8gY29tbyB0YXhhIGFkbWluaXN0cmF0aXZhXG4gICAgICAgICAgICBsZXQgdmxyUGF5YWJsZVBlcmNlbnQgPSBOdW1iZXIoYm9keVJlcXVlc3QudmxyVHJhbnNhY3Rpb24pICogKE51bWJlcihwZXJjZW50UmF0ZSkgLyAxMDApO1xuICAgICAgICAgICAgLy8gVmFsb3IgZG8gcmVjZWJpdsOpbCBmaW5hbFxuICAgICAgICAgICAgbGV0IHZsclBheWFibGUgPSB2bHJCYXNlIC0gTnVtYmVyKHZsclBheWFibGVQZXJjZW50KTtcbiAgICAgICAgICAgIC8vIEdlcmFuZG8gdW0gaGFzaCBwYXJhIGNvbnN1bHRhcyBmdXR1cmFzXG4gICAgICAgICAgICBsZXQgaGFzaFRyYW5zYWN0aW9uID0gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZShKU09OLnN0cmluZ2lmeSh0cmFuc2FjdGlvbkJhc2UpKS5kaWdlc3QoXCJoZXhcIik7XG5cbiAgICAgICAgICAgIC8vIHNhbHZhbmRvIG9zIHBhZ2F2ZWlzIGRhIHRyYW5zYcOnw6NvXG4gICAgICAgICAgICBsZXQgcGF5YWJsZUJhc2UgPSBhd2FpdCBQYXlhYmxlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgJ3RyYW5zYWN0aW9uSWQnIDogdHJhbnNhY3Rpb25CYXNlLmlkLFxuICAgICAgICAgICAgICAgICdzdGF0dXMnOiBzdGF0dXNQYXlhYmxlLFxuICAgICAgICAgICAgICAgICdkdFBheW1lbnQnOiBkdFBheW1lbnQsXG4gICAgICAgICAgICAgICAgJ3BlcmNlbnRSYXRlJzogcGVyY2VudFJhdGUsXG4gICAgICAgICAgICAgICAgJ3ZsclBheWFibGUnOiB2bHJQYXlhYmxlLFxuICAgICAgICAgICAgICAgICdoYXNoVHJhbnNhY3Rpb24nIDogaGFzaFRyYW5zYWN0aW9uXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9yZXN1bHQubnVtQ2FyZCA9IG51bUNhcmQ7Ly9cbiAgICAgICAgICAgIC8vcmVzdWx0LnZsckFwcmVzZW50YWNhb0Z1bGwgPSB2bHJBcHJlc2VudGFjYW9GdWxsO1xuICAgICAgICAgICAgLy9yZXN1bHQuc3RhdHVzUGF5YWJsZSA9IHN0YXR1c1BheWFibGU7XG4gICAgICAgICAgICAvL3Jlc3VsdC5kdFBheW1lbnQgPSBkdFBheW1lbnQ7XG4gICAgICAgICAgICAvL3Jlc3VsdC5wZXJjZW50UmF0ZSA9IHBlcmNlbnRSYXRlO1xuICAgICAgICAgICAgLy9yZXN1bHQudmxyQmFzZSA9IHZsckJhc2U7XG4gICAgICAgICAgICAvL3Jlc3VsdC52bHJQYXlhYmxlUGVyY2VudCA9IHZsclBheWFibGVQZXJjZW50O1xuICAgICAgICAgICAgLy9yZXN1bHQudmxyUGF5YWJsZSA9IHZsclBheWFibGU7XG4gICAgICAgICAgICAvL3Jlc3VsdC5oYXNoID0gcGF5YWJsZUJhc2UuaGFzaFRyYW5zYWN0aW9uO1xuICAgICAgICAgICAgcmVzdWx0LnRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25CYXNlO1xuICAgICAgICAgICAgLy9yZXN1bHQucGF5YWJsZSA9IHBheWFibGVCYXNlO1xuXG4gICAgICAgICAgICBkYXRhLm9iaiA9IHJlc3VsdDtcbiAgICAgICAgICAgIGRhdGEuYWRkTXNnKHRNc2cuU1VDQ0VTUywgXCJTdWNlc3NvLlwiKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGRhdGEpO1xuICAgICAgICB9ICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIGRhdGEuYWRkTXNnRXJyb3IodE1zZy5EQU5HRVIsIG1zZ0Vycm8uZXJyb0FvUmVhbGl6YXJDb25zdWx0YSwgXCJFcnJvciBcIik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbihkYXRhKVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQU1BTZXJ2aWNlKClcbiJdfQ==