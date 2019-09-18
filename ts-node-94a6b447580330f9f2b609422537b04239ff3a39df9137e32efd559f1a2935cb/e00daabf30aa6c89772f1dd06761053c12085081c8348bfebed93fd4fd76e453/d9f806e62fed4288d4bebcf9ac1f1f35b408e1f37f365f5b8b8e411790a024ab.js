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
}
exports.default = new PayableService();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1BheWFibGVTZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL3NlcnZpY2UvUGF5YWJsZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDhDQUF1QztBQUN2QywwQ0FBcUM7QUFDckMsa0VBQW9EO0FBQ3BELHdEQUE4QztBQUU5QztJQUVpQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxNQUFNLEdBQXVCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxTQUFTLEdBQUcsTUFBTSxzQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFDakQsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLFlBQVksR0FBRyxNQUFNLHNCQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUN2RCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRTVDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxzQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztnQkFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLDBCQUFPLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3hFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzlCLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FFSjtBQUVELGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3RNc2d9IGZyb20gXCIuLi8uLi91dGlsL1ZhbHVlc1wiO1xuaW1wb3J0IHtEYXRhfSBmcm9tIFwiLi4vLi4vdXRpbC9EYXRhXCI7XG5pbXBvcnQge21zZ0Vycm99IGZyb20gXCIuLi8uLi91dGlsL01lc3NhZ2VUcmFuc2xhdGVcIjtcbmltcG9ydCB7UGF5YWJsZX0gZnJvbSBcIi4uL21vZGVsL1BheWFibGVNb2RlbFwiO1xuXG5jbGFzcyBQYXlhYmxlU2VydmljZSB7XG5cbiAgICBwdWJsaWMgYXN5bmMgcGF5YWJsZShyZXEsIHJlcykge1xuICAgICAgICBsZXQgZGF0YSA9IG5ldyBEYXRhKCk7XG4gICAgICAgIGxldCByZXN1bHQ6IHtbazogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IGF3YWl0IFBheWFibGUuc3VtKCd2bHJQYXlhYmxlJywgeyB3aGVyZTogeyBzdGF0dXM6IDEgfSB9KTtcbiAgICAgICAgICAgIHJlc3VsdC5hdmFpbGFibGUgPSAoYXZhaWxhYmxlKS50b0xvY2FsZVN0cmluZygncHQtQlInLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnQlJMJyB9KTtcblxuICAgICAgICAgICAgbGV0IHdhaXRpbmdGdW5kcyA9IGF3YWl0IFBheWFibGUuc3VtKCd2bHJQYXlhYmxlJywgeyB3aGVyZTogeyBzdGF0dXM6IDIgfSB9KTtcbiAgICAgICAgICAgIHJlc3VsdC53YWl0aW5nRnVuZHMgPSAod2FpdGluZ0Z1bmRzKS50b0xvY2FsZVN0cmluZygncHQtQlInLFxuICAgICAgICAgICAgICAgIHsgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnQlJMJyB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVzdWx0LnBheWFibGVzID0gYXdhaXQgUGF5YWJsZS5maW5kQWxsKCk7XG4gICAgICAgICAgICBkYXRhLm9iaiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGRhdGEpO1xuICAgICAgICB9ICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGRhdGEuYWRkTXNnRXJyb3IodE1zZy5EQU5HRVIsIG1zZ0Vycm8uZXJyb0FvUmVhbGl6YXJDb25zdWx0YSwgXCJFcnJvciBcIik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbihkYXRhKVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQYXlhYmxlU2VydmljZSgpXG4iXX0=