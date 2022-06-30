const { MongoClient } = require('mongodb');

// API ENDPOINTS!!!! *****************************
const client = require('mongodb').MongoClient;
const app = require('express').Router();
const mongo = new MongoClient()
require('dotenv').config();


  app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  let error = '';

  const { login, password } = req.body;

  const db = client.db("mygamelistDB");
  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

  let id = -1;
  let fn = '';
  let ln = '';

  if( results.length > 0 )
  {
    id = results[0].ObjectId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  let ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});

 
module.exports = (app, client);