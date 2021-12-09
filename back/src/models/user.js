const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false,
      },
      phoneNumber: {
        type:  Sequelize.STRING(20),
        allowNull: false,
        unique: false,
      },
      signupType: {
        type: Sequelize.STRING(10), // email, kakao, naver, google, apple,
        allowNull: false,
      },
      snsId : {
        type: Sequelize.STRING(20),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(20),
      }, 
      email: {
        type: Sequelize.STRING(20),
      } 
    }, {
      sequelize,
      timestamps: true, //true면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가합니다.
      underscored: false, // true면 스네이크 케이스로
      modelName: 'User',
      tableName: 'users',
      paranoid: true, //  true로 설정하면 deletedAt이라는 컬럼이 생깁니다.
      charset: 'utf8', // charset, collate 각각 utf8과 utf8_general_ci로 설정해야 한글이 입력됩니다. 이모티콘까지 입력할 수 있게 하고 싶다면 utf8mb4와 utf8mb4_general_ci를 입력합니다.
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.User.hasMany(db.Product, { as:"Seller", foreignKey: "SellerId"});
    db.User.hasMany(db.ChatRoom, {as: "Buyer",  foreignKey: "BuyerId"});
  }
};