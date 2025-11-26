import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', (message) => {
    console.log('received: %s', message);
    // ws.send(`Echo: ${message}`);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: false });
      }
    });
  });

  ws.send('something')

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // setInterval(() => {
  //   ws.send('Hola de nuevo');
  // }, 2000);
});

console.log('http://localhost:3000');