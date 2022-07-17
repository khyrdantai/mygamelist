// public modules
const {app, client, express} = require("../db");
const gameDbRoute_router = express.Router();
const mongoose = require('mongoose')
const db = client.db('MyGameListDB');
const{authenticate_token, jwt, initial_key} = require('../authentication')

//Add game to list of user games
gameDbRoute_router.post('/addUserGame', authenticate_token, async (req, res) =>{


  let {_id, id, rating} = req.body
  userID = mongoose.Types.ObjectId(_id)

  const db = client.db("MyGameListDB");
  const result = await db.collection('Users').updateOne({_id:userID} , { $push: {"games": {id:id, rating:rating}}})

  jwt.verify(req.token, initial_key, (err, authData) =>{
    if(err){
      res.sendStatus(403)
    }else res.status(200).json({result, authData});
  })
    
 
})

//Gets a user's list of games and ratings
gameDbRoute_router.post('/getUserGames', authenticate_token, async (req, res) =>
{

  // incoming: id
  // outgoing: An array of objects that contain {id: game's _id, rating: user's rating of game}

  let id = mongoose.Types.ObjectId(req.body.id);

  const response = await db.collection('Users').find({_id:id}).toArray();
  
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
  }else res.sendStatus(404);


  jwt.verify(req.token, initial_key, (err, authData) =>{
    if(err){
      res.sendStatus(403)
    }else {
      console.log("made it through verify")
      res.status(200).json(results);
    }
  })

});

//
gameDbRoute_router.post('/searchAllGames', authenticate_token, async (req, res) =>
{
  /* incoming: Any number of the following
     id, averageRating, description, genre[], name, platform [], userCount, year

     outgoing: 
     An array of objects that contains all of the data for every game that matches
     the search results.
  */ 
  
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
        
        results.push(temp);
    });

    
  }
  else{
    res.status(404).send('Not Found');
  }

  jwt.verify(req.token, initial_key, (err, authData) =>{
    if(err){
      res.sendStatus(403)
    }else res.status(200).json({result, authData});
  })
});

gameDbRoute_router.post('/updateGamesList', authenticate_token,async (req, res) =>{

  let {_id, id, rating} = req.body
  userID = mongoose.Types.ObjectId(_id)

  const response = await db.collection('Users').updateOne({"_id":userID, "games.id":id}, {$set:{"games.$.rating":rating}})

  jwt.verify(req.token, initial_key, (err, authData) =>{
    if(err){
      res.sendStatus(403)
    }else res.status(200).json(response)
  })
})

gameDbRoute_router.post('/deleteGame', authenticate_token,async (req, res)=>{

  let {_id, id} = req.body
  userID = mongoose.Types.ObjectId(_id)

  const response = await db.collection('Users').updateOne({_id:userID}, {$pull: {"games":{id: id}}})
  
  jwt.verify(req.token, initial_key, (err, authData) =>{
    if(err){
      res.sendStatus(403)
    }else res.status(200).json({message: "delete successfull"})
  })

})

module.exports = gameDbRoute_router;
