import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log("client connected");

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    
    const payload=JSON.stringify({
        type:'custom-message',
        payload:data.toString(),
    })

    //socket para todos
    /*
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });*/

    //socket pero quita el que envia
 
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  
   // ws.send(JSON.stringify(payload));
  });

  //ws.send('Hola desde el servidor!');

    ws.on("close",()=>{
        console.log("Cliente disconnected");
    });
});

console.log("Server runningun on port http://localhost:3000")