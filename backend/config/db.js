// server requirements to run
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();

// constants
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI;
const app = express();

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