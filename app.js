const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const controllers = require('./controllers');

//database connection
mongoose.connect("mongodb://digipass:digipass1@ds127589.mlab.com:27589/digipass");
var db = mongoose.connection;
db.on('error', ()=>console.log('error connecting database')); //checking for errors
db.once('open', ()=>console.log('connected to database')); //confirming connected

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(controllers);

//listening port
const port = process.env.PORT || 3030;
app.listen(port,()=>console.log(`app listening to port ${port}`));



