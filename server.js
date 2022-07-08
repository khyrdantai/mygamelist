const request = require('request');

// config folder stuff
const {connectDB, express, path, PORT, app, client} = require("./backend/config/db");
connectDB();



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
