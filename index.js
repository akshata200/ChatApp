const express = require('express');
const path = require('path');
const app = express();

const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);

// console.log('server io created');

let userName;
let roomNumber;


app.use(express.static(path.join(__dirname, '/static')));
const users = [];

app.get('/', (req, res) => {
    // console.log('Successfully connected to Login.html');
    res.sendFile(path.join(__dirname + '/static/login.html'));
});

app.get('/chat', (req, res) => {
    // console.log('Successfuly connected to chat.html');
    userName = req.query.username;
    roomNumber = req.query.roomNumber;
    // console.log(userName, roomNumber);
    res.sendFile(path.join(__dirname + '/static/chat.html'));
});
// console.log(userName, roomNumber);
console.log(typeof users)

// Now here is for socket programming
// I have declared 'users' above

io.sockets.on('connection', socket => {
    socket.on('new-user-joined', () => {
        users[socket.id] = userName;
        // console.log(users);
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
server.listen(3000, () => {
    console.log('listening on *:3000');
});