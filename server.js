const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const rawBodySaver =  (req, res, buf, encoding) =>{
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}
const options = {
  verify: rawBodySaver
};

app.use(bodyParser.json(options));

app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost:27017/course',
    { useNewUrlParser: true, useUnifiedTopology: true });
 mongoose.set('useFindAndModify', false);
                           
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("mongodb connected!");
});

app.use('/', require('./src/routes/router'));


app.listen(8080, ()=>{
    console.log("server is running on port 8080");
});