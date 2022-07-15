const {client, express} = require("../db");
const add_game_router = express.Router()
const parser = bodyParser = require('body-parser') 
const authenticate_token = require('../authentication')

add_game_router.post('/',  async (req, res) =>{
    let {this_game_id, this_game_rating, user_id} = req.body
   

    console.log(this_game_id)
    console.log(this_game_rating)
    console.log(user_id)

    const db = client.db("MyGameListDB");
    const result = await db.collection('Users').updateOne({_id:user_id} , { $push: {"games": {id:this_game_id, rating:this_game_rating}}})
    
    console.log(result);    
    res.status(200).json(result);
})

module.exports = add_game_router
