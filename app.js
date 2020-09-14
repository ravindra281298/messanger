const http = require('http');
const express = require("express");
const mongoose = require("mongoose");
const api = require('./routes/api/src');
const db = require('./config/keys').mongoURI;
const socketio = require('socket.io');


const app = express();
const port = 3001;
const server = http.createServer(app); //io requires raw http
const io = socketio(server);


mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => { console.log("mongoDB connected successfully")})
    .catch(err => console.log(err));

// io.on('connection', socket => {
//     socket.broadcast.emit("showMessage", { name: 'Anonymous', message: 'A NEW USER HAS JOINED' })

//     socket.on('sendMessage', message => io.emit('showMessage', message))
// })

app.set('view engine', 'ejs');
app.use('/',api);




server.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
});