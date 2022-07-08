// server requirements to run
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();

// constants
const port = process.env.PORT || 5000;
const url = process.env.MONGODB_URI;
const steamWebApiKey = process.env.STEAM_WEB_API_KEY;
const app = express();

// database stuff
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);

const connectDB = async ()=>{
    try {
        // initialize
        app.set('port', port);
        app.use(cors());
        app.use(bodyParser.json());

        // connect to the database
        await client.connect();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDB, express, bodyParser, cors, path, env, port, steamWebApiKey, url, app, client};