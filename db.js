const mongoose = require('mongoose');
require('dotenv').config();

//mongodb connection URL
const mongoURL = process.env.DB_URL;

//set up mongodb connection
mongoose.connect(mongoURL);

//get the default connection
//Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('Connected to MongoDB server', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

//Export the database connection
module.exports = db;