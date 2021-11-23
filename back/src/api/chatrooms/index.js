const express = require("express");
const asyncify = require("express-asyncify");
// const userCtrl = require("./user.ctrl");

const chatrooms = asyncify(express.Router()); 

// 채팅룸 리스트를 가져옴
chatrooms.get('/', (req, res) => { res.send('채팅룸 리스트를 가져옴'); } );

// 채팅룸을 생성함
chatrooms.post('/', (req, res) => { res.send('채팅룸을 생성함'); } );

// 채팅룸 내부의 채팅내용들을 가져옴
chatrooms.get('/:chatroom/chats', (req, res) => { res.send('채팅룸 내부의 채팅내용들을 가져옴'); } );

// 채팅룸 내부의 채팅 저장
chatrooms.post('/:chatroom/chats', (req, res) => { res.send('채팅룸 내부의 채팅 저장'); } );

// 채팅룸 내부의 이미지 저장 
chatrooms.post('/:chatroom/images', (req, res) => { res.send('채팅룸 내부의 이미지 저장 '); } );


// users.post("/login", userCtrl.login);

module.exports = chatrooms;