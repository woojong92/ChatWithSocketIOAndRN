const express = require("express");
const asyncify = require("express-asyncify");

const users = require('./users');
const products = require('./products');
const chatRooms = require('./chatRooms');
const chatMessages = require('./chatMessages');

const api = asyncify(express.Router()); 

api.use('/test', (req, res) => { res.send('Hello World!'); } );

api.use('/users', users)
api.use('/products', products);
api.use('/chatRooms', chatRooms);
api.use('/chatMessages', chatMessages);

module.exports = api;