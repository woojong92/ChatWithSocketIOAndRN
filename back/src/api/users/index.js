const express = require("express");
const asyncify = require("express-asyncify");
// const userCtrl = require("./user.ctrl");

const users = asyncify(express.Router()); 

// user.get("", userCtrl.register);
users.get('/', (req, res) => { res.send('로그인 정보를 가져옴'); } );
users.post('/', (req, res) => { res.send('회원가입'); } );
users.post('/login', (req, res) => { res.send('로그인'); } );
users.post('/logout', (req, res) => { res.send('logout'); } );


// users.post("/login", userCtrl.login);
// user.get("/check", userCtrl.check);
// user.post("/logout", userCtrl.logout);

module.exports = users;