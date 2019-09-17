"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");
const SocketUtil_1 = require("./util/SocketUtil");
const cors = require("cors");
const FactoryDB_1 = require("./util/FactoryDB");
// Módulos
const PSPRest_1 = require("./app/controller/PSPRest");
class App {
    constructor() {
        this.exp = express(); //Criando servidor do Express
        this.server = SocketUtil_1.default.getServerSocketIo(this.exp);
        this.factoryDB = new FactoryDB_1.FactoryDB();
        this.middlewares();
        this.initRoutes();
    }
    createConnection(onConnected, onError) {
        this.factoryDB.createConnection(onConnected, onError);
    }
    updateTable(onUpate, onError) {
        this.factoryDB.updateTable(onUpate, onError);
    }
    closeConnection(onClose) {
        this.factoryDB.closeConnection(onClose);
    }
    middlewares() {
        this.exp.use(morgan("dev"));
        this.exp.use(bodyParser.json());
        this.exp.use(bodyParser.urlencoded({ extended: true }));
        this.exp.use(expressValidator());
        this.exp.use(express.static(path.join(__dirname, "public")));
        this.exp.use(cors());
    }
    initRoutes() {
        PSPRest_1.default.setRoutes(this.exp);
    }
    getSequelize() {
        return this.factoryDB.getSequelize();
    }
}
exports.default = new App();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC50cyIsInNvdXJjZXMiOlsiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFtQztBQUVuQyxpQ0FBaUM7QUFDakMsMENBQTBDO0FBQzFDLHNEQUFzRDtBQUN0RCw2QkFBNkI7QUFDN0Isa0RBQTJDO0FBQzNDLDZCQUE2QjtBQUM3QixnREFBNkM7QUFFN0MsVUFBVTtBQUNWLHNEQUErQztBQUUvQztJQVFJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFBLDZCQUE2QjtRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsV0FBcUIsRUFBRSxPQUFpQjtRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQWlCLEVBQUUsT0FBaUI7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxlQUFlLENBQUMsT0FBTztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sV0FBVztRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyxVQUFVO1FBQ2QsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztDQUNKO0FBRUQsa0JBQWUsSUFBSSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcXVlbGl6ZSB9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0JztcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tIFwibW9yZ2FuXCI7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgZXhwcmVzc1ZhbGlkYXRvciBmcm9tICdleHByZXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgU29ja2V0VXRpbCBmcm9tIFwiLi91dGlsL1NvY2tldFV0aWxcIjtcbmltcG9ydCAqIGFzIGNvcnMgZnJvbSBcImNvcnNcIjtcbmltcG9ydCB7IEZhY3RvcnlEQiB9IGZyb20gXCIuL3V0aWwvRmFjdG9yeURCXCI7XG5cbi8vIE3Ds2R1bG9zXG5pbXBvcnQgUFNQUmVzdCBmcm9tIFwiLi9hcHAvY29udHJvbGxlci9QU1BSZXN0XCI7XG5cbmNsYXNzIEFwcCB7XG4gICAgcHVibGljIGV4cDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgICBwdWJsaWMgc2VydmVyOiBodHRwLlNlcnZlcjtcbiAgICBwcml2YXRlIG1vcmdhbjogbW9yZ2FuLk1vcmdhbjtcbiAgICBwcml2YXRlIGJvZHlQYXJzZXI7IFxuICAgIHByaXZhdGUgY29ycztcbiAgICBwcml2YXRlIGZhY3RvcnlEQjogRmFjdG9yeURCO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZXhwID0gZXhwcmVzcygpOy8vQ3JpYW5kbyBzZXJ2aWRvciBkbyBFeHByZXNzXG4gICAgICAgIHRoaXMuc2VydmVyID0gU29ja2V0VXRpbC5nZXRTZXJ2ZXJTb2NrZXRJbyh0aGlzLmV4cCk7XG4gICAgICAgIHRoaXMuZmFjdG9yeURCID0gbmV3IEZhY3RvcnlEQigpO1xuICAgICAgICB0aGlzLm1pZGRsZXdhcmVzKCk7XG4gICAgICAgIHRoaXMuaW5pdFJvdXRlcygpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgY3JlYXRlQ29ubmVjdGlvbihvbkNvbm5lY3RlZDogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKXtcbiAgICAgICB0aGlzLmZhY3RvcnlEQi5jcmVhdGVDb25uZWN0aW9uKG9uQ29ubmVjdGVkLCBvbkVycm9yKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlVGFibGUob25VcGF0ZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5mYWN0b3J5REIudXBkYXRlVGFibGUob25VcGF0ZSwgb25FcnJvcik7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBjbG9zZUNvbm5lY3Rpb24ob25DbG9zZSl7XG4gICAgICAgIHRoaXMuZmFjdG9yeURCLmNsb3NlQ29ubmVjdGlvbihvbkNsb3NlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1pZGRsZXdhcmVzKCl7XG4gICAgICAgIHRoaXMuZXhwLnVzZShtb3JnYW4oXCJkZXZcIikpO1xuICAgICAgICB0aGlzLmV4cC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgICAgICB0aGlzLmV4cC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogdHJ1ZX0pKTtcbiAgICAgICAgdGhpcy5leHAudXNlKGV4cHJlc3NWYWxpZGF0b3IoKSk7XG4gICAgICAgIHRoaXMuZXhwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcInB1YmxpY1wiKSkpO1xuICAgICAgICB0aGlzLmV4cC51c2UoY29ycygpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRSb3V0ZXMoKXtcbiAgICAgICAgUFNQUmVzdC5zZXRSb3V0ZXModGhpcy5leHApXG4gICAgfVxuXG4gICAgZ2V0U2VxdWVsaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWN0b3J5REIuZ2V0U2VxdWVsaXplKCk7XG4gICAgfVxufSBcblxuZXhwb3J0IGRlZmF1bHQgbmV3IEFwcCgpO1xuIl19