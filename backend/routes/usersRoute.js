// modules
const mongoose = require('mongoose');
const {client, express} = require("../db");
const {jwt, initial_key} = require("../authentication")
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

//router to export
const users_router = express.Router();

//register api
users_router.post('/register', async (req, res) =>{

  try{
    //hash password
    const salt = await bcrypt.genSalt()
    const hashed_password = await(req.body.password, salt)
    
    // new user data 
    let  _id = new mongoose.Types.ObjectId()
    let  firstName = req.body.firstName
    let  lastName = req.body.lastName
    let  userName = req.body.userName
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
      const add_user = await db.collection('Users').insertOne({_id:_id,firstName:firstName, lastName:lastName,password:hashed_password,email:email,userName:userName})
      
      res.status(200).json({message: "added new user"});

    }
  }catch{
  res.sendStatus(500).send
  }
})

//login api
users_router.post('/login', async (req, res) => {

  //connect to and access db
  const db = client.db("MyGameListDB");
  
  const user = {userName: req.body.userName}
  // 0 means false here, could be changed to "false" later
  const RETURN_USER = await db.collection('Users').find(user).project({firstName: 0, lastName: 0 , email:0, games: 0}).toArray()

  if(RETURN_USER == null){
    return res.status(400).send("cannot find user")
  }

  const password = String(req.body.password)
  const hash = String(RETURN_USER[0].password)

  try{
    if(async ()=>{bcrypt.compare(password, hash)} ){
      jwt.sign({user:RETURN_USER}, initial_key, (err, token) =>{
        res.json({
          token:token
        });
      })
    }  
  }catch{
    res.status(500).send()
  }  
});

module.exports = users_router
