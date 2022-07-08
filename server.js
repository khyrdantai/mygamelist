// server requirements to run
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();
const request = require('request');

// config folder stuff
const {connectDB, app, PORT} = require("./backend/db");
connectDB();

app.use('/api/login', require('./backend/routes/loginRoute'))
app.use('/api/register', require('./backend/routes/registerRoute'))

//start Node + Express server listener
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});