require('dotenv').config();

const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const setupWebSocket = require('./wsServer');

const app = express();
const server = http.createServer(app); // created http server for websocket compatibility

connectDB();

setupWebSocket(server);

//for testing backend
app.get('/', (req,res)=>{
    res.send('Backed is running fine');
});

//server start
const PORT = process.env.PORT || 4000;
server.listen(PORT,() => {
    console.log(`server listening on http://localhost:${PORT}`);
});