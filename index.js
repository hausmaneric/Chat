let express = require('express');
let app = express();
const fs = require('fs');

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3030;

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', { user: data.user, message: data.message, image: data.image, arquivo: data.arquivo, dados_arquivo: data.dados_arquivo });
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});