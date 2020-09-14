const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');
const user = require('../../models/users');



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/signup', (req,res) => {
    res.render('signup');
})

// @router POST /signup
// @desc Register user
// @access Public
app.post('/signup', (req,res) => {

    if(!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({error:"Enter valid details!!"});
    }

    user.findOne({email:req.body.email}).then(docs => {
        if(docs) {
            return res.status(400).json({email:"email already exists"});
        } else {

            const newUser = new user({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

           //Hash password before saving in database
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => {
                        const msg = `Hi ${user.name}, you have successfully registered. Now try logging in.`;
                        res.render('index',{msg:msg});
                    })
                    .catch(err => console.log(err));
                });
            });
        }
    });

    // user.create({newUser}, (err,docs) => {
    //     if(err) {
    //         throw err;
    //     }
    //     res.send(`Hi, ${newUser.name} you have successfully registered.`);
    // });
});


module.exports = app;