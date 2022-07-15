// public modules
const express = require('express')
const mongoose = require('mongoose');
const register_router = express.Router()

// local modules
const {app, client} = require("../db");

//register api
register_router.post('/', async (req, res) =>{


  // new user data    
  let  _id = new mongoose.Types.ObjectId()
  let  firstName = req.body.firstName
  let  lastName = req.body.lastName
  let  userName = req.body.userName
  let  password = req.body.password
  let  email = req.body.email   
  
  const db = client.db("MyGameListDB");

  const usernameCheck = await db.collection('Users').find({userName: userName}).toArray();
  const emailCheck = await db.collection('Users').find({email: email}).toArray();

  if (usernameCheck.length > 0 && emailCheck.length > 0)
  {
    res.status(409).send('Username and email already exists');
  }
  else if (usernameCheck.length > 0)
  {
    res.status(409).send('Username already exists');
  }
  else if (emailCheck.length > 0)
  {
    res.status(409).send('Email already exists');
  }
  else
  {
  // insert new user into database
  const add_user = await db.collection('Users').insertOne({_id:_id,firstName:firstName, lastName:lastName,password:password,email:email,userName:userName})


  res.status(200).json({
    message: "Registered new user"
  });
  }
})

register_router.post('/')

module.exports = register_router
