const express = require('express');
const app = express();
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const path = require('path');
const public = path.join(__dirname, 'public');
const redis = require("redis");
const redisClient = redis.createClient();


redisClient.on("error", function (err) {
    console.log("Redis Error: " + err);
});

app.use(cookieParser());

app.use('/', express.static(public));

app.get('/collect', function (req, res) {
    if(!req.cookies.sessionID){
        let sessionId = uuid.v1();
        res.cookie('sessionID', sessionId);
        console.log('new session');

        redisClient.set(sessionId, 'user session data', 'EX', 60, function(err) {
            if (err) throw err;
        });
        

        //redis-create new entry of 5 minutes ttl for key sessionId with query params data
    }else{
        redisClient.get(req.cookies.sessionID, function (err, res) {
            if (err) throw err;
            if(res != null){console.log('found data for session:', res)}
        });
    }


    res.send();
  })
 
app.listen(3000)