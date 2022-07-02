
// NOTE: THIS IS CURRENTLY DOING NOTHING, needs to be exported.


const {app, client} = require("../config/db");

app.post('/api/login', async (req, res, next) =>
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    let error = '';

    const { login, password } = req.body;

    const db = client.db("mygamelistDB");
    const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

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

