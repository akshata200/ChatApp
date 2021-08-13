const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000

const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);


let userName;
let roomNumber;

// load static
app.use('/css', express.static(path.resolve(__dirname, '/static/css')));
app.use('/js', express.static(path.resolve(__dirname, '/static/js')));
app.use('/image', express.static(path.resolve(__dirname, '/static/image')));
app.use('/sound', express.static(path.resolve(__dirname, '/static/sound')));

app.use(express.static(path.join(__dirname, '/static')));
const users = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/login.html'));
});

app.get('/chat', (req, res) => {
    userName = req.query.username;
    roomNumber = req.query.roomNumber;
    res.sendFile(path.join(__dirname + '/static/chat.html'));
});

// Socket programming

io.sockets.on('connection', socket => {
    socket.on('new-user-joined', () => {
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    });
    socket.on('sendURL', urlLink => {
        socket.broadcast.emit('receiveURL', {
            urlLink: urlLink,
            name: users[socket.id]
        });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});
server.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});