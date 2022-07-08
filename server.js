const request = require('request');

// config folder stuff
const {connectDB, express, path, port, steamWebApiKey, app, client} = require("./backend/config/db");
connectDB();

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

app.post('/api/getSteamGames', async (req, res) => 
{
  // incoming: userId, steamId
  // outgoing: appId, playtime
  const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?'
              + 'key=' + steamWebApiKey + '&steamid=' + req.body.steamId;

  request.get(url, function(error, response, data) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
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
app.listen(port, () => 
{
  console.log('Server listening on port ' + port);
});
