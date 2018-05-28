


// AuthController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
var User = require('../user/User');
var VerifyToken = require('./VerifyToken');








// configure JWT
var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens
var config = require('../config'); //get config file
var bcrypt = require('bcryptjs'); 



router.get('/', function(req,res,next){
    res.send("welcome to the unique app developnment");
});


router.post('/register', function(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password,10)
    User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        Password:hashedPassword
    
        
       // password:req.body.password
        
        // bcrypt.hashSync("hjsdfnjdsk", salt)
    },
    //var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // bcrypt.hash('password', 5, function( err, bcryptedPassword) {
    //     //save to db
    //  });
    //configure JWT
    
    
    
    function(err, user){
        if(err,user){
            if(err) return res.status(500).send("There was a problem registering the user.")
            // create a token

            var token = jwt.sign({id:user._id}, config.secret, {
                expiresIn:86400 //expire in 24hours
            });
            res.status(200).send({auth:true,token:token});
        }
    });
});


router.get('/me',VerifyToken, function(req, res, next){
    
   User.findById(req.userId,{password:0},function(err,user){
            if(err)return res.status(500).send("there was a problem finding  the  user");
            if(!user)return res.status(404).send("No user found.");
                
                res.status(200).send(user);
                });
    });

router.post('/login', function(req,res){

    User.findOne({email:req.body.email},function(err, user){
        if(err) return res.status(500).send('Error on the server.');
        if(!user)return res.status(404).send('No user found.!');
            //check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid)return res.status(401).send({auth:false,token:null});

        //if user is found and password is valid 
        // create a token
        var token = jwt.sign({id:user._id},config.secret,{
            expiresIn:86400 //expires in 24hours
        });
        //return the information including token as JSON
        res.status(200).send({auth:true,token:token});
    });
});


module.exports = router;