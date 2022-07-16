const {client, express} = require("../db");
const add_game_router = express.Router()
const parser = bodyParser = require('body-parser') 
const authenticate_token = require('../authentication')
const mongoose = require('mongoose');

add_game_router.post('/',  async (req, res) =>{
    let {id, rating, _id} = req.body;

    userID = mongoose.Types.ObjectId(_id);

    console.log(id)
    console.log(rating)
    console.log(_id)

    const db = client.db("MyGameListDB");
    const result = await db.collection('Users').updateOne({_id:userID} , { $push: {"games": {id:rating, rating:id}}})
    
    console.log(result);    
    res.status(200).json(result);
})

module.exports = add_game_router
