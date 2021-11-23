const express = require('express')
const bodyParser = require('body-parser');
const api = require('./api');

const app = express()
const port = 3011



app.use(bodyParser.json());
app.use("/api", api);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})