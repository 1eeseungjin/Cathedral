const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(require('cors')());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.use(require('./middleware/Auth'));
app.use(require('./routes'));
let portnumber = 22021;
app.listen(portnumber);
