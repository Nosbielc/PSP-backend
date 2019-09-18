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
const BelongsTo_1 = require("sequelize-typescript/lib/annotations/association/BelongsTo");
const ForeignKey_1 = require("sequelize-typescript/lib/annotations/ForeignKey");
const TransactionModel_1 = require("./TransactionModel");
const ClientModel_1 = require("./ClientModel");
let Payable = class Payable extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM,
        values: ['1', '2', '3'],
        allowNull: false,
        defaultValue: 3,
        comment: '1 -> paid , 2 -> waiting_funds, 3 -> unknown'
    }),
    __metadata("design:type", Number)
], Payable.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        comment: 'Data do pagamento'
    }),
    __metadata("design:type", Date)
], Payable.prototype, "dtPayment", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        comment: "Porcetagem de taxa"
    }),
    __metadata("design:type", Number)
], Payable.prototype, "percentRate", void 0);
__decorate([
    sequelize_typescript_1.Column({
        allowNull: false,
        comment: "Valor da Transação final do cliente"
    }),
    __metadata("design:type", Number)
], Payable.prototype, "vlrPayable", void 0);
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Hash gerado com o proprio objeto, Obs.: Ideia que precisa de analise' }),
    __metadata("design:type", String)
], Payable.prototype, "hashTransaction", void 0);
__decorate([
    ForeignKey_1.ForeignKey(() => TransactionModel_1.Transaction),
    sequelize_typescript_1.Column({ comment: 'Transação registrada.' }),
    __metadata("design:type", Number)
], Payable.prototype, "transactionId", void 0);
__decorate([
    BelongsTo_1.BelongsTo(() => TransactionModel_1.Transaction),
    __metadata("design:type", TransactionModel_1.Transaction)
], Payable.prototype, "transaction", void 0);
__decorate([
    ForeignKey_1.ForeignKey(() => ClientModel_1.Client),
    sequelize_typescript_1.Column({ comment: 'Cliente da transação.' }),
    __metadata("design:type", Number)
], Payable.prototype, "clientId", void 0);
__decorate([
    BelongsTo_1.BelongsTo(() => ClientModel_1.Client),
    __metadata("design:type", ClientModel_1.Client)
], Payable.prototype, "client", void 0);
Payable = __decorate([
    sequelize_typescript_1.Table({ tableName: "payable" })
], Payable);
exports.Payable = Payable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9QYXlhYmxlTW9kZWwudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy9hcHAvbW9kZWwvUGF5YWJsZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW9FO0FBQ3BFLDBGQUF1RjtBQUN2RixnRkFBNkU7QUFDN0UseURBQStDO0FBQy9DLCtDQUFxQztBQUdyQyxJQUFhLE9BQU8sR0FBcEIsYUFBcUIsU0FBUSw0QkFBYztDQStDMUMsQ0FBQTtBQXJDRztJQVBDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUcsK0JBQVEsQ0FBQyxJQUFJO1FBQ3BCLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3ZCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxDQUFDO1FBQ2YsT0FBTyxFQUFHLDhDQUE4QztLQUMzRCxDQUFDOzt1Q0FDYTtBQU1mO0lBSkMsNkJBQU0sQ0FBRTtRQUNMLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRyxtQkFBbUI7S0FDaEMsQ0FBRTs4QkFDUSxJQUFJOzBDQUFDO0FBTWhCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxvQkFBb0I7S0FDaEMsQ0FBQzs7NENBQ2tCO0FBTXBCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxxQ0FBcUM7S0FDakQsQ0FBQzs7MkNBQ2lCO0FBR25CO0lBREMsNkJBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLHNFQUFzRSxFQUFDLENBQUM7O2dEQUNyRjtBQUl4QjtJQUZDLHVCQUFVLENBQUMsTUFBTSw4QkFBVyxDQUFDO0lBQzdCLDZCQUFNLENBQUMsRUFBQyxPQUFPLEVBQUcsdUJBQXVCLEVBQUMsQ0FBQzs7OENBQ3RCO0FBR3RCO0lBREMscUJBQVMsQ0FBQyxNQUFNLDhCQUFXLENBQUM7OEJBQ2hCLDhCQUFXOzRDQUFDO0FBSXpCO0lBRkMsdUJBQVUsQ0FBQyxNQUFNLG9CQUFNLENBQUM7SUFDeEIsNkJBQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRyx1QkFBdUIsRUFBQyxDQUFDOzt5Q0FDM0I7QUFHakI7SUFEQyxxQkFBUyxDQUFDLE1BQU0sb0JBQU0sQ0FBQzs4QkFDaEIsb0JBQU07dUNBQUM7QUE3Q04sT0FBTztJQURuQiw0QkFBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDO0dBQ2pCLE9BQU8sQ0ErQ25CO0FBL0NZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2x1bW4sIERhdGFUeXBlLCBNb2RlbCwgVGFibGV9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgQmVsb25nc1RvIH0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0L2xpYi9hbm5vdGF0aW9ucy9hc3NvY2lhdGlvbi9CZWxvbmdzVG9cIjtcbmltcG9ydCB7IEZvcmVpZ25LZXkgfSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHQvbGliL2Fubm90YXRpb25zL0ZvcmVpZ25LZXlcIjtcbmltcG9ydCB7VHJhbnNhY3Rpb259IGZyb20gXCIuL1RyYW5zYWN0aW9uTW9kZWxcIjtcbmltcG9ydCB7Q2xpZW50fSBmcm9tIFwiLi9DbGllbnRNb2RlbFwiO1xuXG5AVGFibGUoe3RhYmxlTmFtZTogXCJwYXlhYmxlXCJ9KVxuZXhwb3J0IGNsYXNzIFBheWFibGUgZXh0ZW5kcyBNb2RlbDxQYXlhYmxlPiB7XG4gICAgc3RhdGljIHNlcXVlbGl6ZTogYW55O1xuXG4gICAgQENvbHVtbih7XG4gICAgICAgIHR5cGUgOiBEYXRhVHlwZS5FTlVNLFxuICAgICAgICB2YWx1ZXM6IFsnMScsICcyJywgJzMnXSxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAzLFxuICAgICAgICBjb21tZW50IDogJzEgLT4gcGFpZCAsIDIgLT4gd2FpdGluZ19mdW5kcywgMyAtPiB1bmtub3duJ1xuICAgIH0pXG4gICAgc3RhdHVzOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKCB7XG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQgOiAnRGF0YSBkbyBwYWdhbWVudG8nXG4gICAgfSApXG4gICAgZHRQYXltZW50OiBEYXRlO1xuXG4gICAgQENvbHVtbih7XG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQ6IFwiUG9yY2V0YWdlbSBkZSB0YXhhXCJcbiAgICB9KVxuICAgIHBlcmNlbnRSYXRlOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHtcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgY29tbWVudDogXCJWYWxvciBkYSBUcmFuc2HDp8OjbyBmaW5hbCBkbyBjbGllbnRlXCJcbiAgICB9KVxuICAgIHZsclBheWFibGU6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50OiAnSGFzaCBnZXJhZG8gY29tIG8gcHJvcHJpbyBvYmpldG8sIE9icy46IElkZWlhIHF1ZSBwcmVjaXNhIGRlIGFuYWxpc2UnfSlcbiAgICBoYXNoVHJhbnNhY3Rpb246IHN0cmluZztcblxuICAgIEBGb3JlaWduS2V5KCgpID0+IFRyYW5zYWN0aW9uKVxuICAgIEBDb2x1bW4oe2NvbW1lbnQgOiAnVHJhbnNhw6fDo28gcmVnaXN0cmFkYS4nfSlcbiAgICB0cmFuc2FjdGlvbklkOiBudW1iZXI7XG5cbiAgICBAQmVsb25nc1RvKCgpID0+IFRyYW5zYWN0aW9uKVxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbjtcblxuICAgIEBGb3JlaWduS2V5KCgpID0+IENsaWVudClcbiAgICBAQ29sdW1uKHtjb21tZW50IDogJ0NsaWVudGUgZGEgdHJhbnNhw6fDo28uJ30pXG4gICAgY2xpZW50SWQ6IG51bWJlcjtcblxuICAgIEBCZWxvbmdzVG8oKCkgPT4gQ2xpZW50KVxuICAgIGNsaWVudDogQ2xpZW50O1xuXG59XG4iXX0=