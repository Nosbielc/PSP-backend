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
Transaction = __decorate([
    sequelize_typescript_1.Table({ tableName: "transaction" })
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9UcmFuc2FjdGlvbk1vZGVsLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvYXBwL21vZGVsL1RyYW5zYWN0aW9uTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwrREFBcUU7QUFDckUsOEVBQTJFO0FBQzNFLHNFQUFtRTtBQUluRSxJQUFhLFdBQVcsR0FBeEIsaUJBQXlCLFNBQVEsNEJBQWtCO0NBMkJsRCxDQUFBO0FBdkJHO0lBREMsNkJBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLENBQUM7O21EQUNyQztBQUd2QjtJQURDLDZCQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxnREFBZ0QsRUFBQyxDQUFDOztnREFDbkU7QUFHcEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFHLG1CQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRyxvQ0FBb0MsRUFBQyxDQUFDOztvREFDOUY7QUFHeEI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQzs7NENBQzNDO0FBR2hCO0lBREMsNkJBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFDLENBQUM7OytDQUNoRDtBQUduQjtJQURDLDZCQUFNLENBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRyw0QkFBNEIsRUFBQyxDQUFFOzhCQUN4RCxJQUFJO2lEQUFDO0FBR25CO0lBREMsNkJBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLHVDQUF1QyxFQUFDLENBQUM7O3dDQUNsRTtBQUlaO0lBRkMscUJBQVM7SUFDVCw2QkFBTSxDQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUcsNkJBQTZCLEVBQUMsQ0FBRTs4QkFDNUQsSUFBSTs4Q0FBQztBQTFCUCxXQUFXO0lBRHZCLDRCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUM7R0FDckIsV0FBVyxDQTJCdkI7QUEzQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0JlbG9uZ3NUbywgQ29sdW1uLCBNb2RlbCwgVGFibGV9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgQ3JlYXRlZEF0IH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQvbGliL2Fubm90YXRpb25zL0NyZWF0ZWRBdCc7XG5pbXBvcnQgeyBEYXRhVHlwZSB9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0L2xpYi9lbnVtcy9EYXRhVHlwZSc7XG5pbXBvcnQge1BheWFibGV9IGZyb20gXCIuL1BheWFibGVNb2RlbFwiO1xuXG5AVGFibGUoe3RhYmxlTmFtZTogXCJ0cmFuc2FjdGlvblwifSlcbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvbiBleHRlbmRzIE1vZGVsPFRyYW5zYWN0aW9uPiB7XG4gICAgc3RhdGljIHNlcXVlbGl6ZTogYW55O1xuXG4gICAgQENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQ6ICdWYWxvciBkYSBUcmFuc2HDp8OjbycgfSlcbiAgICB2bHJUcmFuc2FjdGlvbjogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQ6ICdEZXNjcmnDp8OjbyBkYSB0cmFuc2HDp8Ojby4gRXg6IFNtYXJ0YmFuZCBYWVogMy4wICd9KVxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHsgdHlwZSA6IERhdGFUeXBlLkVOVU0sIHZhbHVlczogWycxJywgJzInXSwgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudCA6ICcxIC0+IGRlYml0X2NhcmQgLCAyIC0+IGNyZWRpdF9jYXJkJ30pXG4gICAgdHlwZVRyYW5zYWN0aW9uOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudDogJ07Dum1lcm8gZG8gY2FydMOjbyAnIH0pXG4gICAgbnVtQ2FyZDogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQ6ICdOb21lIGRvIHBvcnRhZG9yIGRvIGNhcnTDo28nfSlcbiAgICBiZWFyZXJOYW1lOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKCB7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQgOiAnRGF0YSBkZSB2YWxpZGFkZSBkbyBjYXJ0w6NvJ30gKVxuICAgIGR0RXhwaXJhdGlvbjogRGF0ZTtcblxuICAgIEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50OiAnQ8OzZGlnbyBkZSB2ZXJpZmljYcOnw6NvIGRvIGNhcnTDo28gKENWViknfSlcbiAgICBjdnY6IHN0cmluZztcblxuICAgIEBDcmVhdGVkQXRcbiAgICBAQ29sdW1uKCB7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQgOiAnRGF0YSBkYSBlbnRyYWRhIGRvIHJlZ2lzdHJvJ30gKVxuICAgIGR0Q3JlYXRlZDogRGF0ZTtcbn1cbiJdfQ==