const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const controllers = require('./controllers');

app.use(bodyParser);
app.use(controllers);


const port = process.env.PORT || 3030;
app.listen(port,()=>console.log(`app listening to port ${port}`));