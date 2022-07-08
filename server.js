
// config folder stuff
const {connectDB, express, path, port, app} = require("./backend/config/db");
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
app.listen(port, () => 
{
  console.log('Server listening on port ' + port);
});
