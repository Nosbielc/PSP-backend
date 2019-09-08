import * as http from  "http";
import * as express from "express";
import * as socketIo from "socket.io";

class SocketUtil{
    public io: SocketIO.Server;
    public socket: SocketIO.Socket;
    public server: http.Server;
    private listens = [];

    constructor(){}
    
    public getServerSocketIo(exp: express.Application): http.Server {
        if(!this.server){
            this.server = http.createServer(exp); //Criando servidor HTTP
            this.io = socketIo(this.server);// Criando Servidor do Socket.io
        }
        this.initSockets();
        return this.server;
    }
    
    public addListen(event:string, action: any){
        this.listens.push({
            event: event,
            action: action
        });
    }
    public emit(event:string, object: Object){
        if(this.io){
            this.io.emit(event, object);
        }
    }
    
    private initSockets(){
        this.io.on('connect', (socket: any) => {
                this.listens.forEach((listen, index, list) => {
                socket.on(listen.event, listen.action);
                }); 
            socket.on('disconnect', () => {
            });
        });
    }
}

export default new SocketUtil();