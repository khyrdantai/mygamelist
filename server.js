const request = require('request');
const mongoose = require('mongoose');

// config folder stuff
const {connectDB, express, path, PORT, app, client} = require("./backend/config/db");
connectDB();

//login api
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
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  let ret = { id:id, firstName:fn, lastName:ln, error: error};
  res.status(200).json(ret);
});

//register api
app.post('/api/register', async (req, res, next) =>{
  let error = ''

  // new user data
  var item = {
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    login: req.body.login,
    password: req.body.password,
    email: req.body.email   
  };
  
  //set db
  const db = client.db("MyGameListDB");

  // 
  const add_user = await db.collection('Users').insertOne({item})
  
  res.status(200);

})

//steam api post
app.post('/api/getSteamGames', async (req, res) => 
{
  // incoming: userId, steamId
  // outgoing: appId, playtime
  const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?'
              + 'key=' + steamWebApiKey + '&steamid=' + req.body.steamId;

  request.get(url, function(steamHttpBody) {
    res.setHeader('Content-Type', 'application/json');
    res.send(steamHttpBody);
  });
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

//start Node + Express server listener
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
