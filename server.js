const express = require('express');
const app = express();
const uuid = require('uuid');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function (req, res) {
  res.send('index')
})

app.get('/collect', function (req, res) {
    if(!req.cookies.sessionID){
        let sessionId = uuid.v1();
        res.cookie('sessionID', sessionId);
        //redis-create new entry of 5 minutes ttl for key sessionId with query params data
    }else{
        //redis-update
        //if not exist at redis(expired), then create seesionID
    }


    res.send(requestId);
  })
 
app.listen(3000)