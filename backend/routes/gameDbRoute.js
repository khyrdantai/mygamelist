// public modules
const {app, client, express} = require("../db");
const gameDbRoute_router = express.Router();
const db = client.db('MyGameListDB');

//Gets a user's list of games and ratings
gameDbRoute_router.post('/getUserGames', async (req, res) =>
{
  // incoming: id
  // outgoing: An array of objects that contain {id: game's _id, rating: user's rating of game}

  let id = req.body.id;

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

    res.status(200).send(results);
  }

  res.status(404);
});

//
gameDbRoute_router.post('/searchAllGames', async (req, res) =>
{
  /* incoming: Any number of the following
     id, averageRating, description, genre, name, platform [], userCount, year

     outgoing: 
     An array of objects that contains all of the data for every game that matches
     the search results.
  */ 
  
  let searchParams = 
  {
    ... (req.body.id !== undefined) && { _id : req.body.id},
    ... (req.body.averageRating !== undefined) && { averageRating : req.body.averageRating},
    ... (req.body.description !== undefined) && { description : req.body.description},
    ... (req.body.genre !== undefined) && { genre : req.body.genre},
    ... (req.body.name !== undefined) && { name : req.body.name},
    ... (req.body.platform !== undefined) && { platform : { $all: req.body.platform}},
    ... (req.body.userCount !== undefined) && { userCount : newUsercount},
    ... (req.body.year !== undefined) && { year : req.body.year}
  }


  const response = await db.collection('Games').find(searchParams).toArray();

    
  let results = [];
  console.log(response.length);

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

    console.log("did we 200");
    console.log(results);
    res.status(200).json(results);
  }
  else
  {
    console.log("did we get 404");
    res.status(404);
  }
});

module.exports = gameDbRoute_router;
