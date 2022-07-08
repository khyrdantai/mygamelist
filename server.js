const request = require('request');

// config folder stuff
const {connectDB, express, path, PORT, app, client} = require("./backend/config/db");
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
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  let ret = { id:id, firstName:fn, lastName:ln, error: error};
  res.status(200).json(ret);
});

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
