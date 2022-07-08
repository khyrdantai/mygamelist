// server requirements to run
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();
const request = require('request');

const mongoose = require('mongoose');

const {app, } = require("../db")

//register api
app.post('/api/register', async (req, res, next) =>{
    let error = ''
  
    // new user data
    
    let  _id = new mongoose.Types.ObjectId()
    let  firstName = req.body.firstName
    let  lastName = req.body.lastName
    let  login = req.body.login
    let  password = req.body.password
    let  email = req.body.email   
    
    
    //gettin an error here that login is
    const db = client.db("MyGameListDB");
  
    // insert new user into database
    const add_user = await db.collection('Users').insertOne({_id:_id,firstName:firstName, lastName:lastName,login:login,password:password,email:email})
    res.status(200).json({
      message: "added new user"
    });
  
  })