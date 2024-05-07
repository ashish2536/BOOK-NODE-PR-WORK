const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1/node");
const db= mongoose.connection;

db.once('open',function(err){
    if(err){
        console.log("something")
    }
    console.log("db is connected")
})  

module.exports=db;