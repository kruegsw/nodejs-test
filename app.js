const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 1234 });
console.log('listening on port 1234...')

// Maintain a list of all connected clients
let clients = [];

wss.on('connection', (ws) => {
    // When a new client connects
    clients.push(ws);
    console.log('Client connected');

    // When a client sends a message
    ws.on('message', (message) => {
        //console.log(message);
        console.log(message.toString());
        // Broadcast the message to all connected clients
        clients.forEach((client) => {
            // Check if the client is ready to receive messages
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    // When a client disconnects
    ws.on('close', () => {
        clients = clients.filter((client) => client !== ws);
        console.log('Client disconnected');
    });
});
