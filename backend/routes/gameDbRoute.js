// public modules
const {app, client, express} = require("../db");
const gameDbRoute_router = express.Router();
const mongoose = require('mongoose')
const db = client.db('MyGameListDB');
const{authenticate_token, jwt, initial_key} = require('../authentication')

//Add game to list of user games
gameDbRoute_router.post('/addUserGame', authenticate_token, async (req, res) =>{
  try{
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.status(403).json({Message: "token verification failed"})
      }else{

        let {_id, id, rating} = req.body
        userID = mongoose.Types.ObjectId(_id)

        console.log(_id)
        console.log(id)

        const db = client.db("MyGameListDB");
        
        //if the game is in the users list, you cant add a duplicate
        const response = await db.collection('Users').find({_id:userID, "games.id":id}).toArray()

        if(response.length > 0){
          return res.status(200).json({message: "This game is already in this users list"})
        }
        const result = await db.collection('Users').updateOne({_id:userID} , { $push: {"games": {id:id, rating:rating}}})
        
        res.status(200).json({message: "Success: game added"});
      }
    })
  }catch{
    res.sendStatus(500).send("Internal Server Error")
  } 
})

//Gets a user's list of games and ratings
gameDbRoute_router.post('/getUserGames', authenticate_token, async (req, res) =>
{
  try{

    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.Status(403).json({Message: "token verification failed"})
      }else {
        // incoming: id
        // outgoing: An array of objects that contain {id: game's _id, rating: user's rating of game}
        try{
          let _id = mongoose.Types.ObjectId(req.body._id);

          const response = await db.collection('Users').find({_id:_id}).toArray();
          
          
          let results = [];

          if (response.length > 0)
          {
            response[0].games.forEach((game) => 
            {
                temp = 
                {
                    id: game.id,
                    rating: game.rating
                }
                
                results.push(temp);
            });
            res.status(200).json(results);

          }else {
            res.status(401).json("user not found")
          }
        }catch{
          res.status(500).json("Internal Server error")
        }
      }
    })
  }catch{
    res.status(403).json({message: "authentication error"})
  }
});

//
gameDbRoute_router.post('/searchAllGames', async (req, res) =>
{
  /* incoming: Any number of the following
  id, averageRating, description, genre[], name, platform [], userCount, year

  outgoing: 
  An array of objects that contains all of the data for every game that matches
  the search results.
  */ 
  try{
    let searchParams = 
    {
      ... (req.body.id !== undefined) && { _id : req.body.id},
      ... (req.body.averageRating !== undefined) && { averageRating : req.body.averageRating},
      ... (req.body.description !== undefined) && { description : req.body.description},
      ... (req.body.genre !== undefined) && { genre : { $all: req.body.genre}},
      ... (req.body.name !== undefined) && { name : {$regex: req.body.name, $options: 'i'}},
      ... (req.body.platform !== undefined) && { platform : { $all: req.body.platform}},
      ... (req.body.userCount !== undefined) && { userCount : parseInt(req.body.userCount)},
      ... (req.body.year !== undefined) && { year : req.body.year}
    }

    const response = await db.collection('Games').find(searchParams).toArray();
      
    let results = [];

    if (response.length > 0)
    {
      response.forEach((game) => 
      {
          temp = 
          {
              id: game._id,
              name: game.name,
              description: game.description,
              rating: game.averageRating,
              release: game.year,
              genre: game.genre,
              platforms: game.platform,
              userCount: game.userCount
          }
          results.push(temp)

      })
    }
    else{
      return res.status(200).json({message: "No games found"})
    } 

    res.status(200).json(results)
  }catch{
    res.status(500).json("Internal Server error")

  }
  
});

gameDbRoute_router.post('/updateGamesList', authenticate_token,async (req, res) =>{ 
  try{
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else {
        try{
          let {_id, id, rating} = req.body
          userID = mongoose.Types.ObjectId(_id)
  
          const response = await db.collection('Users').updateOne({"_id":userID, "games.id":id}, {$set:{"games.$.rating":rating}})
  
          res.status(200).json(response)
        }catch{
          res.status(400).json({message: "failed to update game"})
        }
        
      }
    })
  }catch{
    res.status(403).json({message: "authentication error"})
  } 

  
})

gameDbRoute_router.post('/deleteGame', authenticate_token,async (req, res)=>{
  try{
    jwt.verify(req.token, initial_key, async (err, authData) =>{
      if(err){
        res.sendStatus(403)
      }else {
        try{
          let {_id, id} = req.body
          userID = mongoose.Types.ObjectId(_id)
    
          const response = await db.collection('Users').updateOne({_id:userID}, {$pull: {games: {id:id}}})
          if(response.modifiedCount >0){
            return res.status(200).json(response)
          }
          res.status(200).json({message: "Error"})
        }catch{
          res.status(400).json({message: "failed to delete game"})
        }
      }
    })
  }catch{
    res.status(403).json({message: "authentication error"})
  }
})

module.exports = gameDbRoute_router;
