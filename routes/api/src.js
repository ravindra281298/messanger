const express = require('express');
const index = require('./index');
const login = require('./login');
const signup = require('./signup');
const chat = require('./chat');
const chatApp = require('./chat-app');
const app = express();

app.use('/', index);
app.use('/', login);
app.use('/', signup);
app.use('/', chat);
app.use('/', chatApp);

module.exports = app;