const express = require('express');
const app = express();
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
express-session
const redis = require("redis");
const redisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});


redisClient.on("error", function (err) {
    console.log("Redis Error: " + err);
});

app.use(express.static('public'))
app.use(cookieParser());

app.get('/collect', function (req, res) {
    console.log(req);
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

  app.get('/current_session', function (req, res) {
      res.json("session data");
  })
 
app.listen(8081)