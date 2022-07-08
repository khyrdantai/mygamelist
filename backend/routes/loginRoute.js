// local modules
const {client, express} = require("../db");
const login_router = express.Router()

//login api
login_router.post('/', async (req, res) => {

  let error = '';

  const { login, password } = req.body;

  const db = client.db("MyGameListDB");
  const results = await db.collection('Users').find({login:login,password:password}).toArray();

  let id = -1;
  let fn = '';
  let ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  let ret = { id:id, firstName:fn, lastName:ln, error: error};
  res.status(200).json(ret);
});

module.exports = login_router