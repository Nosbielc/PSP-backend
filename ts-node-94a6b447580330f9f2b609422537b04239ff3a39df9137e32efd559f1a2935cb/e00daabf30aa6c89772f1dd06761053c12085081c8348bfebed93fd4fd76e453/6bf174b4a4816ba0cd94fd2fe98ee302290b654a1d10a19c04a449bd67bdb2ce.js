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
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Valor da Transação' }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9UcmFuc2FjdGlvbk1vZGVsLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL21vZGVsL1RyYW5zYWN0aW9uTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBNkU7QUFDN0UsOEVBQTJFO0FBQzNFLHNFQUFtRTtBQUNuRSxpREFBdUM7QUFHdkMsSUFBYSxXQUFXLEdBQXhCLGlCQUF5QixTQUFRLDRCQUFrQjtDQThCbEQsQ0FBQTtBQTFCRztJQURDLDZCQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDOzttREFDckM7QUFHdkI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsZ0RBQWdELEVBQUMsQ0FBQzs7Z0RBQ25FO0FBR3BCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLElBQUksRUFBRyxtQkFBUSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUcsb0NBQW9DLEVBQUMsQ0FBQzs7b0RBQzlGO0FBR3hCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUM7OzRDQUMzQztBQUdoQjtJQURDLDZCQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBQyxDQUFDOzsrQ0FDaEQ7QUFHbkI7SUFEQyw2QkFBTSxDQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUcsNEJBQTRCLEVBQUMsQ0FBRTs4QkFDeEQsSUFBSTtpREFBQztBQUduQjtJQURDLDZCQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSx1Q0FBdUMsRUFBQyxDQUFDOzt3Q0FDbEU7QUFJWjtJQUZDLHFCQUFTO0lBQ1QsNkJBQU0sQ0FBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFHLDZCQUE2QixFQUFDLENBQUU7OEJBQzVELElBQUk7OENBQUM7QUFHaEI7SUFEQyw2QkFBTSxDQUFFLE1BQU0sc0JBQU8sQ0FBQzs4QkFDYixzQkFBTzs0Q0FBQztBQTdCVCxXQUFXO0lBRHZCLDRCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUM7R0FDckIsV0FBVyxDQThCdkI7QUE5Qlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JlbG9uZ3NUbywgQ29sdW1uLCBIYXNPbmUsIE1vZGVsLCBUYWJsZX0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBDcmVhdGVkQXQgfSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdC9saWIvYW5ub3RhdGlvbnMvQ3JlYXRlZEF0JztcbmltcG9ydCB7IERhdGFUeXBlIH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQvbGliL2VudW1zL0RhdGFUeXBlJztcbmltcG9ydCB7UGF5YWJsZX0gZnJvbSBcIi4vUGF5YWJsZU1vZGVsXCI7XG5cbkBUYWJsZSh7dGFibGVOYW1lOiBcInRyYW5zYWN0aW9uXCJ9KVxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uIGV4dGVuZHMgTW9kZWw8VHJhbnNhY3Rpb24+IHtcbiAgICBzdGF0aWMgc2VxdWVsaXplOiBhbnk7XG5cbiAgICBAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudDogJ1ZhbG9yIGRhIFRyYW5zYcOnw6NvJyB9KVxuICAgIHZsclRyYW5zYWN0aW9uOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudDogJ0Rlc2NyacOnw6NvIGRhIHRyYW5zYcOnw6NvLiBFeDogU21hcnRiYW5kIFhZWiAzLjAgJ30pXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICAgIEBDb2x1bW4oeyB0eXBlIDogRGF0YVR5cGUuRU5VTSwgdmFsdWVzOiBbJzEnLCAnMiddLCBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50IDogJzEgLT4gZGViaXRfY2FyZCAsIDIgLT4gY3JlZGl0X2NhcmQnfSlcbiAgICB0eXBlVHJhbnNhY3Rpb246IG51bWJlcjtcblxuICAgIEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50OiAnTsO6bWVybyBkbyBjYXJ0w6NvICcgfSlcbiAgICBudW1DYXJkOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudDogJ05vbWUgZG8gcG9ydGFkb3IgZG8gY2FydMOjbyd9KVxuICAgIGJlYXJlck5hbWU6IHN0cmluZztcblxuICAgIEBDb2x1bW4oIHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudCA6ICdEYXRhIGRlIHZhbGlkYWRlIGRvIGNhcnTDo28nfSApXG4gICAgZHRFeHBpcmF0aW9uOiBEYXRlO1xuXG4gICAgQENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQ6ICdDw7NkaWdvIGRlIHZlcmlmaWNhw6fDo28gZG8gY2FydMOjbyAoQ1ZWKSd9KVxuICAgIGN2djogc3RyaW5nO1xuXG4gICAgQENyZWF0ZWRBdFxuICAgIEBDb2x1bW4oIHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudCA6ICdEYXRhIGRhIGVudHJhZGEgZG8gcmVnaXN0cm8nfSApXG4gICAgZHRDcmVhdGVkOiBEYXRlO1xuXG4gICAgQEhhc09uZSggKCkgPT4gUGF5YWJsZSlcbiAgICBwYXlhYmxlIDogUGF5YWJsZTtcbn1cbiJdfQ==