import { Sequelize } from 'sequelize-typescript';
import App from "./app";
import * as debugServe from "debug";

let port = process.env.PORT || "3000";
let debug = debugServe("nodestr:server");
App.server.listen(port, () => {
    console.log("Servidor está rodando na porta "+ port);
    App.createConnection(() => {
        console.log("Banco conectado com sucesso!");

        /**
         * As linhas abaixo fazem o processo de atualização do banco de dados
         * não deixe essa configuração em producao. att.Cleibso Gomes
         */
        //TODO resolver este problema usando as configurações de ambiente
        App.updateTable(() => {
           console.log("Banco Atualizado com sucesso!");
        }, (error) => {
           console.log("Error ao atualizar banco de dados! " + error);
        })
    }, (error) => {
        console.log("Error ao conectar ao banco de dados: " + error);
    });
});

App.server.on("listening", setDebug);

process.once("SIGUSR2", () => {
    App.closeConnection(() => {
        console.log("Sistema reiniciado!");
        process.kill(process.pid, "SIGUSR2");
    });
});

process.once("SIGINT", () => {
    App.closeConnection(() => {
        console.log("Sistema fechado!");
        process.exit(0);
    });
});

function setDebug(){
    let addr = App.server.address();
    let bind = typeof addr === 'string'
    ? "pipe "  + addr
    : "port " + addr.port;
    debug("Listening on " + bind);
    console.log("Debug Iniciado.");
}