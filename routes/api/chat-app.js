const http = require('http');
const express = require("express");
const socketio = require('socket.io');
const person = require('./person');
const path = require('path')

const app = express();
const server = http.createServer(app); //io requires raw http
const io = socketio(server);


io.on('connection', socket => {
    console.log('socket');
    socket.broadcast.emit("showMessage", { name: 'Anonymous', message: 'A NEW USER HAS JOINED' })

    socket.on('sendMessage', message => io.emit('showMessage', message))
})


app.post('/chat-app', (req,res) => {
    if(!req.body || !req.body.friend){
        res.status(404);
    }

    res.render('main',{person:person});
});

app.get('/chat-app', (req,res) => {

    res.render('main',{person:person});
})

module.exports = app;


