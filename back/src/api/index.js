const express = require("express");
const asyncify = require("express-asyncify");
// const vacations = require('./vacations');
// const members = require('./vacations')
const users = require('./users');
const chatrooms = require('./chatrooms');

const api = asyncify(express.Router()); 

api.use('/test', (req, res) => { res.send('Hello World!'); } );
api.use('/users', users)
api.use('/chatrooms', chatrooms);

module.exports = api;