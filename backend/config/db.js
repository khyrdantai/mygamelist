// server requirements to run
const {express, bodyParser, cors, path, env, PORT, app} = require(".../server")

// constants
const URL = process.env.MONGODB_URI;

// database stuff
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(URL);

const connectDB = async ()=>{
    try {
        // initialize
        app.set('port', PORT);
        app.use(cors());
        app.use(bodyParser.json());

        // connect to the database
        await client.connect();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDB, express, bodyParser, cors, path, env, PORT, URL, app, client};