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
    payableByClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new Data_1.Data();
            let result = {};
            try {
                let available = yield PayableModel_1.Payable.sum('vlrPayable', { where: { status: 1, clientId: 1 } });
                result.available = (available).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                let waitingFunds = yield PayableModel_1.Payable.sum('vlrPayable', { where: { status: 2, clientId: 1 } });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1BheWFibGVTZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL3NlcnZpY2UvUGF5YWJsZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDhDQUF1QztBQUN2QywwQ0FBcUM7QUFDckMsa0VBQW9EO0FBQ3BELHdEQUE4QztBQUU5QztJQUVpQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxNQUFNLEdBQXVCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxTQUFTLEdBQUcsTUFBTSxzQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFDakQsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLFlBQVksR0FBRyxNQUFNLHNCQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzdFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUN2RCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRTVDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxzQkFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztnQkFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLDBCQUFPLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3hFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzlCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFWSxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ2pDLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxNQUFNLEdBQXVCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxTQUFTLEdBQUcsTUFBTSxzQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUNqRCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRTVDLElBQUksWUFBWSxHQUFHLE1BQU0sc0JBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RixNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFDdkQsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sc0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0JBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFBRSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBSSxDQUFDLE1BQU0sRUFBRSwwQkFBTyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM5QixDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUFFRCxrQkFBZSxJQUFJLGNBQWMsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0TXNnfSBmcm9tIFwiLi4vLi4vdXRpbC9WYWx1ZXNcIjtcbmltcG9ydCB7RGF0YX0gZnJvbSBcIi4uLy4uL3V0aWwvRGF0YVwiO1xuaW1wb3J0IHttc2dFcnJvfSBmcm9tIFwiLi4vLi4vdXRpbC9NZXNzYWdlVHJhbnNsYXRlXCI7XG5pbXBvcnQge1BheWFibGV9IGZyb20gXCIuLi9tb2RlbC9QYXlhYmxlTW9kZWxcIjtcblxuY2xhc3MgUGF5YWJsZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIGFzeW5jIHBheWFibGUocmVxLCByZXMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0YSgpO1xuICAgICAgICBsZXQgcmVzdWx0OiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSBhd2FpdCBQYXlhYmxlLnN1bSgndmxyUGF5YWJsZScsIHsgd2hlcmU6IHsgc3RhdHVzOiAxIH0gfSk7XG4gICAgICAgICAgICByZXN1bHQuYXZhaWxhYmxlID0gKGF2YWlsYWJsZSkudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSk7XG5cbiAgICAgICAgICAgIGxldCB3YWl0aW5nRnVuZHMgPSBhd2FpdCBQYXlhYmxlLnN1bSgndmxyUGF5YWJsZScsIHsgd2hlcmU6IHsgc3RhdHVzOiAyIH0gfSk7XG4gICAgICAgICAgICByZXN1bHQud2FpdGluZ0Z1bmRzID0gKHdhaXRpbmdGdW5kcykudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJyxcbiAgICAgICAgICAgICAgICB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0JSTCcgfSk7XG5cbiAgICAgICAgICAgIHJlc3VsdC5wYXlhYmxlcyA9IGF3YWl0IFBheWFibGUuZmluZEFsbCgpO1xuICAgICAgICAgICAgZGF0YS5vYmogPSByZXN1bHQ7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICAgICAgfSAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBkYXRhLmFkZE1zZ0Vycm9yKHRNc2cuREFOR0VSLCBtc2dFcnJvLmVycm9Bb1JlYWxpemFyQ29uc3VsdGEsIFwiRXJyb3IgXCIpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBwYXlhYmxlQnlDbGllbnQocmVxLCByZXMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0YSgpO1xuICAgICAgICBsZXQgcmVzdWx0OiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSBhd2FpdCBQYXlhYmxlLnN1bSgndmxyUGF5YWJsZScsIHsgd2hlcmU6IHsgc3RhdHVzOiAxICwgY2xpZW50SWQ6IDF9IH0pO1xuICAgICAgICAgICAgcmVzdWx0LmF2YWlsYWJsZSA9IChhdmFpbGFibGUpLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdCUkwnIH0pO1xuXG4gICAgICAgICAgICBsZXQgd2FpdGluZ0Z1bmRzID0gYXdhaXQgUGF5YWJsZS5zdW0oJ3ZsclBheWFibGUnLCB7IHdoZXJlOiB7IHN0YXR1czogMiwgY2xpZW50SWQ6IDF9IH0pO1xuICAgICAgICAgICAgcmVzdWx0LndhaXRpbmdGdW5kcyA9ICh3YWl0aW5nRnVuZHMpLnRvTG9jYWxlU3RyaW5nKCdwdC1CUicsXG4gICAgICAgICAgICAgICAgeyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdCUkwnIH0pO1xuXG4gICAgICAgICAgICByZXN1bHQucGF5YWJsZXMgPSBhd2FpdCBQYXlhYmxlLmZpbmRBbGwoKTtcbiAgICAgICAgICAgIGRhdGEub2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oZGF0YSk7XG4gICAgICAgIH0gIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgZGF0YS5hZGRNc2dFcnJvcih0TXNnLkRBTkdFUiwgbXNnRXJyby5lcnJvQW9SZWFsaXphckNvbnN1bHRhLCBcIkVycm9yIFwiKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKGRhdGEpXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFBheWFibGVTZXJ2aWNlKClcbiJdfQ==