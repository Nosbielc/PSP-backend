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
                result.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1BheWFibGVTZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL3NlcnZpY2UvUGF5YWJsZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDhDQUF1QztBQUN2QywwQ0FBcUM7QUFDckMsa0VBQW9EO0FBQ3BELHdEQUE4QztBQUU5QztJQUVpQixPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxNQUFNLEdBQXVCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUM7Z0JBQ0QsTUFBTTtvQkFDTixNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sc0JBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0JBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFBRSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBSSxDQUFDLE1BQU0sRUFBRSwwQkFBTyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM5QixDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUFFRCxrQkFBZSxJQUFJLGNBQWMsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0TXNnfSBmcm9tIFwiLi4vLi4vdXRpbC9WYWx1ZXNcIjtcbmltcG9ydCB7RGF0YX0gZnJvbSBcIi4uLy4uL3V0aWwvRGF0YVwiO1xuaW1wb3J0IHttc2dFcnJvfSBmcm9tIFwiLi4vLi4vdXRpbC9NZXNzYWdlVHJhbnNsYXRlXCI7XG5pbXBvcnQge1BheWFibGV9IGZyb20gXCIuLi9tb2RlbC9QYXlhYmxlTW9kZWxcIjtcblxuY2xhc3MgUGF5YWJsZVNlcnZpY2Uge1xuXG4gICAgcHVibGljIGFzeW5jIHBheWFibGUocmVxLCByZXMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0YSgpO1xuICAgICAgICBsZXQgcmVzdWx0OiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdC5cbiAgICAgICAgICAgIHJlc3VsdC5wYXlhYmxlcyA9IGF3YWl0IFBheWFibGUuZmluZEFsbCgpO1xuICAgICAgICAgICAgZGF0YS5vYmogPSByZXN1bHQ7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICAgICAgfSAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBkYXRhLmFkZE1zZ0Vycm9yKHRNc2cuREFOR0VSLCBtc2dFcnJvLmVycm9Bb1JlYWxpemFyQ29uc3VsdGEsIFwiRXJyb3IgXCIpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUGF5YWJsZVNlcnZpY2UoKVxuIl19