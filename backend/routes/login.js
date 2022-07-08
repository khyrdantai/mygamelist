
//NOTE: THIS IS CURRENTLY DOING NOTHING, needs to be exported.


const {app, client} = require("../config/db");

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  let error = '';

  const { login, password } = req.body;

  const db = client.db("MyGameListDB");
  const results = await db.collection('Users').find({login:login,password:password}).toArray();

  let id = -1;
  let fn = '';
  let ln = '';

  if( results.length > 0 )
  {
    id = results[0]._id;
    fn = results[0].firstName;
    ln = results[0].lastName;
    un = results[0].login;
  }

  let ret = { id:id, firstName:fn, lastName:ln, userName:un, error: error};
  res.status(200).json(ret);
});

export default login;

