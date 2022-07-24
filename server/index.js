const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");


const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

const dispatchEvent = (message, ws) => {
    const json = JSON.parse(message);

    switch (json.event) {
        case "chat-message": webSocketServer.clients.forEach(client => client.send(message));
        // default: ws.send((new Error("Wrong query")).message);
    }
}

webSocketServer.on('connection', ws => {
    ws.on('message', m => dispatchEvent(m, ws));
    ws.on("error", e => {
        const payload = {userName: 'SERVER', message: e}
        const data = {event: 'error', payload}
        ws.send(JSON.stringify(data))
    });
    const payload = {userName: 'SERVER', message: 'Hi there, I am a WebSocket server'}
    const data = {event: 'request', payload}
    ws.send(JSON.stringify(data));
});

server.listen(9000, () => console.log("Server started on port 9000"))



