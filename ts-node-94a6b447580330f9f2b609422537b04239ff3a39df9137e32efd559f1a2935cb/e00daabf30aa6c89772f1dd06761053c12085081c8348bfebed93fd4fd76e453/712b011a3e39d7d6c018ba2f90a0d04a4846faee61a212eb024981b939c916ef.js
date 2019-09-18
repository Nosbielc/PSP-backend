"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const CreatedAt_1 = require("sequelize-typescript/lib/annotations/CreatedAt");
const DataType_1 = require("sequelize-typescript/lib/enums/DataType");
const PayableModel_1 = require("./PayableModel");
let Transaction = class Transaction extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ type: DataType_1.DataType.FLOAT, allowNull: false, comment: 'Valor da Transação' }),
    __metadata("design:type", Number)
], Transaction.prototype, "vlrTransaction", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Descrição da transação. Ex: Smartband XYZ 3.0 ' }),
    __metadata("design:type", String)
], Transaction.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: DataType_1.DataType.ENUM, values: ['1', '2'], allowNull: false, comment: '1 -> debit_card , 2 -> credit_card' }),
    __metadata("design:type", Number)
], Transaction.prototype, "typeTransaction", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Número do cartão ' }),
    __metadata("design:type", String)
], Transaction.prototype, "numCard", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Nome do portador do cartão' }),
    __metadata("design:type", String)
], Transaction.prototype, "bearerName", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Data de validade do cartão' }),
    __metadata("design:type", Date)
], Transaction.prototype, "dtExpiration", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Código de verificação do cartão (CVV)' }),
    __metadata("design:type", String)
], Transaction.prototype, "cvv", void 0);
__decorate([
    CreatedAt_1.CreatedAt,
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Data da entrada do registro' }),
    __metadata("design:type", Date)
], Transaction.prototype, "dtCreated", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => PayableModel_1.Payable),
    __metadata("design:type", PayableModel_1.Payable)
], Transaction.prototype, "payable", void 0);
Transaction = __decorate([
    sequelize_typescript_1.Table({ tableName: "transaction" })
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9UcmFuc2FjdGlvbk1vZGVsLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL21vZGVsL1RyYW5zYWN0aW9uTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBNkU7QUFDN0UsOEVBQTJFO0FBQzNFLHNFQUFtRTtBQUNuRSxpREFBdUM7QUFJdkMsSUFBYSxXQUFXLEdBQXhCLGlCQUF5QixTQUFRLDRCQUFrQjtDQTZCbEQsQ0FBQTtBQTFCRztJQURDLDZCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQVEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzs7bURBQzNEO0FBR3ZCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGdEQUFnRCxFQUFDLENBQUM7O2dEQUNuRTtBQUdwQjtJQURDLDZCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUcsbUJBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFHLG9DQUFvQyxFQUFDLENBQUM7O29EQUM5RjtBQUd4QjtJQURDLDZCQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDOzs0Q0FDM0M7QUFHaEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUMsQ0FBQzs7K0NBQ2hEO0FBR25CO0lBREMsNkJBQU0sQ0FBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFHLDRCQUE0QixFQUFDLENBQUU7OEJBQ3hELElBQUk7aURBQUM7QUFHbkI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsdUNBQXVDLEVBQUMsQ0FBQzs7d0NBQ2xFO0FBSVo7SUFGQyxxQkFBUztJQUNULDZCQUFNLENBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRyw2QkFBNkIsRUFBQyxDQUFFOzhCQUM1RCxJQUFJOzhDQUFDO0FBR2hCO0lBREMsNkJBQU0sQ0FBRSxNQUFNLHNCQUFPLENBQUM7OEJBQ2Isc0JBQU87NENBQUM7QUE1QlQsV0FBVztJQUR2Qiw0QkFBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGFBQWEsRUFBQyxDQUFDO0dBQ3JCLFdBQVcsQ0E2QnZCO0FBN0JZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCZWxvbmdzVG8sIENvbHVtbiwgSGFzT25lLCBNb2RlbCwgVGFibGV9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgQ3JlYXRlZEF0IH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQvbGliL2Fubm90YXRpb25zL0NyZWF0ZWRBdCc7XG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0L2xpYi9lbnVtcy9EYXRhVHlwZSc7XG5pbXBvcnQge1BheWFibGV9IGZyb20gXCIuL1BheWFibGVNb2RlbFwiO1xuaW1wb3J0ICogYXMgc2VxdWVsaXplIGZyb20gXCJzZXF1ZWxpemVcIjtcblxuQFRhYmxlKHt0YWJsZU5hbWU6IFwidHJhbnNhY3Rpb25cIn0pXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb24gZXh0ZW5kcyBNb2RlbDxUcmFuc2FjdGlvbj4ge1xuXG4gICAgQENvbHVtbih7IHR5cGU6IERhdGFUeXBlLkZMT0FULCBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50OiAnVmFsb3IgZGEgVHJhbnNhw6fDo28nIH0pXG4gICAgdmxyVHJhbnNhY3Rpb246IG51bWJlcjtcblxuICAgIEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50OiAnRGVzY3Jpw6fDo28gZGEgdHJhbnNhw6fDo28uIEV4OiBTbWFydGJhbmQgWFlaIDMuMCAnfSlcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7IHR5cGUgOiBEYXRhVHlwZS5FTlVNLCB2YWx1ZXM6IFsnMScsICcyJ10sIGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQgOiAnMSAtPiBkZWJpdF9jYXJkICwgMiAtPiBjcmVkaXRfY2FyZCd9KVxuICAgIHR5cGVUcmFuc2FjdGlvbjogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQ6ICdOw7ptZXJvIGRvIGNhcnTDo28gJyB9KVxuICAgIG51bUNhcmQ6IHN0cmluZztcblxuICAgIEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50OiAnTm9tZSBkbyBwb3J0YWRvciBkbyBjYXJ0w6NvJ30pXG4gICAgYmVhcmVyTmFtZTogc3RyaW5nO1xuXG4gICAgQENvbHVtbiggeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50IDogJ0RhdGEgZGUgdmFsaWRhZGUgZG8gY2FydMOjbyd9IClcbiAgICBkdEV4cGlyYXRpb246IERhdGU7XG5cbiAgICBAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudDogJ0PDs2RpZ28gZGUgdmVyaWZpY2HDp8OjbyBkbyBjYXJ0w6NvIChDVlYpJ30pXG4gICAgY3Z2OiBzdHJpbmc7XG5cbiAgICBAQ3JlYXRlZEF0XG4gICAgQENvbHVtbiggeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50IDogJ0RhdGEgZGEgZW50cmFkYSBkbyByZWdpc3Rybyd9IClcbiAgICBkdENyZWF0ZWQ6IERhdGU7XG5cbiAgICBASGFzT25lKCAoKSA9PiBQYXlhYmxlKVxuICAgIHBheWFibGUgOiBQYXlhYmxlO1xufVxuIl19