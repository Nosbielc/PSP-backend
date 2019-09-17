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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1BheWFibGVTZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL3NlcnZpY2UvUGF5YWJsZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDhDQUF1QztBQUN2QywwQ0FBcUM7QUFDckMsa0VBQW9EO0FBQ3BELHdEQUE4QztBQUU5QztJQUVpQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxNQUFNLEdBQXVCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLHNCQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO2dCQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQUksQ0FBQyxNQUFNLEVBQUUsMEJBQU8sQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDeEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDOUIsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUVKO0FBRUQsa0JBQWUsSUFBSSxjQUFjLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dE1zZ30gZnJvbSBcIi4uLy4uL3V0aWwvVmFsdWVzXCI7XG5pbXBvcnQge0RhdGF9IGZyb20gXCIuLi8uLi91dGlsL0RhdGFcIjtcbmltcG9ydCB7bXNnRXJyb30gZnJvbSBcIi4uLy4uL3V0aWwvTWVzc2FnZVRyYW5zbGF0ZVwiO1xuaW1wb3J0IHtQYXlhYmxlfSBmcm9tIFwiLi4vbW9kZWwvUGF5YWJsZU1vZGVsXCI7XG5cbmNsYXNzIFBheWFibGVTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBhc3luYyBwYXlhYmxlKHJlcSwgcmVzKSB7XG4gICAgICAgIGxldCBkYXRhID0gbmV3IERhdGEoKTtcbiAgICAgICAgbGV0IHJlc3VsdDoge1trOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQucGF5YWJsZXMgPSBhd2FpdCBQYXlhYmxlLmZpbmRBbGwoKTtcbiAgICAgICAgICAgIGRhdGEub2JqID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oZGF0YSk7XG4gICAgICAgIH0gIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgZGF0YS5hZGRNc2dFcnJvcih0TXNnLkRBTkdFUiwgbXNnRXJyby5lcnJvQW9SZWFsaXphckNvbnN1bHRhLCBcIkVycm9yIFwiKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKGRhdGEpXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFBheWFibGVTZXJ2aWNlKClcbiJdfQ==