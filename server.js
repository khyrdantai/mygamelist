const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./api');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const mongo = new MongoClient(uri);
client.connect(uri);

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(process.env.PORT); 

module.exports = (app, client, mongo);
