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
Payable = __decorate([
    sequelize_typescript_1.Table({ tableName: "payable" })
], Payable);
exports.Payable = Payable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9QYXlhYmxlTW9kZWwudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy9hcHAvbW9kZWwvUGF5YWJsZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsK0RBQW9FO0FBQ3BFLDBGQUF1RjtBQUN2RixnRkFBNkU7QUFDN0UseURBQStDO0FBRy9DLElBQWEsT0FBTyxHQUFwQixhQUFxQixTQUFRLDRCQUFjO0NBd0MxQyxDQUFBO0FBOUJHO0lBUEMsNkJBQU0sQ0FBQztRQUNKLElBQUksRUFBRywrQkFBUSxDQUFDLElBQUk7UUFDcEIsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDdkIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsWUFBWSxFQUFFLENBQUM7UUFDZixPQUFPLEVBQUcsOENBQThDO0tBQzNELENBQUM7O3VDQUNhO0FBTWY7SUFKQyw2QkFBTSxDQUFFO1FBQ0wsU0FBUyxFQUFFLEtBQUs7UUFDaEIsT0FBTyxFQUFHLG1CQUFtQjtLQUNoQyxDQUFFOzhCQUNRLElBQUk7MENBQUM7QUFNaEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osU0FBUyxFQUFFLEtBQUs7UUFDaEIsT0FBTyxFQUFFLG9CQUFvQjtLQUNoQyxDQUFDOzs0Q0FDa0I7QUFNcEI7SUFKQyw2QkFBTSxDQUFDO1FBQ0osU0FBUyxFQUFFLEtBQUs7UUFDaEIsT0FBTyxFQUFFLHFDQUFxQztLQUNqRCxDQUFDOzsyQ0FDaUI7QUFHbkI7SUFEQyw2QkFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsc0VBQXNFLEVBQUMsQ0FBQzs7Z0RBQ3JGO0FBSXhCO0lBRkMsdUJBQVUsQ0FBQyxNQUFNLDhCQUFXLENBQUM7SUFDN0IsNkJBQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRyx1QkFBdUIsRUFBQyxDQUFDOzs4Q0FDdEI7QUFHdEI7SUFEQyxxQkFBUyxDQUFDLE1BQU0sOEJBQVcsQ0FBQzs4QkFDaEIsOEJBQVc7NENBQUM7QUF0Q2hCLE9BQU87SUFEbkIsNEJBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FBQztHQUNqQixPQUFPLENBd0NuQjtBQXhDWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sdW1uLCBEYXRhVHlwZSwgTW9kZWwsIFRhYmxlfSBmcm9tIFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIjtcbmltcG9ydCB7IEJlbG9uZ3NUbyB9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdC9saWIvYW5ub3RhdGlvbnMvYXNzb2NpYXRpb24vQmVsb25nc1RvXCI7XG5pbXBvcnQgeyBGb3JlaWduS2V5IH0gZnJvbSBcInNlcXVlbGl6ZS10eXBlc2NyaXB0L2xpYi9hbm5vdGF0aW9ucy9Gb3JlaWduS2V5XCI7XG5pbXBvcnQge1RyYW5zYWN0aW9ufSBmcm9tIFwiLi9UcmFuc2FjdGlvbk1vZGVsXCI7XG5cbkBUYWJsZSh7dGFibGVOYW1lOiBcInBheWFibGVcIn0pXG5leHBvcnQgY2xhc3MgUGF5YWJsZSBleHRlbmRzIE1vZGVsPFBheWFibGU+IHtcbiAgICBzdGF0aWMgc2VxdWVsaXplOiBhbnk7XG5cbiAgICBAQ29sdW1uKHtcbiAgICAgICAgdHlwZSA6IERhdGFUeXBlLkVOVU0sXG4gICAgICAgIHZhbHVlczogWycxJywgJzInLCAnMyddLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IDMsXG4gICAgICAgIGNvbW1lbnQgOiAnMSAtPiBwYWlkICwgMiAtPiB3YWl0aW5nX2Z1bmRzLCAzIC0+IHVua25vd24nXG4gICAgfSlcbiAgICBzdGF0dXM6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oIHtcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgY29tbWVudCA6ICdEYXRhIGRvIHBhZ2FtZW50bydcbiAgICB9IClcbiAgICBkdFBheW1lbnQ6IERhdGU7XG5cbiAgICBAQ29sdW1uKHtcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgY29tbWVudDogXCJQb3JjZXRhZ2VtIGRlIHRheGFcIlxuICAgIH0pXG4gICAgcGVyY2VudFJhdGU6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oe1xuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgICBjb21tZW50OiBcIlZhbG9yIGRhIFRyYW5zYcOnw6NvIGZpbmFsIGRvIGNsaWVudGVcIlxuICAgIH0pXG4gICAgdmxyUGF5YWJsZTogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7IGFsbG93TnVsbDogZmFsc2UsIGNvbW1lbnQ6ICdIYXNoIGdlcmFkbyBjb20gbyBwcm9wcmlvIG9iamV0bywgT2JzLjogSWRlaWEgcXVlIHByZWNpc2EgZGUgYW5hbGlzZSd9KVxuICAgIGhhc2hUcmFuc2FjdGlvbjogc3RyaW5nO1xuXG4gICAgQEZvcmVpZ25LZXkoKCkgPT4gVHJhbnNhY3Rpb24pXG4gICAgQENvbHVtbih7Y29tbWVudCA6ICdUcmFuc2HDp8OjbyByZWdpc3RyYWRhLid9KVxuICAgIHRyYW5zYWN0aW9uSWQ6IG51bWJlcjtcblxuICAgIEBCZWxvbmdzVG8oKCkgPT4gVHJhbnNhY3Rpb24pXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uO1xuXG59XG4iXX0=