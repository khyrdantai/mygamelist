const {client, express} = require("../db");
const add_game_router = express.Router()

add_game_router.post('/', async (req, res) =>{
    error=''
    const this_game_id = req.body.this_game_id
    const this_game_rating = req.body.this_game_rating
    const user_id = req.body.user_id;

    const db = client.db("MyGameListDB");
    const result = db.collection('Users').updateOne(
        {_id: user_id} , { $push: {"games": {
        _id:this_game_rating,
        rating: this_game_rating,
    }}})
})

module.exports = add_game_router
