const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express()

app.use('/api/login', require('./backend/routes/loginRoute'))

// config database
const {connectDB} = require("./backend/config/db");
connectDB();

//start Node + Express server listener
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});

module.exports(express, bodyParser, cors, path, env, PORT, app)