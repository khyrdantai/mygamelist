const {client, express} = require("../db");
const mongoose = require('mongoose')
const add_game_router = express.Router()
const {authenticate_token, jwt, initial_key} = require('../authentication')
console.log(initial_key)
let key = initial_key

add_game_router.post('/', authenticate_token, async (req, res) =>{
    jwt.verify(req.token, 'key', (err, authData)=>{
        if(err){
            console.log(initial_key)
            console.log('made it here')
            res.sendStatus(403)
        }else{
            res.json({
                message:"post created...", 
                authData
            })
        }
    })

    let {_id, id, rating} = req.body
    userID = mongoose.Types.ObjectId(_id)

    const db = client.db("MyGameListDB");
    const result = await db.collection('Users').updateOne({_id:userID} , { $push: {"games": {id:id, rating:rating}}})
      
    //res.status(200).json(result);
})

module.exports = add_game_router
