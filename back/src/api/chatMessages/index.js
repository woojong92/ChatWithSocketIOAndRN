const express = require("express");
const asyncify = require("express-asyncify");
const { ChatMessage } = require("../../models");
// const userCtrl = require("./user.ctrl");

const chatMessges = asyncify(express.Router()); 

chatMessges.get('/', async (req, res) => { 

    if(!req.query.chatRoomId) {
        return res.status(404).send("chatMessageId를 입력하세요.");
    }

    const cahtMessages = await ChatMessage.findAll({
        where : {chatRoomId :req.query.chatRoomId}
    })

    return res.status(201).json(cahtMessages)
} );

// 채팅룸을 생성함
chatMessges.post('/', async (req, res) => { 
    const { chatRoomId, senderId,content,isUnread } = req.body;

    const chatMessage = await ChatMessage.create({
        chatRoomId,
        senderId,
        content,
        isUnread
    }); 

    return res.status(201).json(chatMessage);
} );

// 채팅룸 내부의 채팅내용들을 가져옴
chatMessges.get('/:chatroom/chats', (req, res) => { res.send('채팅룸 내부의 채팅내용들을 가져옴'); } );

// 채팅룸 내부의 채팅 저장
chatMessges.post('/:chatroom/chats', (req, res) => { res.send('채팅룸 내부의 채팅 저장'); } );

// 채팅룸 내부의 이미지 저장 
chatMessges.post('/:chatroom/images', (req, res) => { res.send('채팅룸 내부의 이미지 저장 '); } );


// users.post("/login", userCtrl.login);

module.exports = chatMessges;