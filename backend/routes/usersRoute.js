// modules
const mongoose = require('mongoose');
const {client, express} = require("../db");
const {get_token, jwt, initial_key} = require("../authentication")

//router to export
const users_router = express.Router();

//register api
users_router.post('/register', async (req, res) =>{

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

//login api
users_router.post('/login', async (req, res) => {

  const {userName, password} = req.body
  const user = {userName:userName, password:password} 

  //connect to and access db
  const db = client.db("MyGameListDB");
  const RETURN_USER = await db.collection('Users').find(user).project({password: 0 , games: 0}).toArray();

  jwt.sign({user:RETURN_USER}, initial_key, (err, token) =>{
      res.json({
        token:token
      });
    
  })
});

module.exports = users_router
