"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Values_1 = require("../../util/Values");
const PSPService_1 = require("../service/PSPService");
const TransactionService_1 = require("../service/TransactionService");
const PayableService_1 = require("../service/PayableService");
class PSPRest {
    constructor() { }
    setRoutes(exp) {
        exp.post(Values_1.URLs.PSP, PSPService_1.default.record);
        exp.get(Values_1.URLs.TRANSACTION, TransactionService_1.default.transaction);
        exp.get(Values_1.URLs.PAYABLE, PayableService_1.default.payable);
    }
}
exports.default = new PSPRest();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC9jb250cm9sbGVyL1BTUFJlc3QudHMiLCJzb3VyY2VzIjpbIi92YXIvd3d3L1BTUC1iYWNrZW5kL3NyYy9hcHAvY29udHJvbGxlci9QU1BSZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBQXVDO0FBQ3ZDLHNEQUErQztBQUMvQyxzRUFBK0Q7QUFDL0QsOERBQXVEO0FBRXZEO0lBRUksZ0JBQWMsQ0FBQztJQUVSLFNBQVMsQ0FBQyxHQUF3QjtRQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQUksQ0FBQyxHQUFHLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQUksQ0FBQyxXQUFXLEVBQUUsNEJBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFJLENBQUMsT0FBTyxFQUFFLHdCQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUVKO0FBRUQsa0JBQWUsSUFBSSxPQUFPLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7VVJMc30gZnJvbSBcIi4uLy4uL3V0aWwvVmFsdWVzXCI7XG5pbXBvcnQgUFNQU2VydmljZSBmcm9tIFwiLi4vc2VydmljZS9QU1BTZXJ2aWNlXCI7XG5pbXBvcnQgVHJhbnNhY3Rpb25TZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlL1RyYW5zYWN0aW9uU2VydmljZVwiO1xuaW1wb3J0IFBheWFibGVTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlL1BheWFibGVTZXJ2aWNlXCI7XG5cbmNsYXNzIFBTUFJlc3Qge1xuXG4gICAgY29uc3RydWN0b3IoKXt9XG5cbiAgICBwdWJsaWMgc2V0Um91dGVzKGV4cDogZXhwcmVzcy5BcHBsaWNhdGlvbil7XG4gICAgICAgIGV4cC5wb3N0KFVSTHMuUFNQLCBQU1BTZXJ2aWNlLnJlY29yZCk7XG4gICAgICAgIGV4cC5nZXQoVVJMcy5UUkFOU0FDVElPTiwgVHJhbnNhY3Rpb25TZXJ2aWNlLnRyYW5zYWN0aW9uKTtcbiAgICAgICAgZXhwLmdldChVUkxzLlBBWUFCTEUsIFBheWFibGVTZXJ2aWNlLnBheWFibGUpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUFNQUmVzdCgpXG4iXX0=