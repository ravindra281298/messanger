const express = require('express');
const bodyParser = require('body-parser');
const user = require('../../models/users');
const person = require('./person');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/chat', (req,res) => {
    if(!req || ! req.body || !req.body.token || req.body.token == undefined) {
        res.status(401);
    }
    res.render('chat',{person:person});
})

app.post('/chat', (req,res) => {
    if(!req.body || !req.body.friend){
        res.status(404);
    }
    const email = req.body.friend;

    person.friend = {};
    user.findOne({ email }).then(friend => {
        if(!friend) {
            res.render('chat', {person: person});
        }
        person.friend.email = friend.email;
        person.friend.name = friend.name;
        console.log(person);
        res.render('chat',{person: person});
    })

});



module.exports = app;