const Sequelize = require('sequelize');

module.exports = class ChatRoom extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    }, {
      sequelize,
      timestamps: true, //true면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가합니다.
      underscored: false, // true면 스네이크 케이스로
      modelName: 'ChatRoom',
      tableName: 'chatRooms',
      paranoid: true, //  true로 설정하면 deletedAt이라는 컬럼이 생깁니다.
      charset: 'utf8', // charset, collate 각각 utf8과 utf8_general_ci로 설정해야 한글이 입력됩니다. 이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4와 utf8mb4_general_ci를 입력합니다.
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.ChatRoom.belongsTo(db.Product);
    db.ChatRoom.hasMany(db.ChatMessage);
    db.ChatRoom.belongsTo(db.User, {as: "Buyer",  foreignKey: "BuyerId"});
    db.ChatRoom.belongsTo(db.User, {as: "Seller",  foreignKey: "SellerId"});
  }
};