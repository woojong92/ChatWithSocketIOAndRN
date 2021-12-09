const express = require("express");
const asyncify = require("express-asyncify");
const { Op } = require("sequelize");
const isLoggedIn = require("../../libs/isLoggedIn");
const { Product, ChatMessage, ChatRoom, User } = require("../../models");
// const userCtrl = require("./user.ctrl");

const products = asyncify(express.Router()); 

// 상품 리스트를 가져옴, 
products.get('/', async (req, res) => { 
    const products = await Product.findAll({});
    return res.status(201).json(products)
} );

// 상품 등록
products.post('/', isLoggedIn, async (req, res) => { 
    const {title, price, description  } = req.body;

    console.log('[rocal] : ', res.locals);

    const product = await Product.create({
        title,
        price,
        description,
        SellerId : res.locals.user.id,
    }); 

    return res.status(201).json(product);
} );

// :product에 해당하는 상품 삭제
products.get('/:product', async (req, res) => { 
    const product = await Product.findOne({
      where: { id: req.params.product },
      include: [
          {
              model: User,
              as: "Seller"
          }
      ]
    });
    res.status(201).json(product);
});

products.get('/:product/chatrooms/:buyer/messages', isLoggedIn, async (req, res) => { 
    const product = await Product.findOne({
        where: { id: req.params.product },
        include: [
            {
              model: ChatRoom,
            },
          ],
      });
      if (!product) {
        return res.status(404).send("존재하지 않는 product입니다.");
      }
      const chatRoom = product.ChatRooms.find(
        (v) => v.BuyerId === parseInt(decodeURIComponent(req.params.buyer))
      );

      // console.log('[chatRoom] : ', chatRoom );
      if (!chatRoom) {
        return res.status(404).send("존재하지 않는 채널입니다.");
      }

      return res.json(
        await chatRoom.getChatMessages({
          include: [
            {
                model: User,
                as: "Sender",
                // attributes: ["name", "id"],
            },
            {
                model: User,
                as: "Receiver",
                // attributes: ["name", "id"],
            },
          ],
          order: [["createdAt", "DESC"]],
          limit: parseInt(req.query.perPage, 10),
          offset: req.query.perPage * (req.query.page - 1),
        })
      );
});

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

products.post('/:product/chatrooms/:buyer/messages', isLoggedIn, async (req, res) => { 
    console.log('buyer : ', req.params.buyer);

    const product = await Product.findOne({
        where: { id: req.params.product },
      });
      if (!product) {
        return res.status(404).send("존재하지 않는 상품입니다.");
      }

      let chatRoom = await ChatRoom.findOne({
          where: {
              ProductId: product.id,
              BuyerId: req.params.buyer,
          }
      })

      if(!chatRoom) {
        console.log("존재하지 않는 chatroom입니다. 새로운 chatroom 생성")
        chatRoom = await ChatRoom.create({
            ProductId :  product.id,
            BuyerId : req.params.buyer,
            SellerId: product.SellerId
        })
      } 
      console.log('[chatRoom] : ', chatRoom );

      const SenderId = res.locals.user.id;
      const ReceiverId = req.body.receiver;
      console.log('SenderId : ', SenderId);
      console.log('ReceiverId : ', ReceiverId)

      const chatMessage = await ChatMessage.create({
        SenderId,
        ReceiverId,
        ChatRoomId: chatRoom.id,
        content: req.body.content,
      });

      const chatMessageWithSender = await ChatMessage.findOne({
        where: { id: chatMessage.id },
        include: [
          {
            model: User,
            as: "Sender",
          },
        ],
      });

      console.log('[chatMessage] : ', chatMessage );
      console.log('[chatMessageWithSender] : ', chatMessageWithSender );

      const io = req.app.get("io");
      const onlineMap = req.app.get("onlineMap");
      const receiverSocketId = getKeyByValue(
        onlineMap[`/ws-${product.id}`],
        Number(ReceiverId)
      );
      io.of(`/ws-${product.id}`)
        .to(receiverSocketId)
        .emit("dm", chatMessageWithSender);
      res.send("ok");


      // res.status(201).json(chatMessageWithSender);
   
});

products.get(
  "/:product/chatrooms/:buyer/unreads",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const product = await Product.findOne({
        where: { url: req.params.product },
      });
      if (!product) {
        return res.status(404).send("존재하지 않는 product입니다.");
      }

      const chatRoom = product.ChatRooms.find(
        (v) => v.BuyerId === parseInt(decodeURIComponent(req.params.buyer))
      );

      if (!chatRoom) {
        return res.status(404).send("존재하지 않는 chatRoom입니다.");
      }
      const count = await ChatMessage.count({
        where: {
          ChatRoomId: chatRoom.id,
          ReceiverId: res.local.user.id,
          createdAt: {
            [Op.gt]: new Date(+req.query.after),
          },
        },
      });
      return res.json(count);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = products;