// server requirements to run
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();
const request = require('request');

const {app} = require("../db");

//login api
app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  let error = '';

  const { login, password } = req.body;

  const db = client.db("MyGameListDB");
  const results = await db.collection('Users').find({login:login,password:password}).toArray();

  let id = -1;
  let fn = '';
  let ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  let ret = { id:id, firstName:fn, lastName:ln, error: error};
  res.status(200).json(ret);
});