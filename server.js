const loginModel = require('./backend/routes/loginRoute');
const registerModel = require('./backend/routes/registerRoute');
const steamModel = require('./backend/routes/steamRoute');

// config folder stuff
const {connectDB, app, PORT} = require("./backend/db");
connectDB();

app.use('/api/login', loginModel)
app.use('/api/register', registerModel)
app.use('/api/Steam', steamModel)

//start Node + Express server listener
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});