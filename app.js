const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const rawBodySaver =  (req, buf, encoding) =>{
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}
const options = {
  verify: rawBodySaver
};

app.use(bodyParser.json(options));

mongoose.connect('mongodb://localhost:27017/courseManager',
    { useNewUrlParser: true, useUnifiedTopology: true });
 mongoose.set('useFindAndModify', false);
                           
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("database connection is  Ok!");
});

app.use('/', require('./src/routes/router'));


app.listen(3000, ()=>{
    console.log("server is running ");
});