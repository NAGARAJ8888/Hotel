const express = require('express')
const app =express();

//Database Connection
const db = require('./db');

//.env Configuration
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//body parser intermediater(  npm i body-parser  )
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('welcome to restaurent');
});


//Import the person router files
const personRoutes = require('./routes/personsRoutes');
//Use the person routers
app.use('/person', personRoutes);


//Import the menu router files
const menuRoutes = require('./routes/menuItemRoutes');
//Use the menu routers
app.use('/menu', menuRoutes);

//port defined
app.listen(PORT, ()=>{
    console.log('listening on port 3002');
})