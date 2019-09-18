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
const TransactionModel_1 = require("../model/TransactionModel");
class TransactionService {
    transaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = new Data_1.Data();
            let result = {};
            try {
                result.transactions = yield TransactionModel_1.Transaction.findAll();
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
exports.default = new TransactionService();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1RyYW5zYWN0aW9uU2VydmljZS50cyIsInNvdXJjZXMiOlsiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9zZXJ2aWNlL1RyYW5zYWN0aW9uU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOENBQXVDO0FBQ3ZDLDBDQUFxQztBQUNyQyxrRUFBb0Q7QUFDcEQsZ0VBQXNEO0FBRXREO0lBRWlCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRzs7WUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLE1BQU0sR0FBdUIsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQztnQkFDRCxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sOEJBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0JBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFBRSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBSSxDQUFDLE1BQU0sRUFBRSwwQkFBTyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN4RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM5QixDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3RNc2d9IGZyb20gXCIuLi8uLi91dGlsL1ZhbHVlc1wiO1xuaW1wb3J0IHtEYXRhfSBmcm9tIFwiLi4vLi4vdXRpbC9EYXRhXCI7XG5pbXBvcnQge21zZ0Vycm99IGZyb20gXCIuLi8uLi91dGlsL01lc3NhZ2VUcmFuc2xhdGVcIjtcbmltcG9ydCB7VHJhbnNhY3Rpb259IGZyb20gXCIuLi9tb2RlbC9UcmFuc2FjdGlvbk1vZGVsXCI7XG5cbmNsYXNzIFRyYW5zYWN0aW9uU2VydmljZSB7XG5cbiAgICBwdWJsaWMgYXN5bmMgdHJhbnNhY3Rpb24ocmVxLCByZXMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0YSgpO1xuICAgICAgICBsZXQgcmVzdWx0OiB7W2s6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdC50cmFuc2FjdGlvbnMgPSBhd2FpdCBUcmFuc2FjdGlvbi5maW5kQWxsKCk7XG4gICAgICAgICAgICBkYXRhLm9iaiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGRhdGEpO1xuICAgICAgICB9ICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGRhdGEuYWRkTXNnRXJyb3IodE1zZy5EQU5HRVIsIG1zZ0Vycm8uZXJyb0FvUmVhbGl6YXJDb25zdWx0YSwgXCJFcnJvciBcIik7XG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbihkYXRhKVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBUcmFuc2FjdGlvblNlcnZpY2UoKVxuIl19