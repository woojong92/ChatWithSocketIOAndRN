const express = require("express");
const asyncify = require("express-asyncify");
const { ChatRoom, Product, User, ChatMessage } = require("../../models");
const { Op } = require("sequelize");
// const userCtrl = require("./user.ctrl");

const chatRooms = asyncify(express.Router()); 

// 채팅룸 리스트를 가져옴
chatRooms.get('/', async (req, res) => { 
    console.log('req.query : ', req.query);
    try{
        const chatRooms = await ChatRoom.findAll({
            where: {
                // BuyerId: res.locals.user.id,
                [Op.or]: [
                  {
                    BuyerId: res.locals.user.id,
                  },
                  {
                    SellerId: res.locals.user.id,
                  },
                ],
            },
            include: [
              {
                  model: User,
                  as: "Buyer",
              },
              {
                  model: User,
                  as: "Seller",
              },
              {
                model: ChatMessage,
                limit: 1,
                order: [["createdAt", "DESC"]],
              }
            ],
        })
        return res.status(201).json(chatRooms)
    }catch(err) {console.log(err)}
} );

module.exports = chatRooms;