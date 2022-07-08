// local modules
const {client, express} = require("../db");
const login_router = express.Router()

//login api
login_router.post('/', async (req, res) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    let error = '';

    const { login, password } = req.body;

    const db = client.db("MyGameListDB");
    const results = await db.collection('Users').find({login:login,password:password}).toArray();

    let id = -1;
    let fn = '';
    let ln = '';
    let un = '';
    let local_email = '';

    if( results.length > 0 )
    {
      id = results[0]._id;
      fn = results[0].firstName;
      ln = results[0].lastName;
      un = results[0].login;
      local_email = results[0].email;
    }

    let ret = { id:id, firstName:fn, lastName:ln, userName:un, email:local_email, error: error};
    res.status(200).json(ret);
  });

module.exports = login_router