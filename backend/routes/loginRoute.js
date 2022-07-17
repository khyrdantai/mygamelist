// local modules
const {client, express} = require("../db");
const {get_token} = require("../authentication")

//router to export
const login_router = express.Router();


//login api
login_router.post('/', async (req, res) => {

  const {userName, password} = req.body
  const user = {userName:userName, password:password}

  // create jwt token
  let token = get_token(user)     

  //connect to and access db
  const db = client.db("MyGameListDB");
  const results = await db.collection('Users').find(user).toArray();

  // the return of the login function is the jwt token. this needs to be stored locally somwhere
  let ret = {token: token};
  res.status(200).json(ret);

});

module.exports = login_router
