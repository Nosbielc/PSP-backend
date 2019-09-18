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
const PayableModel_1 = require("../model/PayableModel");
const ClientModel_1 = require("../model/ClientModel");
class PayableService {
    payable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new Data_1.Data();
            let result = {};
            try {
                let available = yield PayableModel_1.Payable.sum('vlrPayable', { where: { status: 1 } });
                result.available = (available).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                let waitingFunds = yield PayableModel_1.Payable.sum('vlrPayable', { where: { status: 2 } });
                result.waitingFunds = (waitingFunds).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                result.payables = yield PayableModel_1.Payable.findAll();
                data.obj = result;
                res.status(200).json(data);
            }
            catch (error) {
                data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgErro.erroAoRealizarConsulta, "Error ");
                res.status(500).json(data);
            }
        });
    }
    payableByClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new Data_1.Data();
            let id = req.params.clientId;
            let result = {};
            try {
                let client = yield ClientModel_1.Client.findById(id);
                if (!client) {
                    data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgPSP.erroProcessRecordPSP, "Cliente desconhecido.");
                    res.status(400).send(data);
                    return;
                }
                // - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _
                let available = yield PayableModel_1.Payable.sum('vlrPayable', { where: { status: 1, clientId: client.id } });
                result.available = (available).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                let waitingFunds = yield PayableModel_1.Payable.sum('vlrPayable', { where: { status: 2, clientId: client.id } });
                result.waitingFunds = (waitingFunds).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                result.payables = yield PayableModel_1.Payable.findAll({
                    where: { clientId: client.id }
                });
                data.obj = result;
                res.status(200).json(data);
            }
            catch (error) {
                data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgErro.erroAoRealizarConsulta, "Error ");
                res.status(500).json(data);
            }
        });
    }
}
exports.default = new PayableService();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1BheWFibGVTZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL3NlcnZpY2UvUGF5YWJsZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDhDQUF1QztBQUN2QywwQ0FBcUM7QUFDckMsa0VBQTREO0FBQzVELHdEQUE4QztBQUM5QyxzREFBNEM7QUFFNUM7SUFFaUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHOztZQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3RCLElBQUksTUFBTSxHQUF1QixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDO2dCQUNELElBQUksU0FBUyxHQUFHLE1BQU0sc0JBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQ2pELEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxZQUFZLEdBQUcsTUFBTSxzQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RSxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFDdkQsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sc0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztn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a0JBQWUsSUFBSSxjQUFjLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dE1zZ30gZnJvbSBcIi4uLy4uL3V0aWwvVmFsdWVzXCI7XG5pbXBvcnQge0RhdGF9IGZyb20gXCIuLi8uLi91dGlsL0RhdGFcIjtcbmltcG9ydCB7bXNnRXJybywgbXNnUFNQfSBmcm9tIFwiLi4vLi4vdXRpbC9NZXNzYWdlVHJhbnNsYXRlXCI7XG5pbXBvcnQge1BheWFibGV9IGZyb20gXCIuLi9tb2RlbC9QYXlhYmxlTW9kZWxcIjtcbmltcG9ydCB7Q2xpZW50fSBmcm9tIFwiLi4vbW9kZWwvQ2xpZW50TW9kZWxcIjtcblxuY2xhc3MgUGF5YWJsZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIGFzeW5jIHBheWFibGUocmVxLCByZXMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0YSgpO1xuICAgICAgICBsZXQgcmVzdWx0OiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSBhd2FpdCBQYXlhYmxlLnN1bSgndmxyUGF5YWJsZScsIHsgd2hlcmU6IHsgc3RhdHVzOiAxIH0gfSk7XG4gICAgICAgICAgICByZXN1bHQuYXZhaWxhYmxlID0gKGF2YWlsYWJsZSkudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSk7XG5cbiAgICAgICAgICAgIGxldCB3YWl0aW5nRnVuZHMgPSBhd2FpdCBQYXlhYmxlLnN1bSgndmxyUGF5YWJsZScsIHsgd2hlcmU6IHsgc3RhdHVzOiAyIH0gfSk7XG4gICAgICAgICAgICByZXN1bHQud2FpdGluZ0Z1bmRzID0gKHdhaXRpbmdGdW5kcykudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5wYXlhYmxlcyA9IGF3YWl0IFBheWFibGUuZmluZEFsbCgpO1xuICAgICAgICAgICAgZGF0YS5vYmogPSByZXN1bHQ7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICAgICAgfSAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBkYXRhLmFkZE1zZ0Vycm9yKHRNc2cuREFOR0VSLCBtc2dFcnJvLmVycm9Bb1JlYWxpemFyQ29uc3VsdGEsIFwiRXJyb3IgXCIpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBwYXlhYmxlQnlDbGllbnQocmVxLCByZXMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0YSgpO1xuICAgICAgICBsZXQgaWQgPSByZXEucGFyYW1zLmNsaWVudElkO1xuICAgICAgICBsZXQgcmVzdWx0OiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgbGV0IGNsaWVudCA9IGF3YWl0IENsaWVudC5maW5kQnlJZChpZCk7XG5cbiAgICAgICAgICAgIGlmICghY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hZGRNc2dFcnJvcih0TXNnLkRBTkdFUiwgbXNnUFNQLmVycm9Qcm9jZXNzUmVjb3JkUFNQLCBcIkNsaWVudGUgZGVzY29uaGVjaWRvLlwiKTtcbiAgICAgICAgICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF8gLSBfIC0gXyAtIF9cbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSBhd2FpdCBQYXlhYmxlLnN1bSgndmxyUGF5YWJsZScsIHsgd2hlcmU6IHsgc3RhdHVzOiAxICwgY2xpZW50SWQ6IGNsaWVudC5pZH0gfSk7XG4gICAgICAgICAgICByZXN1bHQuYXZhaWxhYmxlID0gKGF2YWlsYWJsZSkudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSk7XG5cbiAgICAgICAgICAgIGxldCB3YWl0aW5nRnVuZHMgPSBhd2FpdCBQYXlhYmxlLnN1bSgndmxyUGF5YWJsZScsIHsgd2hlcmU6IHsgc3RhdHVzOiAyLCBjbGllbnRJZDogY2xpZW50LmlkfSB9KTtcbiAgICAgICAgICAgIHJlc3VsdC53YWl0aW5nRnVuZHMgPSAod2FpdGluZ0Z1bmRzKS50b0xvY2FsZVN0cmluZygncHQtQlInLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnQlJMJyB9KTtcblxuICAgICAgICAgICAgcmVzdWx0LnBheWFibGVzID0gYXdhaXQgUGF5YWJsZS5maW5kQWxsKHtcbiAgICAgICAgICAgICAgICB3aGVyZSA6IHsgY2xpZW50SWQgOiBjbGllbnQuaWR9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGF0YS5vYmogPSByZXN1bHQ7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICAgICAgfSAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBkYXRhLmFkZE1zZ0Vycm9yKHRNc2cuREFOR0VSLCBtc2dFcnJvLmVycm9Bb1JlYWxpemFyQ29uc3VsdGEsIFwiRXJyb3IgXCIpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUGF5YWJsZVNlcnZpY2UoKVxuIl19