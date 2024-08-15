
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors') 
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const port = 8000;


app.use(cors());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employee',require('./routes/employee'));
app.use('/api/department',require('./routes/department'));
app.use('/api/owner',require('./routes/owner'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

