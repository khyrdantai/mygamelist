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
    let  password = req.body.password
    let  email = req.body.email   
    let  userName = req.body.userName
    
    const db = client.db("MyGameListDB");
  
    // insert new user into database
    const add_user = await db.collection('Users').insertOne({_id:_id,firstName:firstName, lastName:lastName,password:password,email:email,userName:userName})
    
    res.status(200).json({
      message: "Registered new user"
    });
  
  })

module.exports = register_router