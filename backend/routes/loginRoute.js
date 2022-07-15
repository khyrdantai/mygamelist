// local modules
const {client, express} = require("../db");
const login_router = express.Router();
const {jwt, generate_key, get_token} = require("../authentication")

const user = null;
let initial_key = generate_key();

//login api
login_router.post('/', async (req, res) => {

  const { userName, password } = req.body;
  user = {userName:userName,password:password}

  // create jwt token
  let token = get_token()     

  //connect to and access db
  const db = client.db("MyGameListDB");
  const results = await db.collection('Users').find(user).toArray();

  // the return of the login function is the jwt token. this needs to be stored locally somwhere
  let ret = {accessToken: token};
  res.status(200).json(ret);
});

module.exports = 
{
  login_router, 
  user,
  initial_key
}