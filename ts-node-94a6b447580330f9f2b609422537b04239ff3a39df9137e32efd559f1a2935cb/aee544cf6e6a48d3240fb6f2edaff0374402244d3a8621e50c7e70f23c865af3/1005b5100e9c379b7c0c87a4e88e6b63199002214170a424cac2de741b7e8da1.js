"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const debugServe = require("debug");
let port = process.env.PORT || "3000";
let debug = debugServe("nodestr:server");
app_1.default.server.listen(port, () => {
    console.log("Servidor está rodando na porta " + port);
    app_1.default.createConnection(() => {
        console.log("Banco conectado com sucesso!");
        /**
         * As linhas abaixo fazem o processo de atualização do banco de dados
         * não deixe essa configuração em producao. att.Cleibso Gomes
         */
        //TODO resolver este problema usando as configurações de ambiente
        app_1.default.updateTable(() => {
            console.log("Banco Atualizado com sucesso!");
        }, (error) => {
            console.log("Error ao atualizar banco de dados! " + error);
        });
    }, (error) => {
        console.log("Error ao conectar ao banco de dados: " + error);
    });
});
app_1.default.server.on("listening", setDebug);
process.once("SIGUSR2", () => {
    app_1.default.closeConnection(() => {
        console.log("Sistema reiniciado!");
        process.kill(process.pid, "SIGUSR2");
    });
});
process.once("SIGINT", () => {
    app_1.default.closeConnection(() => {
        console.log("Sistema fechado!");
        process.exit(0);
    });
});
function setDebug() {
    let addr = app_1.default.server.address();
    let bind = typeof addr === 'string'
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
    console.log("Debug Iniciado.");
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL3NlcnZlci50cyIsInNvdXJjZXMiOlsiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtCQUF3QjtBQUN4QixvQ0FBb0M7QUFFcEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDO0FBQ3RDLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pDLGFBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELGFBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFFNUM7OztXQUdHO1FBQ0gsaUVBQWlFO1FBQ2pFLGFBQUcsQ0FBQyxXQUFXLENBQUM7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDaEQsQ0FBQyxFQUFFLENBQUMsS0FBSztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLEVBQUUsQ0FBQyxLQUFLO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsYUFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRXJDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO0lBQ3BCLGFBQUcsQ0FBQyxlQUFlLENBQUM7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7SUFDbkIsYUFBRyxDQUFDLGVBQWUsQ0FBQztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUg7SUFDSSxJQUFJLElBQUksR0FBRyxhQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLElBQUksSUFBSSxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVE7VUFDakMsT0FBTyxHQUFJLElBQUk7VUFDZixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN0QixLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnO1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9hcHBcIjtcbmltcG9ydCAqIGFzIGRlYnVnU2VydmUgZnJvbSBcImRlYnVnXCI7XG5cbmxldCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCBcIjMwMDBcIjtcbmxldCBkZWJ1ZyA9IGRlYnVnU2VydmUoXCJub2Rlc3RyOnNlcnZlclwiKTtcbkFwcC5zZXJ2ZXIubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlNlcnZpZG9yIGVzdMOhIHJvZGFuZG8gbmEgcG9ydGEgXCIrIHBvcnQpO1xuICAgIEFwcC5jcmVhdGVDb25uZWN0aW9uKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJCYW5jbyBjb25lY3RhZG8gY29tIHN1Y2Vzc28hXCIpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcyBsaW5oYXMgYWJhaXhvIGZhemVtIG8gcHJvY2Vzc28gZGUgYXR1YWxpemHDp8OjbyBkbyBiYW5jbyBkZSBkYWRvc1xuICAgICAgICAgKiBuw6NvIGRlaXhlIGVzc2EgY29uZmlndXJhw6fDo28gZW0gcHJvZHVjYW8uIGF0dC5DbGVpYnNvIEdvbWVzXG4gICAgICAgICAqL1xuICAgICAgICAvL1RPRE8gcmVzb2x2ZXIgZXN0ZSBwcm9ibGVtYSB1c2FuZG8gYXMgY29uZmlndXJhw6fDtWVzIGRlIGFtYmllbnRlXG4gICAgICAgIEFwcC51cGRhdGVUYWJsZSgoKSA9PiB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFuY28gQXR1YWxpemFkbyBjb20gc3VjZXNzbyFcIik7XG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGFvIGF0dWFsaXphciBiYW5jbyBkZSBkYWRvcyEgXCIgKyBlcnJvcik7XG4gICAgICAgIH0pXG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgYW8gY29uZWN0YXIgYW8gYmFuY28gZGUgZGFkb3M6IFwiICsgZXJyb3IpO1xuICAgIH0pO1xufSk7XG5cbkFwcC5zZXJ2ZXIub24oXCJsaXN0ZW5pbmdcIiwgc2V0RGVidWcpO1xuXG5wcm9jZXNzLm9uY2UoXCJTSUdVU1IyXCIsICgpID0+IHtcbiAgICBBcHAuY2xvc2VDb25uZWN0aW9uKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTaXN0ZW1hIHJlaW5pY2lhZG8hXCIpO1xuICAgICAgICBwcm9jZXNzLmtpbGwocHJvY2Vzcy5waWQsIFwiU0lHVVNSMlwiKTtcbiAgICB9KTtcbn0pO1xuXG5wcm9jZXNzLm9uY2UoXCJTSUdJTlRcIiwgKCkgPT4ge1xuICAgIEFwcC5jbG9zZUNvbm5lY3Rpb24oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNpc3RlbWEgZmVjaGFkbyFcIik7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBzZXREZWJ1Zygpe1xuICAgIGxldCBhZGRyID0gQXBwLnNlcnZlci5hZGRyZXNzKCk7XG4gICAgbGV0IGJpbmQgPSB0eXBlb2YgYWRkciA9PT0gJ3N0cmluZydcbiAgICA/IFwicGlwZSBcIiAgKyBhZGRyXG4gICAgOiBcInBvcnQgXCIgKyBhZGRyLnBvcnQ7XG4gICAgZGVidWcoXCJMaXN0ZW5pbmcgb24gXCIgKyBiaW5kKTtcbiAgICBjb25zb2xlLmxvZyhcIkRlYnVnIEluaWNpYWRvLlwiKTtcbn0iXX0=