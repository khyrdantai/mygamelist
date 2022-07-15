// local modules
const {client, express} = require("../db");
const login_router = express.Router();
const {jwt, generate_key} = require("../authentication")

//login api
login_router.post('/', async (req, res) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    let error = '';

    const { userName, password } = req.body;
    const user = {userName:userName,password:password}
    let initial_key = generate_key()

    let get_token = function(){
      console.log(initial_key + "  <- this is the value saved in initial key")
      return jwt.sign(user, initial_key)
    }

    let full_token = get_token()
    
    // this is middleware that needs to be used by other api calls but i dont have it quite figured out yet
    function authenticate_token(req, res, next){
      const auth_header = req.headers['authorization']
      const token = auth_header && auth_header.split(' ')[1]
      
      // no token no access
      if(token == null) return res.sendStatus(401)

      jwt.verify(token, initial_key,(err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
      })

    } 

    const db = client.db("MyGameListDB");

    const results = await db.collection('Users').find(user).toArray();


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
      un = results[0].userName;
      local_email = results[0].email;
    }


    let ret = {accessToken: full_token};
    res.status(200).json(ret);
  });

module.exports = 
{
  login_router, 
  authenticate_token
}