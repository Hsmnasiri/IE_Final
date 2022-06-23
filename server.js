const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:false}));
mongoose.connect('mongodb://localhost:27017/messenger',
    { useNewUrlParser: true, useUnifiedTopology: true });
 mongoose.set('useFindAndModify', false);
                           
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("mongodb connected!");
});

app.use('/api/v1', require('./src/routes/router'));


app.listen(8080, ()=>{
    console.log("server is running on port 8080");
});