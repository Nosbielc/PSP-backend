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
const PayableModel_1 = require("./PayableModel");
let Client = class Client extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ allowNull: false, comment: 'Nome do Cliente. ' }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => PayableModel_1.Payable),
    __metadata("design:type", Array)
], Client.prototype, "payable", void 0);
Client = __decorate([
    sequelize_typescript_1.Table({ tableName: "client" })
], Client);
exports.Client = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9DbGllbnRNb2RlbC50cyIsInNvdXJjZXMiOlsiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9tb2RlbC9DbGllbnRNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtEQUFtRTtBQUNuRSxpREFBdUM7QUFHdkMsSUFBYSxNQUFNLEdBQW5CLFlBQW9CLFNBQVEsNEJBQWE7Q0FTeEMsQ0FBQTtBQUxHO0lBREMsNkJBQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFDLENBQUM7O29DQUM3QztBQUdiO0lBREMsOEJBQU8sQ0FBRSxNQUFNLHNCQUFPLENBQUM7O3VDQUNKO0FBUFgsTUFBTTtJQURsQiw0QkFBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBQyxDQUFDO0dBQ2hCLE1BQU0sQ0FTbEI7QUFUWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sdW1uLCBIYXNNYW55LCBNb2RlbCwgVGFibGV9IGZyb20gXCJzZXF1ZWxpemUtdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHtQYXlhYmxlfSBmcm9tIFwiLi9QYXlhYmxlTW9kZWxcIjtcblxuQFRhYmxlKHt0YWJsZU5hbWU6IFwiY2xpZW50XCJ9KVxuZXhwb3J0IGNsYXNzIENsaWVudCBleHRlbmRzIE1vZGVsPENsaWVudD4ge1xuICAgIHN0YXRpYyBzZXF1ZWxpemU6IGFueTtcblxuICAgIEBDb2x1bW4oeyBhbGxvd051bGw6IGZhbHNlLCBjb21tZW50OiAnTm9tZSBkbyBDbGllbnRlLiAnfSlcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICBASGFzTWFueSggKCkgPT4gUGF5YWJsZSlcbiAgICBwYXlhYmxlIDogUGF5YWJsZVtdO1xuXG59XG4iXX0=