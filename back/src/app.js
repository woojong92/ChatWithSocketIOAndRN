require("dotenv").config();
const express = require('express')
// const bodyParser = require('body-parser');
const api = require('./api');
const { sequelize } = require('./models');

const jwtMiddleware = require('./libs/jwtMiddleware');

const webSocket = require("./socket");

const app = express()
const port = 3011

sequelize.sync({force: true})
  .then(() => {
    console.log('데이터베이스 연결 성공!');
  })
  .catch((error) => {
    console.error(error);
  })


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(jwtMiddleware);
app.use("/api", api);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

webSocket(server, app);