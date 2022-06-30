const express = require('express');
require('dotenv').config();
require('./mongooseDb');
const app2 = express();
const Sockets = require("./app/Socket/sockets");
const http = require('http');
const server2  = http.createServer(app2);
const WebSocket = require("socket.io").Server;
const schema = require('./app/Schema/chatHistorySchema');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const io = new WebSocket(server2);



async function startApolloServer(){
    const server = new ApolloServer({
        typeDefs: schema.typeDefs,
        resolvers: schema.resolver
    });
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    await server.start();
    server.applyMiddleware({ app });
    app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`));
}
app2.use(cors());
app2.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/index.html');
});
app2.get('/login', (req, res) => {
    res.sendFile(__dirname + '/Views/login.html');
});
app2.get('/register', (req, res) => {
    res.sendFile(__dirname + '/Views/register.html');
});
server2.listen(5000, () => {
    console.log('listening on *:5000');
});
Sockets(io);
startApolloServer();