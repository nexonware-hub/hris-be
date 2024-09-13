const app = require('./app');
const port = process.env.PORT || 9000;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
// const WebSocket = require('ws');
const http = require('http');
const { setWebSocketServer } = require('./controllers/employeeController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// setWebSocketServer(wss);

// // Broadcast logs to all connected clients
// wss.broadcast = function broadcast(feature, data) {
//     wss.clients.forEach(function each(client) {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({feature: feature, data: data}));
//         }
//     });
// };

// wss.on('connection', (ws, req) => {
     
//     ws.on('close', () => {
//         console.log(`Client disconnected: ${userID}`);
//     });
// });

server.listen(port, () => {
    console.log('Server started on port 9000');
});
