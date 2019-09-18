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
const sequelize = require("sequelize");
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
    __metadata("design:type", Function)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9QYXlhYmxlTW9kZWwudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy9hcHAvbW9kZWwvUGF5YWJsZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW9FO0FBQ3BFLDBGQUF1RjtBQUN2RixnRkFBNkU7QUFDN0UseURBQStDO0FBQy9DLCtDQUFxQztBQUVyQyx1Q0FBdUM7QUFHdkMsSUFBYSxPQUFPLEdBQXBCLGFBQXFCLFNBQVEsNEJBQWM7Q0ErQzFDLENBQUE7QUFyQ0c7SUFQQyw2QkFBTSxDQUFDO1FBQ0osSUFBSSxFQUFHLCtCQUFRLENBQUMsSUFBSTtRQUNwQixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUN2QixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsQ0FBQztRQUNmLE9BQU8sRUFBRyw4Q0FBOEM7S0FDM0QsQ0FBQzs7dUNBQ2E7QUFNZjtJQUpDLDZCQUFNLENBQUU7UUFDTCxTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUcsbUJBQW1CO0tBQ2hDLENBQUU7OEJBQ1EsSUFBSTswQ0FBQztBQU1oQjtJQUpDLDZCQUFNLENBQUM7UUFDSixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsb0JBQW9CO0tBQ2hDLENBQUM7OzRDQUNrQjtBQU1wQjtJQUpDLDZCQUFNLENBQUM7UUFDSixTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUscUNBQXFDO0tBQ2pELENBQUM7OzJDQUNrQztBQUdwQztJQURDLDZCQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxzRUFBc0UsRUFBQyxDQUFDOztnREFDckY7QUFJeEI7SUFGQyx1QkFBVSxDQUFDLE1BQU0sOEJBQVcsQ0FBQztJQUM3Qiw2QkFBTSxDQUFDLEVBQUMsT0FBTyxFQUFHLHVCQUF1QixFQUFDLENBQUM7OzhDQUN0QjtBQUd0QjtJQURDLHFCQUFTLENBQUMsTUFBTSw4QkFBVyxDQUFDOzhCQUNoQiw4QkFBVzs0Q0FBQztBQUl6QjtJQUZDLHVCQUFVLENBQUMsTUFBTSxvQkFBTSxDQUFDO0lBQ3hCLDZCQUFNLENBQUMsRUFBQyxPQUFPLEVBQUcsdUJBQXVCLEVBQUMsQ0FBQzs7eUNBQzNCO0FBR2pCO0lBREMscUJBQVMsQ0FBQyxNQUFNLG9CQUFNLENBQUM7OEJBQ2hCLG9CQUFNO3VDQUFDO0FBN0NOLE9BQU87SUFEbkIsNEJBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FBQztHQUNqQixPQUFPLENBK0NuQjtBQS9DWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sdW1uLCBEYXRhVHlwZSwgTW9kZWwsIFRhYmxlfSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcbmltcG9ydCB7IEJlbG9uZ3NUbyB9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdC9saWIvYW5ub3RhdGlvbnMvYXNzb2NpYXRpb24vQmVsb25nc1RvXCI7XG5pbXBvcnQgeyBGb3JlaWduS2V5IH0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0L2xpYi9hbm5vdGF0aW9ucy9Gb3JlaWduS2V5XCI7XG5pbXBvcnQge1RyYW5zYWN0aW9ufSBmcm9tIFwiLi9UcmFuc2FjdGlvbk1vZGVsXCI7XG5pbXBvcnQge0NsaWVudH0gZnJvbSBcIi4vQ2xpZW50TW9kZWxcIjtcbmltcG9ydCB7U2VxdWVsaXplfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgKiBhcyBzZXF1ZWxpemUgZnJvbSBcInNlcXVlbGl6ZVwiO1xuXG5AVGFibGUoe3RhYmxlTmFtZTogXCJwYXlhYmxlXCJ9KVxuZXhwb3J0IGNsYXNzIFBheWFibGUgZXh0ZW5kcyBNb2RlbDxQYXlhYmxlPiB7XG4gICAgc3RhdGljIHNlcXVlbGl6ZTogYW55O1xuXG4gICAgQENvbHVtbih7XG4gICAgICAgIHR5cGUgOiBEYXRhVHlwZS5FTlVNLFxuICAgICAgICB2YWx1ZXM6IFsnMScsICcyJywgJzMnXSxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiAzLFxuICAgICAgICBjb21tZW50IDogJzEgLT4gcGFpZCAsIDIgLT4gd2FpdGluZ19mdW5kcywgMyAtPiB1bmtub3duJ1xuICAgIH0pXG4gICAgc3RhdHVzOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKCB7XG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQgOiAnRGF0YSBkbyBwYWdhbWVudG8nXG4gICAgfSApXG4gICAgZHRQYXltZW50OiBEYXRlO1xuXG4gICAgQENvbHVtbih7XG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQ6IFwiUG9yY2V0YWdlbSBkZSB0YXhhXCJcbiAgICB9KVxuICAgIHBlcmNlbnRSYXRlOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHtcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgY29tbWVudDogXCJWYWxvciBkYSBUcmFuc2HDp8OjbyBmaW5hbCBkbyBjbGllbnRlXCJcbiAgICB9KVxuICAgIHZsclBheWFibGU6IHNlcXVlbGl6ZS5EYXRhVHlwZUZsb2F0O1xuXG4gICAgQENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQ6ICdIYXNoIGdlcmFkbyBjb20gbyBwcm9wcmlvIG9iamV0bywgT2JzLjogSWRlaWEgcXVlIHByZWNpc2EgZGUgYW5hbGlzZSd9KVxuICAgIGhhc2hUcmFuc2FjdGlvbjogc3RyaW5nO1xuXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gVHJhbnNhY3Rpb24pXG4gICAgQENvbHVtbih7Y29tbWVudCA6ICdUcmFuc2HDp8OjbyByZWdpc3RyYWRhLid9KVxuICAgIHRyYW5zYWN0aW9uSWQ6IG51bWJlcjtcblxuICAgIEBCZWxvbmdzVG8oKCkgPT4gVHJhbnNhY3Rpb24pXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uO1xuXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gQ2xpZW50KVxuICAgIEBDb2x1bW4oe2NvbW1lbnQgOiAnQ2xpZW50ZSBkYSB0cmFuc2HDp8Ojby4nfSlcbiAgICBjbGllbnRJZDogbnVtYmVyO1xuXG4gICAgQEJlbG9uZ3NUbygoKSA9PiBDbGllbnQpXG4gICAgY2xpZW50OiBDbGllbnQ7XG5cbn1cbiJdfQ==