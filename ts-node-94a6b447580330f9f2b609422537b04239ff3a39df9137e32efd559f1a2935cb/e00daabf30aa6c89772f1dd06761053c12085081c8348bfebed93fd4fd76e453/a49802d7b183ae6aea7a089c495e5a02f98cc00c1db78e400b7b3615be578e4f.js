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
        type: sequelize_typescript_1.DataType.FLOAT,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9QYXlhYmxlTW9kZWwudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy9hcHAvbW9kZWwvUGF5YWJsZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW9FO0FBQ3BFLDBGQUF1RjtBQUN2RixnRkFBNkU7QUFDN0UseURBQStDO0FBQy9DLCtDQUFxQztBQUtyQyxJQUFhLE9BQU8sR0FBcEIsYUFBcUIsU0FBUSw0QkFBYztDQWdEMUMsQ0FBQTtBQXRDRztJQVBDLDZCQUFNLENBQUM7UUFDSixJQUFJLEVBQUcsK0JBQVEsQ0FBQyxJQUFJO1FBQ3BCLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3ZCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFlBQVksRUFBRSxDQUFDO1FBQ2YsT0FBTyxFQUFHLDhDQUE4QztLQUMzRCxDQUFDOzt1Q0FDYTtBQU1mO0lBSkMsNkJBQU0sQ0FBRTtRQUNMLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRyxtQkFBbUI7S0FDaEMsQ0FBRTs4QkFDUSxJQUFJOzBDQUFDO0FBTWhCO0lBSkMsNkJBQU0sQ0FBQztRQUNKLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxvQkFBb0I7S0FDaEMsQ0FBQzs7NENBQ2tCO0FBT3BCO0lBTEMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRSwrQkFBUSxDQUFDLEtBQUs7UUFDcEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsT0FBTyxFQUFFLHFDQUFxQztLQUNqRCxDQUFDOzsyQ0FDaUI7QUFHbkI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsc0VBQXNFLEVBQUMsQ0FBQzs7Z0RBQ3JGO0FBSXhCO0lBRkMsdUJBQVUsQ0FBQyxNQUFNLDhCQUFXLENBQUM7SUFDN0IsNkJBQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRyx1QkFBdUIsRUFBQyxDQUFDOzs4Q0FDdEI7QUFHdEI7SUFEQyxxQkFBUyxDQUFDLE1BQU0sOEJBQVcsQ0FBQzs4QkFDaEIsOEJBQVc7NENBQUM7QUFJekI7SUFGQyx1QkFBVSxDQUFDLE1BQU0sb0JBQU0sQ0FBQztJQUN4Qiw2QkFBTSxDQUFDLEVBQUMsT0FBTyxFQUFHLHVCQUF1QixFQUFDLENBQUM7O3lDQUMzQjtBQUdqQjtJQURDLHFCQUFTLENBQUMsTUFBTSxvQkFBTSxDQUFDOzhCQUNoQixvQkFBTTt1Q0FBQztBQTlDTixPQUFPO0lBRG5CLDRCQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUM7R0FDakIsT0FBTyxDQWdEbkI7QUFoRFksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbHVtbiwgRGF0YVR5cGUsIE1vZGVsLCBUYWJsZX0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBCZWxvbmdzVG8gfSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHQvbGliL2Fubm90YXRpb25zL2Fzc29jaWF0aW9uL0JlbG9uZ3NUb1wiO1xuaW1wb3J0IHsgRm9yZWlnbktleSB9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdC9saWIvYW5ub3RhdGlvbnMvRm9yZWlnbktleVwiO1xuaW1wb3J0IHtUcmFuc2FjdGlvbn0gZnJvbSBcIi4vVHJhbnNhY3Rpb25Nb2RlbFwiO1xuaW1wb3J0IHtDbGllbnR9IGZyb20gXCIuL0NsaWVudE1vZGVsXCI7XG5pbXBvcnQge1NlcXVlbGl6ZX0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0ICogYXMgc2VxdWVsaXplIGZyb20gXCJzZXF1ZWxpemVcIjtcblxuQFRhYmxlKHt0YWJsZU5hbWU6IFwicGF5YWJsZVwifSlcbmV4cG9ydCBjbGFzcyBQYXlhYmxlIGV4dGVuZHMgTW9kZWw8UGF5YWJsZT4ge1xuICAgIC8vc3RhdGljIHNlcXVlbGl6ZTogYW55O1xuXG4gICAgQENvbHVtbih7XG4gICAgICAgIHR5cGUgOiBEYXRhVHlwZS5FTlVNLFxuICAgICAgICB2YWx1ZXM6IFsnMScsICcyJywgJzMnXSxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAzLFxuICAgICAgICBjb21tZW50IDogJzEgLT4gcGFpZCAsIDIgLT4gd2FpdGluZ19mdW5kcywgMyAtPiB1bmtub3duJ1xuICAgIH0pXG4gICAgc3RhdHVzOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKCB7XG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQgOiAnRGF0YSBkbyBwYWdhbWVudG8nXG4gICAgfSApXG4gICAgZHRQYXltZW50OiBEYXRlO1xuXG4gICAgQENvbHVtbih7XG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQ6IFwiUG9yY2V0YWdlbSBkZSB0YXhhXCJcbiAgICB9KVxuICAgIHBlcmNlbnRSYXRlOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHtcbiAgICAgICAgdHlwZTogRGF0YVR5cGUuRkxPQVQsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQ6IFwiVmFsb3IgZGEgVHJhbnNhw6fDo28gZmluYWwgZG8gY2xpZW50ZVwiXG4gICAgfSlcbiAgICB2bHJQYXlhYmxlOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHsgYWxsb3dOdWxsOiBmYWxzZSwgY29tbWVudDogJ0hhc2ggZ2VyYWRvIGNvbSBvIHByb3ByaW8gb2JqZXRvLCBPYnMuOiBJZGVpYSBxdWUgcHJlY2lzYSBkZSBhbmFsaXNlJ30pXG4gICAgaGFzaFRyYW5zYWN0aW9uOiBzdHJpbmc7XG5cbiAgICBARm9yZWlnbktleSgoKSA9PiBUcmFuc2FjdGlvbilcbiAgICBAQ29sdW1uKHtjb21tZW50IDogJ1RyYW5zYcOnw6NvIHJlZ2lzdHJhZGEuJ30pXG4gICAgdHJhbnNhY3Rpb25JZDogbnVtYmVyO1xuXG4gICAgQEJlbG9uZ3NUbygoKSA9PiBUcmFuc2FjdGlvbilcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb247XG5cbiAgICBARm9yZWlnbktleSgoKSA9PiBDbGllbnQpXG4gICAgQENvbHVtbih7Y29tbWVudCA6ICdDbGllbnRlIGRhIHRyYW5zYcOnw6NvLid9KVxuICAgIGNsaWVudElkOiBudW1iZXI7XG5cbiAgICBAQmVsb25nc1RvKCgpID0+IENsaWVudClcbiAgICBjbGllbnQ6IENsaWVudDtcblxufVxuIl19