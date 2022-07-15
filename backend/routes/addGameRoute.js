const {client, express} = require("../db");
const add_game_router = express.Router()
const parser = bodyParser = require('body-parser') 
const authenticate_token = require('../authentication')

add_game_router.post('/',  async (req, res) =>{
    const this_game_id       = req.body.this_game_id
    const this_game_rating   = req.body.this_game_rating
    const user_id            = req.body.user_id

    console.log(user_id)
    console.log(this_game_rating)
    console.log(user_id)

    const db = client.db("MyGameListDB");
    const result = await db.collection('Users').updateOne({_id:"62c85fc05de1d8e6cfa1b010"} , { $push: {"games": {id:"this game sucks", rating: "bro please"}}})
    
    console.log(result);    
    res.status(200).json(result);
})

module.exports = add_game_router
