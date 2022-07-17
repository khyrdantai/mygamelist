// public modules
const mongoose = require('mongoose');

// local modules
const {client, express} = require("../db");
const register_router = express.Router()
//register api
register_router.post('/register', async (req, res) =>{

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
  const add_user = await db.collection('Users').insertOne(
    {
      _id:_id,
      firstName:firstName, 
      lastName:lastName,
      password:password,
      email:email, 
      userName: userName,
      games: [],
      verified: false,
      createdAt: new Date()
    })

    res.status(200).json({
      message: "Registered new user",
      userId: add_user.insertedId,
      email: email,
      firstName: firstName
    });
  }
})

//Search the database for the user and change verify field to true
register_router.post('/verify', async (req, res) =>
{
  try
  {
    let userId = mongoose.Types.ObjectId(req.body.verifyId);
    const db = client.db("MyGameListDB");
    const verify_user = await db.collection('Users').updateOne({_id:userId}, { $set: {verified: true}});
  
    if (verify_user.matchedCount === 0 && verify_user.modifiedCount === 0)
    {
      res.status(404).send({message: 'Could not find user to verify'});
    }
    else if (verify_user.matchedCount === 1 && verify_user.modifiedCount === 0)
    {
      res.status(409).send({message: 'The user was found, but could not be verified'});
    }
    else
    {
      res.status(200).send({message: 'Thank you for verifying!'});
    }
  }
  catch (e)
  {
    res.status(404).send({message: e});
  }
})

module.exports = register_router
