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
class TransactionService {
    transaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new Data_1.Data();
            try {
                data.addMsg(Values_1.tMsg.SUCCESS, "Sucesso na transação. ");
                res.status(200).json(data);
            }
            catch (error) {
                data.addMsgError(Values_1.tMsg.DANGER, MessageTranslate_1.msgErro.erroAoRealizarConsulta, "Error ");
                res.status(500).json(data);
            }
        });
    }
}
exports.default = new TransactionService();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1RyYW5zYWN0aW9uU2VydmljZS50cyIsInNvdXJjZXMiOlsiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1RyYW5zYWN0aW9uU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQXVDO0FBQ3ZDLDBDQUFxQztBQUNyQyxrRUFBb0Q7QUFFcEQ7SUFFaUIsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHOztZQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQztnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQUksQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztnQkFDcEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFJLENBQUMsTUFBTSxFQUFFLDBCQUFPLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3hFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzlCLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FFSjtBQUVELGtCQUFlLElBQUksa0JBQWtCLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dE1zZ30gZnJvbSBcIi4uLy4uL3V0aWwvVmFsdWVzXCI7XG5pbXBvcnQge0RhdGF9IGZyb20gXCIuLi8uLi91dGlsL0RhdGFcIjtcbmltcG9ydCB7bXNnRXJyb30gZnJvbSBcIi4uLy4uL3V0aWwvTWVzc2FnZVRyYW5zbGF0ZVwiO1xuXG5jbGFzcyBUcmFuc2FjdGlvblNlcnZpY2Uge1xuXG4gICAgcHVibGljIGFzeW5jIHRyYW5zYWN0aW9uKHJlcSwgcmVzKSB7XG4gICAgICAgIGxldCBkYXRhID0gbmV3IERhdGEoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRhdGEuYWRkTXNnKHRNc2cuU1VDQ0VTUywgXCJTdWNlc3NvIG5hIHRyYW5zYcOnw6NvLiBcIik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICAgICAgfSAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBkYXRhLmFkZE1zZ0Vycm9yKHRNc2cuREFOR0VSLCBtc2dFcnJvLmVycm9Bb1JlYWxpemFyQ29uc3VsdGEsIFwiRXJyb3IgXCIpO1xuICAgICAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVHJhbnNhY3Rpb25TZXJ2aWNlKClcbiJdfQ==