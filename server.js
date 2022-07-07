
// config folder stuff
const {connectDB, express, path, PORT, app, client} = require("./backend/config/db");
connectDB();

//start Node + Express server listener
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
