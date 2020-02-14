/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

require('dotenv').config();
var cloudant = require('@cloudant/cloudant');
var express = require('express');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');
//var req = require('./node_modules/req/node_modules/request');
var secureEnv = require('secure-env');
const fs = require('fs');
var appEnv = cfenv.getAppEnv();
global.env = secureEnv({secret:'mySecretPassword'});
var app=express();
//const path = require('path');
//var filepath = path.join(__dirname,'index.html');

var username = global.env.cloudantusername;
var password = global.env.cloudantpassword;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Email
console.log('printed email');

app.use(express.static(__dirname));
  app.get('/',function(req,res){
  res.sendFile('views/index.html', {"root": __dirname});
});
app.get('/error',function(req,res){
res.sendFile('views/error.html', {"root": __dirname});
}
);

var cloudant = cloudant({account:username, password:password});
luckydrawdb = cloudant.db.use(global.env.dbname);

app.post('/api/emailinsert', function(req,res){

    var doc={
        _id:req.body.emailid,
        time: new Date().toISOString(),
        };

    luckydrawdb.insert(doc,function(err,body,header){
        if(err){
          res.status(400);
          res.send('None shall pass');
            console.log('Error:'+err.message);
            return;
        }
        else{
            cloudant.db.get('luckydraw',function(err,data){
            // console.log(data);
            res.status(200);
            // console.log('sent good');
            res.send('all good');


        });
        }
    });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
