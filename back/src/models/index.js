const Sequelize = require('sequelize');
const User = require('./user');
const Product = require('./product');
const ChatRoom = require('./chatRoom');
const ChatMessage = require('./chatMessage');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User; 
db.Product = Product;
db.ChatRoom = ChatRoom;
db.ChatMessage = ChatMessage;


User.init(sequelize); 
Product.init(sequelize);
ChatRoom.init(sequelize);
ChatMessage.init(sequelize);

// 다른 테이블과의 관계를 연결하는 associate 메서드
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;