var express = require('express');
var app = express();
var db = require('./db');



app.get('/api', function(req,res){
    res.status(200).send('API works.');
})




// app.use('/', (req, res)=>{
//     res.json({message:"welcome home"})
// })


var AuthController = require('./auth/AuthController');
app.use('/api/auth',AuthController);

var UserController = require('./user/UserController');
app.use('/api/users', UserController);



module.exports = app;