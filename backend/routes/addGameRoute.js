const {client, express} = require("../db");
const add_game_router = express.Router()
const authenticate_token = require('../authentication')

add_game_router.post('/',  async (req, res) =>{
    const this_game_id = req.body.this_game_id
    const this_game_rating = req.body.this_game_rating
    const user_id = req.body.user_id;

    const filter = {_id:user_id}
    const update = { $push: {"games": {id:this_game_id, rating: this_game_rating},}}
    const options = {upsert: true}

    const db = client.db("MyGameListDB");
    const result = await db.collection('Users').updateOne(filter , update, options)
    
    console.log(result);    
    res.status(200).json(result);
})

module.exports = add_game_router
